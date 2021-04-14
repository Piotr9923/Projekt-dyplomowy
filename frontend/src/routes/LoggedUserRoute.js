import React from 'react'
import { Redirect, Route } from 'react-router'

export const LoggedUserRoute=({component: Component, ...rest})=>{

    return (
        <Route {...rest} render={props => (
            localStorage.getItem("roles")?
                <Component {...props}/>
                :<Redirect to="/login"/>
        )} />
    );
   
}