import GenericButton from "../UI/GenericButton";
import styles from "./RegistrationForm.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function RegistrationForm(props){
    // const listaUtentiReference = doc(db, "listaUtenti")
    var emailEsistente = null;
    const [registrEffettuata, setRegistrEffettuata] = useState(null);

    const [titolo, setTitolo] = useState("Dottore");
    let titoloID;

    const [validNome, setValidNome] = useState(true);
    const [nome, setNome] = useState("");

    const [validCognome, setValidCognome] = useState(true);
    const [cognome, setCognome] = useState("");

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    const submitRegistration = async (event) =>{
        event.preventDefault();
        let result;

        switch(titolo){
            case "Dottore":
                titoloID = 1;
                break;
            case "Dottoressa":
                titoloID = 2;
                break;
            default:
                break;
        }

        if(email.includes('@') && password.trim().length >= 6){
            console.log("MANDO DATI PER LOGIN");

            result = await getServerMgr().getAccount()
            .catch((err) => {
                console.error(err);
            });

            if(result !== undefined){
                for(var i=0; i < result.length; i++){
                    if(result[i].email === email){
                        setValidNome(false);
                        setValidCognome(false);
                        setValidEmail(false);
                        setValidPassword(false);
                        // setABuonFine(false);
                        emailEsistente = true;
                        alert("Email già associata ad un account!");
                        break;
                    }
                    else{
                        emailEsistente = false;
                    }
                }
                if(!emailEsistente){
                    let result2;
                    result2 = await getServerMgr().addAccount(nome, cognome, titoloID, email, password)
                    .then(alert("ACCOUNT CREATO!"))
                    .catch((err) => {
                        console.error(err);
                        // setRegistrEffettuata(false);
                    });
                }
            }
            else{
                let result2;
                result2 = await getServerMgr().addAccount(nome, cognome, titoloID, email, password)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                })
                // alert("NESSUN ACCOUNT TROVATO");
            }        
        }
    }

    useEffect(() => {
        setValidEmail(true);
        setValidPassword(true);
        setValidNome(true);
        setValidCognome(true);
        emailEsistente = null;
    }, [nome,cognome,email,password,titolo]);

    const goToLoginForm = () => {
        // console.log("VAI AL FORM PER LOGGARE");
        props.goToLoginForm();
        // props.onShowMe('FORM-LOG_in');
    }

    const titoloChangeHandler = (event) =>{
        setTitolo(event.target.value);
        console.log(event.target.value);
    }

    const nomeChangeHandler = (event) =>{
        setNome(event.target.value);
        setValidNome(true);
    }

    const cognomeChangeHandler = (event) =>{
        setCognome(event.target.value);
        setValidCognome(true);
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
        setValidEmail(true);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
        setValidPassword(true);
    }

    return(
        <Card
        children = {
            <form className={styles.center_elements} onSubmit={submitRegistration}>
                <h1 className={styles.title}>Registrazione</h1>

                <label className={styles.label_box}>Titolo</label>
                <select onChange={titoloChangeHandler} className={styles.dropdown_box}>
                    <option className={styles.dropdown_box}>Dottore</option>
                    <option className={styles.dropdown_box}>Dottoressa</option>
                </select>

                <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci la tua email" value={email} onChange={emailChangeHandler}></input>
                
                <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Password</label>
                <input className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`}type="password" placeholder="Inserisci la tua password" value={password} onChange={passwordChangeHandler}></input>

                <label className={`${styles.label_box} ${!validNome ? styles.invalid : ''}`}>Nome</label>
                <input className={`${styles.input_box} ${!validNome ? styles.invalid : ''}`} type="text" placeholder="Inserisci nome" value={nome} onChange={nomeChangeHandler}></input>

                <label className={`${styles.label_box} ${!validCognome ? styles.invalid : ''}`}>Cognome</label>
                <input className={`${styles.input_box} ${!validCognome ? styles.invalid : ''}`} type="text" placeholder="Inserisci cognome" value={cognome} onChange={cognomeChangeHandler}></input>
                
                {emailEsistente !== null && !emailEsistente && <h2>Registrazione effettuata!</h2>}
                {/* {emailEsistente !== null && emailEsistente && <h2>Email già registrata al sito. Prova con un'altra</h2>} */}

                <GenericButton
                    type="submit"
                    generic_button={true}
                    buttonText = 'Registrati'
                >
                </GenericButton>

                <h5 className={styles.log_reg} onClick={goToLoginForm}>Hai già un account? Accedi!</h5>
            </form>
        }>
        </Card>
    );
}

export default RegistrationForm;