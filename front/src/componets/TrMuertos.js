import { useState, useRef } from "react";
import React from "react";
import peticion from "../utils/peticions";

import { useNavigate } from "react-router-dom";



const TrMuertos = ({props}) => {
    // {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento}
    const {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento, fechaFallecimiento, pais, sede} = props
    let [update, setUpdate]= useState(true)
    const navigate = useNavigate();
    const FtipoDocumento = useRef(null)
    const Fnombre = useRef(null)
    const Fapellido = useRef(null)
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
            let data= await peticionFun.post('updateMuerto', {
                id,
                cedula,
                tipoDocumento: FtipoDocumento.current.value,
                nombre: Fnombre.current.value,
                apellido: Fapellido.current.value, 
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
    return (
        <tr>
            <td>{id}</td>
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
                    {nombre}
                </td>
                :<td > <input ref={Fnombre} style={{width:"120px"}}  placeholder={nombre}></input></td>
            }
            {
                update
                ?
                <td>
                    {apellido}
                </td>
                :<td > <input ref={Fapellido} style={{width:"120px"}}  placeholder={apellido}></input></td>
            }
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
                    {pais}
                </td>
                :<td > <input ref={Fpais} style={{width:"120px"}}  placeholder={pais}></input></td>    
            }
            {    update
                ?
                <td>
                    {sede}
                </td>
                :<td > <input ref={Fsede} style={{width:"120px"}}  placeholder={sede}></input></td>
            }
            {
                update
                ?<td>
                       <button onClick={updateHandle}>actualizar</button>
                </td>
                :<td >   
                    <button onClick={enviar}>enviar</button>
                    <button onClick={cancel}>cancelar</button>
                </td>
            }
        </tr> 
    )
}
export default TrMuertos