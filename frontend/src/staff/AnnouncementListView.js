import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import StaffHeader from './StaffHeader'
import ApiConnect from '../public/ApiConnect';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import Button from 'react-bootstrap/Button'
import '../App.css'


class AnnouncementListView extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            announcement:[],
            page: 0,
            error: false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/staff/announcement";
        
        ApiConnect.getMethod(url)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                isLoading: false,
                announcement: data,
            })
        })
        .catch(error=>{
            this.setState({
                isLoading: false,
                error:true
            })
        })
    }

    
    render() {
        if(this.state.isLoading){
            return <div class="centered"><CircularProgress/></div>
        }
        else if(this.state.error){
            return(<div><StaffHeader/><br/><h2 className="centered" style={{color:"red"}}>Nie można pobrać ogłoszeń! Spróbuj ponowanie później!</h2></div>)
        }
        var showed_announcement = this.state.announcement.slice(this.state.page*5,(this.state.page+1)*5); 
        
        var newer_button =  <Button variant="secondary" size="sm" onClick={()=>{this.setState({page:this.state.page-1})}}>Nowsze</Button>
        var older_button = <Button variant="secondary" size="sm"onClick={()=>{this.setState({page:this.state.page+1})}}>Starsze</Button>
        if(this.state.page==0){
            var newer_button =  <Button disabled="true" variant="secondary" size="sm" onClick={()=>{this.setState({page:this.state.page-1})}}>Nowsze</Button>
        }
        if((this.state.page+1)*5>=this.state.announcement.length){
            var older_button = <Button disabled="true" variant="secondary" size="sm"onClick={()=>{this.setState({page:this.state.page+1})}}>Starsze</Button>
        }
        if(showed_announcement.length<5)

        for(var i = showed_announcement.length;i<5;i++){
            showed_announcement.push("");
        }
        return(
            <div>
                <Paper style={{width:"60%","margin":"auto"}}>
                <h2 style={{width:"10%",margin:"auto"}}>Ogłoszenia:</h2>

                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableBody>
                                {showed_announcement.map(announcement=><AnnouncementListElement info={announcement}/>)}
                            </TableBody>
                        </Table>
                        <div style={{float:"right"}}>
                            {newer_button}
                            {' '}
                            {older_button}
                        </div>
                    </TableContainer>
                </Paper>
                
                

                
            </div>
        )
        

    }

}

export default AnnouncementListView;