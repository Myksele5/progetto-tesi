import { useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddAttività.module.css";

function AddAttività(props){
    const [validNomeAttività, setValidNomeAttività] = useState(true);
    const [enteredNomeAttività, setEnteredNomeAttività] = useState('');

    const [validDataInizio, setValidDataInizio] = useState(true);
    const [enteredDataInizio, setEnteredDataInizio] = useState('');

    const [validDataFine, setValidDataFine] = useState(true);
    const [enteredDataFine, setEnteredDataFine] = useState('');

    const [validGiochi, setValidGiochi] = useState(true);
    const [enteredGiochi, setEnteredGiochi] = useState('');

    function nomeAttivitàChangeHandler(event){
        console.log(event.target.value);
        setEnteredNomeAttività(event.target.value);
        setValidNomeAttività(true);
    }

    function dataInizioChangeHandler(event){
        console.log(event.target.value);
        setEnteredDataInizio(event.target.value);
        setValidDataInizio(true);
    }

    function dataFinehangeHandler(event){
        console.log(event.target.value);
        setEnteredDataFine(event.target.value);
        setValidDataFine(true);
    }

    function giochiChangeHandler(event){
        console.log(event.target.value);
        setEnteredGiochi(event.target.value);
        setValidGiochi(true);
    }

    function submitActivityFormHandler(event){
        event.preventDefault();

        var dateInizio = new Date(enteredDataInizio);
        var dateFine = new Date(enteredDataFine);

        if(enteredNomeAttività.trim().length < 1 || isNaN(dateInizio) || isNaN(dateFine) || enteredGiochi.trim().length < 1){
            if(enteredNomeAttività.trim().length < 1){
                setValidNomeAttività(false);
            }
            else{
                setValidNomeAttività(true);
            }
            if(isNaN(dateInizio)){
                setValidDataInizio(false);
            }
            else{
                setValidDataInizio(true);
            }
            if(isNaN(dateFine)){
                setValidDataFine(false);
            }
            else{
                setValidDataFine(true);
            }
            if(enteredGiochi.trim().length < 1){
                setValidGiochi(false);
            }
            else{
                setValidGiochi(true);
            }
            return;
        }

        if(dateInizio > dateFine){
            setValidDataInizio(false);
            setValidDataFine(false);
            // console.log(dateInizio, dateFine);
            // console.log('NON PUOI METTERE UNA DATA FINALE PRECEDENTE ALLA DATA DI INIZIO');
            return;
        }

        var day_inizio = dateInizio.toLocaleString('it-IT', {day: '2-digit'})
        var month_inizio = dateInizio.toLocaleString('it-IT', {month: '2-digit'})
        var year_inizio = dateInizio.getFullYear();
        let dateInizioString = `${day_inizio}-${month_inizio}-${year_inizio}`

        var day_fine = dateFine.toLocaleString('it-IT', {day: '2-digit'})
        var month_fine = dateFine.toLocaleString('it-IT', {month: '2-digit'})
        var year_fine = dateFine.getFullYear();
        let dateFineString = `${day_fine}-${month_fine}-${year_fine}`;

        const datiNuovaAttività = {
            nomeActivity: enteredNomeAttività,
            dataInizio: dateInizioString,
            dataFine: dateFineString,
            giochi: enteredGiochi,
            id: Math.random().toString()
        };
        props.onCreateNewAttività(datiNuovaAttività);

        setEnteredNomeAttività('');
        setEnteredDataInizio('');
        setEnteredDataFine('');
        setEnteredGiochi('');
    }

    return(
        <form className={`${styles['center_form']}`} onSubmit={submitActivityFormHandler}>
            <h1>Inserisci i dati dell'attività</h1>

            <label className={`${styles.label_style} ${!validNomeAttività ? styles.invalid : ""}`}>Nome attività: <br/></label>
            <input className={`${styles.input_style} ${!validNomeAttività ? styles.invalid : ""}`} type="text" value={enteredNomeAttività} onChange={nomeAttivitàChangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validDataInizio ? styles.invalid : ""}`}>Data inizio: <br/></label>
            <input className={`${styles.input_style} ${!validDataInizio ? styles.invalid : ""}`} type="date" value={enteredDataInizio} onChange={dataInizioChangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validDataFine ? styles.invalid : ""}`}>Data fine: <br/></label>
            <input className={`${styles.input_style} ${!validDataFine ? styles.invalid : ""}`} type="date" min={enteredDataInizio} value={enteredDataFine} onChange={dataFinehangeHandler}></input><br/>

            <label className={`${styles.label_style} ${!validGiochi? styles.invalid : ""}`}>Giochi: <br/></label>
            <input className={`${styles.input_style} ${!validGiochi ? styles.invalid : ""}`} type="text" value={enteredGiochi} onChange={giochiChangeHandler}></input><br/>

            <GenericButton type="submit">Salva attività</GenericButton>
        </form>
    );
}

export default AddAttività;