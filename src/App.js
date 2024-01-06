// import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useState } from 'react';

import Login from './components/Accesso/Login';
import Pazienti from './components/Pazienti/Pazienti';
import MainMenu from './components/UI/MainMenu';
import Attività from './components/Attività/Attività';
import Giochi from './components/Giochi/Giochi';
import Dialoghi from './components/Dialoghi/Dialoghi';
import AuthContext from './context/auth-context';
import { PatientContextProvider } from './context/patients-context';
import Modal from './components/UI/Modal';
import { GameContextProvider } from './context/game-context';

function App() {
  const [schermataMostrata, setSchermataMostrata] = useState('');

  const auth_ctx = useContext(AuthContext);

  useEffect(() => {
    if(auth_ctx.tipoAccount === "Paziente"){
      setSchermataMostrata('SCHERMATA_Giochi')
    }
    else{
      setSchermataMostrata('SCHERMATA_Pazienti')
    }
  }, [auth_ctx.tipoAccount])

  function changeSchermata(schermata){
    console.log('CAMBIO SCHERMATA');

    switch(schermata){
      case 0:
        setSchermataMostrata('SCHERMATA_Pazienti');
        break;
  
      case 1:
        setSchermataMostrata('SCHERMATA_Attività');
        break;
  
      case 2:
        setSchermataMostrata('SCHERMATA_Giochi');
        break;
  
      case 3:
        setSchermataMostrata('SCHERMATA_Dialoghi');
        break;
  
      default:
        break;
    }
  }

  return (
    <div className='App'>

      {auth_ctx.utenteLoggato !== null && auth_ctx.logoutModal &&
        <Modal
          testoModale={"Sei sicuro di voler effettuare il logout?"}
          CONFERMA = {() => {
            auth_ctx.onLogout();
          }}
          ANNULLA = {() => {
            auth_ctx.cancelLogout();
          }}
        >
        </Modal>
        
      }
        
      {auth_ctx.utenteLoggato === null && <Login></Login>}

      {auth_ctx.utenteLoggato !== null && 
        
        <MainMenu
          showSchermata = {changeSchermata}>
        </MainMenu>
      
      }

      <PatientContextProvider>
        
        {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Pazienti' && <div className='wrap_schermata'><Pazienti/></div>}
        {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Attività' && <div className='wrap_schermata'><Attività/></div>}
        {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Giochi' && 
          <GameContextProvider>
            <div className='wrap_schermata'>
              <Giochi/>
            </div>
          </GameContextProvider>
            }
        {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Dialoghi' && <div className='wrap_schermata'><Dialoghi/></div>}
      
      </PatientContextProvider>

    </div>
  );
}

export default App;


{/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        // <Login
        // onUserLogin = {userLoggedin}>
        // </Login>

        // <MainMenu
        // makeUserLogout = {userLoggedout}
        // showSchermata = {changeSchermata}>
        // </MainMenu>