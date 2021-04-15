import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';

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

    render() {

        if(this.state.notFound){
            return(<div><AdminHeader/><br/>Nie znaleziono takiego pracownika</div>)
        }
        else if(this.state.isLoading){
            return "Trwa ładowanie"
        }
        else{
            return(
                <div>
                    <AdminHeader/>
                    Imię: {this.state.info.firstname}<br/>
                    Nazwisko: {this.state.info.lastname}<br/>
                    Login: {this.state.info.username}<br/>
                    Telefon: {this.state.info.phoneNumber}<br/>
                    Adres e-mail: {this.state.info.email}<br/>
                    Wysokość wynagrodzenia: {this.state.info.salary}<br/>
                </div>
            )
        }

    }

}

export default StaffInfo;