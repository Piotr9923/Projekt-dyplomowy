import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ChooseModeElement from './ChooseModeElement'
import LoggedHeader from './LoggedHeader';

class ChooseMode extends Component{

    render(){
        try{
            if(JSON.parse(localStorage.getItem("roles")).length==1){
                if(JSON.parse(localStorage.getItem("roles")).includes("ADMIN")) return <Redirect to="/admin"/>
                if(JSON.parse(localStorage.getItem("roles")).includes("STAFF")) return <Redirect to="/staff"/>
                if(JSON.parse(localStorage.getItem("roles")).includes("CLIENT")) return <Redirect to="/client"/>
            }
            else{
                return(
                    <div>
                        <LoggedHeader/>
                        <h2 style={{display: "flex","justify-content":"center","align-items":"center"}}>Wybierz tryb    :</h2><br/>
                        <div>
                            {JSON.parse(localStorage.getItem("roles")).map(role=><ChooseModeElement name={role}/>)}
                        </div>
                    </div>

                )
            }
        }catch(error){
            return <Redirect to="/login"/>
        }
    }

}

export default ChooseMode;