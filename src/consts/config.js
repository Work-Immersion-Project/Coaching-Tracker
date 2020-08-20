
const prod= {
    API_BASE_URL : "coaching-tracker-api-prod.herokuapp.com",
    WS_BASE_URL : `wss://coaching-tracker-api-prod.herokuapp.com`, 
    WS_TIMEOUT: 25000,
 }

 const dev = {
     API_BASE_URL : "coaching-tracker-api-dev.herokuapp.com/",
     WS_BASE_URL : `wss://coaching-tracker-api-dev.herokuapp.com`,
     WS_TIMEOUT: 25000,
    }

 export const config = (process.env.NODE_ENV === 'development') ? dev : prod;


