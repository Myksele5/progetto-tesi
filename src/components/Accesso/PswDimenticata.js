import { useEffect, useState } from 'react';
import styles from './PswDimenticata.module.css';
import Card from '../UI/Card';
import GenericButton from '../UI/GenericButton';
import { auth } from '../../config/firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getServerMgr } from '../../backend_conn/ServerMgr';

function PswDimenticata(props){
    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        setValidEmail(true);
    }, [email])

    const goToLoginForm = () => {
        // console.log("VAI AL FORM PER LOGGARE");
        props.goToLoginForm();
        // props.onShowMe('FORM-LOG_in');
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
    }

    const submitPswRecovery = async (event) => {
        event.preventDefault();

        let result;
        let result2;
        let result3;
        result = await getServerMgr().pswRecovery_checkEmail(email)
        .catch((err) => {
            console.error(err)
        });

        if(result !== null){
            console.log(result);
            result2 = await getServerMgr().pswRecovery_code(email)
            .catch((err) => {
                console.error(err)
            });
        }
        else{
            console.log("NESSUNA EMAIL");
        }

        if(result2 !== null){
            console.log(result2);
            result3 = await getServerMgr().updateCode(email)
            .catch((err) => {
                console.error(err)
            });
        }
        else{
            console.log("PRIMO CODICE")
            result3 = await getServerMgr().insertFirstCode(email)
            .catch((err) => {
                console.error(err)
            });
        }

        // console.log(result);
        // if(email.includes('@')){
        //     await sendPasswordResetEmail(auth, email, {
        //         url: 'https://progetto-tesi-8abcf.web.app/'
        //     })
        //     .then(() => {
        //         alert("Fatto! Se in precedenza hai creato un account, riceverai una email per cambiare password.")
        //     })
        //     .catch((FirebaseAuthInvalidCredentialsException, err) => {
        //         setValidEmail(false);
        //         console.error(err);
        //         console.error(FirebaseAuthInvalidCredentialsException);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     })
        // }
        // else{
        //     if(!email.includes('@')){
        //         setValidEmail(false);
        //     }
        // }   
    }

    return(
        <Card
        children = {
            <form className={styles.center_elements} onSubmit={submitPswRecovery}>
                <h1 className={styles.title}>Recupero Password</h1>

                <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci email" value={email} onChange={emailChangeHandler}></input>

                {!validEmail && <h2 style={{color: "red"}}>Inserisci una email valida!</h2>}

                <GenericButton
                    type = "submit"
                    generic_button={true}
                    buttonText = 'Invia'
                >
                </GenericButton>
                
                <h5 className={styles.log_reg} onClick={goToLoginForm}>Vai al Login</h5>
            </form>
        }>
        </Card>
    );
}

export default PswDimenticata;