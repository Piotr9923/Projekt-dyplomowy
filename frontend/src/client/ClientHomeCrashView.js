import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"
import ClientHeader from './ClientHeader';


class ClientHomeCrashView extends Component{
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
        var url = "/client/home_crash/"+this.props.match.params.id;

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

    render() {

        if(this.state.notFound){
            return(<div><ClientHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie znaleziono takiej awarii!</h2></div>)
        }
        else if(this.state.isLoading){
            return( <div class="centered"><ClientHeader/><CircularProgress/></div>)
        }

        return(
            <div>
            <ClientHeader/>

            <div class="centered">
            <this.CrashInfo/>
            </div>

            
        </div>
        )
    }

}

export default ClientHomeCrashView;