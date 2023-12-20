import GenericButton from "../UI/GenericButton";
import styles from "./RegistrationForm.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

var SALVADATI = false;

function RegistrationForm(props){
    // const listaUtentiReference = doc(db, "listaUtenti")
    const [aBuonFine, setABuonFine] = useState(null);

    const [titolo, setTitolo] = useState("Dottore");

    const [validNome, setValidNome] = useState(true);
    const [nome, setNome] = useState("");

    const [validCognome, setValidCognome] = useState(true);
    const [cognome, setCognome] = useState("");

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    useEffect(() => {
        setABuonFine(null);
        SALVADATI = false;
    }, [nome,cognome,email,password,titolo]);

    useEffect(() => {
        SALVADATI = false;
    }, []);

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

    const submitRegistration = async (event) =>{
        event.preventDefault();
        if(email.includes('@') && password.trim().length >= 6){
            console.log("MANDO DATI PER LOGIN");
            
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                console.log(userCredential.user.uid);
                SALVADATI = true;
                setABuonFine(true);
            })
            .catch((FirebaseAuthUserCollisionException) => {
                SALVADATI = false;
                setABuonFine(false);
            })
            .catch((err) => {
                console.log(err);
            })

            if(SALVADATI){
                await setDoc(doc(db, `${email}`, `info`), {
                    nome: nome,
                    cognome: cognome,
                    email: email,
                    password: password,
                    titolo: titolo,
                    UID: auth.currentUser.uid
                })
                .catch((err) => {
                    console.log(err);
                });

                // await setDoc(doc(db, `${email}`, `info`, `listaPazienti`), {})
                // .catch((err) => {
                //     console.log(err);
                // });

                // await setDoc(doc(db, `${email}`, `info`, `listaGiochi`), {})
                // .catch((err) => {
                //     console.log(err);
                // });

                // const creaGiochiSubCollectionsReference = doc(db, `listaUtenti`, `${auth.currentUser.uid}`, `giochi`, `listaGiochi`);
                // await setDoc(creaGiochiSubCollectionsReference, {})
                // .catch((err) => {
                //     console.log(err);
                // });

                // const creaPazientiSubCollectionsReference = doc(db, `listaUtenti`, `${auth.currentUser.uid}`, `pazienti`, `listaPazienti`);
                // await setDoc(creaPazientiSubCollectionsReference, {})
                // .catch((err) => {
                //     console.log(err);
                // });

                await sendEmailVerification(auth.currentUser);
            }
            
        }
        else{
            if(!email.includes('@')){
                setValidEmail(false);
            }
            if(password.trim().length < 6){
                setValidPassword(false);
            }
            if(nome.trim().length < 2){
                setValidNome(false);
            }
            if(nome.trim().length < 2){
                setValidCognome(false);
            }
        }
    }

    return(
        <Card
        children = {
            <form className={styles.center_elements}>
                <h1 className={styles.title}>Registrazione</h1>

                <label className={styles.label_box}>Titolo</label>
                <select onChange={titoloChangeHandler} className={styles.dropdown_box}>
                    <option>Dottore</option>
                    <option>Dottoressa</option>
                </select>

                <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci la tua email" value={email} onChange={emailChangeHandler}></input>
                
                <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Password</label>
                <input className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`}type="password" placeholder="Inserisci la tua password" value={password} onChange={passwordChangeHandler}></input>

                <label className={`${styles.label_box} ${!validNome ? styles.invalid : ''}`}>Nome</label>
                <input className={`${styles.input_box} ${!validNome ? styles.invalid : ''}`} type="text" placeholder="Inserisci nome" value={nome} onChange={nomeChangeHandler}></input>

                <label className={`${styles.label_box} ${!validCognome ? styles.invalid : ''}`}>Cognome</label>
                <input className={`${styles.input_box} ${!validCognome ? styles.invalid : ''}`} type="text" placeholder="Inserisci cognome" value={cognome} onChange={cognomeChangeHandler}></input>
                
                {aBuonFine !== null && aBuonFine && <h2>Registrazione effettuata!</h2>}
                {aBuonFine !== null && !aBuonFine && <h2>Email già registrata al sito. Prova con un'altra</h2>}

                <GenericButton
                    onClick={submitRegistration}
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