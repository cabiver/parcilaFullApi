const express= require('express')
const query = require("./dbConnector/pool")
const dao = require("./dbConnector/dao")
const morgan  = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken') 
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001 
const secret = process.env.secret

app.use(cors())

app.use(morgan('tiny'))

app.get('/', async(req, res)=>{
    let data = await query('SELECT * FROM persona')
    res.json({ users: data})
})








app.get('/muertos', async(req,res)=>{
    let data=await dao.getMuertos()
    res.json({ users: data})
})




app.post('/log/:id/:password', async (req, res)=>{
    const { id, password } = req.params
    let data=await dao.auth(id, password)
    let find = false;
    data.forEach(element => {
        if(element.contraseña == password || element.cedulaUsuario == id){

            jsonToken = jwt.sign({
                cedula: element.cedula, 
                Date: new Date()                
            },secret);
            res.json({"estado":true, "token": jsonToken})
            find = true;
        }
    });
    if(!find){
        res.json({"estado":false})
    }
    
})

app.post('/login/:nombre/:password', (req, res)=>{
    const { nombre, password } = req.params
    if(nombre == "c" && password == "a"){
        res.json({"estado":true, "idAdmin": "1"})
        return
    }
    res.json({"estado":false})
})


app.listen(port, () =>{
    console.log(`run in ${port} port`)
})