import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from './ApiConnect';
import PublicHeader from './PublicHeader';

class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.changeLogin = this.changeLogin.bind(this);
        this.changePasswrod = this.changePasswrod.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username:"",
            password:"",
            areErrors: false,
            errors: []
        };
    }
    
    changeLogin(e){
        this.setState({
            username: e.target.value
        })
    }

    changePasswrod(e){
        this.setState({
            password: e.target.value
        })
    }

    login(e){
        
        var body = JSON.stringify({
            'username':this.state.username,
            'password': this.state.password
        })

        ApiConnect.postMethod("/signin",body)
        .then(response=>{
            if(response.status==401){
                throw Error("Błędne dane logowania!");
            }
            else if(response.status==400){
                this.setState({
                    areErrors: true
                })
            }
            else{
                this.setState({
                    areErrors: false
                })
            }
            return response.json();
        })
        .then(data=>{

            if(this.state.areErrors){
            
                var errorsMessage = "";
                data.errors.map(error=>{
                    errorsMessage = errorsMessage + error +"\n";
                })
                throw Error(errorsMessage);
            }
            else{
                localStorage.setItem("token",data.token);
                localStorage.setItem("username",data.username);
                localStorage.setItem("roles",JSON.stringify(data.roles));
                window.location.reload();
            }

        })
        .catch(error=>{
            alert(error.message);

            this.setState({
                areErrors: false
            })
        })
    }
    
    render(){
        
        if(localStorage.getItem("token")){
            return <Redirect to="/dashboard"/>
        }
        else{
            return(
                <div>
                    <PublicHeader />

                    <h2>Zaloguj się</h2>

                    Nazwa użytkownika: <input type="text" onChange={this.changeLogin}/><br/>
                    Hasło: <input type="password" onChange={this.changePasswrod}/><br/>

                    <button onClick={this.login}>Zaloguj się</button>
                </div>
            )
        }
    }

}

export default LoginPage;