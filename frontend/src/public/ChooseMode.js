import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ChooseModeElement from './ChooseModeElement'

class ChooseMode extends Component{

    render(){

        if(localStorage.getItem("roles").length==1){
            if(localStorage.getItem("roles").includes("ADMIN")) return <Redirect to="/admin"/>
            if(localStorage.getItem("roles").includes("STAFF")) return <Redirect to="/staff"/>
            if(localStorage.getItem("roles").includes("CLIENT")) return <Redirect to="/client"/>
        }
        else{
            return(
                <div>WYBIERZ MODUŁ:<br/>
                <div>
                    {JSON.parse(localStorage.getItem("roles")).map(role=><ChooseModeElement name={role}/>)}
                </div>

                </div>

            )
        }
    }

}

export default ChooseMode;