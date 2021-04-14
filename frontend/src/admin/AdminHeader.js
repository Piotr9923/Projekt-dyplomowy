import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

class AdminHeader extends Component{
    
    render(){

        var chooseMode = "";
      
        if(JSON.parse(localStorage.getItem("roles")).length>1){
            chooseMode =  <li><Link to="/dashboard">Zmień tryb</Link></li>
        } 
        
        return(
           <nav>
               <ul>

                   <li><Link to="/admin">Strona główna</Link></li>
                   <li><Link to="/admin/staff-list">Zarządzaj pracownikami</Link></li>
                   <li><Link to="/admin/announcement">Zarządzaj ogłoszeniami</Link></li>
                   <li><Link to="/admin/statistics">Statystyki serwisu</Link></li>
                    {chooseMode}
                    <li><Link to="/logout">Wyloguj się</Link></li>

               </ul>
           </nav>
        )
    }

}

export default AdminHeader;