import './App.css'
import Header from './componets/header'
import Footer from './componets/Footer'
import Principal from './pages/Principal'
import Tables from './pages/tables'
import Page404 from './pages/404'

import Cookies from 'js-cookie'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Header></Header>
      
      <BrowserRouter>
        <Routes>  
          <Route exact path="/" element ={ Cookies.get("token") === undefined ? <Principal/> : <Tables/>}/>

          <Route path="/register" component={<>hola soy un registro</>} />
          <Route path="*" element={ <Page404/>} />
          
        </Routes>  
      </BrowserRouter>
      

      <Footer></Footer>
    </>
  );
}

export default App;
