import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../ApiConnect';
import PublicHeader from '../PublicHeader';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';


class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.changeUsername = this.changeUsername.bind(this);
        this.changePasswrod = this.changePasswrod.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username:"",
            password:"",
            areErrors: false,
        };
    }
    
    changeUsername(e){
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
        e.preventDefault()
        
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
    
    render(){
        
        if(localStorage.getItem("token")){
            return <Redirect to="/dashboard"/>
        }
        else{
            return(
                <div>
                    <PublicHeader />

                    <Form className='center' style={{width:"20%",margin:"auto"}} onSubmit={this.login}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control onChange={this.changeUsername}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" onChange={this.changePasswrod}/>
                        </Form.Group>
                        
                        <div style={{width:'40%', margin:'auto'}}>
                            <Button variant="success" type="submit">Zaloguj się</Button>
                        </div>
                    </Form>
                </div>
            )
        }
    }

}

export default LoginPage;