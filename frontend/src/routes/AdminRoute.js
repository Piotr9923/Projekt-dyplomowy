import React from 'react'
import { Redirect, Route } from 'react-router'

export const AdminRoute=({component: Component, ...rest})=>{

    return (
        <Route {...rest} render={props => (
            !localStorage.getItem("roles")?
                <Redirect to="/login"/>
                : JSON.parse(localStorage.getItem("roles")).includes("ADMIN")?
                <Component {...props}/>
                :<Redirect to="/dashboard"/>
        )} />
    );
   
}