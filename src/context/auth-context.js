import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLogged: false,
    onLogin: ()=>{},
    onLogout: ()=>{}
});

export function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

      function userLoggedout(){
        localStorage.removeItem('logged_IN', '1');
        console.log('EFFETTUO LOGOUT');
        setIsLoggedIn(false);
      }

      return (
        <AuthContext.Provider
        value={{
            isLogged: isLoggedIn,
            onLogin: userLoggedin,
            onLogout: userLoggedout
        }}>
            {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContext;