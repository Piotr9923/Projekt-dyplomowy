import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";

class AnnouncementListElement extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        var url_cell = <TableCell style={{height:"53px"}}></TableCell>;
        if(this.props.info.id){
            url_cell = <TableCell align="left" style={{width:"10%"}}><Link to={"/client/announcement/"+this.props.info.id}>Wyświetl</Link> </TableCell> 
        }

        return(
               <TableRow>
                    <TableCell align="left" style={{width:"20%"}}>{this.props.info.date}</TableCell>
                    <TableCell align="left" style={{width:"70%"}}><b>{this.props.info.title}</b></TableCell>
                    {url_cell}
                </TableRow>
        )

    }

}

export default AnnouncementListElement;