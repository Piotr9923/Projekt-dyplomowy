import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"

class AnnouncementListElement extends Component{

    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(){
        this.props.deleteAnnouncement(this.props.info.id);
    }

    render() {
        return(
               <TableRow>
                    <TableCell align="left">{this.props.info.date}</TableCell>
                    <TableCell align="left">{this.props.info.title}</TableCell>
                    <TableCell align="left">{this.props.info.rolesNames}</TableCell>
                    <TableCell align="left"><Link to={"/admin/announcement/"+this.props.info.id}>Wyświetl</Link> </TableCell>
                    <TableCell align="left"><Link style={{color:'red'}}><Delete onClick={this.buttonClick} /></Link></TableCell>
                </TableRow>
        )

    }

}

export default AnnouncementListElement;