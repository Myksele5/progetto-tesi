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

    function formSubmitHandler(event){
        event.preventDefault();

        var dateee = new Date(enteredData);

        if(enteredNome.trim().length < 1 || enteredCognome.trim().length < 1 || enteredCittà.trim().length < 1 || isNaN(dateee)){
            if(enteredNome.trim().length < 1){
                setValidNome(false);
                console.log(validNome);
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
            return;
        }

        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();

        let dateString = `${day}-${month}-${year}`;

        const datiNuovoPaziente = {
            nome: enteredNome,
            cognome: enteredCognome,
            città: enteredCittà,
            datanascita: dateString,
            attività: 0,
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

    return(
        <form className={styles.center_form} onSubmit={formSubmitHandler}>
            <h1>Inserisci i dati del nuovo paziente</h1>

            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome: <br/></label>
            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredNome} onChange={nomeChangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome: <br/></label>
            <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={enteredCognome} onChange={cognomeChangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita: <br/></label>
            <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={enteredCittà} onChange={cittàChangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita: <br/></label>
            <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min="01-01-1800" max="31-31-2400" value={enteredData} onChange={dataNascitaChangeHandler}></input><br/>

            <GenericButton type="submit">Salva nuovo paziente</GenericButton>
        </form>
    );
}
export default AddPaziente;