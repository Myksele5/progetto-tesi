import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import PatientContext from "../../context/patients-context";
import CardSmall from "../UI/CardSmall";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";

function AddPaziente(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);
    const patologies_ctx = useContext(PatologiesContext);

    const [listaPatologie, setListaPatologie] = useState(patologies_ctx.uniqueList);
    var emailEsistente = null;

    const [stepAggiuntaPaziente, setStepAggiuntaPaziente] = useState(1);

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

    const [patologiaSelezionata, setPatologiaSelezionata] = useState("");
    const [patologiaSelezionataOggetto, setPatologiaSelezionataOggetto] = useState({});

    const [terapiaSelezionata, setTerapiaSelezionata] = useState();
    const [showFormAddTherapy, setShowFormAddTherapy] = useState(false);

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [informazioniMediche, setInformazioniMediche] = useState([]);

    const [counterPatologie, setCounterPatologie] = useState(1);
    const [enteredPatologia_1, setEnteredPatologia_1] = useState('');
    const [patologieList, setPatologieList] = useState([{patID: counterPatologie, patologia: ""}]);
    // const [enteredPatologia_2, setEnteredPatologia_2] = useState('');
    // const [enteredPatologia_3, setEnteredPatologia_3] = useState('');

    const [counterMedicine, setCounterMedicine] = useState(1);
    const [enteredMedicine_1, setEnteredMedicine_1] = useState('');
    const [medicineList, setMedicineList] = useState([{medID: counterMedicine, medicina: ""}]);
    // const [enteredMedicine_2, setEnteredMedicine_2] = useState('');
    // const [enteredMedicine_3, setEnteredMedicine_3] = useState('');

    const [enteredNoteParticolari, setEnteredNoteParticolari] = useState('');

    const [enteredTerapia, setEnteredTerapia] = useState('');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPsw, setEnteredPsw] = useState('');

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

    const stepSuccessivo = () => {
        setStepAggiuntaPaziente((nextStep) => (nextStep + 1))
    }

    const stepPrecedente = () => {
        setStepAggiuntaPaziente((prevStep) => (prevStep - 1))
    }

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
        setPatologiaSelezionataOggetto({})
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

        let prossimoIDpatolog = counterPatologie + 1;
        setPatologieList((prevList) => ([...prevList, {patID: prossimoIDpatolog, patologia: ""}]));
        setCounterPatologie(prossimoIDpatolog)
    }

    const patologiaChangeHandler_1 = (event, id) => {
        console.log(event.target.value);
        setEnteredPatologia_1(event.target.value);
        console.log(id);
        patologieList.map((patolog) => {
            if(patolog.patID === id){
                patolog.patologia = event.target.value
            }
        })
    }

    const noteParticolariChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredNoteParticolari(event.target.value);
    }

    function aggiungiMedicina(event){
        event.preventDefault();

        let prossimoIDmedicina = counterMedicine + 1;
        setMedicineList((prevList) => ([...prevList, {medID: prossimoIDmedicina, medicina: ""}]));
        setCounterMedicine(prossimoIDmedicina)
    }

    const medicineChangeHandler_1 = (event, id) => {
        console.log(event.target.value);
        setEnteredMedicine_1(event.target.value);
        console.log(id);
        medicineList.map((med) => {
            if(med.medID === id){
                med.medicina = event.target.value
            }
        })
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

    async function formSubmitHandler(event){
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
            doct_UID: auth_ctx.utenteLoggatoUID,
            nome: enteredNome,
            cognome: enteredCognome,
            city: enteredCittà,
            codiceFiscale: enteredCF.toUpperCase(),
            dataNascita: dateString,
            informazioniMediche: informazioniMediche
        };

        
        let pazienteSalvatoID;
        pazienteSalvatoID = await getServerMgr().addPaziente(
            datiPaziente.doct_UID, datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.informazioniMediche
        );
        console.log("pazienteID--> " + pazienteSalvatoID)
        patients_ctx.nuovoPazienteHandler();
        
        // console.log(pazienteSalvatoID);
        // props.onCreateNewPaziente(datiNuovoPaziente);
        
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

    function provaDaCancellare(event){
        event.preventDefault()
        console.log(patologieList)
        console.log(medicineList)
    }

    return(
        <div className={styles.center_form}>
                {stepAggiuntaPaziente === 1 && 
                <>
                    <h1 className={styles.title_form}>Inserisci i dati del paziente</h1>
                    <div className={styles.wrapper_flex}>
                        <section className={styles.section_style}>
                            {/* <h3 className={styles.subtitle_form}>DATI PERSONALI</h3> */}

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
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={hideForm}
                            small_button={true}
                            buttonText='Torna indietro'>
                        </GenericButton>
                        <GenericButton 
                            onClick={(event) => {
                                event.preventDefault();
                                stepSuccessivo();
                            }}
                            generic_button={true}
                            buttonText='Avanti'>
                        </GenericButton>

                    </div>
                    
                </>
                }

                {stepAggiuntaPaziente === 2 &&
                <>
                    <h1 className={styles.title_form}>Scheda Medica</h1>
                    <div className={styles.wrapper_flex}>
                        <section className={styles.section_style}>
                        {informazioniMediche.map((oggetto) => (
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
                        
                        <h2 className={styles.text_subtitle}>Seleziona una patologia</h2>
                        <select value={patologiaSelezionata} onChange={patologiaSelezionataChangeHandler} className={styles.select_style}>
                            <option hidden>--seleziona--</option>
                            {listaPatologie.map((singlePat) => (
                                <option key={singlePat.patologiaID}>{singlePat.nomePatologia}</option>
                            ))}
                        </select>
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
                                } */}
                                {/* {Object.keys(patologiaSelezionataOggetto).length > 0 && !showFormAddTherapy &&
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
                                                    <>
                                                        <div className={styles.container_flexible_INFO} onClick={() => {
                                                            selezionaTerapia(terapia.terapiaID)
                                                            }} key={terapia.terapiaID}>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label className={styles.listaMedica_label_TERAPIA}>TERAPIA:</label>
                                                                <h5 className={styles.listaMedica_content_TERAPIA}>{terapia.terapia}</h5>
                                                            </div>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label className={styles.listaMedica_label_NOTE}>NOTE:</label>
                                                                <h5 className={styles.listaMedica_content_NOTE}>{terapia.note}</h5>
                                                            </div>
                                                            {/* <h1>SELEZIONATO</h1> */}
                                                            {/* <hr></hr> */}
                                                        </div>
                                                        <hr style={{margin: "0", border: "1px solid #163172"}}></hr>
                                                        <div className={styles.container_flexible_DATE}>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label className={styles.listaMedica_label_DATA}>Data inizio</label>
                                                                <input onChange={dataInizioTerapiaChangeHandler} className={styles.input_style_SHORT} type="date"></input>
                                                            </div>
                                                            <div className={styles.wrapper_vertical}>
                                                                <label className={styles.listaMedica_label_DATA}>Data fine</label>
                                                                <input onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                                                            </div>
                                                        </div>
                                                        <hr style={{margin: "0", border: "1px solid #163172"}}></hr>
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
                                                    </>
                                                }
                                            >
                                            </CardSmall>
                                        
                                        :
                                            <CardSmall
                                                // stileAggiuntivo
                                                children={
                                                <div className={styles.container_flexible_INFO} onClick={() => {
                                                    selezionaTerapia(terapia.terapiaID)
                                                }} key={terapia.terapiaID}>
                                                    
                                                    <div className={styles.wrapper_vertical}>
                                                        <label className={styles.listaMedica_label_TERAPIA}>TERAPIA:</label>
                                                        <h5 className={styles.listaMedica_content_TERAPIA}>{terapia.terapia}</h5>
                                                    </div>

                                                    <div className={styles.wrapper_vertical}>    
                                                        <label className={styles.listaMedica_label_NOTE}>NOTE:</label>
                                                        <h5 className={styles.listaMedica_content_NOTE}>{terapia.note}</h5>
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
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={stepPrecedente}
                            small_button={true}
                            buttonText='Torna ai dati personali'>
                        </GenericButton>
                        <GenericButton 
                            onClick={stepSuccessivo}
                            // onClick={provaDaCancellare}
                            generic_button={true}
                            buttonText='Avanti'>
                        </GenericButton>
                    </div>
                </>
                }

                {stepAggiuntaPaziente === 3 &&
                <>
                    <div className={styles.wrapper_flex}>
                        <section className={styles.section_style}>
                            <h3 className={styles.subtitle_form}>CREDENZIALI</h3>

                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Email:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="email" value={enteredEmail} onChange={emailChangeHandler}></input>

                            <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Password:</label>
                            <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredPsw} onChange={pswChangeHandler}></input>
                            
                            <p className={styles.paragraph_style}><b>Attenzione!</b> Queste credenziali serviranno al paziente </p>
                            <p className={styles.paragraph_style}>per potersi collegare alla piattaforma e svolgere attività.</p>
                            <p className={styles.paragraph_style}>Se inserite, verrà creato un profilo per il paziente</p>

                        </section>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={stepPrecedente}
                            small_button={true}
                            buttonText='Torna a scheda medica'>
                        </GenericButton>
                        <GenericButton 
                            onClick={formSubmitHandler} 
                            generic_button={true}
                            buttonText='Salva nuovo paziente'>
                        </GenericButton>
                    </div>
                    
                </>
                }
            

            {/* <hr className={styles.horizontal_line}></hr> */}

            
        </div>
    );
}
export default AddPaziente;