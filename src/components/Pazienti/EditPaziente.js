import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./EditPaziente.module.css";
import PatientContext from "../../context/patients-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function EditPaziente(props){
    const patients_ctx = useContext(PatientContext);
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
    const [patologieList, setPatologieList] = useState([]);
    
    const [counterMedicine, setCounterMedicine] = useState(1);
    const [medicinaModifica_1, setMedicinaModifica_1] = useState(props.medicinaaa_1);
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        let prossimoIDpatolog = 1;
        let arrayTemporaneo = [];
        if(props.patologiaaa_1.length > 0){
            for(var i=0; i < props.patologiaaa_1.length; i++){
                console.log("INDICE--> "  + (i))
                arrayTemporaneo.push({patID: i+1, patologia: props.patologiaaa_1[i]})
                // setPatologieList((prevList) => ([...prevList, {patID: i, patologia: props.patologiaaa_1[i]}]))
                prossimoIDpatolog = i+1;
            }
            console.log(arrayTemporaneo);
            setPatologieList(arrayTemporaneo);
            // props.patologiaaa_1.map((singolaPat) => {
            //     console.log(prossimoIDpatolog + singolaPat)
            //     setPatologieList((prevList) => ([...prevList, {patID: prossimoIDpatolog, patologia: singolaPat}]))
            //     prossimoIDpatolog = prossimoIDpatolog + 1;
            // })
        }

        setCounterPatologie(prossimoIDpatolog);        
    }, [])

    useEffect(() => {
        let prossimoIDmdcn = 1;
        let arrayTemporaneo = [];
        if(props.medicinaaa_1.length > 0){
            for(var i=0; i < props.medicinaaa_1.length; i++){
                console.log("INDICE--> "  + (i))
                arrayTemporaneo.push({medID: i+1, medicina: props.medicinaaa_1[i]})
                // setPatologieList((prevList) => ([...prevList, {patID: i, patologia: props.patologiaaa_1[i]}]))
                prossimoIDmdcn = i+1;
            }
            console.log(arrayTemporaneo);
            setMedicineList(arrayTemporaneo);
            // props.patologiaaa_1.map((singolaPat) => {
            //     console.log(prossimoIDpatolog + singolaPat)
            //     setPatologieList((prevList) => ([...prevList, {patID: prossimoIDpatolog, patologia: singolaPat}]))
            //     prossimoIDpatolog = prossimoIDpatolog + 1;
            // })
        }
        setCounterMedicine(prossimoIDmdcn);
    }, [])

    const [noteParticolariModifica, setNoteParticolariModifica] = useState(props.noteee);
    const [terapiaModifica, setTerapiaModifica] = useState(props.terapiaaa);


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
        console.log(patologieList)
        console.log(medicineList)
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

    function aggiungiPatologia(event){
        event.preventDefault();
        console.log(patologieList)

        let prossimoIDpatolog = counterPatologie + 1;
        setPatologieList((prevList) => ([...prevList, {patID: prossimoIDpatolog, patologia: ""}]));
        setCounterPatologie(prossimoIDpatolog)
    }

    const patologiaChangeHandler_1 = (event, id) => {
        console.log(event.target.value);
        setPatologiaModifica_1(event.target.value);
        console.log(id);
        patologieList.map((patolog) => {
            if(patolog.patID === id){
                patolog.patologia = event.target.value
            }
        })
    }

    const noteParticolariChangeHandler = (event) => {
        console.log(event.target.value);
        setNoteParticolariModifica(event.target.value);
    }

    function aggiungiMedicina(event){
        event.preventDefault();

        let prossimoIDmedicina = counterMedicine + 1;
        setMedicineList((prevList) => ([...prevList, {medID: prossimoIDmedicina, medicina: ""}]));
        setCounterMedicine(prossimoIDmedicina)
    }

    const medicineChangeHandler_1 = (event, id) => {
        console.log(event.target.value);
        setMedicinaModifica_1(event.target.value);
        console.log(id);
        medicineList.map((med) => {
            if(med.medID === id){
                med.medicina = event.target.value
            }
        })
        console.log(medicineList)
    }

    const terapiaChangeHandler = (event) => {
        console.log(event.target.value);
        setTerapiaModifica(event.target.value);
    }

    async function formModifyHandler(event){
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

        let patologieListFiltered = [];
        patologieList.map((pat) => {
            if(pat.patologia.length >= 1){
                patologieListFiltered.push(pat);
            }
        })

        let medicineListFiltered = [];
        medicineList.map((med) => {
            if(med.medicina.length >= 1){
                medicineListFiltered.push(med);
            }
        })

        const datiPaziente = {
            nome: nomeModifica,
            cognome: cognomeModifica,
            city: cittàModifica,
            codiceFiscale: CFModifica.toUpperCase(),
            dataNascita: dateString,
            patologie: patologieListFiltered,
            medicine: medicineListFiltered,
            terapia: terapiaModifica,
            note: noteParticolariModifica,
            // statistiche: props.statisticheee,
            ID: props.iddd
        };

        let pazienteSalvatoID;
        pazienteSalvatoID = await getServerMgr().updatePaziente(
            datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.patologie,
            datiPaziente.medicine, datiPaziente.terapia, datiPaziente.note, datiPaziente.ID
        );
        // console.log("pazienteID--> " + pazienteSalvatoID)
        patients_ctx.modificaLista();
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
                        {patologieList.map((patologia) => (
                            <input key={patologia.patID} className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={patologia.patologia} onChange={(event) => {
                                patologiaChangeHandler_1(event, patologia.patID)
                            }}>
                            </input>
                        ))}
                        <GenericButton 
                            onClick={aggiungiPatologia}
                            generic_button={true}
                            buttonText='Aggiungi patologia'
                        >
                        </GenericButton>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Medicina:</label>
                        {medicineList.map((medicina) => (
                            <input key={medicina.medID} className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={medicina.medicina} onChange={(event) => {
                                medicineChangeHandler_1(event, medicina.medID)
                            }}>
                            </input>
                        ))}
                        <GenericButton 
                            onClick={aggiungiMedicina}
                            generic_button={true}
                            buttonText='Aggiungi medicina'
                        >
                        </GenericButton> 

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