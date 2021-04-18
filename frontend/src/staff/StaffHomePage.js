import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import StaffHeader from './StaffHeader'

class StaffHomePage extends Component{

    
    render() {
    
        return(
            <div>
                <StaffHeader/>
                
            </div>
        )
        

    }

}

export default StaffHomePage;