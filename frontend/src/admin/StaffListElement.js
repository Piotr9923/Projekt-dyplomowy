import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"

class StaffListElement extends Component{

    render() {
        return(
               <TableRow>
                    <TableCell align="left">{this.props.info.lastname+" "+this.props.info.firstname}</TableCell>
                    <TableCell align="left">{this.props.info.phoneNumber}</TableCell>
                    <TableCell align="left"><Link to={"/admin/staff/"+this.props.info.id}>Wyświetl szczegóły</Link> </TableCell>
                    <TableCell align="left"><Link to={"/admin/staff/"+this.props.info.id+"/edit"}><Edit/></Link></TableCell>
                    <TableCell align="left"><Delete/></TableCell>
                </TableRow>
        )

    }

}

export default StaffListElement;