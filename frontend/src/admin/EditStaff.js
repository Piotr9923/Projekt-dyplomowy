import { Button, Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';

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
            return(<div><AdminHeader/><br/>Nie znaleziono takiego pracownika</div>)
        }
        else if(this.state.isLoading){
            return "Trwa ładowanie"
        }else if(this.state.redirect){
            return <Redirect to="/admin/staff-list"/>
        }
        else{
            var editUserData=""
            if(this.state.editUserData){
                editUserData =<div>Nazwa użytkownika: <input type="text" defaultValue={this.state.username} onChange={this.changeUsername}/><br/>
                Hasło: <input type="password" onChange={this.changePassword}/><br/>
                Podaj ponownie hasło: <input type="password" onChange={this.changePassword2}/><br/></div>

            }
            return(
                <div>
                    <AdminHeader/>

                    <form onSubmit={this.edit}>

                    Imię: <input type="text" defaultValue={this.state.firstname} onChange={this.changeFirstname}/><br/>
                    Nazwisko: <input type="text" defaultValue={this.state.lastname} onChange={this.changeLastname}/><br/>
                    Numer telefonu: <input type="text" defaultValue={this.state.phoneNumber} onChange={this.changePhoneNumber}/><br/>
                    Email: <input type="text" defaultValue={this.state.email} onChange={this.changeEmail}/><br/>
                    Wysokość wynagrodzenia: <input type="text" defaultValue={this.state.salary} onChange={this.changeSalary}/><br/>
                    <input name="editUserData" type="checkbox" onChange={(e)=>{this.setState({editUserData: !this.state.editUserData})}}/>
                    <label for="editUserData">Edytuj dane użytkownika</label><br/>
                    {editUserData}
                    <button onClick={(e)=>{this.setState({redirect:true})}}>Anuluj</button>
                    <button type="submit">Zapisz zmiany</button>
                </form>
                </div>
            )
        }

    }

}

export default EditStaff;