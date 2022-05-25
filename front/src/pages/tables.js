import React, { useEffect, useMemo, useState } from "react";
import TrAdmins from "../componets/TrAdmis";
import TrEntierros from "../componets/TrEntierros";
import TrMuertos from "../componets/TrMuertos";
import peticion from "../utils/peticions";


const Tables = () => {

    const [admins, setAdmins] = useState(null)
    const [muertos, setMuertos] = useState(null)
    const [entierros, setEntierros] = useState(null)
    const peticionFun = useMemo(() => new peticion(), [])

    useEffect(() => {
        (async function () {
            let data = await peticionFun.get('')
            let data2 = await peticionFun.get('muertos')
            let data3 = await peticionFun.get('entierros')
            setAdmins(() => data.users)
            setMuertos(() => data2.users)
            setEntierros(() => data3.users)
        })()
    }, [peticionFun])
    return (
        <>
            <h4>personas</h4>
            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>
            <table className="table table-striped" style={{
                width:"80%"
            }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>tipo DNI</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>fecha de nacimiento</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !admins
                            ? <>cargando</>
                            : admins.map((element, i) => {

                                return <TrAdmins key={i} props={element} />
                            })
                    }

                </tbody>

            </table>
            </div>

            <h4>muertos</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>tipo DNI</th>
                        <th>cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>nacimiento</th>
                        <th>fallecimiento</th>
                        <th>pais</th>
                        <th>sede</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !muertos
                            ? <>cargando</>
                            : muertos.map((element, i) => {

                                return <TrMuertos key={i} props={element} />
                            })
                    }
                </tbody>
            </table>
            <hr></hr>
            <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nom Admin</th>
                        <th>estado</th>
                        <th>DNI admin</th>
                        <th>nom Cliente</th>
                        <th>ape Cliente</th>
                        <th>dni</th>
                        <th>cedula</th>
                        <th>nom Muerto</th>
                        <th>ape Muerto</th>
                        <th>dni</th>
                        <th>Nacimiento</th>
                        <th>Fallecimiento</th>
                        <th>sede</th>
                        <th>pais</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !entierros
                            ? <>cargando</>
                            : entierros.map((element, i) => {

                                return <TrEntierros key={i} props={element} />
                            })
                    }
                </tbody>
            </table>
            </div>
            
        </>
    )
}

export default Tables