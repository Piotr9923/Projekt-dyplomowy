import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AdminHeader extends Component{
    
    render(){

        var chooseMode = "";
      
        if(JSON.parse(localStorage.getItem("roles")).length>1){
            chooseMode =  <Nav.Link href="/dashboard">Zmień tryb</Nav.Link>
        } 
        
        return(

            <>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href="/admin">Strona główna</Nav.Link>
                            <Nav.Link href="/admin/staff-list">Zarządzaj pracownikami</Nav.Link>
                            <Nav.Link href="/admin/announcement-list">Zarządzaj ogłoszeniami</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                        {chooseMode}
                        <Nav.Link href="/logout">Wyloguj się</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/><br/><br/><br/>
            </>

        )
    }

}

export default AdminHeader;