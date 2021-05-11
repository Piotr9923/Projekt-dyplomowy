import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AdminHeader from './AdminHeader';
import CrashTypeChart from './statistics_page_objects/ChrashTypeChart';
import CrashMonthlyChart from './statistics_page_objects/CrashMonthlyChart';
import HomeCrashMonthlyChart from './statistics_page_objects/HomeCrashMonthlyChart';
import IncomeChart from './statistics_page_objects/IncomeChart';

class Statistics extends Component{

    constructor(props) {
        super(props);
    }   


    render() {

        return(
            <div>
			    <AdminHeader/>
                <div>
                    <div style={{width:"48%",margin:"auto", display:"inline-block", 'padding-left':'20px','padding-right':'20px',"border-radius": '25px',"backgroundColor":"white"}}>
                    <h3 style={{display: "flex","justify-content":"center","align-items":"center"}}>Liczba awarii w serwisie według miesięcy</h3><br/>
                        <CrashMonthlyChart/>
                    </div>
                    <div style={{width:"48%",float:"right", display:"inline-block", 'padding-left':'20px','padding-right':'20px',"border-radius": '25px',"backgroundColor":"white"}}>
                    <h3 style={{display: "flex","justify-content":"center","align-items":"center"}}>Liczba awarii domowych według miesięcy</h3><br/>
                        <HomeCrashMonthlyChart/>
                    </div>
                </div>
                <div style={{'padding-top':"3%","display":"flex"}}>
                    <div style={{width:"48%",margin:"auto", display:"inline-block", 'padding-left':'20px','padding-right':'20px',"border-radius": '25px',"backgroundColor":"white"}}>
                        <h3 style={{display: "flex","justify-content":"center","align-items":"center"}}>Awarie według typu</h3><br/>
                        <CrashTypeChart/>
                    </div>
                    <div style={{width:"48%",float:"right", display:"inline-block", 'padding-left':'20px','padding-right':'20px',"border-radius": '25px',"backgroundColor":"white"}}>
                    <h3 style={{display: "flex","justify-content":"center","align-items":"center"}}>Przychód sewisu</h3><br/>
                        <IncomeChart/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Statistics;