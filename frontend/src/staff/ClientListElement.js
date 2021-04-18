import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    TableCell,
    TableRow,
  } from "@material-ui/core";
  import {Delete, Edit} from"@material-ui/icons"

class ClientListElement extends Component{

    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(){
        this.props.chooseClient(this.props.info);
    }

    render() {
        return(
               <TableRow>
                    <TableCell style={{
                      wordWrap: "break-word",
                      maxWidth:"130px"
                    }} align="center">{this.props.info.lastname+" "+this.props.info.firstname}</TableCell>
                    <TableCell style={{
                      wordWrap: "break-word",
                      maxWidth:"130px"
                    }} align="center">{this.props.info.phoneNumber}</TableCell>
                    <TableCell  style={{
                      wordWrap: "break-word",
                      maxWidth:"200px"
                    }} align="center">{this.props.info.email}</TableCell>
                    <TableCell align="center"><Link onClick={this.buttonClick}>Wybierz</Link> </TableCell>
                </TableRow>
        )

    }

}

export default ClientListElement;