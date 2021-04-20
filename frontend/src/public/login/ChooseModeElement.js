import {Link, Redirect} from 'react-router-dom'
import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'

class ChooseModeElement extends Component{

    render(){
        var name = this.props.name;

        if(name=="CLIENT"){
            name = "Klient"
        }
        else if(name=="ADMIN"){
            name = "Administrator"
        }
        else if(name=="STAFF"){
            name = "Pracownik"
        }

        return(
            <div style={{display: "table",margin:"0 auto"}}><Link to={"/"+this.props.name.toLowerCase()}><Button  variant="secondary" size="lg">{name}</Button></Link><br/><br/></div>
        )
    }

}

export default ChooseModeElement;