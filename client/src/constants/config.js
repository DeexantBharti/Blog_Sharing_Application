// API_NOTIFICAITON_MESSAGES

export const API_NOTIFICAITON_MESSAGES = {
    loading: {
        title: 'Loading...',
        message : 'Data is being loaded, Please wait'
    },
    success: {
        title : 'Success' ,
        message : 'Data successfully loaded'
    },
    responseFailure:{
        title : 'Error' , 
        message : 'An error occured while fetching response from server. Please try again'
    },
    reqeustFailure: {
        title: 'Error' , 
        message : 'An error occured while parsing request data'
    },
    networkError: {
        title : 'Error',
        message : 'unable to connect with server , please find network'
    }
}


// api serveice call

// sample reqeust
// need service call : {url:'/},method: 'POST/GET/PUT/DELETE' params : true/ false} 
 export const  SERVICE_URLS = {
    userSignup : {url : '/signup' , method: 'POST'}
 }