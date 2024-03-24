import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import PswDimenticata from "./PswDimenticata";
import CambioPsw from "./CambioPsw";

function Login(){
    const [mostraForm, setMostraForm] = useState('LOGIN');

    function showRegistrationForm(){
        setMostraForm('REGISTRATION');
        console.log('FORM CAMBIATO -> REGISTRAZIONE');
    }

    function showLoginForm(){
        setMostraForm('LOGIN');
        console.log('FORM CAMBIATO -> LOGIN')
    }

    function showRecuperoPassword(){
        setMostraForm('RECUPERO_PASSWORD');
        console.log('FORM CAMBIATO -> RECUPERO_PASSWORD')
    }

    return(
        <>
        {mostraForm === 'LOGIN' && 
        <>
            <LoginForm
                goToPswDiment = {showRecuperoPassword}
                goToRegForm = {showRegistrationForm}
            >
            </LoginForm>
        </>
        }
        {mostraForm === 'REGISTRATION' && 
            <RegistrationForm
                goToLoginForm = {showLoginForm}
            >
            </RegistrationForm>
        }
        {mostraForm === 'RECUPERO_PASSWORD' && 
            <PswDimenticata
                goToLoginForm={showLoginForm}
            >
            </PswDimenticata>
            // <CambioPsw></CambioPsw>
        }
        </>
    );
}

export default Login;