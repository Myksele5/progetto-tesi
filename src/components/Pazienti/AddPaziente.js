import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function AddPaziente(props){
    const auth_ctx = useContext(AuthContext);
    // const [emailDottore, setEmailDottore] = useState('');
    // const [passwordDottore, setPasswordDottore] = useState('');
    // const [modaleCREAZIONEUTENTE, setModaleCREAZIONEUTENTE] = useState(false);
    // const [accountCreato, setAccountCreato] = useState(false);
    var emailEsistente = null;

    const [validNome, setValidNome] = useState(true);
    const [enteredNome, setEnteredNome] = useState('');

    const [validCognome, setValidCognome] = useState(true);
    const [enteredCognome, setEnteredCognome] = useState('');

    const [validCittà, setValidCittà] = useState(true);
    const [enteredCittà, setEnteredCittà] = useState('');

    const [validData, setValidData] = useState(true);
    const [enteredData, setEnteredData] = useState('');

    const [validCF, setValidCF] = useState(true);
    const [enteredCF, setEnteredCF] = useState('');

    const [enteredPatologia, setEnteredPatologia] = useState('');
    const [enteredNoteParticolari, setEnteredNoteParticolari] = useState('');
    const [enteredMedicine, setEnteredMedicine] = useState('');
    const [enteredTerapia, setEnteredTerapia] = useState('');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPsw, setEnteredPsw] = useState('');

    // useEffect(() => {
    //     setEmailDottore(auth_ctx.utenteLoggato);
    //     // console.log(utente);
    // }, [])

    // const passwordDottoreChangeHandler = (event) => {
    //     console.log(event.target.value);
    //     setPasswordDottore(event.target.value);
    // }

    const nomeChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredNome(event.target.value);
        setValidNome(true);
    }

    const cognomeChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCognome(event.target.value);
        setValidCognome(true);
    }

    const cittàChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCittà(event.target.value);
        setValidCittà(true);
    }

    const dataNascitaChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredData(event.target.value);
        setValidData(true);
    }
    
    const CFChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCF(event.target.value);
        setValidCF(true);
    }

    const patologiaChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredPatologia(event.target.value);
    }

    const noteParticolariChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredNoteParticolari(event.target.value);
    }

    const medicineChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredMedicine(event.target.value);
    }

    const terapiaChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredTerapia(event.target.value);
    }

    const emailChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredEmail(event.target.value);
    }

    const pswChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredPsw(event.target.value);
    }

    function formSubmitHandler(event){
        event.preventDefault();
        var account_creato = false;
        if(enteredEmail.includes('@') && enteredPsw.trim().length > 5){
            // setModaleCREAZIONEUTENTE(true);
            creaAccountPaziente();
        }

        var dateee = new Date(enteredData);

        if(enteredNome.trim().length < 1 
        || enteredCognome.trim().length < 1 
        || enteredCittà.trim().length < 1 
        || isNaN(dateee)
        || enteredCF.trim().length < 16 || enteredCF.trim().length > 16){
            if(enteredNome.trim().length < 1){
                setValidNome(false);
                // console.log(validNome);
            }
            else{
                setValidNome(true);
            }
            if(enteredCognome.trim().length < 1){
                setValidCognome(false);
            }
            else{
                setValidCognome(true);
            }
            if(enteredCittà.trim().length < 1){
                setValidCittà(false);
            }
            else{
                setValidCittà(true);
            }
            if(isNaN(dateee)){
                setValidData(false);
            }
            else{
                setValidData(true);
            }
            if(enteredCF.trim().length < 16 || enteredCF.trim().length > 16){
                setValidCF(false);
            }
            else{
                setValidCF(true);
            }
            return;
        }

        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();

        let dateString = `${year}-${month}-${day}`;

        const datiNuovoPaziente = {
            doct_UID: auth_ctx.utenteLoggatoUID,
            nome: enteredNome,
            cognome: enteredCognome,
            city: enteredCittà,
            codiceFiscale: enteredCF.toUpperCase(),
            dataNascita: dateString,
            patologia: enteredPatologia,
            medicine: enteredMedicine,
            terapia: enteredTerapia,
            note: enteredNoteParticolari
            // statistiche: {
            //     "risposteTotali": 0,
            //     "risposteCorrette": 0,
            //     "risposteSbagliate": 0
            // }
            // ACCOUNT_CREATO: accountCreato
        };

        props.onCreateNewPaziente(datiNuovoPaziente);
        
        setEnteredNome('');
        // setValidNome(true);
        setEnteredCognome('');
        // setValidCognome(true);
        setEnteredCittà('');
        // setValidCittà(true);
        setEnteredData('');
        // setValidData(true);
    }

    async function creaAccountPaziente(){
        let result;
        result = await getServerMgr().getAccount()
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });

        if(result !== undefined){
            for(var i=0; i < result.length; i++){
                if(result[i].email === enteredEmail){
                    // setValidNome(false);
                    // setValidCognome(false);
                    // setValidEmail(false);
                    // setValidPassword(false);
                    // // setABuonFine(false);
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
                result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 3, enteredEmail, enteredPsw)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                    // setRegistrEffettuata(false);
                });
            }
        }
        else{
            let result2;
            result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 3, enteredEmail, enteredPsw)
            .then(alert("ACCOUNT CREATO!"))
            .catch((err) => {
                console.error(err);
            })
            // alert("NESSUN ACCOUNT TROVATO");
        }  

        return
    }

    function hideForm(event){
        event.preventDefault();
        props.hideFormNewPaziente();
    }

    return(
        <form className={styles.center_form} onSubmit={formSubmitHandler}>
            <h1 className={styles.title_form}>Inserisci i dati del nuovo paziente</h1>

            <div className={styles.wrapper_flex}>
                <section className={styles.section_style}>
                    <h3 className={styles.subtitle_form}>DATI PERSONALI</h3>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredNome} onChange={nomeChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome:</label>
                    <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={enteredCognome} onChange={cognomeChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita:</label>
                    <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={enteredCittà} onChange={cittàChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita:</label>
                    <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min="01-01-1800" max="31-31-2400" value={enteredData} onChange={dataNascitaChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                    <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={enteredCF} onChange={CFChangeHandler}></input>
                </section>

                <section className={styles.section_style}>
                    <h3 className={styles.subtitle_form}>SCHEDA MEDICA</h3>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Patologia:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredPatologia} onChange={patologiaChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Segni/Note particolari:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredNoteParticolari} onChange={noteParticolariChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Medicine:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredMedicine} onChange={medicineChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Terapia consigliata:</label>
                    <textarea className={`${styles.input_style_LARGE} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredTerapia} onChange={terapiaChangeHandler}></textarea>
                </section>

                <section className={styles.section_style}>
                    <h3 className={styles.subtitle_form}>CREDENZIALI</h3>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Email:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="email" value={enteredEmail} onChange={emailChangeHandler}></input>

                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Password:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredPsw} onChange={pswChangeHandler}></input>
                    
                    <p className={styles.paragraph_style}><b>Attenzione!</b> Queste credenziali serviranno al paziente </p>
                    <p className={styles.paragraph_style}>per potersi collegare alla piattaforma e svolgere attività.</p>
                    <p className={styles.paragraph_style}>Se inserite, verrà creato un profilo per il paziente</p>

                    {/* {modaleCREAZIONEUTENTE &&
                        <div>
                            <label>Inserisci password</label>
                            <input value={passwordDottore} onChange={passwordDottoreChangeHandler}></input>
                            <button onClick={formSubmitHandler}>CONFERMA</button>
                        </div>
                    } */}
                </section>
            </div>

            {/* <hr className={styles.horizontal_line}></hr> */}

            <GenericButton 
            type="submit" 
            generic_button={true}
            buttonText='Salva nuovo paziente'>
            </GenericButton>

            <GenericButton
            onClick={hideForm}
            small_button={true}
            buttonText='Go Back'>
            </GenericButton>
        </form>
    );
}
export default AddPaziente;