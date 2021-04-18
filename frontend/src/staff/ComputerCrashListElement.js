import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"

class ComputerCrashListElement extends Component{

    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(){
        this.props.deleteStaff(this.props.info.id);
    }

    render() {
        var type = "Serwis";
        var url="crash";
        if(this.props.info.type=="HOME"){
            type = "Awaria domowa"
            url="home-crash"
        }
        return(
               <TableRow>
                    <TableCell align="left">{this.props.info.date}</TableCell>
                    <TableCell align="left">{this.props.info.title}</TableCell>
                    <TableCell align="left">{this.props.info.client}</TableCell>
                    <TableCell align="left">{type}</TableCell>
                    <TableCell align="left">{this.props.info.status}</TableCell>
                    <TableCell align="left"><Link to={"/staff/"+url+"/"+this.props.info.id}>Wyświetl szczegóły</Link> </TableCell>
                    <TableCell align="left"><Link to={"/staff/"+url+"/"+this.props.info.id+"/edit"}><Edit/></Link></TableCell>
                </TableRow>
        )

    }

}

export default ComputerCrashListElement;