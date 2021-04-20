import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../public/ApiConnect';
import AdminHeader from './AdminHeader';
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
import AnnouncementListElement from './AnnouncementListElement';
import '../App.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


class AnnouncementList extends Component{
    constructor(props) {
        super(props);

        this.deleteAnnouncement = this.deleteAnnouncement.bind(this);
        
        this.state = {
            isLoading: true,
            announcement:[],
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/admin/announcement";
        
        ApiConnect.getMethod(url)
        .then(response=>response.json())
        .then(data=>{
            console.log("TEST");
            this.setState({
                isLoading: false,
                announcement: data
            })
        })
        .catch(error=>{
            alert("Wystąpił błąd!")
        })
    }

    deleteAnnouncement(id){

        if(window.confirm("Potwierdzasz usunięcie ogłoszenia?")){
            ApiConnect.deleteMethod("/admin/announcement/"+id)
            .then(()=>{
                var index=-1;
                this.state.announcement.forEach((element)=>{
                    if(element.id==id){
                        index = this.state.announcement.indexOf(element);
                    }
                })
                if(index>=0){
                    this.state.announcement.splice(index,1)
                }                
                this.forceUpdate();
            })
            .catch(error=>{
                alert(error)
            })
        }
    }

    AnnouncementTable=()=>{

        return(
            <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Data</TableCell>
                            <TableCell align="left">Tytuł ogłoszenia </TableCell>
                            <TableCell align="left">Odbiorcy </TableCell>
                            <TableCell align="left">Wyświetl ogłoszenie </TableCell>
                            <TableCell align="left">Usuń</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.announcement.map(announcement=><AnnouncementListElement info={announcement} deleteAnnouncement={this.deleteAnnouncement}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
                
            </div>

        )
    }


    render() {

        var table = <this.AnnouncementTable/>

        if(this.state.isLoading){
            table = <div class="centered"><CircularProgress/></div>
        }
     
        return(
            <div>
                
                <AdminHeader/>

                <div>

                    <div style={{display:"flex","justify-content":"center","position":"relative"}}>
                        <h2 style={{"text-align":"center"}}>Lista ogłoszeń:</h2>
                        <Link style={{position:"absolute", "right":"0",color:'green'}} to="/admin/announcement-list/add"><AddCircleOutlineIcon color='black' fontSize='large'/></Link>
                    </div>

                    {table}
                </div>
                
            </div>
        )
        

    }

}

export default AnnouncementList;