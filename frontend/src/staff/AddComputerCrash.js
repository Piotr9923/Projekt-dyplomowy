import {Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import StaffHeader from './StaffHeader';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../App.css';
import ClientList from './ClientList'

class AddComputerCrash extends Component{
    constructor(props) {
        super(props);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.chooseClient = this.chooseClient.bind(this);

        this.add = this.add.bind(this);

        this.state = {
            title:"Naprawa gwarancyjna",
            description: "",
            isNewClient: true,
            firstname:"",
            lastname:"",
            phoneNumber:"",
            email:"",
            clientId: -1,
            selectedClient:[],
            areErrors: false,
            errors: [],
            redirect: false,
            anotherType: false
        };
    }

    changeTitle(e){
        if(e.target.type=="select-one"){
            this.setState({
                anotherType: false
            })
        }
        
        this.setState({
            title: e.target.value,
        })

        if(e.target.value=="Inne"){
            this.setState({
                title: "",
                anotherType: true
            })
        }
    }

    changeDescription(e){
        this.setState({
            description: e.target.value
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
    
    chooseClient(client){
        this.setState({
            selectedClient: client,
            clientId: client.id
        })
    }
    
    createData(){

        if(this.state.isNewClient){
      
            return JSON.stringify({
                'title': this.state.title,
                'description': this.state.description,
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'phoneNumber': this.state.phoneNumber,
                'email':this.state.email
            })
        }
        else{
      
            return JSON.stringify({
                'title': this.state.title,
                'description': this.state.description,
                "clientId": this.state.selectedClient.id
            })
        }

    }
        

    add(e){
        e.preventDefault()
        if(this.state.isNewClient==false && this.state.clientId<0){
            alert("Musisz wybrać klienta z listy!");
        }
        else{
            var body = this.createData();

            ApiConnect.postMethod("/staff/crash",body)
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

                    throw new Error("Pomyślnie zarejestrowano awarię!")
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

    NewClientForm=()=>{
        return(
            <Form onSubmit={this.add}>
                <Form.Group controlId="registration1.firstname">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control onChange={this.changeFirstname}/>
                </Form.Group>

                <Form.Group controlId="registration1.lastname">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control onChange={this.changeLastname}/>
                </Form.Group>

                <Form.Group controlId="registration1.phoneNumber">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control onChange={this.changePhoneNumber}/>
                </Form.Group>
                
                <Form.Group controlId="registration1.mail">
                    <Form.Label>Adres e-mail</Form.Label>
                    <Form.Control onChange={this.changeEmail}/>
                </Form.Group>

            </Form>
        )
    }


    render() {

        var crashTypeInputField = "";

        if(this.state.anotherType){
            crashTypeInputField =  <Form.Group>
            <Form.Label>Wpisz nazwę awarii</Form.Label><Form.Control onChange={this.changeTitle}/></Form.Group>
        }

        var selectedClient = ""
        if(this.state.selectedClient.id){
            selectedClient = <div>Wybrano klienta: {this.state.selectedClient.lastname}  {this.state.selectedClient.firstname}</div>
        }

        var form = <ClientList selectClient={this.chooseClient}/>

        if(this.state.isNewClient){
            form = <this.NewClientForm/>
            selectedClient = ""
        }
        
       if(this.state.redirect){
            return <Redirect to="/staff/crash-list"/>
        }
        else{
            
            return(
                <div>
                    <StaffHeader/>

                    <div className="centered">

                        <div style={{width:"50%",margin:"auto", display:"inline-block", 'padding-left':'60px','padding-right':'60px'}}>
                            <Form  onSubmit={this.add}>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label>Nazwa awarii</Form.Label>
                                    <Form.Control as="select" onChange={this.changeTitle}>
                                        <option>Naprawa gwarancyjna</option>
                                        <option>Naprawa pogwarancyjna</option>
                                        <option>Wymiana podzespołów</option>
                                        <option>Instalacja oprogramowania</option>
                                        <option>Inne</option>
                                    </Form.Control>
                                    {crashTypeInputField}
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Opis awarii</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={this.changeDescription}/>
                                </Form.Group>
                            </Form>

                        </div>


                        <div style={{width:"50%",margin:"auto", display:"inline-block", 'padding-left':'60px','padding-right':'60px'}}>
                            <ButtonGroup className="centered" aria-label="First group">
                                <Button variant="secondary" onClick={()=>{this.setState({isNewClient:true})}} >Nowy klient</Button>{' '}
                                <Button variant="secondary" onClick={()=>{this.setState({isNewClient:false})}}>Klient posiada konto</Button>{' '}
                            </ButtonGroup>
                            {selectedClient}
                            {form}
                            
                        </div>
                        
                    </div>
                    <br/><br/>
                    <div className="centered">
                        <Button variant="danger" onClick={(e)=>{this.setState({redirect:true})}} style={{'margin-right':"30px"}}>Anuluj</Button>
                        <Button variant="success" onClick={this.add}>Utwórz</Button>
                    </div>
                    
                </div>
            )
        }

    }

}

export default AddComputerCrash;