
const query = require("./pool")

const example = async()=> {
    let json = await query('SELECT * FROM persona')
    return json  
} 


const getMuertos = async()=> {
    let json = await query('SELECT m.id, p.tipoDocumento, p.cedula, p.nombre, p.apellido, p.fechaNacimiento, m.fechaFallecimiento, m.pais, m.sede FROM muertos m INNER JOIN persona p on m.idMuerto = p.cedula')
    return json  
}  
const auth = async()=> {
    let json = await query('SELECT cedulaUsuario, contraseña, id from admins')
    return json  
}  

module.exports = {
    example, 
    getMuertos, 
    auth
}