import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import StaffList from './StaffList';
import StaffListElement from './StaffListElement';

class AdminHomePage extends Component{

    
    render() {
    
        return(
            <div>
                <StaffList/>
            </div>
        )
        

    }

}

export default AdminHomePage;