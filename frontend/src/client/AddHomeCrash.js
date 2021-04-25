import {Checkbox } from '@material-ui/core';
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../App.css';
import ClientHeader from './ClientHeader';

class AddHomeCrash extends Component{
    constructor(props) {
        super(props);

        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changeCode = this.changeCode.bind(this);

        this.add = this.add.bind(this);

        this.state = {
            title:"Naprawa gwarancyjna",
            description: "",
            street:"",
            code:"",
            city:"",
            areErrors: false,
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

    changeCity(e){
        this.setState({
            city: e.target.value
        })
    }
    changeStreet(e){
        this.setState({
            street: e.target.value
        })
    }
    changeCode(e){
        this.setState({
            code: e.target.value
        })
    }
    
    createData(){
      
        return JSON.stringify({
            'title': this.state.title,
            'description': this.state.description,
            'street': this.state.street,
            'code': this.state.code,
            'city': this.state.city
        })

    }
        

    add(e){
        e.preventDefault()
        if(this.state.isNewClient==false && this.state.clientId<0){
            alert("Musisz wybrać klienta z listy!");
        }
        else{
            var body = this.createData();

            ApiConnect.postMethod("/client/home_crash",body)
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

    AddressForm=()=>{
        return(
            <Form onSubmit={this.add}>
                <Form.Row>
                    <Form.Group controlId="addhome.street" style={{"width":"50%"}}>
                        <Form.Label>Ulica i numer domu</Form.Label>
                        <Form.Control onChange={this.changeStreet}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Form.Col} style={{"padding-right":"20px","width":"20%"}} controlId="addhome.code">
                        <Form.Label>Kod</Form.Label>
                        <Form.Control onChange={this.changeCode}/>
                    </Form.Group>

                    <Form.Group as={Form.Col} style={{"width":"30%"}} controlId="addhome.city">
                        <Form.Label>Miejscowość</Form.Label>
                        <Form.Control onChange={this.changeCity}/>
                    </Form.Group>
                </Form.Row>

            </Form>
        )
    }


    render() {

        var crashTypeInputField = "";

        if(this.state.anotherType){
            crashTypeInputField =  <Form.Group>
            <Form.Label>Wpisz nazwę awarii</Form.Label><Form.Control onChange={this.changeTitle}/></Form.Group>
        }
        
       if(this.state.redirect){
            return <Redirect to="/client/crash-list"/>
        }
        else{
            
            return(
                <div>
                    <ClientHeader/>

                    <div>

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


                        <div style={{width:"50%", display:"inline-block", 'padding-left':'60px','padding-right':'60px',"vertical-align":"top"}}>
                            
                            <this.AddressForm/>
                            
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

export default AddHomeCrash;