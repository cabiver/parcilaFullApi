const express= require('express')
const query = require("./dbConnector/pool")
const dao = require("./dbConnector/dao")
const morgan  = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken') 
const bodyParse = require('body-parser')

require('dotenv').config()
const app = express()


const port = process.env.PORT || 3001 
const secret = process.env.secret
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParse.json())


async function existId (id, idCampo, table) {
    let data = await query(`SELECT * FROM ${table} where ${idCampo}= ${id}`)
    if (data.length !== 0) 
    return true
    else return false
}

function verificate (token) {
    const decoded = jwt.verify(token, secret)
    return decoded
}
app.post('/addPersona', async (req, res)=> {
    const {tipoDocumento, cedula, nombre, apellido, fechaNacimiento} = req.body
    let continiu = await existId(cedula, 'cedula', 'persona')
    if(!continiu){
        let data = await query(`INSERT INTO persona (tipoDocumento, cedula, nombre, apellido, fechaNacimiento) VALUES ('${tipoDocumento}', '${cedula}', '${nombre}', '${apellido}', '${fechaNacimiento}')`)
        if(data.protocol41){
            res.json({ "mesanje": "inserted persona"})
        }
    }else{
        res.json({ "mensanje": "la cedula ya existe"})
    }
})

app.get('/', async(req, res)=>{
    let data = await query('SELECT * FROM persona')
    res.json({ users: data})
})

app.post('/auth', async(req, res)=>{
    let cokeiString = req.body.cookie
    if(!cokeiString) {
        res.json({ "act": false})
        return
    }

    let data = verificate(cokeiString)
    if(data.id && data.Date){
        res.json({ "act": true})
    }else {
        res.json({ "act": false})
    }
    
})

app.get('/muertos', async(req,res)=>{
    let data=await dao.getMuertos()
    res.json({ users: data})
})


app.get('/entierros', async(req,res)=>{

    // SELECT d.id, peAd.nombre as "nombre admin", a.estadoTrabajo, p.nombre as "nombre cliente", p.apellido as "apellido cliente", p.tipoDocumento, p.cedula, peMu.nombre as "nombre muerto", peMu.apellido as "apellido muerto", m.idMuerto as "cedula muerto", peMu.fechaNacimiento, m.fechaFallecimiento, m.sede, m.pais FROM detalleentierro d 
	// INNER JOIN admins a on d.idAdmin = a.cedulaUsuario 
    // INNER JOIN persona p ON d.idCliente = p.cedula 
    // INNER JOIN muertos m ON m.idMuerto = d.idMuerto
    // INNER JOIN persona as peAd on d.idAdmin = peAd.cedula
    // INNER JOIN persona as peMu ON m.idMuerto = peMu.cedula 
    

    let data = await  query('SELECT d.id, peAd.nombre as "nombre admin", a.estadoTrabajo, p.nombre as "nombre cliente", p.apellido as "apellido cliente", p.tipoDocumento, p.cedula, peMu.nombre as "nombre muerto", peMu.apellido as "apellido muerto", m.idMuerto as "cedula muerto", peMu.fechaNacimiento, m.fechaFallecimiento, m.sede, m.pais FROM detalleentierro d INNER JOIN admins a on d.idAdmin = a.cedulaUsuario INNER JOIN persona p ON d.idCliente = p.cedula INNER JOIN muertos m ON m.idMuerto = d.idMuerto INNER JOIN persona as peAd on d.idAdmin = peAd.cedula INNER JOIN persona as peMu ON m.idMuerto = peMu.cedula')
    res.json({ users: data})
})

app.post('/addMuerto', async(req,res)=>{
    const {pais, sede, idMuerto, fechaFallecimiento} = req.body
    let continiu = await existId(idMuerto, 'idMuerto', 'muertos')

    if(!continiu) {
        let data = await query(`INSERT INTO muertos(pais, sede, idMuerto, fechaFallecimiento) VALUES ('${pais}', '${sede}','${idMuerto}','${fechaFallecimiento}')`)
        res.json({ "users": "data"})
    } else {
        res.json({"mensaje": "ya esiste el mueto (cedula)"})
    }
})

app.post('/log/:id/:password', async (req, res)=>{
    const { id, password } = req.params
    let data = await query(`SELECT cedulaUsuario, password, id from admins where cedulaUsuario = ${id}`)
    let find = false;
    data.forEach(element => {
        console.log(element.password)
        if(element.password == password && element.cedulaUsuario == id){
            jsonToken = jwt.sign({
                Date: new Date(),
                id: element.cedulaUsuario
                                
            },secret);
            res.json({"estado":true, "token": jsonToken})
            find = true;
        }
    });
    if(!find){
        res.json({"estado":false})
    }  
})

app.listen(port, () =>{
    console.log(`run in ${port} port`)
})