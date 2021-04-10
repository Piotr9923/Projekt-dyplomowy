import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../ApiConnect';
import PublicHeader from '../PublicHeader';

class ClientRegistration extends Component{


    constructor(props) {
        super(props);

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.registration = this.registration.bind(this);

        this.state = {
            username:"",
            password:"",
            password2: "",
            email: "",
            areErrors: false,
            errors: [],
            redirect: false
        };
    }

    changeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    changePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    
    changePassword2(e){
        this.setState({
            password2: e.target.value
        })
    }

    changeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    registration(e){

        if(this.state.password!=this.state.password2){
            alert("Hasła nie są takie same!");
        }
        else{

            var body = JSON.stringify({
                'username':this.state.username,
                'password': this.state.password,
                'email': this.state.email
            })


            ApiConnect.postMethod("/client_signup",body)
            .then(response=>{
                
                if(response.status==400){
                    this.setState({
                        areErrors: true
                    })
                }
                else{
                    this.setState({
                        areErrors: false
                    })
                    this.setState({
                        redirect: true
                    })
                    throw new Error("Pomyślnie zarejestrowano!")
                }
                return response.json();
            })
            .then(data=>{
                
                var errorsMessage = "";
                data.errors.map(error=>{
                    errorsMessage = errorsMessage + error +"\n";
                })
                throw Error(errorsMessage);
            

            })
            .catch(error=>{
                alert(error.message);

                this.setState({
                    areErrors: false
                })
            })
        }
    }


    render(){

        if (this.state.redirect) {
            return <Redirect push to="/login" />;
        }

        return(
            <div>
                <h2>Zarejestruj się przy użyciu maila podanego w serwisie</h2>

                Email: <input type="text" onChange={this.changeEmail}/><br/>
                Nazwa użytkownika: <input type="text" onChange={this.changeUsername}/><br/>
                Hasło: <input type="password" onChange={this.changePassword}/><br/>
                Podaj ponownie hasło: <input type="password" onChange={this.changePassword2}/><br/>

                <button onClick={this.registration}>Zarejestruj się</button>

            </div>
        )
    }

}

export default ClientRegistration;