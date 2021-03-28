import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import StaffListElement from './StaffListElement';

class StaffList extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            staff:[]
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = ""+process.env.REACT_APP_API_URL + "/admin/staff";
        console.log("URL = "+url);
        fetch(url).
        then(response => response.json()).
        then(data => this.setState({staff: data, isLoading: false}));
    }

    render() {

        if(this.state.isLoading){
            return "Trwa ładowanie"
        }
        else{
            return(
                <div>
                    
                    <div>
                        Lista pracowników serwisu:
                    </div>
                    <div>
                        {this.state.staff.map(staff=><StaffListElement info={staff}/>)}
                    </div>
                </div>
            )
        }

    }

}

export default StaffList;