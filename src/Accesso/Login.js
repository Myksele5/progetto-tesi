import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function Login(props){
    const [mostraForm, setMostraForm] = useState('LOGIN');

    function showRegistrationForm(){
        setMostraForm('REGISTRATION');
        console.log('FORM CAMBIATO -> REGISTRAZIONE');
    }

    function showLoginForm(){
        setMostraForm('LOGIN');
        console.log('FORM CAMBIATO -> LOGIN')
    }

    function hideForm(){
        // setMostraForm(null);
        props.onUserLogin();
    }

    return(
        <>
        {mostraForm === 'LOGIN' && 
            <LoginForm
            onLogin = {hideForm}
            goToRegForm = {showRegistrationForm}>
            </LoginForm>
        }
        {mostraForm === 'REGISTRATION' && 
            <RegistrationForm
            goToLoginForm = {showLoginForm}>
            </RegistrationForm>
        }
        </>
    );
}

export default Login;