import React, {Component} from 'react'
import ApiConnect from '../public/ApiConnect';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    TableSortLabel
  } from "@material-ui/core";
import '../App.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClientListElement from './ClientListElement'

class ClientList extends Component{
    constructor(props) {
        super(props);

        this.chooseClient = this.chooseClient.bind(this);
        
        this.state = {
            isLoading: true,
            client:[]
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/staff/client";
        
        ApiConnect.getMethod(url)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                isLoading: false,
                client: data
            })
        })
        .catch(error=>{
            alert("Wystąpił błąd!")
        })
    }

    chooseClient(clientData){
        this.props.selectClient(clientData);
    }


    ClietTable=()=>{

        return(
            <div>
            <Paper style={{height:"350px", width:"550px", overflow: 'auto'}}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nazwisko i imię</TableCell>
                                <TableCell align="center">Numer telefonu </TableCell>
                                <TableCell align="center">Adres e-mail </TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.client.map(client=><ClientListElement info={client} chooseClient={this.chooseClient}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
                
            </div>

        )
    }


    render() {

        var table = <this.ClietTable/>

        if(this.state.isLoading){
            table = <div class="centered"><CircularProgress/></div>
        }
     
        return(
            <div>
                
                    {table}

            </div>
        )
        

    }

}

export default ClientList;