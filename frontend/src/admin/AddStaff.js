import { Button, Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';

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
            alert("Hasła nie są takie same!");
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

                    throw new Error("Pomyślnie utworzono pracownika!")
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


    render() {
        
       if(this.state.redirect){
            return <Redirect to="/admin/staff-list"/>
        }
        else{
            
            return(
                <div>
                    <AdminHeader/>

                    <form onSubmit={this.add}>
                    <h2>Dane osobowe:</h2><br/>
                    Imię: <input type="text" defaultValue={this.state.firstname} onChange={this.changeFirstname}/><br/>
                    Nazwisko: <input type="text" defaultValue={this.state.lastname} onChange={this.changeLastname}/><br/>
                    Numer telefonu: <input type="text" defaultValue={this.state.phoneNumber} onChange={this.changePhoneNumber}/><br/>
                    Email: <input type="text" defaultValue={this.state.email} onChange={this.changeEmail}/><br/>
                    Wysokość wynagrodzenia: <input type="text" defaultValue={this.state.salary} onChange={this.changeSalary}/><br/>
                    <h2>Dane użytkownika:</h2><br/>
                    Nazwa użytkownika: <input type="text" defaultValue={this.state.username} onChange={this.changeUsername}/><br/>
                    Hasło: <input type="password" onChange={this.changePassword}/><br/>
                    Podaj ponownie hasło: <input type="password" onChange={this.changePassword2}/><br/>

                    <button type="button" onClick={(e)=>{this.setState({redirect:true})}}>Anuluj</button>
                    <button type="submit">Utwórz</button>
                </form>
                </div>
            )
        }

    }

}

export default AddStaff;