import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PublicHeader extends Component{
    
    render(){

        return(

            <>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href="/" style={{color:"white","margin-right":"50px"}}>Strona główna</Nav.Link>
                            <Nav.Link href="/login" style={{color:"white","margin-right":"50px"}}>Zaloguj się</Nav.Link>
                            <Nav.Link href="/registration" style={{color:"white","margin-right":"50px"}}>Zarejestruj się</Nav.Link>
                            <Nav.Link href="/contact" style={{color:"white","margin-right":"50px"}}>Kontakt</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/><br/><br/><br/>
            </>

        )
    }

}

export default PublicHeader;