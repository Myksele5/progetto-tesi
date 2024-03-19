import { useContext, useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

function LoginForm(props){
    const auth_ctx = useContext(AuthContext);

    const [erroreLogin, setErroreLogin] = useState(false);

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('UID') !== null){
            auth_ctx.mantieniUtenteLoggato();
            if(auth_ctx.tipoAccount === "Paziente"){
                navigate(`/giochi/${auth_ctx.utenteLoggatoUID}`)
            }
            else{
                navigate(`/pazienti/${auth_ctx.utenteLoggatoUID}`)
            }
        }
    }, [])

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

    const submitLogin = async (event) => {
        event.preventDefault();
        let result;

        if(email.includes('@') && password.trim().length >= 6){
            result = await getServerMgr().getLogin(email, password)
            .catch((err) => {
                console.error(err);
            });
        }

        if(result !== undefined && result !== null){
            console.log("PROVA", result[0]);
            auth_ctx.login(email, result[0].UID, result[0].titolo, result[0].nome, result[0].cognome)
            localStorage.setItem('UID', result[0].UID);
            if(result[0].titolo === 3){
                navigate(`/giochi/${result[0].UID}`);
            }
            else{
                navigate(`/pazienti/${result[0].UID}`);
            }
        }
        else{
            setValidEmail(false);
            setValidPassword(false);
            setErroreLogin(true);
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
                
                {erroreLogin && <h2 style={{fontSize: "18px" ,color: "red"}}>Credenziali non corrette</h2>}

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