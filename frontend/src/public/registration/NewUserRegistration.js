import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../ApiConnect';
import PublicHeader from '../PublicHeader';

class NewUserRegistration extends Component{


    constructor(props) {
        super(props);

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.registration = this.registration.bind(this);

        this.state = {
            username:"",
            password:"",
            password2:"",
            email: "",
            phoneNumber: "",
            firstname:"",
            lastname: "",
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

    changePhoneNumber(e){
        this.setState({
            phoneNumber: e.target.value
        })
    }
    changeFirstname(e){
        this.setState({
            firstname: e.target.value
        })
    }
    changeLastname(e){
        this.setState({
            lastname: e.target.value
        })
    }

    registration(e){
        e.preventDefault()

        if(this.state.password!=this.state.password2){
            alert("Hasła nie są takie same!");
        }
        else{
            var body = JSON.stringify({
                'username':this.state.username,
                'password': this.state.password,
                'email': this.state.email,
                'phoneNumber':this.state.phoneNumber,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname
            })


            ApiConnect.postMethod("/signup",body)
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
                if(error.message.includes("NetworkError")){
                    alert("Wystąpił błąd! Spróbuj ponownie później!");
                }
                else{
                    alert(error.message);
                }
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
                <PublicHeader />
                
                <h2>Zarejestruj się:</h2>

                <form onSubmit={this.registration}>

                    Imię: <input type="text" onChange={this.changeFirstname}/><br/>
                    Nazwisko: <input type="text" onChange={this.changeLastname}/><br/>
                    Numer telefonu: <input type="text" onChange={this.changePhoneNumber}/><br/>
                    Email: <input type="text" onChange={this.changeEmail}/><br/>
                    Nazwa użytkownika: <input type="text" onChange={this.changeUsername}/><br/>
                    Hasło: <input type="password" onChange={this.changePassword}/><br/>
                    Podaj ponownie hasło: <input type="password" onChange={this.changePassword2}/><br/>

                    <button type="submit">Zarejestruj się</button>
                </form>

            </div>
        )
    }
}

export default NewUserRegistration;