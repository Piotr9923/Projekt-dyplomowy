import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
import '../App.css';
import ClientHeader from './ClientHeader';

class AnnouncementClientView extends Component{
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
        var url = "/client/announcement/"+this.props.match.params.id;

        ApiConnect.getMethod(url)
        .then(response => {
            if(response.status==404){
                throw Error("404");
            }
            return response.json()
        })
        .then(data => this.setState({info: data, isLoading: false}))
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

    AnnouncementView=()=>{

        return(
            <div style={{display:"table",margin:"0 auto"}}>
            <h1><b>{this.state.info.title}</b></h1>
            <text style={{ whiteSpace: "pre" }}>{this.state.info.text}</text><br/><br/><br/>

            <b>Data publikacji:</b> {this.state.info.date}

        </div>

        )

    }

    render() {

        var info = <this.AnnouncementView/>

        if(this.state.notFound){
            info = <h2 className="centered" style={{color:"red"}}>Nie znaleziono takiego ogłoszenia!</h2>
        }
        else if(this.state.isLoading){
            info = <div class="centered"><CircularProgress/></div>
        }

        return(
            <div>
                <ClientHeader/>
                {info}
            </div>
        )
        

    }

}

export default AnnouncementClientView;