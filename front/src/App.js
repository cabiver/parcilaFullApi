import './App.css'
import Header from './componets/header'
import Footer from './componets/Footer'
import Principal from './pages/Principal'
import Tables from './pages/tables'
import Page404 from './pages/404'
import Insert from './pages/insert'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useEffect, useMemo } from 'react'
import peticion from './utils/peticions'
import Search from './pages/search'

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
      <BrowserRouter>
        <Routes>  
          <Route exact path="/" element ={ !localStorage.getItem('token')?<> <Header/> <Principal/> </> :<> <Header/> <Tables/> <Footer/> </>}/>
          <Route path="/search" element={ <> <Header/> <Search/> <Footer/> </> } />
          <Route path="/insert" element={ <> <Header/> <Insert/> <Footer/> </>}></Route>
          <Route path="*" element={ <Page404/>} />
          
        </Routes>  
      </BrowserRouter>
      
    </>
  );
}

export default App;
