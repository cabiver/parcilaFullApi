// import { useState } from "react";
import React from "react";

const TrMuertos = ({props}) => {
    // {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento}
    const {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento, fechaFallecimiento, pais, sede} = props
    // console.log(props)
    // console.log(id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento)
    return (
        <tr>
            <td>{id}</td>
            <td>{tipoDocumento}</td>
            <td>{cedula}</td>
            <td>{nombre}</td>
            <td>{apellido}</td>
            <td>{new Date(fechaNacimiento).toDateString()}</td>
            <td>{new Date(fechaFallecimiento).toDateString()}</td>
            <td>{pais}</td>
            <td>{sede}</td>
            
        </tr> 
    )
}
export default TrMuertos