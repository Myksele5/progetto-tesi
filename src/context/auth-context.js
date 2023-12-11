import React, { useEffect, useState } from "react";
// import Modal from "../components/UI/Modal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

const AuthContext = React.createContext({
    isLogged: false,
    onLogin: ()=>{},
    logoutModal: null,
    onLogoutClick: ()=>{},
    cancelLogout: ()=>{},
    onLogout: ()=>{},
    utenteLoggato: null
});

export function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const authentication = onAuthStateChanged(auth, (utente) => {
          if(utente){
            setUtenteLoggato(utente.email);
            // setIsLoggedIn(true);
            console.log(utente);
          }
          else{
            // setIsLoggedIn(false);
            setUtenteLoggato(null);
          }
        })

        return () => {
          authentication();
        }
    }, []);

    function userLoggedin(){
      // localStorage.setItem('logged_IN', '1');
      // console.log('SALVATI DATI DI LOGIN');
      setIsLoggedIn(true);
    }

    function userClickedLoggedout(){
      setShowLogoutModal(true);
    }

    function closeModalLogout(){
      setShowLogoutModal(false);
    }

    async function userLoggedout(){
      // localStorage.removeItem('logged_IN', '1');
      await signOut(auth)
      .catch((err) => {
        console.error(err);
      })
      console.log('EFFETTUO LOGOUT');
      // setIsLoggedIn(false);
      closeModalLogout();
    }

    return (
      <AuthContext.Provider
      value={{
          isLogged: isLoggedIn,
          onLogin: userLoggedin,
          logoutModal: showLogoutModal,
          onLogoutClick: userClickedLoggedout,
          cancelLogout: closeModalLogout,
          onLogout: userLoggedout,
          utenteLoggato: utenteLoggato
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;