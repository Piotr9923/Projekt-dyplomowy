import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PublicHeader from '../PublicHeader';
import Button from 'react-bootstrap/Button'
import HelpIcon from '@material-ui/icons/Help';

class RegistrationTypePage extends Component{


    showInfoNewButton(){
        alert("Wybierz tą opcję jeśli jesteś naszym nowym klientem!");
    }

    showInfoClientButton(){
        alert("Wybierz tą opcję jeśli powierzyłeś nam do naprawy swój sprzęt w serwisie!");
    }

    render(){

        localStorage.clear();

        return(
            <div>
                <PublicHeader />

                <h2 style={{display: "flex","justify-content":"center","align-items":"center"}}>Wybierz sposób rejestracji:</h2><br/>
                <div style={{display: "table",margin:"0 auto"}}><Link to={"registration/new"}><Button  variant="secondary" size="lg">Nowy użytkownik</Button></Link><HelpIcon color="action" onClick={this.showInfoNewButton}/><br/><br/></div>
                <div style={{display: "table",margin:"0 auto"}}><Link to={"registration/client"}><Button  variant="secondary" size="lg">Klient serwisu</Button></Link><HelpIcon color="action" onClick={this.showInfoClientButton}/><br/><br/></div>

            </div>
        )
    }

}

export default RegistrationTypePage;