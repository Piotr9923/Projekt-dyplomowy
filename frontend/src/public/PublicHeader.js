import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PublicHeader extends Component{
    
    render(){
        return(
           <nav>
               <ul>
                   <li><Link to="/login">Logowanie</Link></li>
                   <li><Link to="/registration">Rejestracja</Link></li>
               </ul>
           </nav>
        )
    }

}

export default PublicHeader;