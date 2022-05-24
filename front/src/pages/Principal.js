import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import peticion from "../utils/peticions";

const Principal = ()=>{
    
  const formLogin = useRef(null);
  const peticionFun =useMemo(() => new peticion())
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

    // fetch(`http://localhost:3001/log/${data.get('cedula')}/${data.get('password')}`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data)
    // })
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data)
      //   if (data.estado) {
      //     localStorage.setItem("token", data.token)
      //     navigate(0);
      //   }

    // });
  }

  return (

    <div>
      <form ref={formLogin}>
        <input name='cedula' placeholder='cedula'>
        </input>
        <input name='password' type='password' placeholder='password'>
        </input>
        <button type="button" onClick={buttonhandel}>
          entar
        </button>
        <button type="button" onClick={buttonhandel}>
          registrarse
        </button>
      </form>

    </div>

  );
}
export default Principal