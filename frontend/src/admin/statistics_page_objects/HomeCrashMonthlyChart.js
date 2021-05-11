import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CanvasJSReact from '../../canvasjs.react';
import ApiConnect from '../../public/ApiConnect';
import {CircularProgress} from "@material-ui/core";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HomeCrashMonthlyChart extends Component{

    constructor(props) {
        super(props);

        this.state={
            loadedData:[],
            isLoading: true,
            isError: false
        }
    }   

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/admin/statistics/home_crash_monthly";
        
        ApiConnect.getMethod(url)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                isLoading: false,
                loadedData: data
            })
        })
        .catch(error=>{
            this.setState({
                isError: true
            })
        })
    }




    render() {

        if(this.state.isError){
            return <h3 className="centered" style={{color:"red"}}>Wystąpił błąd</h3>
        }

        if(this.state.isLoading){
            return <CircularProgress/>
        }

        var chartData = [];
        this.state.loadedData.map(data=>{
            chartData.push({"label":data.date,"y":parseInt(data.count)});
        })

        const options = {
			theme: "light2",
			axisY: {
				title: "Ilość awarii",
			},
			data: [{
				type: "line",
				dataPoints: chartData
			}]
		}
        return(
            <div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
            </div>
        )

    }

}

export default HomeCrashMonthlyChart;