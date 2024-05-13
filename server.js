const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const prisma = new PrismaClient()

const express = require('express')
const app = express()
app.use(bodyParser.json()); // for parsing application/json
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/create/login',async(req,res)=>{
    const {login_id,player_id,login_time,device_info,ip_address,login_status} = req.body;
    const result = await prisma.player_login.create({
        data:{
            login_id:login_id,
            player_id:player_id,
            login_time:login_time,
            device_info:device_info,
            ip_address:ip_address,
            login_status:login_status
        },
    });
    res.json(result);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})