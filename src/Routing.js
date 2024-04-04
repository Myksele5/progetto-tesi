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
import QRCodeLogin from "./components/Accesso/QRCodeLogin";
import Domande from "./components/Giochi/Domande";
import CreaDomanda from "./components/Giochi/CreaDomanda";

function RoutingNew(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/QRCodeLogin/:UID" element={<QRCodeLogin></QRCodeLogin>}></Route>
                <Route path="/pazienti/:userID" element={
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
                <Route path="/patologie/:userID" element={
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
                <Route path="/test/:userID" element={
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
                <Route path="/giochi/:userID" element={
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
                <Route path="/domande/:userID" element={
                    <>
                        <MainMenu
                            selected={"DOMANDE"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Domande></Domande>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/domande/creaDomanda/:userID" element={
                    <>
                        <MainMenu
                            selected={"DOMANDE"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <CreaDomanda></CreaDomanda>
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