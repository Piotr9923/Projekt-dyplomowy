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
                            <Nav.Link href="/">Strona główna</Nav.Link>
                            <Nav.Link href="/login">Zaloguj się</Nav.Link>
                            <Nav.Link href="/registration">Zarejestruj się</Nav.Link>
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