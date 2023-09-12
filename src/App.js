// import logo from './logo.svg';
import './App.css';
import Login from './Accesso/Login';
import Pazienti from './Pazienti/Pazienti';
import MainMenu from './MainMenu';
import { useState } from 'react';
import Attività from './Attività/Attività';
import Giochi from './Giochi/Giochi';
import Dialoghi from './Dialoghi/Dialoghi';

function App() {
  let [schermataMostrata, setSchermataMostrata] = useState(<Pazienti/>);

  // var choice = 0;

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

  return (
    <div className="App">
      
      <header className="App-header">
        <MainMenu
        showSchermata = {changeSchermata}>
        </MainMenu>

        <div className='wrap_schermata'>
          {schermataMostrata}
        </div>

        {/* <div className='wrap_login'>
          <Login></Login>
        </div> */}

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
      </header>
    </div>
  );
}

export default App;
