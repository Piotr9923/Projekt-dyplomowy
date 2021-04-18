import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../ApiConnect';
import PublicHeader from '../PublicHeader';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        e.preventDefault()

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

                <Form className='center' style={{width:"20%",margin:"auto"}} onSubmit={this.registration}>
                        <Form.Group controlId="registration.mail">
                            <Form.Label>Adres e-mail podany w serwisie</Form.Label>
                            <Form.Control onChange={this.changeEmail}/>
                        </Form.Group>

                        <Form.Group controlId="registration.username">
                            <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control onChange={this.changeUsername}/>
                        </Form.Group>

                        <Form.Group controlId="registration.password">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" onChange={this.changePassword}/>
                        </Form.Group>

                        <Form.Group controlId="registration.password2">
                            <Form.Label>Podaj ponownie hasło</Form.Label>
                            <Form.Control type="password" onChange={this.changePassword2}/>
                        </Form.Group>
                        
                        <div style={{width:'50%', margin:'auto'}}>
                            <Button variant="success" type="submit">Zarejestruj się</Button>
                        </div>
                    </Form>
            </div>
        )
    }

}

export default ClientRegistration;