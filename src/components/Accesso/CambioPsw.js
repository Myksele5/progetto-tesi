import styles from "./CambioPsw.module.css";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import Card from "../UI/Card";
import { useContext, useEffect, useState } from "react";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase-config";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
// import { auth } from "../../config/firebase-config";

function CambioPsw(){
    const [singletonHasLoaded, setSingletonHasLoaded] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(true);
    // const [validEmail, setValidEmail] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    // const [email, setEmail] = useState('');
    const [PSWChanged, setPSWChanged] = useState(false);
    
    const location = useLocation();

    const auth_ctx = useContext(AuthContext);
    const query = getQuery();

    useEffect(() => {
        initSingleton()
        .then(setSingletonHasLoaded(true))
      }, [])

    useEffect(() => {
        setValidNewPassword(true);
        // const query = getQuery();
        console.log(query.get('code'));
    }, [newPassword])

    function initSingleton(){
        return new Promise((resolve, reject) => {
          getServerMgr(resolve)
        })
      }

    function getQuery(){
        return new URLSearchParams(location.search);
    }

    const passwordChangeHandler = (event) => {
        setNewPassword(event.target.value);
    }

    const submitChangePassword = async (event) => {
        event.preventDefault();

        let result;

        result = await getServerMgr().pswRecovery_reset(newPassword, query.get('code'))
        .then(console.log(result))
        .catch((err) => {
            console.error(err)
        });
        // setValidNewPassword(true);

        // auth_ctx.confirmPasswordReset(query.get('oobCode'), newPassword)
        // .then(() => {
        //     alert("Password cambiata con successo!");
        //     setPSWChanged(true);
        // })
        // .catch((err) => {
        //     console.error(err);
        //     setValidNewPassword(false);
        //     setPSWChanged(false);
        // });
        // // const auth = getAuth();

        // const emailAccountReference = doc(db, `${email}`, `info`);
        // const dati = await getDoc(emailAccountReference);
        // const filtraDati = dati.get("password");
        // console.log("Vecchia PSW--> " + filtraDati);

        // await signInWithEmailAndPassword(auth, email, filtraDati)
        // // .then(() => {
        // //     console.log("RE Logged in");
        // // })
        // .catch((err) => {
        //     console.error(err);
        //     setValidEmail(false);
        //     setValidNewPassword(false);
        //     alert("Si è verificato un errore. Riprova tra qualche minuto.");
        // });
        
        // if(newPassword.trim().length >= 6){
        //     // const auth = getAuth();
        //     console.log(auth);

        //     await updatePassword(auth.currentUser, newPassword)
        //     .catch((err) => {
        //         console.error(err.message);
        //     });
            
        //     await updateDoc(emailAccountReference, {password: newPassword})
        //     // .then(() => {
        //     //     console.log("DB aggiornato");
        //     // })
        //     .catch((err) => {
        //         console.error(err);
        //     });
            
        //     console.log("Nuova PSW--> " + newPassword);
        // }
        // else{
        //     setValidNewPassword(false);
        // }
        
    }

    if(singletonHasLoaded){
        return(
            <div className={styles.wrap_center_card}>
                <Card
                    children = {
                        <form className={styles.center_elements} onSubmit={submitChangePassword}>
                            <h1 className={styles.title}>Cambio password</h1>
    
                            {/* <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Inserisci la tua email</label>
                            <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci email.." value={email} onChange={emailChangeHandler}></input> */}
    
                            <label className={`${styles.label_box} ${!validNewPassword ? styles.invalid : ''}`}>Inserisci nuova password</label>
                            <input className={`${styles.input_box} ${!validNewPassword ? styles.invalid : ''}`} type="password" placeholder="Inserisci nuova password.." value={newPassword} onChange={passwordChangeHandler}></input>
    
                            {!validNewPassword && <h2 style={{color: "red"}}>Inserisci una password sicura!</h2>}
                            {/* {!validEmail && <h2 style={{color: "red"}}>Inserisci una email valida!</h2>} */}
    
                            <GenericButton
                                type = "submit"
                                generic_button={true}
                                buttonText = 'Invia'
                            >
                            </GenericButton>
    
                            {PSWChanged &&
                                
                                <GenericAlternativeButton
                                    generic_button={true}
                                    buttonText={
                                        <Link style={{color: "white", textDecoration: "none"}} to="/">Go to Login</Link>
                                    }
                                >    
                                </GenericAlternativeButton>
                            }
                            
                            {/* <h5 className={styles.log_reg} onClick={goToLoginForm}>Vai al Login</h5> */}
                        </form>
                    }
                >
                </Card>
            </div>
        );
    }
    else{
        return(
            <div>LOADING</div>
          );
    }
    
}

export default CambioPsw;