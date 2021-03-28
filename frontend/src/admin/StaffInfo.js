import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class StaffInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            info:[]
        };
    }

    componentDidMount() {
        console.log("Parametry w mount"+this.props.match.params.id);

        this.setState({isLoading: true});
        var url = ""+process.env.REACT_APP_API_URL + "/admin/staff/"+this.props.match.params.id;
        console.log("URL = "+url);
        fetch(url).
        then(response => response.json()).
        then(data => this.setState({info: data, isLoading: false}));
    }

    render() {
        console.log(this.state.info);
        if(this.state.isLoading){
            return "Trwa ładowanie"
        }
        else{
            return(
                <div>
                    Imię: {this.state.info.firstname}<br/>
                    Nazwisko: {this.state.info.lastname}<br/>
                    Login: {this.state.info.username}<br/>
                    Telefon: {this.state.info.phoneNumber}<br/>
                    Mail: {this.state.info.email}<br/>

                    </div>
            )
        }

    }

}

export default StaffInfo;