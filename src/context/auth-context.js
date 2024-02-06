import React, { useEffect, useState } from "react";
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
          tipoAccount: tipoAccount,
          nomeUtenteLoggato: nomeUtente,
          cognomeUtenteLoggato: cognomeUtente,
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;