import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Principal = ()=>{
    
  const formLogin = useRef(null);
  const navigate = useNavigate();
  const buttonhandel = () => {
    if (formLogin.current == null) {
      return
    }
    const data = new FormData(formLogin.current)
    console.log(data.get('password'))
    console.log(data.get('cedula'))
    fetch(`http://localhost:3001/log/${data.get('cedula')}/${data.get('password')}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.estado) {
            Cookies.set("token", data.token)
          navigate(0);
        }

    });
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