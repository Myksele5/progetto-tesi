// import logo from './logo.svg';
import './App.css';
import Login from './Accesso/Login';
import Pazienti from './Pazienti/Pazienti';
import MainMenu from './UI/MainMenu';
import { useEffect, useState } from 'react';
import Attività from './Attività/Attività';
import Giochi from './Giochi/Giochi';
import Dialoghi from './Dialoghi/Dialoghi';

function App() {
  const [showAccessForm, setShowAccessForm] = useState(true);
  const [schermataMostrata, setSchermataMostrata] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const key_logged_in = localStorage.getItem('logged_IN');

    if(key_logged_in === '1'){
      setShowAccessForm(false);
      setSchermataMostrata('SCHERMATA_Pazienti');
      setShowMenu(true);
    }
  }, [setShowAccessForm, setSchermataMostrata, setShowMenu]);

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

  function userLoggedin(){
    localStorage.setItem('logged_IN', '1');
    console.log('SALVATI DATI DI LOGIN');
    setShowAccessForm(false);
    setSchermataMostrata('SCHERMATA_Pazienti');
    setShowMenu(true);
  }

  function userLoggedout(){
    localStorage.removeItem('logged_IN', '1');
    console.log('EFFETTUO LOGOUT');
    setShowAccessForm(true);
    setSchermataMostrata('');
    setShowMenu(false);
  }

  return (
    <>

      {showMenu && 
        <MainMenu
        makeUserLogout = {userLoggedout}
        showSchermata = {changeSchermata}>
        </MainMenu>
      }
        
      <div className="App">
        {showAccessForm && 
          <Login
          onUserLogin = {userLoggedin}>
          </Login>
        }
        
        {schermataMostrata === 'SCHERMATA_Pazienti' && <Pazienti/>}
        {schermataMostrata === 'SCHERMATA_Attività' && <Attività/>}
        {schermataMostrata === 'SCHERMATA_Giochi' && <Giochi/>}
        {schermataMostrata === 'SCHERMATA_Dialoghi' && <Dialoghi/>}
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