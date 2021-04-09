import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PublicHeader from './PublicHeader';

class RegistrationTypePage extends Component{


    render(){

        localStorage.clear();

        return(
            <div>
                <PublicHeader />

                <h2>Wybierz sposób logowania:</h2>
                <Link to="/registration/new">Nowy użytkownik</Link> - wybierz tą opcję jeśli jesteś naszym nowym klientem!<br/><br/>
                <Link to="/registration/client">Klient serwisu</Link> - wybierz tą opcję jeśli powierzyłeś nam do naprawy swój sprzęt w serwisie!

            </div>
        )
    }

}

export default RegistrationTypePage;