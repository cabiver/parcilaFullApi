const express= require('express')
const query = require("./dbConnector/pool")
const dao = require("./dbConnector/dao")
const morgan  = require('morgan')
const jwt = require('jsonwebtoken') 
const bodyParse = require('body-parser')

require('dotenv').config()
const app = express()

const port = process.env.PORT || 3001 
const secret = process.env.secret
const cors = require('cors')


app.use(cors({
    origin: '*'
}));
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

app.get('/selectAdmins', async (req, res)=> {
    let data = await query(`SELECT admins.cedulaUsuario as "idAdmin" ,persona.nombre FROM admins INNER JOIN persona on admins.cedulaUsuario = persona.cedula`)
    res.json({ users: data})
})
app.get('/selectPersonas', async (req, res)=> {
    let data = await query(`SELECT persona.cedula as "idCliente", persona.nombre FROM persona LEFT JOIN muertos ON persona.cedula = muertos.idMuerto WHERE muertos.idMuerto IS null`)
    res.json({ users: data})
})
app.get('/selectMuerto', async (req, res)=> {
    let data = await query(`SELECT m.idMuerto as "idMuerto", persona.nombre FROM muertos m INNER JOIN persona ON persona.cedula = m.idMuerto`)
    res.json({ users: data})
})
app.post('/addPersona', async (req, res)=> {
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {tipoDocumento, cedula, nombre, apellido, fechaNacimiento} = req.body.body
    if(!tipoDocumento || !cedula || !nombre || !apellido || !fechaNacimiento){
        res.json({"mensanje": "faild to create person"})
        return
    }
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

app.post('/updatePersona', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento} = req.body.body
    console.log(id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento)
    if(!id || !tipoDocumento || !cedula || !nombre || !apellido || !fechaNacimiento){
        res.json({"mensanje": "no se puedo continuar con la aptualizacion"})
        return
    }
    let continiu = await existId(cedula, 'cedula', 'persona')
    if(continiu){
        let data = await query(`UPDATE persona SET tipoDocumento='${tipoDocumento}',nombre='${nombre}',apellido='${apellido}',fechaNacimiento='${fechaNacimiento}' WHERE cedula= ${cedula}`)
        if(data.protocol41){
            res.json({ "mesanje": "inserted persona"})
        }
    }else{
        res.json({ "mensanje": "la cedula ya existe"})
    }
})

app.post('/updateMuerto', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {id, cedula, pais, sede, fechaFallecimiento, tipoDocumento, nombre, apellido, fechaNacimiento} = req.body.body
    console.log(id, cedula , pais, sede, fechaFallecimiento, tipoDocumento, nombre, apellido, fechaNacimiento)
    if(!id || !pais || !cedula || !sede || !fechaFallecimiento || !tipoDocumento || !nombre || !apellido || !fechaNacimiento){
        res.json({"mensanje": "no se puedo actualizar"})
        return
    }
    let continiu = await existId(cedula, 'cedula', 'persona')
    if(continiu){
        let data = await query(`UPDATE muertos SET pais='${pais}',sede='${sede}',fechaFallecimiento='${fechaFallecimiento}' WHERE id= ${id}`)
        let data2 = await query(`UPDATE persona SET tipoDocumento='${tipoDocumento}',nombre='${nombre}',apellido='${apellido}',fechaNacimiento='${fechaNacimiento}' WHERE cedula=  ${cedula}`)
        if(data.protocol41 && data2.protocol41){
            res.json({ "mesanje": "updated"})
        }
    }else{
        res.json({ "mensanje": "la cedula ya existe"})
    }
})

app.post('/deleteEntierro', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {id} = req.body.body
    if(!id){
        res.json({"mensanje": "no se puede eliminar"})
        return
    }
    let continiu = await existId(id, 'id', 'detalleentierro')
    if(continiu){
        let data2 = await query(`DELETE FROM detalleentierro WHERE id =${id}`)
        if(data2.protocol41){
            res.json({ "mesanje": "deleted detalle"})
        }
    }else{
        res.json({ "mensanje": "la cedula ya existe"})
    }
})


