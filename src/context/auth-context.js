import React, { useEffect, useState } from "react";
// import Modal from "../components/UI/Modal";
import { onAuthStateChanged, signOut, confirmPasswordReset } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
    confirmPasswordReset: ()=>{}
});
// var email;

export function AuthContextProvider(props){
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [utenteLoggatoUID, setUtenteLoggatoUID] = useState(null);
    const [tipoAccount, setTipoAccount] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // useEffect(() => {
    //     const authentication = onAuthStateChanged(auth, (utente) => {
    //       if(utente){
    //         setUtenteLoggato(utente.email);
    //         setUtenteLoggatoUID(utente.uid);
    //         // email = utente.email;
    //         // console.log(utente.uid);
    //         console.log(auth.currentUser.email);
    //         getAccountType();

    //       }
    //       else{
    //         setUtenteLoggato(null);
    //       }
    //     })

    //     return () => {
    //       authentication();
    //     }
    // }, []);

    // useEffect(() => {
    //   // console.log(email);
    //   console.log(tipoAccount);
    // }, [tipoAccount])

    function setAccountLogged(email, UID, tipoAccount){
      setUtenteLoggato(email);
      setUtenteLoggatoUID(UID);
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

    async function resetPassword(oobCode, newPassword){
      await confirmPasswordReset(auth, oobCode, newPassword)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.error(err)
      });
      return ;
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
          confirmPasswordReset: resetPassword
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;