import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import peticion from "../utils/peticions";



const Principal = () => {

  const formLogin = useRef(null);
  // const peticionFun = useMemo(() => new peticion())
  const peticionFun = new peticion()
  const navigate = useNavigate();
  const buttonhandel = async () => {
    if (formLogin.current == null) {
      return
    }
    const data = new FormData(formLogin.current)

    const response = await peticionFun.post(`log/${data.get('cedula')}/${data.get('password')}`)
    console.log(response)
    if (response.estado) {
      localStorage.setItem("token", response.token)
      navigate(0);
    }

  }

  return (

    <div style={{display:"flex",
    justifyContent:"center",
    marginTop:"20px"
    }}>
      <form style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        backgroundColor: "#f44",
        borderRadius:"12px"
      }} className="p-3" ref={formLogin}>
        <label>cedula de usuario admin</label>
        <input name='cedula' placeholder='cedula'>
        </input>
        <label>contraseña</label>
        <input name='password' type='password' placeholder='password'>
        </input>
        <button type="button" onClick={buttonhandel}>
          entar
        </button>
        
      </form>

    </div>

  );
}
export default Principal