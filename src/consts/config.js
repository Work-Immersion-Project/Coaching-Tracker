
const prod= {
    API_BASE_URL : "coaching-tracker-api.herokuapp.com",
    WS_BASE_URL : `wss://coaching-tracker-api.herokuapp.com` 
 }

 const dev = {
     API_BASE_URL : "localhost:8000",
     WS_BASE_URL : `ws://localhost:8000`,
 }

 export const config = (process.env.NODE_ENV === 'development') ? dev : prod;


