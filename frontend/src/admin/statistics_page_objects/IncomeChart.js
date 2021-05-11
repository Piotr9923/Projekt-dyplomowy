import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ApiConnect from '../../public/ApiConnect';
import {
    CircularProgress
  } from "@material-ui/core";
import CanvasJSReact from '../../canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class IncomeChart extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            loadedData:[],
            isError: false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = "/admin/statistics/income";
        
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

        chartData.push({"label":"Przychód z awarii domowych","y":parseFloat(this.state.loadedData.homeIncome)});
        chartData.push({"label":"Przychód z awarii w serwisie","y":parseFloat(this.state.loadedData.serviceIncome)});

        const options = {
			theme: "light2",
            indexLabel: "{label} - {y}",
            data: [{
				type: "pie",
				dataPoints: chartData
			}]
		}

        return(
            <div style={{"justify-content":"center","align-items":"center"}}>
                <div>
                    <b>Łączny przychód:</b> {this.state.loadedData.sumIncome} zł<br/>
                    <b>Przychód z awarii w serwisie:</b> {this.state.loadedData.serviceIncome} zł<br/>
                    <b>Przychód z awarii domowych:</b> {this.state.loadedData.homeIncome} zł<br/>

                    <CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}/>
                </div>
                <br/>


            </div>
        )
    }
}

export default IncomeChart;