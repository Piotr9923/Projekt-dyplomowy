import { Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import {
    CircularProgress
  } from "@material-ui/core";
import '../App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class EditStaff extends Component{
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
        this.edit = this.edit.bind(this);

        this.state = {
            isLoading: true,
            notFound: false,
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
            editUserData: false
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
            salary: e.target.value
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
        var body = "";
        if(this.state.editUserData){
            var body = JSON.stringify({
                'username':this.state.username,
                'password': this.state.password,
                'email': this.state.email,
                'phoneNumber':this.state.phoneNumber,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'salary': this.state.salary
            })
        }
        else{
            var body = JSON.stringify({
                'email': this.state.email,
                'phoneNumber':this.state.phoneNumber,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'salary': this.state.salary
            })
        }
        return body;
    }

    edit(e){
        e.preventDefault()

        if(this.state.editUserData && this.state.password!=this.state.password2){
            alert("Hasła nie są takie same!");
        }
        else{
            
            var body = this.createData();
            
            ApiConnect.putMethod("/admin/staff/"+this.props.match.params.id,body)
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

                    throw new Error("Zmiany zapisano!")
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



    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/admin/staff/"+this.props.match.params.id;

        ApiConnect.getMethod(url).
        then(response => {
            if(response.status==404){
                throw Error("404");
            }
            return response.json()
        }).
        then(data => this.setState({
            firstname: data.firstname,
            lastname:data.lastname,
            phoneNumber:data.phoneNumber,
            email:data.email,
            salary:data.salary,
            username:data.username, 
            isLoading: false}))
        .catch(error=>{
            if(error.message=="404"){
                this.setState({notFound:true})
                this.forceUpdate();
            }
            else{
                alert(error);
            }
        });
    }

    render() {

        if(this.state.notFound){
            return(<div><AdminHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie znaleziono takiego pracownika</h2></div>)
        }
        else if(this.state.isLoading){
            return(<div><AdminHeader/><div class="centered"><CircularProgress/></div></div>)
        }else if(this.state.redirect){
            return <Redirect to="/admin/staff-list"/>
        }
        else{
            var editUserData=""
            if(this.state.editUserData){
                editUserData =<Form className='center' style={{width:"50%"}} onSubmit={this.add}>
                <h2>Dane użytkownika:</h2>  
                <Form.Group controlId="addStaff.firstname">
                    <Form.Label>Nazwa użytkownika</Form.Label>
                    <Form.Control defaultValue={this.state.username} onChange={this.changeUsername}/>
                </Form.Group>
                <Form.Group controlId="addStaff.lastname">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" onChange={this.changePassword}/>
                </Form.Group>

                <Form.Group controlId="addStaff.phone">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control type="password" onChange={this.changePassword2}/>
                </Form.Group>

            </Form>
            }
            return(
                <div>
                    <AdminHeader/>

                    <div style={{width:"50%",margin:"auto", display:"inline-block", 'padding-left':'20px','padding-right':'20px'}}>
                        <Form className='center' style={{width:"50%",margin:"auto"}} onSubmit={this.edit}>
                        <h2>Dane osobowe:</h2>  
                        <Form.Group controlId="addStaff.firstname">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control defaultValue={this.state.firstname} onChange={this.changeFirstname}/>
                        </Form.Group>
                        <Form.Group controlId="addStaff.lastname">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control defaultValue={this.state.lastname} onChange={this.changeLastname}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.phone">
                            <Form.Label>Numer telefonu</Form.Label>
                            <Form.Control defaultValue={this.state.phoneNumber} onChange={this.changePhoneNumber}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.mail">
                            <Form.Label>Adres e-mail</Form.Label>
                            <Form.Control defaultValue={this.state.email} onChange={this.changeEmail}/>
                        </Form.Group>

                        <Form.Group controlId="addStaff.salart">
                            <Form.Label>Wysokość wynagrodzenia</Form.Label>
                            <Form.Control defaultValue={this.state.salary} onChange={this.changeSalary}/>
                        </Form.Group>
                        </Form>
                    </div>

                    <div style={{width:"50%", display:"inline-block", margin:"auto", 'padding-left':'20px','padding-right':'20px',"vertical-align":"top"}}>
                    <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Edytuj dane użytkownika"
                            onChange={(e)=>{this.setState({editUserData: !this.state.editUserData})}}
                        />
                    {editUserData}
                    </div>
                    <div className="centered">
                        <Button variant="danger" onClick={(e)=>{this.setState({redirect:true})}} style={{'margin-right':"30px"}}>Anuluj</Button>
                        <Button variant="success" onClick={this.edit}>Zapisz</Button>
                    </div>
                </div>
            )
        }

    }

}

export default EditStaff;