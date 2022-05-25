import React, { useEffect, useMemo, useState, useRef } from "react";
import peticion from "../utils/peticions";

import { useNavigate } from "react-router-dom";


const Insert = () => {

    const formLogin = useRef(null);
    const formMuerto = useRef(null);
    const navigate = useNavigate();
    const [Sadmins, setAdmins] = useState(null)
    const [Smuertos, setMuertos] = useState(null)
    const [Scliente, setCliente] = useState(null)
    // const peticionFun = new peticion()
    const peticionFun = useMemo(() => new peticion(), [])

    useEffect(() => {
        (async function () {
            let data = await peticionFun.get('selectAdmins')
            let data2 = await peticionFun.get('selectMuerto')
            let data3 = await peticionFun.get('selectPersonas')
            setAdmins(() => data.users)
            setMuertos(() => data2.users)
            setCliente(() => data3.users)
        })()

        // fetch('http://localhost:3001/')
        //     .then(response => response.json())
        //     .then(data => {
        //         setAdmins(()=> data.users)
        //     })
    }, [peticionFun])

    const formPersona = useRef(null);
    const submitPersona = async () => {

        if (formLogin.current == null) {
            return
        }
        const data = new FormData(formPersona.current)
        await peticionFun.post('addPersona', { tipoDocumento: data.get("tipoDocumento"), cedula: data.get("cedula"), nombre: data.get("nombre"), apellido: data.get("apellido"), fechaNacimiento: data.get("fechaNacimiento") })
        navigate('/');
    }

    const submitHandel = async () => {

        if (formLogin.current == null) {
            return
        }
        const data = new FormData(formLogin.current)
        await peticionFun.post('addEntierro', { idAmin: data.get("idAdmin"), idCliente: data.get("idCliente"), idMuerto: data.get("idMuerto"), costo: data.get("costo"), fechaPeticion: data.get("fechaPeticion") })
    }

    const submitMuerto = async () => {
        if (formLogin.current == null) {
            return
        }
        const data = new FormData(formMuerto.current)
        let response = await peticionFun.post('addMuerto', { pais: data.get('pais'), sede: data.get('sede'), idMuerto: data.get('idMuerto'), fechaFallecimiento: data.get('fechaFallecimiento') })
        console.log(response)
    }
    return (
        <>
            <div style={{
                marginTop:"6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                <div style={{
                    backgroundColor: "#453",
                    padding: "14px 14px",
                    borderRadius:"12px",
                    marginTop:"25px",
                    textAlign:"center"
                }}>
                    <h4>detalle dentierro</h4>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%",
                        padding: "12px",
                        textAlign:"center"
                    }} ref={formLogin}>
                        <select placeholder="idAdmin" name="idAdmin">
                            {
                                !Sadmins
                                    ? <option> load</option>
                                    : Sadmins.map((element) => <option key={element.idAdmin} value={element.idAdmin}>{element.nombre}</option>)
                            }
                        </select>
                        <select placeholder="idCliente" name="idCliente">
                            {
                                !Scliente
                                    ? <option> load</option>
                                    : Scliente.map((element) => <option key={element.idCliente} value={element.idCliente}>{element.nombre}</option>)
                            }
                        </select>
                        <select placeholder="idMuerto" name="idMuerto">
                            {
                                !Smuertos
                                    ? <option> load</option>
                                    : Smuertos.map((element) => <option key={element.idMuerto} value={element.idMuerto}>{element.nombre}</option>)
                            }

                        </select>
                        <input placeholder="costo" name="costo">
                        </input>
                        <input placeholder="fechaPeticion" type="date" name="fechaPeticion">
                        </input>
                        <button type="button" onClick={submitHandel}>send</button>
                    </form>
                </div>
                <div style={{
                    backgroundColor: "#453",
                    padding: "14px 14px",
                    borderRadius:"12px",
                    marginTop:"25px",
                    textAlign:"center"

                }}>
                    <h4>cliente</h4>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%",
                        padding: "12px"
                    }} ref={formPersona}>
                        <input placeholder="tipo de documento" name="tipoDocumento">
                        </input>
                        <input placeholder="cedula" name="cedula">
                        </input>
                        <input placeholder="nombre" name="nombre">
                        </input>
                        <input placeholder="apellido" name="apellido">
                        </input>
                        <input placeholder="fecha de nacimineto" type="date" name="fechaNacimiento">
                        </input>
                        <button type="button" onClick={submitPersona}>send</button>
                    </form>
                </div>
                <div style={{
                    backgroundColor: "#453",
                    padding: "14px 14px",
                    borderRadius:"12px",
                    marginTop:"25px",
                    textAlign:"center"
                }}>
                    <h4>muerto</h4>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%",
                        padding: "12px"
                    }} ref={formMuerto}>
                        <input placeholder="Cedula del muerto" name="idMuerto">
                        </input>
                        <input placeholder="sede" name="sede">
                        </input>
                        <input placeholder="pais" name="pais">
                        </input>
                        <input type="date" placeholder="fecha de fallecimiento" name="fechaFallecimiento">
                        </input>
                        <button type="button" onClick={submitMuerto}>send</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Insert