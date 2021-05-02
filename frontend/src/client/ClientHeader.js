import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ClientHeader extends Component{
    
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
                            <Nav.Link href="/client" style={{color:"white","margin-right":"50px"}}>Strona główna</Nav.Link>
                            <Nav.Link href="/client/crash-list" style={{color:"white","margin-right":"50px"}}>Moje awarie</Nav.Link>
                            <Nav.Link href="/client/crash-list/add" style={{color:"white","margin-right":"50px"}}>Zgłoś awarię domową</Nav.Link>
                            <Nav.Link href="/client/contact" style={{color:"white","margin-right":"50px"}}>Kontakt</Nav.Link>

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

export default ClientHeader;