import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
import '../App.css';
import ClientHeader from './ClientHeader';

class ClientContact extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div>
                <ClientHeader/>
                
                <div style={{display:"table",margin:"0 auto"}}>
                    <h2><b>Kontakt i dane firmy</b></h2>
                    Serwis komputerowy "Komputerek"<br/>
                    ul. Testowa 123<br/>
                    01-234 Warszawa<br/>
                    tel: 333222111<br/>
                    NIP: 123-456-78-90<br/><br/>
                    <h3>Godziny otwarcia:</h3>
                    <b>Poniedziałek: </b> 8:00-18:00<br/>
                    <b>Wtorek: </b> 8:00-18:00<br/>
                    <b>Środa: </b> 8:00-18:00<br/>
                    <b>Czwartek: </b> 8:00-18:00<br/>
                    <b>Piątek: </b> 8:00-18:00<br/>
                    <b>Sobota: </b> 8:00-18:00<br/>
                    <b>Niedziela: </b> nieczynne<br/>

                </div>


            </div>
        )
        

    }

}

export default ClientContact;