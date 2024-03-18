import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './App.css';
import CambioPsw from "./components/Accesso/CambioPsw";
import Pazienti from "./components/Pazienti/Pazienti";
import Patologie from "./components/Patologie/Patologie";
import Attività from "./components/Attività/Attività";
import Giochi from "./components/Giochi/Giochi";
import Login from "./components/Accesso/Login";
import MainMenu from "./components/UI/MainMenu";

function RoutingNew(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/:userID/pazienti" element={
                    <>
                        <MainMenu
                            selected={"PAZIENTI"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Pazienti></Pazienti>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/:userID/patologie" element={
                    <>
                        <MainMenu
                            selected={"PATOLOGIE"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Patologie></Patologie>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/:userID/test" element={
                    <>
                        <MainMenu
                            selected={"TEST"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Attività></Attività>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/:userID/giochi" element={
                    <>
                        <MainMenu
                            selected={"GIOCHI"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Giochi></Giochi>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/psw_recovery" element={<CambioPsw></CambioPsw>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutingNew;