import { useRef, useState } from "react";
import React from "react";
import peticion from "../utils/peticions";

import { useNavigate } from "react-router-dom";


const TrAdmins = ({props}) => {
    // {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento}
    
    const {id, tipoDocumento, cedula, nombre, apellido, fechaNacimiento} = props
    const navigate = useNavigate();
    let [update, setUpdate]= useState(true)
    const FtipoDocumento = useRef(null)
    const Fnombre = useRef(null)
    const Fapellido = useRef(null)
    const FfechaNacimiento = useRef(null)

    let fecha= new Date(fechaNacimiento).toDateString()
    
    const updateHandle = ()=>{
        setUpdate((date => date? false: true))
    }
    const cancel = ()=>{
        setUpdate((date => date? false: true))
    }
    const enviar = async()=>{
        if(FfechaNacimiento.current.value === ""){
            return
        }else{
            const peticionFun=new peticion()
            let data= await peticionFun.post('updatePersona', {
                id,
                tipoDocumento: FtipoDocumento.current.value,
                cedula,
                nombre: Fnombre.current.value,
                apellido: Fapellido.current.value, 
                fechaNacimiento: FfechaNacimiento.current.value})
            console.log(data)
            if(data){
                navigate(0);
            }
        }
    }

    return (
        
        <tr>
            
                <td>
                    {id}    
                </td>
            {
                update
                ?
                <td>
                    {tipoDocumento}
                </td>
                :<td > <input ref={FtipoDocumento} style={{width:"120px"}}  placeholder={tipoDocumento}></input></td>
            }
                <td>
                    {cedula}
                </td>
                
            {
                update
                ?
                <td>
                    {nombre}
                </td>
                :<td> <input ref={Fnombre} style={{width:"120px"}}  placeholder={nombre}></input></td>
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
                    {fecha}
                </td>
                :<td > <input ref={FfechaNacimiento} type="date"></input></td>
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
export default TrAdmins