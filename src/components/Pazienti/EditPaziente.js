import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./EditPaziente.module.css";
import PatientContext from "../../context/patients-context";

function EditPaziente(props){
    const [visualizzaSchermata, setVisualizzaSchermata] = useState("DATI_PERSONALI");

    const [validNome, setValidNome] = useState(true);
    const [nomeModifica, setNomeModifica] = useState(props.nomeee);

    const [validCognome, setValidCognome] = useState(true);
    const [cognomeModifica, setCognomeModifica] = useState(props.cognomeee);

    const [validCittà, setValidCittà] = useState(true);
    const [cittàModifica, setCittàModifica] = useState(props.cittààà);

    const [validData, setValidData] = useState(true);
    const [dataModifica, setDataModifica] = useState(props.dataaa);

    const [validCF, setValidCF] = useState(true);
    const [CFModifica, setCFModifica] = useState(props.cfff);

    const [counterPatologie, setCounterPatologie] = useState(1);
    const [patologiaModifica_1, setPatologiaModifica_1] = useState(props.patologiaaa_1);
    const [patologiaModifica_2, setPatologiaModifica_2] = useState(props.patologiaaa_2);
    const [patologiaModifica_3, setPatologiaModifica_3] = useState(props.patologiaaa_3);

    const [counterMedicine, setCounterMedicine] = useState(1);
    const [medicinaModifica_1, setMedicinaModifica_1] = useState(props.medicinaaa_1);
    const [medicinaModifica_2, setMedicinaModifica_2] = useState(props.medicinaaa_2);
    const [medicinaModifica_3, setMedicinaModifica_3] = useState(props.medicinaaa_3);

    const [noteParticolariModifica, setNoteParticolariModifica] = useState(props.noteee);
    const [terapiaModifica, setTerapiaModifica] = useState(props.terapiaaa);

    const patients_ctx = useContext(PatientContext);

    useEffect(() => {
        {props.patologiaaa_2 && 
            setCounterPatologie((count) => (count + 1))
        }
        {props.patologiaaa_3 && 
            setCounterPatologie((count) => (count + 1))
        }

        {props.medicinaaa_2 &&
            setCounterMedicine((count) => (count + 1))
        }
        {props.medicinaaa_3 &&
            setCounterMedicine((count) => (count + 1))
        }
    }, [])

    const selezionaSchermataVisualizzata = (event, stringa) => {
        event.preventDefault();
        switch(stringa){
            case "DATI_PERSONALI":
                setVisualizzaSchermata("DATI_PERSONALI");
                break;
            case "SCHEDA_MEDICA":
                setVisualizzaSchermata("SCHEDA_MEDICA");
                break;
            default:
                break;
        }
    }

    const nomeChangeHandler = (event) => {
        console.log(event.target.value);
        setNomeModifica(event.target.value);
        // setValidNome(true);
    }

    const cognomeChangeHandler = (event) => {
        console.log(event.target.value);
        setCognomeModifica(event.target.value);
        setValidCognome(true);
    }

    const cittàChangeHandler = (event) => {
        console.log(event.target.value);
        setCittàModifica(event.target.value);
        setValidCittà(true);
    }

    const dataNascitaChangeHandler = (event) => {
        console.log(event.target.value);
        setDataModifica(event.target.value);
        setValidData(true);
    }
    
    const CFChangeHandler = (event) => {
        console.log(event.target.value);
        setCFModifica(event.target.value);
        setValidCF(true);
    }

    const aumentaCounterPatologie = (event) => {
        event.preventDefault();
        if(counterPatologie < 3 && counterPatologie >= 1){
            setCounterPatologie((count) => (count + 1))
        }
    }

    const diminuisciCounterPatologie = (event) => {
        event.preventDefault();
        if(counterPatologie <= 3 && counterPatologie > 1){
            setCounterPatologie((count) => (count - 1))
        }
    }

    const patologiaChangeHandler_1 = (event) => {
        console.log(event.target.value);
        setPatologiaModifica_1(event.target.value);
    }
    const patologiaChangeHandler_2 = (event) => {
        console.log(event.target.value);
        setPatologiaModifica_2(event.target.value);
    }
    const patologiaChangeHandler_3 = (event) => {
        console.log(event.target.value);
        setPatologiaModifica_3(event.target.value);
    }

    const noteParticolariChangeHandler = (event) => {
        console.log(event.target.value);
        setNoteParticolariModifica(event.target.value);
    }

    const aumentaCounterMedicine = (event) => {
        event.preventDefault();
        if(counterMedicine < 3 && counterMedicine >= 1){
            setCounterMedicine((count) => (count + 1))
        }
    }

    const diminuisciCounterMedicine = (event) => {
        event.preventDefault();
        if(counterMedicine <= 3 && counterMedicine > 1){
            setCounterMedicine((count) => (count - 1))
        }
    }

    const medicinaChangeHandler_1 = (event) => {
        console.log(event.target.value);
        setMedicinaModifica_1(event.target.value);
    }
    const medicinaChangeHandler_2 = (event) => {
        console.log(event.target.value);
        setMedicinaModifica_2(event.target.value);
    }
    const medicinaChangeHandler_3 = (event) => {
        console.log(event.target.value);
        setMedicinaModifica_3(event.target.value);
    }

    const terapiaChangeHandler = (event) => {
        console.log(event.target.value);
        setTerapiaModifica(event.target.value);
    }

    function formModifyHandler(event){
        event.preventDefault();

        var dateee = new Date(dataModifica);

        if(nomeModifica.trim().length < 1 
        || cognomeModifica.trim().length < 1 
        || cittàModifica.trim().length < 1 
        || isNaN(dateee)
        || CFModifica.trim().length < 16 || CFModifica.trim().length > 16){
            if(nomeModifica.trim().length < 1){
                setValidNome(false);
                // console.log(validNome);
            }
            else{
                setValidNome(true);
            }
            if(cognomeModifica.trim().length < 1){
                setValidCognome(false);
            }
            else{
                setValidCognome(true);
            }
            if(cittàModifica.trim().length < 1){
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
            if(CFModifica.trim().length < 16 || CFModifica.trim().length > 16){
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

        const datiPazienteModificati = {
            nome: nomeModifica,
            cognome: cognomeModifica,
            city: cittàModifica,
            codiceFiscale: CFModifica.toUpperCase(),
            dataNascita: dateString,
            patologia_1: patologiaModifica_1,
            patologia_2: counterPatologie >= 2 ? patologiaModifica_2 : "",
            patologia_3: counterPatologie >= 3 ? patologiaModifica_3 : "",
            medicina_1: medicinaModifica_1,
            medicina_2: counterMedicine >= 2 ? medicinaModifica_2 : "",
            medicina_3: counterMedicine >= 3 ? medicinaModifica_3 : "",
            terapia: terapiaModifica,
            note: noteParticolariModifica,
            // statistiche: props.statisticheee,
            ID: props.iddd
        };

        patients_ctx.modificaLista(datiPazienteModificati);
    }

    return(
        <form className={styles.center_form} onSubmit={formModifyHandler}>
            <h1 className={styles.title_form}>Modifica i dati del paziente</h1>
            <h4 className={styles.warning}>Stai modificando i dati di un paziente esistente!<br/>Controlla con attenzione prima di salvare</h4>

            <div className={styles.wrapper_flex}>
                {visualizzaSchermata === "DATI_PERSONALI" &&
                    <section className={styles.section_style}>
                        <GenericButton
                            onClick={(event) => {
                                selezionaSchermataVisualizzata(event, "SCHEDA_MEDICA")
                            }}
                            buttonText={"Visualizza Scheda Medica"}
                            generic_button
                        >
                        </GenericButton>
                        <h3 className={styles.subtitle_form}>DATI PERSONALI</h3>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={nomeModifica} onChange={nomeChangeHandler}></input>

                        <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome</label>
                        <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={cognomeModifica} onChange={cognomeChangeHandler}></input>

                        <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita:</label>
                        <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={cittàModifica} onChange={cittàChangeHandler}></input>

                        <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita:</label>
                        <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" value={dataModifica} onChange={dataNascitaChangeHandler}></input>
                        
                        <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                        <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={CFModifica} onChange={CFChangeHandler}></input>
                    </section>
                }
                
                {visualizzaSchermata === "SCHEDA_MEDICA" &&
                    <section className={styles.section_style}>
                        <GenericButton
                            onClick={(event) => {
                                selezionaSchermataVisualizzata(event, "DATI_PERSONALI")
                            }}
                            buttonText={"Visualizza Dati Personali"}
                            generic_button
                        >
                        </GenericButton>
                        <h3 className={styles.subtitle_form}>SCHEDA MEDICA</h3>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Patologia:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={patologiaModifica_1} onChange={patologiaChangeHandler_1}></input>
                        {((patologiaModifica_2 && counterPatologie >=2) || counterPatologie >= 2) &&
                        <>
                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Patologia:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={patologiaModifica_2} onChange={patologiaChangeHandler_2}></input>
                        </>
                        }
                        {((patologiaModifica_3 && counterPatologie >= 3) || counterPatologie >= 3) &&
                        <>
                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Patologia:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={patologiaModifica_3} onChange={patologiaChangeHandler_3}></input>
                        </>
                        }
                        <div style={{display: "flex"}}>
                            {counterPatologie < 3 && counterPatologie >= 1 &&
                                <GenericButton 
                                    onClick={aumentaCounterPatologie}
                                    generic_button={true}
                                    buttonText='Aggiungi patologia'
                                >
                                </GenericButton>
                            }
                            {counterPatologie <= 3 && counterPatologie > 1 &&
                                <GenericButton 
                                    onClick={diminuisciCounterPatologie}
                                    small_button={true}
                                    buttonText='Rimuovi patologia'
                                >
                                </GenericButton>
                            }
                        </div>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Medicina:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={medicinaModifica_1} onChange={medicinaChangeHandler_1}></input>
                        {((medicinaModifica_2 && counterMedicine >=2) || counterMedicine >= 2) &&
                        <>
                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Medicina:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={medicinaModifica_2} onChange={medicinaChangeHandler_2}></input>
                        </>
                        }
                        {((medicinaModifica_3 && counterMedicine >=3) || counterMedicine >= 3) &&
                        <>
                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Medicina:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={medicinaModifica_3} onChange={medicinaChangeHandler_3}></input>
                        </>
                        }
                        <div style={{display: "flex"}}>
                            {counterMedicine < 3 && counterMedicine >= 1 &&
                                <GenericButton 
                                    onClick={aumentaCounterMedicine}
                                    generic_button={true}
                                    buttonText='Aggiungi medicina'
                                >
                                </GenericButton>
                            }
                            {counterMedicine <= 3 && counterMedicine > 1 &&
                                <GenericButton 
                                    onClick={diminuisciCounterMedicine}
                                    small_button={true}
                                    buttonText='Rimuovi medicina'
                                >
                                </GenericButton>
                            }
                        </div>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Segni/Note particolari:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={noteParticolariModifica} onChange={noteParticolariChangeHandler}></input>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Terapia consigliata:</label>
                        <textarea className={`${styles.input_style_LARGE} ${!validNome ? styles.invalid : ""}`} type="text" value={terapiaModifica} onChange={terapiaChangeHandler}></textarea>
                    </section>
                }
                {/* <section className={styles.section_style}>

                </section> */}
            </div>

            <GenericButton
            type="submit"
            generic_button={true}
            buttonText="Conferma modifiche">
            </GenericButton>

            <GenericButton
            onClick={patients_ctx.chiudiFormModifica}
            small_button={true}
            buttonText="Chiudi">
            </GenericButton>
        </form>
    );
}

export default EditPaziente;