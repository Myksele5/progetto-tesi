import React, { useEffect, useState } from "react";
// import Modal from "../components/UI/Modal";
import { onAuthStateChanged, signOut, confirmPasswordReset } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const AuthContext = React.createContext({
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
var email;

export function AuthContextProvider(props){
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [utenteLoggatoUID, setUtenteLoggatoUID] = useState(null);
    const [tipoAccount, setTipoAccount] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const authentication = onAuthStateChanged(auth, (utente) => {
          if(utente){
            setUtenteLoggato(utente.email);
            setUtenteLoggatoUID(utente.uid);
            // email = utente.email;
            // console.log(utente.uid);
            console.log(auth.currentUser.email);
            getAccountType();

          }
          else{
            setUtenteLoggato(null);
          }
        })

        return () => {
          authentication();
        }
    }, []);

    useEffect(() => {
      // console.log(email);
      console.log(tipoAccount);
    }, [tipoAccount])

    async function getAccountType(){
      //Da completare
      const userRef = await getDoc(doc(db, `${auth.currentUser.email}`, `info`));
      if(userRef.exists()){
        console.log(userRef.data().titolo)
        setTipoAccount(userRef.data().titolo)
      }
      else{
        // alert("trovato niente")
        setTipoAccount("Paziente")
      }
      // console.log(userDoc.data());
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
          tipoAccount: tipoAccount,
          confirmPasswordReset: resetPassword
      }}>
          {props.children}
      </AuthContext.Provider>
    );
}

export default AuthContext;