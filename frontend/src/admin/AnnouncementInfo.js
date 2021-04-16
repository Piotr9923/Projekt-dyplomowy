import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';

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

    render() {

        if(this.state.notFound){
            return(<div><AdminHeader/><br/>Nie znaleziono takiego ogłoszenia!</div>)
        }
        else if(this.state.isLoading){
            return "Trwa ładowanie"
        }
        else{
            return(
                <div>
                    <AdminHeader/>
                    Data opublikowania: {this.state.info.date}<br/>
                    Tytuł: {this.state.info.title}<br/>
                    Treść: {this.state.info.text}<br/>
                    Odbiorcy: {this.state.info.rolesNames}<br/>
                </div>
            )
        }

    }

}

export default AnnouncementInfo;