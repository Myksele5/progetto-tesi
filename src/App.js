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
  const [showAccessForm, setShowAccessForm] = 
  useState(
    <Login
    onUserLogin = {userLoggedin}>
    </Login>
  );
  const [schermataMostrata, setSchermataMostrata] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    const key_logged_in = localStorage.getItem('logged_IN');

    if(key_logged_in === '1'){
      setShowAccessForm(null);
      setSchermataMostrata(<Pazienti/>);
      setShowMenu(
        <MainMenu
        makeUserLogout = {userLoggedout}
        showSchermata = {changeSchermata}>
        </MainMenu>
      );
    }
  }, [setShowAccessForm, setSchermataMostrata, setShowMenu]);

  function changeSchermata(schermata){
    console.log('CAMBIO SCHERMATA');

    switch(schermata){
      case 0:
        setSchermataMostrata(<Pazienti/>);
        break;
  
      case 1:
        setSchermataMostrata(<Attività/>);
        break;
  
      case 2:
        setSchermataMostrata(<Giochi/>);
        break;
  
      case 3:
        setSchermataMostrata(<Dialoghi/>);
        break;
  
      default:
        break;
    }
  }

  function userLoggedin(){
    localStorage.setItem('logged_IN', '1');
    console.log('SALVATI DATI DI LOGIN');
    setShowAccessForm(null);
    setSchermataMostrata(<Pazienti/>);
    setShowMenu(
      <MainMenu
      makeUserLogout = {userLoggedout}
      showSchermata = {changeSchermata}>
      </MainMenu>
    );
  }

  function userLoggedout(){
    localStorage.removeItem('logged_IN', '1');
    console.log('EFFETTUO LOGOUT');
    setShowAccessForm(
      <Login
      onUserLogin = {userLoggedin}>
      </Login>
    );
    setSchermataMostrata(null);
    setShowMenu(null);
  }

  return (
    <>
    
      {showMenu}
        
      <div className="App">
        {showAccessForm}
        
        {schermataMostrata}
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