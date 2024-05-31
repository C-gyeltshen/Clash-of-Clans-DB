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

app.get("/records", async (req, res) => {
    const result = await prisma.player_login.findMany();
    res.json(result);
    });

//Read data from server 
app.get('/ok', (req, res) => {
    res.send('Hello World!')
})

//Creating a new data in db
app.post("/player/login", async (req, res) => {
    const { login_id,player_id,login_time,device_info,ipaddress,login_success } = req.body;
    const result = await prisma.player_login.create({
        data: {
            login_id:login_id,
            player_id:player_id,
            login_time:login_time,
            device_info:device_info,
            ipaddress:ipaddress,
            login_success:login_success
        },
    });
    res.json(result);
    });

    app.post("/player/info", async (req, res) => {
        const { player_id,player_name, player_level, exp, resources, trophies } = req.body;
        const result = await prisma.players.create({
            data: {
                player_id:player_id,
                player_name:player_name,
                player_level:player_level,
                exp:exp,
                player_resources:resources,
                player_trophies:trophies
            },
        });
        res.json(result);
        });

// DELETE A SPECIFIC TASK BY ID
app.delete("/records/delete", async (req, res) => {
    const { login_id } = req.body;
    const result = await prisma.player_login.delete({
        where: {
        login_id: login_id,
        },
    });
    res.json({ result });
    });

// Read data from db
app.get("/records/read", async(req,res)=>{
    try{
        const result = await prisma.player_login.findMany();
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// UPDATE TASK TO BE COMPLETED OR NOT COMPLETED
app.patch("/records/update", async (req, res) => {
    const { player_id, player_name } = req.body;
    console.log(player_id, player_name);
    const result = await prisma.players.update({
        where: { player_id: player_id },
        data: {
        player_name: player_name,
        },
    });
    res.json(result);
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

