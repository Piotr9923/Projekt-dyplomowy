import {Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddAnnouncement extends Component{
    constructor(props) {
        super(props);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeStaff = this.changeStaff.bind(this);
        this.changeClient = this.changeClient.bind(this);


        this.add = this.add.bind(this);

        this.state = {
            title:"",
            text: "",
            roles:[],
            areErrors: false,
            errors: [],
            redirect: false,
        };
    }

    changeTitle(e){
        console.log(this.state.roles)
        this.setState({
            title: e.target.value
        })
    }

    changeText(e){
        this.setState({
            text: e.target.value
        })
    }

    changeStaff(e){

        var rolesList = this.state.roles

        if(rolesList.includes("STAFF")){
            var index = rolesList.indexOf("STAFF");
            if (index !== -1) {
                rolesList.splice(index, 1);
            }
            this.setState({
                roles:rolesList
            })
        }
        else {
            rolesList.push("STAFF")
            this.setState({
                roles:rolesList
            })
        }
    }
    
    changeClient(e){
        var rolesList = this.state.roles

        if(rolesList.includes("CLIENT")){
            var index = rolesList.indexOf("CLIENT");
            if (index !== -1) {
                rolesList.splice(index, 1);
            }
            this.setState({
                roles:rolesList
            })
        }
        else {
            rolesList.push("CLIENT")
            this.setState({
                roles:rolesList
            })
        }
    }
    
    createData(){
      
            return JSON.stringify({
                'title': this.state.title,
                'text': this.state.text,
                'roles': this.state.roles
            })
        }
        

    add(e){
        e.preventDefault()

        if(this.state.roles.length==0){
            alert("Musisz wybrać adresatów ogłoszenia!")
        }
        else{

            var body = this.createData();
            console.log(body)
            ApiConnect.postMethod("/admin/announcement",body)
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

                    throw new Error("Pomyślnie utworzono ogłoszenie!")
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
            return <Redirect to="/admin/announcement-list"/>
        }
        else{
            
            return(
                <div>
                    <AdminHeader/>
                
                    <Form className='center' style={{width:"50%",margin:"auto"}} onSubmit={this.add}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Tytuł ogłoszenia</Form.Label>
                            <Form.Control onChange={this.changeTitle}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Treść ogłoszenia</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={this.changeText}/>
                        </Form.Group>
                        Odbiorcy ogłoszenia:<br/>
                        <Form.Check inline label="Klienci" type="checkbox" onChange={this.changeClient}/><br/>
                        <Form.Check inline label="Pracownicy" type="checkbox" onChange={this.changeStaff}/>
                        <br/>
                        <div style={{float: 'right'}}>
                            <Button variant="danger" onClick={(e)=>{this.setState({redirect:true})}} style={{'margin-right':"30px"}}>Anuluj</Button>
                            <Button variant="success" type="submit">Utwórz</Button>
                        </div>
                    </Form>

                </div>
            )
        }

    }

}

export default AddAnnouncement;