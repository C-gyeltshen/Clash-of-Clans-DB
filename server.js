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
    // const {login_id,player_id,login_time,device_info,ip_address,login_status} = req.body;
    const {id,DeviceInfo,IPAddress,LoginID_Pk_,LoginSuccess,LoginTimestamp,PlayerID_FK_} = req.body;    
    const result = await prisma.player_login.create({
        data:{
            id:id,
            DeviceInfo:DeviceInfo,
            IPAddress:IPAddress,
            LoginId_PK_:LoginID_Pk_,
            LoginSuccess:LoginSuccess,
            LoginTimestamp:LoginTimestamp,
            PlayerID_FK_:PlayerID_FK_
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

