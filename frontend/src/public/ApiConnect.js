
const ApiUrl = process.env.REACT_APP_API_URL;


class ApiConnect{

    getMethod(url){

        return fetch(ApiUrl+url,{
   
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        })

    }


    postMethod(url, body){
    
        return fetch(ApiUrl+url,{
   
            method: 'POST',
            headers: {
                'Authorization':'Bearer '+localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: body
        })

    }



}

export default new ApiConnect();