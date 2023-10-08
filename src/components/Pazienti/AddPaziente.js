import { useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';

function AddPaziente(props){
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

    function formSubmitHandler(event){
        event.preventDefault();

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
            nome: enteredNome,
            cognome: enteredCognome,
            città: enteredCittà,
            datanascita: dateString,
            attività: 0,
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: enteredCF.toUpperCase(),
            id: Math.random().toString()
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

    function hideForm(event){
        event.preventDefault();
        props.hideFormNewPaziente();
    }

    return(
        <form className={styles.center_form} onSubmit={formSubmitHandler}>
            <h1 className={styles.title_form}>Inserisci i dati del nuovo paziente</h1>

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