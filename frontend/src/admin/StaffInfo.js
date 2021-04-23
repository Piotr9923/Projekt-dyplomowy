import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import {
    CircularProgress
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"


class StaffInfo extends Component{
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
        var url = "/admin/staff/"+this.props.match.params.id;
        console.log("URL = "+url);
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

    StaffView=()=>{

        return( 
            <div style={{display:"table",margin:"0 auto"}}>
               <Link to={"/admin/staff/"+this.props.match.params.id+"/edit"}><Edit fontSize="large"/></Link>
                <h2>Dane pracownika:</h2>
                
                <ul style={{listStyle:"none"}}>
                    <li><b>Imię:</b> {this.state.info.firstname}</li>
                    <li><b>Nazwisko:</b> {this.state.info.lastname}</li>
                    <li><b>Login:</b> {this.state.info.username}</li>
                    <li><b>Telefon:</b> {this.state.info.phoneNumber}</li>
                    <li><b>Adres e-mail:</b> {this.state.info.email}</li>
                    <li><b>Wysokość wynagrodzenia:</b> {this.state.info.salary} zł</li>
                </ul>
            </div>
            
        )
    }

    render() {

        
        var info = <this.StaffView/>

        if(this.state.notFound){
            return(<div><AdminHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie znaleziono takiego pracownika</h2></div>)
        }
        else if(this.state.isLoading){
            info = <div class="centered"><CircularProgress/></div>
        }

        return(
            <div>
                
                <AdminHeader/>
                
                {info}
            </div>
        )
        

    }

}

export default StaffInfo;