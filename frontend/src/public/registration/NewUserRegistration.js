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
        this.isSubmit = this.isSubmit.bind(this)

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

    isSubmit(e){
        if(e.keyCode===13) this.registration()
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


                Imię: <input type="text" onChange={this.changeFirstname} onKeyDown={this.isSubmit}/><br/>
                Nazwisko: <input type="text" onChange={this.changeLastname} onKeyDown={this.isSubmit}/><br/>
                Numer telefonu: <input type="text" onChange={this.changePhoneNumber} onKeyDown={this.isSubmit}/><br/>
                Email: <input type="text" onChange={this.changeEmail} onKeyDown={this.isSubmit}/><br/>
                Nazwa użytkownika: <input type="text" onChange={this.changeUsername} onKeyDown={this.isSubmit}/><br/>
                Hasło: <input type="password" onChange={this.changePassword} onKeyDown={this.isSubmit}/><br/>
                Podaj ponownie hasło: <input type="password" onChange={this.changePassword2} onKeyDown={this.isSubmit}/><br/>

                <button onClick={this.registration}>Zarejestruj się</button>

            </div>
        )
    }
}

export default NewUserRegistration;