import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class MainPage extends Component{
    constructor(props) {
        super(props);
    
    }

    render() {
        return(
            <div>
                Witaj na naszej stronie głównej<br/>
                <Link to="/admin">Strona administratora</Link><br/>
                Aders api {process.env.REACT_APP_API_URL}
            </div>
        )

    }

}

export default MainPage;