import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import ComputerCrashListElement from './ComputerCrashListElement'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

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
  import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
  import '../App.css';
import StaffHeader from './StaffHeader';


class ComputerCrashList extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            crash:[],
            filteredData:[],
            filterClient:"",
            filterType:"",
            filterStatus:"",
            filterActive: true,
            error: false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/staff/crash";
        
        ApiConnect.getMethod(url)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                isLoading: false,
                crash: data,
                filteredData: data
            })
        }).then(this.filter)
        .catch(error=>{
            this.setState({
                isLoading: false,
                error:true
            })
        })

    }

    filter=()=>{
        
        var filtered = [];
    
        this.state.crash.map((crash)=>{

            if(this.state.filterActive){
                if(crash.status!="Zakończona"){
                    if(crash.client.toUpperCase().includes(this.state.filterClient.toUpperCase())){
                        if(crash.type.includes(this.state.filterType)){
                            if(crash.status.includes(this.state.filterStatus)){
                                filtered.push(crash);
                            }
                        }
                    }
                }
            }
            else{
                if(crash.client.toUpperCase().includes(this.state.filterClient.toUpperCase())){
                    if(crash.type.includes(this.state.filterType)){
                        if(crash.status.includes(this.state.filterStatus)){
                            filtered.push(crash);
                        }
                    }
                }
            }

        })
        this.setState({
            filteredData:filtered
        })
    }

    changeFilterType=(e)=>{
        if(e.target.value.includes("Wszystkie")){
            this.setState({filterType:""})
        }
        else if(e.target.value.includes("Serwis")){
            this.setState({filterType:"SERVICE"})
        }
        else{
            this.setState({filterType:"HOME"})
        }
    }

    changeFilterStatus=(e)=>{
        if(e.target.value.includes("Wszystkie")){
            this.setState({filterStatus:""})
        }
        else{
            this.setState({filterStatus: e.target.value})
        }

    }

    getFilterOptions=()=>{
        var statusOptions =  <><option>Wszystkie</option>
        <option>Przyjęta</option>
        <option>Zgłoszona</option>
        <option>W trakcie naprawy</option>
        <option>Gotowa do odbioru</option>
        <option>Nie nadaje się do naprawy</option></>;

        if(this.state.filterActive==false){
            statusOptions =  <><option>Wszystkie</option>
            <option>Przyjęta</option>
            <option>Zgłoszona</option>
            <option>W trakcie naprawy</option>
            <option>Gotowa do odbioru</option>
            <option>Nie nadaje się do naprawy</option>
            <option>Zakończona</option></>
        }

        if(this.state.filterType==""){
            return statusOptions;
        }

        if(this.state.filterType.includes("HOME")){
            statusOptions = <><option>Wszystkie</option>
            <option>Zgłoszona</option>
            <option>W trakcie naprawy</option></>

            if(this.state.filterActive==false){
                statusOptions = <><option>Wszystkie</option>
                <option>Zgłoszona</option>
                <option>W trakcie naprawy</option>
                <option>Zakończona</option></>
            }
        }
        else{

            var statusOptions =  <><option>Wszystkie</option>
            <option>Przyjęta</option>
            <option>W trakcie naprawy</option>
            <option>Gotowa do odbioru</option>
            <option>Nie nadaje się do naprawy</option></>;

            if(this.state.filterActive==false){
                statusOptions =  <><option>Wszystkie</option>
                <option>Przyjęta</option>
                <option>W trakcie naprawy</option>
                <option>Gotowa do odbioru</option>
                <option>Nie nadaje się do naprawy</option>
                <option>Zakończona</option></>
            }

        }
        return statusOptions;
    }

    FilterPanel=()=>{
        
        var statusOptions = this.getFilterOptions();
        return (
            <div className="centered" style={{backgroundColor:"#D3D3D3"}}>
                <input placeholder="Dane klienta" style={{'margin-right':"30px"}} onChange={(e)=>{this.setState({filterClient:e.target.value})}}></input>
                {'Typ:'}<Form.Control as="select" style={{width:"13%",'margin-right':"30px"}} onChange={this.changeFilterType}>
                    <option>Wszystkie</option>
                    <option>Serwis</option>
                    <option>Awaria domowa</option>
                </Form.Control>

                {'Status:'}<Form.Control as="select" style={{width:"20%",'margin-right':"30px"}} onChange={this.changeFilterStatus}>
                    {statusOptions}
                </Form.Control>

                <Form.Check inline label="W trakcie naprawy" defaultChecked="true" type="checkbox" style={{'margin-right':"30px"}} onClick={()=>{this.setState({filterActive:!this.state.filterActive})}}/>
                <Button variant="dark" onClick={this.filter} style={{'margin-right':"30px"}}>Filtruj</Button>
            </div>

        )
    }

    ComputerCrashTable=()=>{
        return(
 
                <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Data zgłoszenia</TableCell>
                                <TableCell align="left">Nazwa awarii </TableCell>
                                <TableCell align="left">Klient</TableCell>
                                <TableCell align="left">Typ awarii </TableCell>
                                <TableCell align="left">Status </TableCell>
                                <TableCell align="left"> </TableCell>
                                <TableCell align="left">Edytuj</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.filteredData.map(staff=><ComputerCrashListElement info={staff} deleteStaff={this.deleteStaff}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>    
                </div>
        )
    }

    render() {
        
        var table = <this.ComputerCrashTable/>

        if(this.state.isLoading){
            table =  <div class="centered"><CircularProgress/></div>
        }
        else if(this.state.error){
            table = <h2 className="centered" style={{color:"red"}}>Nie można pobrać listy awarii! Spróbuj ponowanie później!</h2>
        }

        return(
            <div>
                
                <StaffHeader/>
                <div>
                    <this.FilterPanel/><br/>

                    <div style={{display:"flex","justify-content":"center","position":"relative"}}>
                        <h2 style={{"text-align":"center"}}>Lista awarii:</h2>
                        <Link style={{position:"absolute", "right":"0",color:'green'}} to="/staff/crash-list/add"><AddCircleOutlineIcon color='black' fontSize='large'/></Link>
                    </div>
                    {table}
                </div>
                
             </div>
        )
    }

}

export default ComputerCrashList;