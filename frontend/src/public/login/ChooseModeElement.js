import {Link, Redirect} from 'react-router-dom'
import React, {Component} from 'react'

class ChooseModeElement extends Component{

    render(){
        return(
            <div><Link to={"/"+this.props.name.toLowerCase()}>{this.props.name}</Link></div>
        )
    }

}

export default ChooseModeElement;