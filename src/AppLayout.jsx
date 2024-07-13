import { Outlet } from "react-router-dom"
// components
import HeaderComponent from "./components/HeaderComponent"
import { useState } from "react"
import NavbarComponent from "./components/NavbarComponent";
import CategoryComponent from "./components/CategoryComponent";

// axios
import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com';

function AppLayout() {

  const [activeHeader, setActiveHeader] = useState(true);
  // useEffect - uzmi CART iz LocalStorage i vrati/napuni ponovo u Redux...
  return (
    <div>
     {activeHeader &&  <HeaderComponent setActiveHeader={setActiveHeader} />}
     <NavbarComponent />
     <CategoryComponent />
     <Outlet />
    </div>
  )
}

export default AppLayout
