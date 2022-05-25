import React from "react";
import { useState, useRef } from "react";
import peticion from "../utils/peticions";

import { useNavigate } from "react-router-dom";



const TrEntierro = ({props}) => {
    
    const {id, nombreAdmin, cedulaAdmin, estadoTrabajo, nombreCliente, apellidoCliente, tipoDocumento, cedula, nombreMuerto, apellidoMuerto, cedulaMuerto, fechaNacimiento, fechaFallecimiento, sede, pais} = props
    let [update, setUpdate]= useState(true)
    const navigate = useNavigate();
    
    const FtipoDocumento = useRef(null)
    const FnombreMuerto = useRef(null)
    
    const FnombreCliente = useRef(null)
    const FapellidoMuerto = useRef(null)
    const FapellidoCliente = useRef(null)
    const FnombreAdmin = useRef(null)
    const Ffecha1 = useRef(null)
    const Ffecha2 = useRef(null)
    const Fpais = useRef(null)
    const Fsede = useRef(null)
 
    let fecha1= new Date(fechaNacimiento).toDateString()
    let fecha2= new Date(fechaFallecimiento).toDateString()
    
    const enviar = async()=>{
        if(Ffecha1.current.value === ""){
            return
        }else{
          
            const peticionFun=new peticion()

            let data= await peticionFun.post('updateEntierro', {
                id,
                cedula,
                cedulaMuerto,
                cedulaAdmin,
                tipoDocumento: FtipoDocumento.current.value,
                nombreAdmin: FnombreAdmin.current.value,
                apellidoCliente: FapellidoCliente.current.value,
                apellidoMuerto: FapellidoMuerto.current.value,
                nombreCliente: FnombreCliente.current.value,
                nombreMuerto: FnombreMuerto.current.value,
                pais: Fpais.current.value,
                sede: Fsede.current.value,
                fechaNacimiento: Ffecha1.current.value,
                fechaFallecimiento: Ffecha2.current.value
            })
            console.log(data)
            if(data){
                navigate(0);
            }
        }
    }
    const updateHandle = ()=>{
        setUpdate((date => date? false: true))
    }
    const cancel = ()=>{
        setUpdate((date => date? false: true))
    }
    const deleted = async()=>{
            const peticionFun=new peticion()
            let data= await peticionFun.post('deleteEntierro', {
                id,
            })
            console.log(data)
            if(data){
                navigate(0);
            }
    }

    
    return(
        <tr>
            <td>{id}</td>
            {
                update
                ?
                <td>
                    {nombreAdmin}
                </td>
                :<td > <input ref={FnombreAdmin} style={{width:"120px"}}  placeholder={nombreAdmin}></input></td>
            }
            <td>{estadoTrabajo}</td>
            <td>{cedulaAdmin}</td>
            {
                update
                ?
                <td>
                    {nombreCliente}
                </td>
                :<td > <input ref={FnombreCliente} style={{width:"120px"}}  placeholder={nombreCliente}></input></td>
            }
            {
                update
                ?
                <td>
                    {apellidoCliente}
                </td>
                :<td > <input ref={FapellidoCliente} style={{width:"120px"}}  placeholder={apellidoCliente}></input></td>
            }
            {
                update
                ?
                <td>
                    {tipoDocumento}
                </td>
                :<td > <input ref={FtipoDocumento} style={{width:"120px"}}  placeholder={tipoDocumento}></input></td>
            }
            <td>{cedula}</td>
            {
                update
                ?
                <td>
                    {nombreMuerto}
                </td>
                :<td > <input ref={FnombreMuerto} style={{width:"120px"}}  placeholder={nombreMuerto}></input></td>
            }
            {
                update
                ?
                <td>
                    {apellidoMuerto}
                </td>
                :<td > <input ref={FapellidoMuerto} style={{width:"120px"}}  placeholder={apellidoMuerto}></input></td>
            }
            <td>
                {cedulaMuerto}
            </td>
            {
                update
                ?
                <td>
                    {fecha1}
                </td>
                :<td > <input type="date" ref={Ffecha1} style={{width:"120px"}}  placeholder={fecha1}></input></td>
            }
            {
                update
                ?
                <td>
                    {fecha2}
                </td>
                :<td > <input type="date" ref={Ffecha2} style={{width:"120px"}}  placeholder={fecha2}></input></td>
            }
            {
                update
                ?
                <td>
                    {sede}
                </td>
                :<td > <input ref={Fsede} style={{width:"120px"}} placeholder={sede}></input></td>
            }
            {
                update
                ?
                <td>
                    {pais}
                </td>
                :<td > <input ref={Fpais} style={{width:"120px"}} placeholder={pais}></input></td>
            }
            {
                update
                ?<td>
                       <button onClick={updateHandle}>actualizar</button>
                       <button onClick={deleted}>eliminar</button>
                       
                </td>
                :<td >   
                    <button onClick={enviar}>enviar</button>
                    <button onClick={cancel}>cancelar</button>
                </td>
            }
        </tr> 
    )
}
export default TrEntierro