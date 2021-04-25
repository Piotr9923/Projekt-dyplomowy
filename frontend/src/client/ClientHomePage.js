import React, {Component} from 'react'
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
import AnnouncementListView from './AnnouncementListView';
import ClientHeader from './ClientHeader';


class ClientHomePage extends Component{

    constructor(props) {
        super(props);
    }

    render() {
    
        return(
            <div>
                <ClientHeader/>

                <AnnouncementListView/>

            </div>
        )
        

    }

}

export default ClientHomePage;