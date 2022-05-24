import React, { useEffect, useMemo, useState } from "react";
import TrAdmins from "../componets/TrAdmis";
import TrMuertos from "../componets/TrMuertos";
import peticion from "../utils/peticions";


const Tables = () => {

    const [admins, setAdmins] =  useState(null)
    const [muertos, setmuertos] =  useState(null)
    // const peticionFun = new peticion()
    const peticionFun = useMemo(()=>new peticion(),[])

    useEffect(()=>{
        (async function (){
            let data = await peticionFun.get('')
            let data2 = await peticionFun.get('muertos')
            // console.log(data)
            setAdmins(()=> data.users)
            setmuertos(()=> data2.users)
            
        })()
        
        // fetch('http://localhost:3001/')
        //     .then(response => response.json())
        //     .then(data => {
        //         setAdmins(()=> data.users)
        //     })
    },[peticionFun])
    return (
        <>
            <h2>
                esta logeado
            </h2>
            <h4>personas</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo de documento</th>
                        <th>cedula</th>
                        <th>Nombre</th>
                        <th>fecha de nacimiento</th>
                    </tr>
                </thead>
                
                <tbody>
                    {/* <tr>
                        <td>1</td>
                        <td>cc</td>
                        <td>666</td>
                        <th>Apellido</th>
                        <td>carlos</td>
                        <td>vergel</td>
                        <td>2022-08-30</td>
                    </tr> */}
                    
                    {
                        !admins
                        ? <>cargando</>
                        : admins.map((element, i) =>{
                            
                            return <TrAdmins key={i} props={element}/>
                        })
                    }                    
                    
                </tbody> 
                
            </table>


            <h4>muertos</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo de documento</th>
                        <th>cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>fecha nacimiento</th>
                        <th>fecha fallecimiento</th>
                        <th>pais</th>
                        <th>sede</th>
                        
                    </tr>
                </thead>
                
                <tbody>
                    {/* <tr>
                        <td>1</td>
                        <td>cc</td>
                        <td>666</td>
                        <td>carlos</td>
                        <td>vergel</td>
                        <td>2022-08-30</td>
                    </tr> */}
                    
                    {
                        !muertos
                        ? <>cargando</>
                        : muertos.map((element, i) =>{
                            
                            return <TrMuertos key={i} props={element}/>
                        })
                    }                    
                    
                </tbody> 
                
            </table>
        </>
    ) 
}

export default Tables