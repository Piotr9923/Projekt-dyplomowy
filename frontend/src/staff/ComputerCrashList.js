import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import ComputerCrashListElement from './ComputerCrashListElement'

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

        this.deleteStaff = this.deleteStaff.bind(this);
        
        this.state = {
            isLoading: true,
            staff:[],
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
                staff: data
            })
        })
        .catch(error=>{
            alert("Wystąpił błąd!")
        })

    }

    deleteStaff(id){

        if(window.confirm("Potwierdzasz usunięcie pracownika?")){
            ApiConnect.deleteMethod("/admin/staff/"+id)
            .then(()=>{
                var index=-1;
                this.state.staff.forEach((element)=>{
                    if(element.id==id){
                        index = this.state.staff.indexOf(element);
                    }
                })
                if(index>=0){
                    this.state.staff.splice(index,1)
                }
                this.forceUpdate();
            })
            .catch(error=>{
                alert("Wystąpił błąd!")
            })
        }


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
                            {this.state.staff.map(staff=><ComputerCrashListElement info={staff} deleteStaff={this.deleteStaff}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>    
                </div>
        )
    }

    render() {
        
        var table = <this.ComputerCrashTable/>
        if(this.state.isLoading){
            table = <div class="centered"><CircularProgress/></div>
        }
        return(
            <div>
                
                
                <StaffHeader/>
                <div>
                    Lista awarii:
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Link style={{color:'green'}} to="/staff/crash-list/add"><AddCircleOutlineIcon color='black' fontSize='large'/></Link>
                    </div>
                        {table}
                    </div>
                </div>
        )
    }

}

export default ComputerCrashList;