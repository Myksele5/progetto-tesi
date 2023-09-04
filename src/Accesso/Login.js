import { useState } from "react";
import Card from "../UI/Card";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function Login(){
    const [mostraLogin, setMostraLogin] = useState(true);

    // const whichFormToShow = (bool) => {
    //     setMostraLogin(bool);
    // }

    function whichFormToShow(bool){
        setMostraLogin(bool);
    }

    let show_login;

    if(mostraLogin){
        show_login=<LoginForm
        onShowMe={whichFormToShow}>
        </LoginForm>
    }

    else{
        show_login=<RegistrationForm
        onShowMe={whichFormToShow}>
        </RegistrationForm>
    }
    return(
        <Card
        children={show_login}>

        </Card>
    );
}

export default Login;