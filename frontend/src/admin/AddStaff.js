import {Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class AddStaff extends Component{
    constructor(props) {
        super(props);

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeSalary = this.changeSalary.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.add = this.add.bind(this);

        this.state = {
            isLoading: true,
            username:"",
            password:"",
            password2:"",
            email: "",
            phoneNumber: "",
            salary:"",
            firstname:"",
            lastname: "",
            areErrors: false,
            errors: [],
            redirect: false,
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

    changeSalary(e){
        this.setState({
            salary: parseInt(e.target.value)
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
    
    createData(){
      
            return JSON.stringify({
                'username':this.state.username,
                'password': this.state.password,
                'email': this.state.email,
                'phoneNumber':this.state.phoneNumber,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'salary': this.state.salary
            })
        }
        

    add(e){
        e.preventDefault()

        if(this.state.password!=this.state.password2){
            alert("Has??a nie s?? takie same!");
        }
        else{
            
            var body = this.createData();
            
            ApiConnect.postMethod("/admin/staff",body)
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
                    this.forceUpdate()

                    throw new Error("Pomy??lnie utworzono pracownika!")
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
                    alert("Wyst??pi?? b????d! Spr??buj ponownie p????niej!");
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


    render() {
        
       if(this.state.redirect){
            return <Redirect to="/admin/staff-list"/>
        }
        else{
            
            return(
                <div>
                    <AdminHeader/>

                    <div style={{width:"50%",margin:"auto", display:"inline-block", 'padding-left':'20px','padding-right':'20px'}}>
                        <Form className='center' style={{width:"50%",margin:"auto"}} onSubmit={this.add}>
                        <h2>Dane osobowe:</h2>  
                        <Form.Group controlId="addStaff.firstname">
                            <Form.Label>Imi??</Form.Label>
                            <Form.Control onChange={this.changeFirstname}/>
                        </Form.Group>
                        <Form.Group controlId="addStaff.lastname">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control onChange={this.changeLastname}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.phone">
                            <Form.Label>Numer telefonu</Form.Label>
                            <Form.Control onChange={this.changePhoneNumber}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.mail">
                            <Form.Label>Adres e-mail</Form.Label>
                            <Form.Control onChange={this.changeEmail}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.salart">
                            <Form.Label>Wysoko???? wynagrodzenia</Form.Label>
                            <Form.Control onChange={this.changeSalary}/>
                        </Form.Group>
                        </Form>
                    </div>

                    <div style={{width:"50%", display:"inline-block", 'padding-left':'20px','padding-right':'20px',"vertical-align":"top"}}>
                    <Form className='center' style={{width:"50%",margin:"auto"}} onSubmit={this.add}>
                        <h2>Dane u??ytkownika:</h2>  
                        <Form.Group controlId="addStaff.firstname">
                            <Form.Label>Nazwa u??ytkownika</Form.Label>
                            <Form.Control onChange={this.changeUsername}/>
                        </Form.Group>
                        <Form.Group controlId="addStaff.lastname">
                            <Form.Label>Has??o</Form.Label>
                            <Form.Control type="password" onChange={this.changePassword}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.phone">
                            <Form.Label>Powt??rz has??o</Form.Label>
                            <Form.Control type="password" onChange={this.changePassword2}/>
                        </Form.Group>

                    </Form>
                    </div>
                    <div className="centered">
                        <Button variant="danger" onClick={(e)=>{this.setState({redirect:true})}} style={{'margin-right':"30px"}}>Anuluj</Button>
                        <Button variant="success" onClick={this.add}>Utw??rz</Button>
                    </div>
                </div>
            )

        }

    }

}

export default AddStaff;