import React, {Component} from 'react'
import StaffHeader from './StaffHeader'
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


class StaffHomePage extends Component{

    constructor(props) {
        super(props);
    }

    render() {
    
        return(
            <div>
                <StaffHeader/>

                <AnnouncementListView/>

            </div>
        )
        

    }

}

export default StaffHomePage;