import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Wrapper from "../Utility/Wrapper";

function Login(props){
    const [mostraForm, setMostraForm] = useState(
        <LoginForm
        onLogin = {hideForm}
        goToRegForm = {showRegistrationForm}>
        </LoginForm>
    );

    function showRegistrationForm(){
        setMostraForm(
            <RegistrationForm
            goToLoginForm = {showLoginForm}>
            </RegistrationForm>
        );
        console.log('FORM CAMBIATO -> REGISTRAZIONE');
    }

    function showLoginForm(){
        setMostraForm(
            <LoginForm
            onLogin = {hideForm}
            goToRegForm = {showRegistrationForm}>
            </LoginForm>
        );
        console.log('FORM CAMBIATO -> LOGIN')
    }

    function hideForm(){
        // setMostraForm(null);
        props.onUserLogin();
    }

    // const whichFormToShow = (bool) => {
    //     setMostraLogin(bool);
    // }

    // function whichFormToShow(valore){
    //     if(valore === 'LOGGED'){
    //         setMostraForm('LOGGED');
    //     }
    //     if(valore === 'FORM-LOG_in'){
    //         setMostraForm('FORM-LOG_in');
    //     }
    //     if(valore === 'FORM-REGISTRATION'){
    //         setMostraForm('FORM-REGISTRATION');
    //     }
    // }

    return(
        <Wrapper
        children={mostraForm}>
        </Wrapper>
    );
}

export default Login;