import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
import StaffListElement from './StaffListElement';
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

class StaffList extends Component{
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
        var url = "/admin/staff";
        
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

    StaffTable=()=>{
        return(
 
                <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nazwisko i imię</TableCell>
                                <TableCell align="left">Numer telefonu </TableCell>
                                <TableCell align="left">Szczegóły </TableCell>
                                <TableCell align="left">Edytuj konto </TableCell>
                                <TableCell align="left">Usuń konto </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.staff.map(staff=><StaffListElement info={staff} deleteStaff={this.deleteStaff}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>    
                </div>
        )
    }

    render() {
        
        var table = <this.StaffTable/>
        if(this.state.isLoading){
            table = <CircularProgress/>
        }
        return(
            <div>
                
                <AdminHeader/>
                <div>
                    Lista pracowników serwisu:
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Link to="/admin/staff-list/add">Utwórz pracownika</Link>
                    </div>
                        {table}
                    </div>
                </div>
        )
    }

}

export default StaffList;