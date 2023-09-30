// import logo from './logo.svg';
import './App.css';
import Login from './components/Accesso/Login';
import Pazienti from './components/Pazienti/Pazienti';
import MainMenu from './components/UI/MainMenu';
import { useContext, useEffect, useState } from 'react';
import Attività from './components/Attività/Attività';
import Giochi from './components/Giochi/Giochi';
import Dialoghi from './components/Dialoghi/Dialoghi';
import AuthContext from './context/auth-context';
import { PatientContextProvider } from './context/patients-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schermataMostrata, setSchermataMostrata] = useState('SCHERMATA_Pazienti');

  const auth_ctx = useContext(AuthContext);

  // useEffect(() => {
  //   const key_logged_in = localStorage.getItem('logged_IN');

  //   if(key_logged_in === '1'){
  //     setIsLoggedIn(true);
  //     setSchermataMostrata('SCHERMATA_Pazienti');
  //   }
  // }, [setIsLoggedIn, setSchermataMostrata]);

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

  // function userLoggedin(){
  //   localStorage.setItem('logged_IN', '1');
  //   console.log('SALVATI DATI DI LOGIN');
  //   setIsLoggedIn(true);
  //   setSchermataMostrata('SCHERMATA_Pazienti');
  // }

  // function userLoggedout(){
  //   localStorage.removeItem('logged_IN', '1');
  //   console.log('EFFETTUO LOGOUT');
  //   setIsLoggedIn(false);
  //   setSchermataMostrata('');
  // }

  return (
    <>

      {auth_ctx.isLogged && 
        <MainMenu
        // makeUserLogout = {userLoggedout}
        showSchermata = {changeSchermata}>
        </MainMenu>
      }
        
      <div className="App">
        {!auth_ctx.isLogged && 
          <Login
          // onUserLogin = {userLoggedin}
          >
          </Login>
        }
        <PatientContextProvider>
          {auth_ctx.isLogged && schermataMostrata === 'SCHERMATA_Pazienti' && <Pazienti/>}
          {auth_ctx.isLogged && schermataMostrata === 'SCHERMATA_Attività' && <Attività/>}
          {auth_ctx.isLogged && schermataMostrata === 'SCHERMATA_Giochi' && <Giochi/>}
          {auth_ctx.isLogged && schermataMostrata === 'SCHERMATA_Dialoghi' && <Dialoghi/>}
        </PatientContextProvider>
      </div>

    </>
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