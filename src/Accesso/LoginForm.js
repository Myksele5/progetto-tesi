import { useState } from "react";
import styles from "./LoginForm.module.css";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";

function LoginForm(props){
    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    const goToRegistrationForm = () => {
        // console.log("DEVO ANDARE ALLA REGISTRAZIONE");
        props.goToRegForm();
        // props.onShowMe('FORM-REGISTRATION');
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
        setValidEmail(true);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
        setValidPassword(true);
    }

    const submitLogin = (event) => {
        event.preventDefault();
        if(email.includes('@') && password.trim().length >= 6){
            console.log("MANDO DATI PER LOGIN");
            props.onLogin();
        }
        else{
            if(!email.includes('@')){
                setValidEmail(false);
            }
            if(password.trim().length < 6){
                setValidPassword(false);
            }
        }
    }

    return(
        <Card
        children = {
            <form className={styles.center_elements} onSubmit={submitLogin}>
                <h1 className={styles.title}>Login</h1>

                <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci la tua email" value={email} onChange={emailChangeHandler}></input>
                
                <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Password</label>
                <input className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`}type="password" placeholder="Inserisci la tua password" value={password} onChange={passwordChangeHandler}></input>
                
                <GenericButton
                type = "submit"
                generic_button={true}
                buttonText = 'Accedi'>
                </GenericButton>
                
                <h5 className={styles.log_reg} onClick={goToRegistrationForm}>Clicca qui per registrarti!</h5>
                <h5 className={styles.psw_dimenticata}>Password dimenticata?</h5>
            </form>
        }>
        </Card>
    );
}

export default LoginForm;