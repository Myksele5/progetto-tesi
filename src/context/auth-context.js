import React, { useEffect, useState } from "react";
import { getServerMgr } from "../backend_conn/ServerMgr";
// import Modal from "../components/UI/Modal";

const AuthContext = React.createContext({
    login: ()=>{},
    isLogged: false,
    logoutModal: null,
    onLogoutClick: ()=>{},
    cancelLogout: ()=>{},
    onLogout: ()=>{},
    utenteLoggato: null,
    utenteLoggatoUID: null,
    mantieniUtenteLoggato: ()=>{},
    tipoAccount: null,
    nomeUtenteLoggato: null,
    cognomeUtenteLoggato: null,
    confirmPasswordReset: ()=>{}
});
// var email;

export function AuthContextProvider(props){
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [utenteLoggatoUID, setUtenteLoggatoUID] = useState(null);
    const [tipoAccount, setTipoAccount] = useState('');
    const [nomeUtente, setNomeUtente] = useState('');
    const [cognomeUtente, setCognomeUtente] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
      if(localStorage.getItem('UID') !== null){
        keepUserLogged();
      }
    }, [])

    function setAccountLogged(email, UID, tipoAccount, nome, cognome){
      setUtenteLoggato(email);
      setUtenteLoggatoUID(UID);
      setNomeUtente(nome);
      setCognomeUtente(cognome);
      switch(tipoAccount){
        case 1:
          setTipoAccount("Dottore");
          break;
        case 2:
          setTipoAccount("Dottoressa");
          break;
        case 3:
          setTipoAccount("Paziente");
          break;
        default:
          break;
      }
    }

    async function keepUserLogged(){
      let result = await getServerMgr().keepUserLoggedIn(localStorage.getItem('UID'))
      .catch((err) => {console.error(err)})

      if(result){
        setUtenteLoggatoUID(localStorage.getItem('UID'))
        setUtenteLoggato(result[0].email);
        setNomeUtente(result[0].nome)
        setCognomeUtente(result[0].cognome)
        switch(result[0].titolo){
          case 1:
            setTipoAccount("Dottore");
            break;
          case 2:
            setTipoAccount("Dottoressa");
            break;
          case 3:
            setTipoAccount("Paziente");
            break;
          default:
            break;
        }
      }
      console.log(result);
    }

    function userClickedLoggedout(){
      setShowLogoutModal(true);
    }

    function closeModalLogout(){
      setShowLogoutModal(false);
    }

    function userLoggedout(){
      // localStorage.removeItem('logged_IN', '1');
      console.log('EFFETTUO LOGOUT');
      setUtenteLoggato(null);
      setUtenteLoggatoUID(null);
      setTipoAccount('');
      closeModalLogout();
    }

    return (
      <AuthContext.Provider
      value={{
          login: setAccountLogged,
          logoutModal: showLogoutModal,
          onLogoutClick: userClickedLoggedout,
          cancelLogout: closeModalLogout,
          onLogout: userLoggedout,
          utenteLoggato: utenteLoggato,
          utenteLoggatoUID: utenteLoggatoUID,
          mantieniUtenteLoggato: keepUserLogged,
          tipoAccount: tipoAccount,
          nomeUtenteLoggato: nomeUtente,
          cognomeUtenteLoggato: cognomeUtente,
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;