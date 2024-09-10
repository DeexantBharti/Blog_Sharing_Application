import axios from 'axios';

import { API_NOTIFICAITON_MESSAGES , SERVICE_URLS } from '../constants/config.js';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout: 10000,
    headers: {
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // stop global loader here
       return processResponse(response);
    },
    function(error){
        // stop global loader here
        return Promise.reject(processError(error));
    }
)

/////
// if success -> return {isSuccess: true, data: Object}
// if fail -> return (isFailure : true, status : string , msg: string , code: int   )

const processResponse = (response) =>{
    if(response?.status === 200 ) {
        return {isSuccess: true, data: response.data}
    }
   else{
    return{
        isFailure: true, 
        status : response?.status,
        msg: response?.msg,
        code: response?.code
    }
   }
}


/////
// if success -> return {isSuccess: true, data: Object}
// if fail -> return (isFailure : true, status : string , msg: string , code: int   )
///////////
const processError = (error) => {
    if(error.response){
// request made and  server responded with a status other 
// that falls out of the ragnge of 2.x.x
console.log('Error in response : ' , error.toJSON());
return {
isError : true, 
msg: API_NOTIFICAITON_MESSAGES.responseFailure,
code: error.response.status
}
    }
    else if(error.request){
// request made but no response for the same , some connectivity issue or netowrk issue
console.log('Error in request : ' , error.toJSON());
return {
isError : true, 
msg: API_NOTIFICAITON_MESSAGES.reqeustFailure,
code: error.response.status
}
    }
    else{
// something happended in setting up rquest that figures that error 
console.log('Error in network : ' , error.toJSON());
return {
isError : true, 
msg: API_NOTIFICAITON_MESSAGES.networkError,
code: ""
}
    }
}

const API = {};

for(const [key, value ] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance ({
            method: value.method,
            url : value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress : function(progressEvent) {
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownProgress : function(progressEvent) {
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    }

    export {API} ;