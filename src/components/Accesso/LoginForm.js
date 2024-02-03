import { useContext, useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import AuthContext from "../../context/auth-context";

function LoginForm(props){
    const auth_ctx = useContext(AuthContext);

    const [erroreLogin, setErroreLogin] = useState(false);

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    useEffect(() => {
        setValidEmail(true);
        setValidPassword(true);
        setErroreLogin(false);
    }, [email,password]);

    const goToRegistrationForm = () => {
        // console.log("DEVO ANDARE ALLA REGISTRAZIONE");
        props.goToRegForm();
        // props.onShowMe('FORM-REGISTRATION');
    }

    const goToRecoverPassword = () => {
        props.goToPswDiment();
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
    }

    // const submitLogin = async (event) => {
    //     event.preventDefault();
    //     if(email.includes('@') && password.trim().length >= 6){
    //         console.log("MANDO DATI PER LOGIN");
    //         await signInWithEmailAndPassword(auth, email, password)
    //         .catch((FirebaseAuthInvalidCredentialsException) =>{
    //             setErroreLogin(true);
    //             setValidEmail(false);
    //             setValidPassword(false);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    //     }
    //     else{
    //         if(!email.includes('@')){
    //             setValidEmail(false);
    //         }
    //         if(password.trim().length < 6){
    //             setValidPassword(false);
    //         }
    //     }
    // }

    const submitLogin = async (event) => {
        event.preventDefault();
        let result;

        if(email.includes('@') && password.trim().length >= 6){
            result = await getServerMgr().getLogin(email, password)
            .catch((err) => {
                console.error(err);
            });
        }

        if(result !== undefined){
            console.log("PROVA", result[0]);
            auth_ctx.login(email, result[0].UID, result[0].titolo)
            
        }
        else{
            setValidEmail(false);
            setValidPassword(false);
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
                
                {erroreLogin && <h2 style={{color: "red"}}>Credenziali non corrette</h2>}

                <GenericButton
                    type = "submit"
                    generic_button={true}
                    buttonText = 'Accedi'
                >
                </GenericButton>

                {/* <h1>{`LOGGATO CON ${auth_ctx.utenteLoggato}`} </h1> */}
                
                <h5 className={styles.log_reg} onClick={goToRegistrationForm}>Clicca qui per registrarti!</h5>
                <h5 className={styles.psw_dimenticata} onClick={goToRecoverPassword}>Password dimenticata?</h5>
            </form>
        }>
        </Card>
    );
}

export default LoginForm;