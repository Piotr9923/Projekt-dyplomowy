import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"

class ClientCrashListElement extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        var type = "Serwis";
        var url="crash";
        if(this.props.info.type=="HOME"){
            type = "Awaria domowa"
            url="home-crash"
        }

        var cost = "";
        if(this.props.info.cost>0){
            cost = "" + this.props.info.cost + " zł"
        }
        return(
               <TableRow>
                    <TableCell align="left">{this.props.info.date}</TableCell>
                    <TableCell align="left">{this.props.info.title}</TableCell>
                    <TableCell align="left">{type}</TableCell>
                    <TableCell align="left">{this.props.info.status}</TableCell>
                    <TableCell align="left">{cost}</TableCell>
                    <TableCell align="left"><Link to={"/client/"+url+"/"+this.props.info.id}>Wyświetl szczegóły</Link> </TableCell>
                </TableRow>
        )

    }

}

export default ClientCrashListElement;