import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class StaffListElement extends Component{

    render() {
        return(
            <div>
               {this.props.info.firstname}
               
               <Link to={"/admin/staff/" + this.props.info.id}>Wyświetl szczegóły</Link>
            </div>
        )

    }

}

export default StaffListElement;