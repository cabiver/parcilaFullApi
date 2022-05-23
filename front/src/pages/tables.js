import React, { useEffect, useState } from "react";
import TrAdmins from "../componets/TrAdmis";

const Tables = () => {

    const [admins, setAdmins] =  useState([1,2])
    useEffect(()=>{
        fetch('http://localhost:3001/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAdmins(()=> data)
            })
    },[])

    return (
        <>
            <h2>
                esta logeado
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo de documento</th>
                        <th>cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>fecha de nacimiento</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>cc</td>
                        <td>666</td>
                        <td>carlos</td>
                        <td>vergel</td>
                        <td>2022-08-30</td>
                    </tr>
                    
                    {
                        !admins
                        ? null
                        : admins.map(element => {  
                            <TrAdmins id={element}/>
                        })
                    }
                </tbody> 
                
            </table>
        </>
    ) 
}

export default Tables