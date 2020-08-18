
const prod= {
    API_BASE_URL : "coaching-tracker-api-prod.herokuapp.com",
    WS_BASE_URL : `wss://coaching-tracker-api-prod.herokuapp.com` 
 }

 const dev = {
     API_BASE_URL : "coaching-tracker-api-dev.herokuapp.com/",
     WS_BASE_URL : `wss://coaching-tracker-api-dev.herokuapp.com`,
 }

 export const config = (process.env.NODE_ENV === 'development') ? dev : prod;


