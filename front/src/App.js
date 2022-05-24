import './App.css'
import Header from './componets/header'
import Footer from './componets/Footer'
import Principal from './pages/Principal'
import Tables from './pages/tables'
import Page404 from './pages/404'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useMemo } from 'react'
import peticion from './utils/peticions'

function App() {

  const peticionFun = useMemo(()=>new peticion(),[])
  useEffect(()=>{
    (async ()=>{
      let data = await peticionFun.post("auth")
      console.log(data)
      
    })()
  },[peticionFun])

  return (
    <>
      <Header></Header>
      
      <BrowserRouter>
        <Routes>  
          <Route exact path="/" element ={ localStorage.getItem('token') == undefined ? <Principal/> : <Tables/>}/>

          <Route path="/register" component={<>hola soy un registro</>} />
          <Route path="*" element={ <Page404/>} />
          
        </Routes>  
      </BrowserRouter>
      

      <Footer></Footer>
    </>
  );
}

export default App;
