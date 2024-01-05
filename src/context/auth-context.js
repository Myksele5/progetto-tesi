import React, { useEffect, useState } from "react";
// import Modal from "../components/UI/Modal";
import { onAuthStateChanged, signOut, confirmPasswordReset } from "firebase/auth";
import { auth, db } from "../config/firebase-config";

const AuthContext = React.createContext({
    isLogged: false,
    logoutModal: null,
    onLogoutClick: ()=>{},
    cancelLogout: ()=>{},
    onLogout: ()=>{},
    utenteLoggato: null,
    utenteLoggatoUID: null,
    confirmPasswordReset: ()=>{}
});

export function AuthContextProvider(props){
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [utenteLoggatoUID, setUtenteLoggatoUID] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const authentication = onAuthStateChanged(auth, (utente) => {
          if(utente){
            setUtenteLoggato(utente.email);
            setUtenteLoggatoUID(utente.uid);
            console.log(utente.uid);
            console.log(auth.currentUser.email);
          }
          else{
            setUtenteLoggato(null);
          }
        })

        return () => {
          authentication();
        }
    }, []);

    async function getAccountType(){
      //Da completare
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

    async function userLoggedout(){
      // localStorage.removeItem('logged_IN', '1');
      await signOut(auth)
      .catch((err) => {
        console.error(err);
      })
      console.log('EFFETTUO LOGOUT');
      closeModalLogout();
    }

    return (
      <AuthContext.Provider
      value={{
          logoutModal: showLogoutModal,
          onLogoutClick: userClickedLoggedout,
          cancelLogout: closeModalLogout,
          onLogout: userLoggedout,
          utenteLoggato: utenteLoggato,
          utenteLoggatoUID: utenteLoggatoUID,
          confirmPasswordReset: resetPassword
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;