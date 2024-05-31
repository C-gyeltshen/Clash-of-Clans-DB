const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const prisma = new PrismaClient()

const express = require('express')
const app = express()
app.use(bodyParser.json()); // for parsing application/json
const port = 3000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow the GET, POST, OPTIONS methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/create/user_login', async(req,res)=>{
    const {login_id,player_id,login_time,device_info,ip_address,login_success} =  req.body
    const result = await prisma.player_login.create({
        data : {
            DeviceInfo:device_info,    
            IPAddress:ip_address,  
            LoginId_PK_:login_id,
            LoginSuccess:login_success,
            LoginTimestamp:login_time,
            PlayerID_FK_:player_id
            },
        });
    res.json(result);
});




app.get('/ok', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