app.post('/updateEntierro', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {id, cedula, pais, sede, fechaFallecimiento, tipoDocumento, fechaNacimiento, apellidoMuerto, apellidoCliente, nombreCliente, nombreMuerto, nombreAdmin, cedulaMuerto, cedulaAdmin} = req.body.body
    console.log(req.body.body)
    console.log(id, cedula, pais, tipoDocumento, sede, apellidoMuerto, apellidoCliente, nombreCliente, nombreMuerto, nombreAdmin, cedulaMuerto, cedulaAdmin, fechaFallecimiento, fechaNacimiento)
    //|| !fechaNacimiento || !apellidoMuerto || !apellidoCliente 
    if(!fechaNacimiento || !apellidoMuerto || !apellidoCliente ||   !id || !pais || !cedula || !sede || !fechaFallecimiento || !tipoDocumento || !nombreCliente || !nombreMuerto || !nombreAdmin || !cedulaMuerto || !cedulaAdmin){
        res.json({"mensanje": "no se puedo actualizar"})
        return
    }
    let continiu = await existId(cedula, 'cedula', 'persona')
    let continiu1 = await existId(cedula, 'cedula', 'persona')
    if(continiu){
        let data = await query(`UPDATE muertos SET pais='${pais}',sede='${sede}',fechaFallecimiento='${fechaFallecimiento}' WHERE cedula idMuerto = ${cedulaMuerto}`)
        let data2 = await query(`UPDATE persona SET tipoDocumento='${tipoDocumento}',nombre='${nombre}',apellido='${apellido}',fechaNacimiento='${fechaNacimiento}' WHERE cedula=  ${cedula}`)
        if(data.protocol41 && data2.protocol41){
            res.json({ "mesanje": "inserted persona"})
        }
    }else{
        res.json({ "mensanje": "la cedula ya existe"})
    }
})

app.get('/entierros', async(req,res)=>{
    // SELECT d.id, peAd.nombre as "nombre admin", a.estadoTrabajo, p.nombre as "nombre cliente", p.apellido as "apellido cliente", p.tipoDocumento, p.cedula, peMu.nombre as "nombre muerto", peMu.apellido as "apellido muerto", m.idMuerto as "cedula muerto", peMu.fechaNacimiento, m.fechaFallecimiento, m.sede, m.pais FROM detalleentierro d 
	// INNER JOIN admins a on d.idAdmin = a.cedulaUsuario 
    // INNER JOIN persona p ON d.idCliente = p.cedula 
    // INNER JOIN muertos m ON m.idMuerto = d.idMuerto
    // INNER JOIN persona as peAd on d.idAdmin = peAd.cedula
    // INNER JOIN persona as peMu ON m.idMuerto = peMu.cedula 
    
    let data = await  query('SELECT d.id, peAd.nombre as "nombreAdmin", peAd.cedula as "cedulaAdmin"  , a.estadoTrabajo, p.nombre as "nombreCliente", p.apellido as "apellidoCliente", p.tipoDocumento, p.cedula, peMu.nombre as "nombreMuerto", peMu.apellido as "apellidoMuerto", m.idMuerto as "cedulaMuerto", peMu.fechaNacimiento, m.fechaFallecimiento, m.sede, m.pais FROM detalleentierro d INNER JOIN admins a on d.idAdmin = a.cedulaUsuario INNER JOIN persona p ON d.idCliente = p.cedula INNER JOIN muertos m ON m.idMuerto = d.idMuerto INNER JOIN persona as peAd on d.idAdmin = peAd.cedula INNER JOIN persona as peMu ON m.idMuerto = peMu.cedula')
    res.json({ users: data})
})

app.post('/addMuerto', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {pais, sede, idMuerto, fechaFallecimiento} = req.body.body
    if(!pais || !sede || !idMuerto || !fechaFallecimiento){
        res.json({"mensanje": "faild to create person"})
        return
    }
    let continiu = await existId(idMuerto, 'idMuerto', 'muertos')
    let continiu2 = await existId(idMuerto, 'cedula', 'persona')
    
    if(!continiu && continiu2) {
        let data = await query(`INSERT INTO muertos(pais, sede, idMuerto, fechaFallecimiento) VALUES ('${pais}', '${sede}','${idMuerto}','${fechaFallecimiento}')`)
        res.json({ "mensanje": "muerto creado"})
    } else {
        res.json({"mensanje": "ya esiste el mueto (cedula)"})
    }
})

app.post('/addEntierro', async(req,res)=>{
    if(!req.body.body){
        res.json({"mensanje":"body no existe"})
        return
    }
    const {idAmin, idCliente, idMuerto, costo, fechaPeticion} = req.body.body
    if(!idAmin || !idCliente || !idMuerto || !costo || !fechaPeticion){
       res.json({"mensanje":"faild to create"})
        return
    }
    let continiu = await existId(idMuerto, 'idMuerto', 'muertos')
    let continiu1 = await existId(idAmin, 'cedulaUsuario', 'admins')
    let continiu2 = await existId(idCliente, 'cedula', 'persona')
    if(continiu && continiu2 && continiu1) {
        let data = await query(`INSERT INTO detalleentierro(idAdmin, idCliente, idMuerto, costo, fechaPeticion) VALUES ('${idAmin}', '${idCliente}', '${idMuerto}', '${costo}', '${fechaPeticion}')`)
        res.json({ "mensaje": "dato agregado"})
    } else {
        res.json({"mensaje": "algunas de las cedulas ingresadas no existe"})
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