import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CambioPsw from "./components/Accesso/CambioPsw";

function RoutingNew(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App></App>}></Route>
                <Route path="/psw_recovery" element={<CambioPsw></CambioPsw>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutingNew;