import React, { useEffect, useState } from "react";
import Modal from "../components/UI/Modal";

const AuthContext = React.createContext({
    isLogged: false,
    onLogin: ()=>{},
    logoutModal: null,
    onLogoutClick: ()=>{},
    cancelLogout: ()=>{},
    onLogout: ()=>{}
});

export function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const key_logged_in = localStorage.getItem('logged_IN');
    
        if(key_logged_in === '1'){
          setIsLoggedIn(true);
        }
      }, [setIsLoggedIn]);

      function userLoggedin(){
        localStorage.setItem('logged_IN', '1');
        console.log('SALVATI DATI DI LOGIN');
        setIsLoggedIn(true);
      }

      function userClickedLoggedout(){
        setShowLogoutModal(true);
      }

      function closeModalLogout(){
        setShowLogoutModal(false);
      }

      function userLoggedout(){
        localStorage.removeItem('logged_IN', '1');
        console.log('EFFETTUO LOGOUT');
        setIsLoggedIn(false);
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
            onLogout: userLoggedout
        }}>
            {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContext;