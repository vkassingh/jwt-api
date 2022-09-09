const http = require('http');
const app= require('./app');
const server= http.createServer(app);

const port= process.env.PORT || 3000;
server.listen(port, ()=>{
    console.log('http://127.0.0.1:'+port)
})