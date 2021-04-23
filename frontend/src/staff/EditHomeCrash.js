import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
import '../App.css';
import Form from 'react-bootstrap/Form'
import StaffHeader from './StaffHeader';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'


class EditHomeCrash extends Component{
    constructor(props) {
        super(props);

        this.changeStatus = this.changeStatus.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCost = this.changeCost.bind(this);
        this.changeCrashMessage = this.changeCrashMessage.bind(this);

        this.edit = this.edit.bind(this);

        this.state = {
            isLoading: true,
            notFound: false,
            status:"",
            title:"",
            description:"",
            cost: -1,
            crashMessage: "",
            areErrors: false,
            errors: [],
            redirect: false,
            editDetails: false,
            editCost: false
        };
    }

    changeStatus(e){
        this.setState({
            status: e.target.value
        })
        if(e.target.value == "Zakończona"){
            this.setState({
                editCost: true
            })
        }
        else{
            this.setState({
                editCost: false,
                cost:0
            })
        }
    }


    changeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    changeCost(e){
        var editedCost = parseFloat(e.target.value.replace(",","."));

        if(e.target.value.trim()==""){
            editedCost=-1;
        }

        this.setState({
            cost: editedCost
        })
    }


    changeCrashMessage(e){
        this.setState({
            crashMessage: e.target.value
        })
    }
    
    createData(){
        var body = "";
        if(this.state.editDetails){
            var body = JSON.stringify({
                'status':this.state.status,
                'description': this.state.description,
                'cost': this.state.cost,
                'crashMessage':this.state.crashMessage
            })
        }
        else{
            var body = JSON.stringify({
                'status':this.state.status,
                'cost': this.state.cost,
                'crashMessage':this.state.crashMessage
            })
        }
        return body;
    }

    edit(e){
        e.preventDefault()

        var body = this.createData();
        
        ApiConnect.putMethod("/staff/home_crash/"+this.props.match.params.id,body)
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


    detailsForm=()=>{
        return(
        <Form onSubmit={this.add}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Opis awarii</Form.Label>
                <Form.Control defaultValue={this.state.description} as="textarea" rows={3} onChange={this.changeDescription}/>
            </Form.Group>
        </Form>
        )
    }


    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/staff/home_crash/"+this.props.match.params.id;

        ApiConnect.getMethod(url).
        then(response => {
            if(response.status==404){
                throw Error("404");
            }
            return response.json()
        }).
        then(data => {this.setState({
            title: data.title,
            status:data.status,
            description:data.description,
            cost:data.cost,
            crashMessage:data.crashMessage,
            isLoading: false});        
        
        }).then(()=>{
            if(this.state.status == "Zakończona"){
            this.setState({
                editCost: true
            })
        }})
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
            return(<div><StaffHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie znaleziono takiej awarii</h2></div>)
        }
        else if(this.state.isLoading){
            return(<div><StaffHeader/><div class="centered"><CircularProgress/></div></div>)
        }else if(this.state.redirect){
            return <Redirect to="/staff/crash-list"/>
        }
        else{
            var editDetails = "";

            var editCost = "";

            if(this.state.editDetails){
                editDetails = <this.detailsForm/>
            }
            
            if(this.state.editCost){
                editCost = <div style={{display:"inline-block"}}><Form.Group>
                <Form.Label>Koszt naprawy</Form.Label><Form.Control style={{width:"110px"}} defaultValue={this.state.cost} onChange={this.changeCost}/></Form.Group></div>
            }

            return(
                <div>
                    <StaffHeader/>

                    <div style={{width:"50%",margin:"auto", display:"inline-block", 'padding-left':'60px','padding-right':'60px'}}>
                        <Form  onSubmit={this.add}>
                            <div style={{display:"inline-block", "padding-right":"30px"}}>
                            <Form.Group >
                                <Form.Label>Status awarii</Form.Label>
                                <Form.Control  defaultValue={this.state.status} as="select" onChange={this.changeStatus}>
                                    <option>Zgłoszona</option>
                                    <option>W trakcie naprawy</option>
                                    <option>Zakończona</option>
                                </Form.Control>

                            </Form.Group>
                            </div>
                            {editCost}

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Informacja dla klienta</Form.Label>
                                <Form.Control defaultValue={this.state.crashMessage} as="textarea" rows={3} onChange={this.changeCrashMessage}/>
                            </Form.Group>
                        </Form>
                    </div>

                    <div style={{width:"50%", display:"inline-block", 'padding-left':'60px','padding-right':'60px'}}>
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Edytuj opis awarii"
                            onChange={(e)=>{this.setState({editDetails: !this.state.editDetails})}}
                        />

                        {editDetails}
                        
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

export default EditHomeCrash;