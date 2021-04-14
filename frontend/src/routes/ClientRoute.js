import React from 'react'
import { Redirect, Route } from 'react-router'

export const ClientRoute=({component: Component, ...rest})=>{

    return (
        <Route {...rest} render={props => (
            !localStorage.getItem("roles")?
                <Redirect to="/login"/>
                : JSON.parse(localStorage.getItem("roles")).includes("CLIENT")?
                <Component {...props}/>
                :<Redirect to="/dashboard"/>
        )} />
    );
   
}