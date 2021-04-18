import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class StaffHeader extends Component{
    
    render(){

        var chooseMode = "";
      
        if(JSON.parse(localStorage.getItem("roles")).length>1){
            chooseMode =  <Nav.Link href="/dashboard" style={{color:"white","margin-right":"50px"}}>Zmień tryb</Nav.Link>
        } 
        
        return(

            <>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href="/staff" style={{color:"white","margin-right":"50px"}}>Strona główna</Nav.Link>
                            <Nav.Link href="/staff/crash-list" style={{color:"white","margin-right":"50px"}}>Lista awarii</Nav.Link>
                            <Nav.Link href="/staff/crash-list/add" style={{color:"white","margin-right":"50px"}}>Dodaj nową awarię</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                        {chooseMode}
                        <Nav.Link href="/logout" style={{color:"white","margin-right":"50px"}}>Wyloguj się</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/><br/><br/><br/>
            </>

        )
    }

}

export default StaffHeader;