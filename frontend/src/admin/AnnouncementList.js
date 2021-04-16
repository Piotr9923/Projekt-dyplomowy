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
    TableSortLabel
  } from "@material-ui/core";
import AnnouncementListElement from './AnnouncementListElement';

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

    render() {

        if(this.state.isLoading){
            return "Trwa ładowanie";
        }
        else{
            return(
                <div>
                    
                    <AdminHeader/>

                    <div>
                        Lista ogłoszeń:
                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Link to="/admin/announcement-list/add">Utwórz nowe ogłoszenie</Link>
                        </div>
                    </div>
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
                </div>
            )
        }

    }

}

export default AnnouncementList;