import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

class Logout extends Component{
    
    render(){

        localStorage.clear()
      
        return <Redirect to="/login" />
    }

}

export default Logout;