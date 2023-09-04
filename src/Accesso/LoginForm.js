import { useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./LoginForm.module.css";

function LoginForm(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToRegistrationForm = () => {
        console.log("DEVO ANDARE ALLA REGISTRAZIONE");
        const booleano = false;
        props.onShowMe(booleano);
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
    }

    return(
        <form className={styles.center_elements}>
            <h1>Login</h1>

            <div>
                <label>Email<br/></label>
                <input type="email" className={styles.input_box} placeholder="Inserisci la tua email" value={email} onChange={emailChangeHandler}></input>
            </div>
            
            <div>
                <label>Password<br/></label>
                <input type="password" className={styles.input_box} placeholder="Inserisci la tua password" value={password} onChange={passwordChangeHandler}></input>
            </div>
            
            <GenericButton>
                Accedi
            </GenericButton>
            
            <h5 onClick={goToRegistrationForm}>Clicca qui per registrarti!</h5>
            <h5 className={styles.psw_dimenticata}>Password dimenticata?</h5>
        </form>
    );
}

export default LoginForm;