import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PublicHeader from './PublicHeader';

class MainPage extends Component{
    constructor(props) {
        super(props);
    
    }

    render() {
        return(
            <div>
                <PublicHeader />

                <h1>Witaj na stronie naszego serwisu komputerowego!</h1>
                
            </div>
        )

    }

}

export default MainPage;