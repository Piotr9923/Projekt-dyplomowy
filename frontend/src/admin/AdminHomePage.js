import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AdminHeader from './AdminHeader';
import StaffList from './StaffList';
import StaffListElement from './StaffListElement';

class AdminHomePage extends Component{

    
    render() {
    
        return(
            <div>
                <AdminHeader/>
               
            </div>
        )
        

    }

}

export default AdminHomePage;