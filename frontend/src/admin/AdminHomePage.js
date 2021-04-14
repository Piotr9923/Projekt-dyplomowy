import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import AdminHeader from './AdminHeader';
import StaffList from './StaffList';
import StaffListElement from './StaffListElement';

class AdminHomePage extends Component{

    
    render() {
    
        return( <Redirect to="/admin/staff-list"/>
        )
        

    }

}

export default AdminHomePage;