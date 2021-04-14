import React from 'react'
import { Redirect, Route } from 'react-router'

export const UnloggedUserRoute=({component: Component, ...rest})=>{

    return (
        <Route {...rest} render={props => (
            localStorage.getItem("roles")?
            <Redirect to="/dashboard"/>
            :<Component {...props}/>
        )} />
    );
   
}