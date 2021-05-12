import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"
import StaffHeader from './StaffHeader';


class ComputerCrashInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            info:[],
            notFound: false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/staff/crash/"+this.props.match.params.id;

        ApiConnect.getMethod(url).
        then(response => {
            if(response.status==404){
                throw Error("404");
            }
            return response.json()
        }).
        then(data => this.setState({info: data, isLoading: false}))
        .catch(error=>{
            if(error.message=="404"){
                this.setState({notFound:true})
                this.forceUpdate();
            }
            else{
                alert(error);
            }
        });
    }

    CrashInfo=()=>{

        return(
            <div>
            <Link to={"/staff/crash/"+this.props.match.params.id+"/edit"}><Edit fontSize="large"/></Link>

            <h3><b>{this.state.info.title}</b></h3>
            <b>Opis:</b><br/>
            <text style={{ whiteSpace: "pre" }}>{this.state.info.description}</text><br/><br/>

            <b>Data zgłoszenia:</b> {this.state.info.date}<br/>

            <b>Status:</b> {this.state.info.status}<br/>

            {this.state.info.cost>0?<div><b>Do zapłaty:</b> {this.state.info.cost} zł<br/><br/></div>:""}

            <b>Wiadomość dla klienta: </b><br/>
            {this.state.info.crashMessage}

        </div>

        )

    }

    ClientInfo=()=>{

        return(
            <div>
            <h3>Dane klienta:</h3>
            {this.state.info.clientName}<br/>
            Nr tel.: {this.state.info.clientPhoneNumber}<br/>
            Adres e-mail: {this.state.info.clientEmail}<br/>
            
        </div>

        )

    }

    render() {

        if(this.state.notFound){
            return(<div><StaffHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie znaleziono takiej awarii!</h2></div>)
        }
        else if(this.state.isLoading){
            return( <div class="centered"><StaffHeader/><CircularProgress/></div>)
        }

        return(
            <div>
            <StaffHeader/>

            <div style={{width:"40%",marginLeft:"5%", marginRight:"5%", display:"inline-block", 'padding-left':'60px','padding-right':'60px'}}>
            <this.CrashInfo/>
            </div>

            <div style={{width:"40%",marginLeft:"5%", marginRight:"5%", display:"inline-block", 'padding-left':'60px','padding-right':'60px',"vertical-align":"top"}}>
                <this.ClientInfo/>
            </div>
            
        </div>
        )
        

    }

}

export default ComputerCrashInfo;