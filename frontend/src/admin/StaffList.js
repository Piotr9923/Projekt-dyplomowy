import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import StaffListElement from './StaffListElement';

class StaffList extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            staff:[],
            errors:[]
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var url = ""+process.env.REACT_APP_API_URL + "/admin/staff";
        console.log("URL = "+url);
        fetch(url,{
   
            method: 'POST',
            headers: {
                'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfQ0xJRU5UIiwiUk9MRV9TVEFGRiIsIlJPTEVfQURNSU4iXSwidXNlcm5hbWUiOiJ0ZXN0In0.rdyD-ckgOTO1Xy1VX0rythQ3vVNkAe2TCdHf543h3xe_j3ds1NEzxBRHrkIXPRyqzt8auSobddKiPSRN0pto2A',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'firstname':'test'
            })
        }).
        then(response => response.json()).
        then(data => {

            this.setState({isLoading:false});

            if(data.errors){
                this.setState({
                    errors:data.errors
                });
                throw new Error("BŁĘDY!!");

            }
            else{
                this.setState({staff: data, isLoading: false})
            }
        
        }).
        catch(error => {
            
            var errorsList="Wystąpiły błędy:\n";

            this.state.errors.map(error=>{
                errorsList = errorsList+error+"\n";
            })

            alert(errorsList);

            
        });
    }

    render() {

        if(this.state.isLoading){
            return "Trwa ładowanie";
        }
        else{
            if(this.state.errors){
                return "POPRAW BŁĘDY";
            }
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