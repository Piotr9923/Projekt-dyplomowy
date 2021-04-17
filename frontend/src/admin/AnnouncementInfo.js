import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import {
    CircularProgress
  } from "@material-ui/core";
import '../App.css';

class AnnouncementInfo extends Component{
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
        var url = "/admin/announcement/"+this.props.match.params.id;
        console.log(url);
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
            <div>
            Data opublikowania: {this.state.info.date}<br/>
            Tytuł: {this.state.info.title}<br/>
            Treść:<br/> 
            <text style={{ whiteSpace: "pre" }}>{this.state.info.text}</text><br/>
            Odbiorcy: {this.state.info.rolesNames}<br/>
        </div>

        )

    }

    render() {

        var info = <this.AnnouncementView/>

        if(this.state.notFound){
            info = <div>Nie znaleziono takiego ogłoszenia!</div>
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

export default AnnouncementInfo;