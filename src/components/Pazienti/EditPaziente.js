import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./EditPaziente.module.css";
import PatientContext from "../../context/patients-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import PatologiesContext from "../../context/patologies-context";
import CardSmall from "../UI/CardSmall";
import DeleteButton from "../UI/DeleteButton";

function EditPaziente(props){
    const patients_ctx = useContext(PatientContext);
    const patologies_ctx = useContext(PatologiesContext);

    const [listaPatologie, setListaPatologie] = useState(patologies_ctx.uniqueList);
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

    const [patologiaSelezionata, setPatologiaSelezionata] = useState("");
    const [patologiaSelezionataOggetto, setPatologiaSelezionataOggetto] = useState({});

    const [terapiaSelezionata, setTerapiaSelezionata] = useState();
    const [showFormAddTherapy, setShowFormAddTherapy] = useState(false);

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [informazioniMediche, setInformazioniMediche] = useState([]);

    const [counterPatologie, setCounterPatologie] = useState(1);
    const [patologiaModifica_1, setPatologiaModifica_1] = useState(props.patologiaaa_1);
    const [patologieList, setPatologieList] = useState([]);
    
    const [counterMedicine, setCounterMedicine] = useState(1);
    const [medicinaModifica_1, setMedicinaModifica_1] = useState(props.medicinaaa_1);
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        console.log(props.patologiaaa_1)
        if(props.patologiaaa_1?.length > 0){
            setInformazioniMediche(props.patologiaaa_1) 
        }
        else{
            setInformazioniMediche([]) 
        }   
    }, [])

    useEffect(() => {
        setListaPatologie(patologies_ctx.createUniqueObject());
        console.log(listaPatologie)
    }, [])

    useEffect(() => {
        setPatologiaSelezionata("--seleziona--");
        setPatologiaSelezionataOggetto({})
        setDataInizioTerapia("");
        setDataFineTerapia("");
    }, [informazioniMediche])

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
        // console.log(patologieList)
        // console.log(medicineList)
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

    const patologiaSelezionataChangeHandler = (event) => {
        setPatologiaSelezionata(event.target.value);
        setPatologiaSelezionataOggetto(patologies_ctx.getTherapiesListSinglePat(event.target.value));
        setTerapiaSelezionata();
        setShowFormAddTherapy(false);
    }

    const selezionaTerapia = (id) => {
        console.log(id)
        setTerapiaSelezionata(id)
    }

    const dataInizioTerapiaChangeHandler = (event) => {
        setDataInizioTerapia(event.target.value);
    }
    const dataFineTerapiaChangeHandler = (event) => {
        setDataFineTerapia(event.target.value);
    }

    const addInformazioniMediche = (oggettoMedico) => {
        setInformazioniMediche((prevList) => ([...prevList, oggettoMedico]))
        setPatologiaSelezionataOggetto({});
    }

    const eliminaOggettoMedico = (id) => {
        let arrayTemporaneo = [];

        informazioniMediche.map((oggettoMedico) => {
            if(oggettoMedico.terapiaID !== id){
                arrayTemporaneo.push(oggettoMedico)
            }
        })
        setInformazioniMediche(arrayTemporaneo);
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
            informazioniMediche: informazioniMediche,
            ID: props.iddd
        };

        let pazienteSalvatoID;
        pazienteSalvatoID = await getServerMgr().updatePaziente(
            datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.informazioniMediche, datiPaziente.ID
        );
        // console.log("pazienteID--> " + pazienteSalvatoID)
        patients_ctx.modificaLista();
    }

    return(
        <form className={styles.center_form} onSubmit={formModifyHandler}>
            <h1 className={styles.title_form}>Modifica i dati del paziente</h1>

            <div className={styles.wrapper_horizontal}>
                <h3 className={visualizzaSchermata === "DATI_PERSONALI" ? `${styles.text_clickable_selected}` : `${styles.text_clickable}`}
                    onClick={(event) => {
                        selezionaSchermataVisualizzata(event, "DATI_PERSONALI")
                    }}
                >
                    DATI PERSONALI
                </h3>
                <h3 className={visualizzaSchermata === "SCHEDA_MEDICA" ? `${styles.text_clickable_selected}` : `${styles.text_clickable}`}
                    onClick={(event) => {
                        selezionaSchermataVisualizzata(event, "SCHEDA_MEDICA")
                    }}
                >
                    SCHEDA MEDICA
                </h3>
            </div>

            <div className={styles.wrapper_flex}>
                {visualizzaSchermata === "DATI_PERSONALI" &&
                    <section className={styles.section_style}>

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
                        {informazioniMediche?.map((oggetto) => (
                        informazioniMediche.length > 0 ?
                        <div key={oggetto.terapiaID} className={styles.wrapper_horizontal}>
                                <CardSmall
                                    children={
                                        <div className={styles.wrapper_vertical}>
                                            {/* <h5>{oggetto.patologiaID}</h5> */}
                                            <div className={`${styles.wrapper_horizontal}`}>
                                                <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Patologia:</label>
                                                <label className={`${styles.listaMedica_label} ${styles.border_right} ${styles.long_width}`}>Terapia:</label>
                                                <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Data inizio:</label>
                                                <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Data fine:</label>
                                                <label className={`${styles.listaMedica_label} ${styles.long_width}`}>Note:</label>
                                            </div>
                                            <div className={`${styles.wrapper_horizontal}`}>
                                                <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{oggetto.nomePatologia}</h5>
                                                <h5 className={`${styles.listaMedica_content} ${styles.border_right} ${styles.long_width}`}>{oggetto.terapia}</h5>
                                                <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{oggetto.dataInizio}</h5>
                                                <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{oggetto.dataFine}</h5>
                                                <h5 className={`${styles.listaMedica_content} ${styles.long_width}`}>{oggetto.note}</h5>
                                            </div>
                                        </div>
                                    }
                                ></CardSmall>
                                <DeleteButton
                                    onClick={() => eliminaOggettoMedico(oggetto.terapiaID)}
                                    stile_alternativo
                                ></DeleteButton>
                            </div>
                            :
                            <>
                            </>
                    ))}
                    <div className={styles.wrapper_horizontal}>
                        <h2 className={styles.text_subtitle}>Seleziona patologia:</h2>
                        <select value={patologiaSelezionata} onChange={patologiaSelezionataChangeHandler} className={styles.select_style}>
                            <option hidden>--seleziona--</option>
                            {listaPatologie.map((singlePat) => (
                                <option key={singlePat.patologiaID}>{singlePat.nomePatologia}</option>
                            ))}
                        </select>
                    </div>
                    
                    {patologiaSelezionata &&
                        <>
                            {/* {showFormAddTherapy && 
                                <GenericButton
                                    onClick={() => {setShowFormAddTherapy((prevState) => (!prevState))}}
                                    buttonText={"Chiudi"}
                                    red_styling
                                    generic_button
                                ></GenericButton>
                            }
                            {showFormAddTherapy && 
                                <h2>form aggiunta terapia</h2>
                            }
                            {Object.keys(patologiaSelezionataOggetto).length > 0 && !showFormAddTherapy &&
                                <>
                                    <GenericButton
                                        onClick={() => {setShowFormAddTherapy((prevState) => (!prevState))}}
                                        buttonText={"Aggiungi terapia"}
                                        generic_button
                                    ></GenericButton>
                                </>
                            } */}
                            {Object.keys(patologiaSelezionataOggetto).length > 0 && 
                                <div className={`${styles.wrapper_horizontal} ${styles.full_width}`}>
                                    <h2 style={{marginTop: "8px"}} className={styles.text_subtitle}>Elenco terapie per: {patologiaSelezionata}</h2>
                                    <GenericButton
                                        onClick={(event) => event.preventDefault()}
                                        buttonText={"Aggiungi terapia"}
                                        generic_button
                                    ></GenericButton>
                                </div>
                            }
                                {patologiaSelezionataOggetto.terapie?.length === 0 && <h2>Non ci sono terapie!</h2>}
                                {patologiaSelezionataOggetto.terapie?.length > 0 && 
                                <div className={styles.scrollable_div}>
                                    {patologiaSelezionataOggetto?.terapie?.map((terapia) => (
                                        
                                        terapiaSelezionata === terapia.terapiaID ?
                                        
                                            <CardSmall
                                                stileAggiuntivo
                                                children={
                                                    <div onClick={() => {
                                                        selezionaTerapia(terapia.terapiaID)
                                                    }} key={terapia.terapiaID}>
                                                        <div className={styles.wrapper_horizontal}>
                                                            <label className={styles.wrap_content}>TERAPIA</label>
                                                            <label className={styles.wrap_content}>NOTE</label>
                                                        </div>
                                                        <div className={styles.wrapper_horizontal}>
                                                            <h5 className={styles.info_content}>{terapia.terapia}</h5>
                                                            <h5 className={styles.info_content}>{terapia.note}</h5>
                                                        </div>
                                                        {/* <h1>SELEZIONATO</h1> */}
                                                        <hr></hr>
                                                        <div className={styles.wrapper_horizontal}>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label>Data inizio</label>
                                                                <input onChange={dataInizioTerapiaChangeHandler} className={styles.input_style_SHORT} type="date"></input>
                                                            </div>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label>Data fine</label>
                                                                <input onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                                                            </div>
                                                        </div>
                                                        <div style={{display: "flex", justifyContent: "center"}}>
                                                            <GenericButton
                                                                onClick={(event) => {
                                                                    event.preventDefault()
                                                                    addInformazioniMediche(
                                                                        {
                                                                            patologiaID: patologiaSelezionataOggetto.patologiaID,
                                                                            nomePatologia: patologiaSelezionataOggetto.nomePatologia,
                                                                            terapiaID: terapia.terapiaID,
                                                                            terapia: terapia.terapia,
                                                                            note: terapia.note,
                                                                            dataInizio: dataInizioTerapia,
                                                                            dataFine: dataFineTerapia
                                                                        }
                                                                    )
                                                                }}
                                                                buttonText={"Salva informazioni"}
                                                                generic_button
                                                            ></GenericButton>
                                                        </div>
                                                        
                                                    </div>
                                                }
                                            >
                                            </CardSmall>
                                        
                                        :
                                            <CardSmall
                                                // stileAggiuntivo
                                                children={
                                                <div onClick={() => {
                                                    selezionaTerapia(terapia.terapiaID)
                                                }} key={terapia.terapiaID}>
                                                    <div className={styles.wrapper_horizontal}>
                                                        <label className={styles.wrap_content}>TERAPIA</label>
                                                        <label className={styles.wrap_content}>NOTE</label>
                                                    </div>
                                                    <div className={styles.wrapper_horizontal}>
                                                        <h5 className={styles.info_content}>{terapia.terapia}</h5>
                                                        <h5 className={styles.info_content}>{terapia.note}</h5>
                                                    </div>
                                                </div>
                                                }
                                            >
                                            </CardSmall>
                                        ))
                                    }
                                </div>
                            }
                        </>
                    }
                    </section>
                }
            </div>

            <div className={styles.wrapper_horizontal}>
                <GenericButton
                    onClick={patients_ctx.chiudiFormModifica}
                    small_button={true}
                    buttonText="Chiudi"
                >
                </GenericButton>
                <GenericButton
                    type="submit"
                    generic_button={true}
                    buttonText="Conferma modifiche"
                >
                </GenericButton>
            </div>
            
        </form>
    );
}

export default EditPaziente;