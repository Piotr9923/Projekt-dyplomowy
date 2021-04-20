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
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThreeSixty } from '@material-ui/icons';


class ClientList extends Component{
    constructor(props) {
        super(props);

        this.chooseClient = this.chooseClient.bind(this);
        
        this.state = {
            isLoading: true,
            client:[],
            filteredData:[],
            filterClient:"",
            filterPhoneNumber:"",
            filterEmail:""
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
                client: data,
                filteredData: data
            })
        })
        .catch(error=>{
            alert("Wystąpił błąd!")
        })
    }

    chooseClient(clientData){
        this.props.selectClient(clientData);
    }

    filter=(e)=>{
        e.preventDefault()
        var filtered = [];
    
        this.state.client.map((client)=>{

            if(client.lastname.toUpperCase().includes(this.state.filterClient.toUpperCase()) || client.firstname.toUpperCase().includes(this.state.filterClient.toUpperCase())){
                if(client.phoneNumber.includes(this.state.filterPhoneNumber)){
                    if(client.email.toUpperCase().includes(this.state.filterEmail.toUpperCase())){
                        filtered.push(client);
                    }
                }
            }
        })

        this.setState({
            filteredData:filtered
        })
    }

    FilterPanel=()=>{

        return (
            <div className="centered" style={{backgroundColor:"#D3D3D3",width:"550px"}} >
                <form onSubmit={this.filter}>
                    <input placeholder="Imię i nazwisko" style={{'margin-left':"6px",'margin-right':"10px", width:"30%"}} onChange={(e)=>{this.setState({filterClient:e.target.value})}}></input>
                    <input placeholder="Numer telefonu" style={{'margin-right':"10px", width:"25%"}} onChange={(e)=>{this.setState({filterPhoneNumber:e.target.value})}}></input>
                    <input placeholder="Adres e-mail" style={{'margin-right':"10px", width:"25%"}} onChange={(e)=>{this.setState({filterEmail:e.target.value})}}></input>
                    <Button type="submit" variant="dark">Filtruj</Button>
                </form>
            </div>

        )
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
                            {this.state.filteredData.map(client=><ClientListElement info={client} chooseClient={this.chooseClient}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
                
            </div>

        )
    }


    render() {
        var filterPanel = <this.FilterPanel/>
        var table = <this.ClietTable/>

        if(this.state.isLoading){
            filterPanel = ""
            table = <div class="centered" style={{height:"350px", width:"550px"}}><CircularProgress/></div>
        }
     
        return(
            <div>
                    {filterPanel}
                    {table}

            </div>
        )
        

    }

}

export default ClientList;