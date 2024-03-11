import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import PatientContext from "../../context/patients-context";
import CardSmall from "../UI/CardSmall";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import { Accordion, Collapse } from "react-bootstrap";

function AddPaziente(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);
    const patologies_ctx = useContext(PatologiesContext);

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

    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [validTerapia, setValidTerapia] = useState(true);
    const [noteDaModificare, setNoteDaModificare] = useState("")

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [informazioniMediche, setInformazioniMediche] = useState([]);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPsw, setEnteredPsw] = useState('');

    useEffect(() => {
        setPatologiaSelezionata("--seleziona--");
        patologies_ctx.cambiaPatologiaSelezionataFormPaziente({})
        setDataInizioTerapia("");
        setDataFineTerapia("");
    }, [informazioniMediche])

    const stepSuccessivo = () => {
        var dateee = new Date(enteredData);

        switch(stepAggiuntaPaziente){
            case 1:
                if(stepAggiuntaPaziente === 1){
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
                }
                else{
                    var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
                    var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
                    var year = dateee.getFullYear();
            
                    let dateString = `${year}-${month}-${day}`;
                    setEnteredData(dateString);
                    setStepAggiuntaPaziente((nextStep) => (nextStep + 1))
                }
            }
            break;
        case 2:
            setStepAggiuntaPaziente((nextStep) => (nextStep + 1));
            break;
        }
        
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
        patologies_ctx.cambiaPatologiaSelezionataFormPaziente(patologies_ctx.getTherapiesListSinglePat(event.target.value));
        setTerapiaSelezionata();
        setShowFormAddTherapy(false);
    }

    const verificaTerapiaGiàAssegnata = (terapia) => {
        let footerItem;
        console.log(informazioniMediche)
        console.log(terapia)

        if(informazioniMediche.length > 0){
            for(var i=0; i < informazioniMediche.length; i++){
                if(terapia.terapiaID !== informazioniMediche[i].terapiaID){
                    footerItem =
                    <Collapse in={terapiaSelezionata === terapia.terapiaID}>
                        <div>
                            <div className={styles.wrapper_date}>
                                <div className={styles.wrapper_vertical}>
                                    <label className={styles.listaMedica_label_DATA}>Data inizio</label>
                                    <input onChange={dataInizioTerapiaChangeHandler} className={styles.input_style_SHORT} type="date"></input>
                                </div>
                                <div className={styles.wrapper_vertical}>
                                    <label className={styles.listaMedica_label_DATA}>Data fine</label>
                                    <input onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                                </div>   
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <GenericButton
                                    onClick={(event) => {
                                        event.preventDefault()
                                        addInformazioniMediche(
                                            {
                                                patologiaID: patologies_ctx.patologiaSelezionataFormPaziente.patologiaID,
                                                nomePatologia: patologies_ctx.patologiaSelezionataFormPaziente.nomePatologia,
                                                terapiaID: terapia.terapiaID,
                                                terapia: terapia.terapia,
                                                note: terapia.note,
                                                dataInizio: dataInizioTerapia,
                                                dataFine: dataFineTerapia
                                            }
                                        )
                                    }}
                                    buttonText={"Aggiungi"}
                                    generic_button
                                ></GenericButton>
                            </div>
                        </div>
                    </Collapse>
                }
                else{
                    footerItem = <h2 className={styles.already_assigned}>Hai già assegnato questa terapia!</h2>
                    break;
                }
            }
        }
        else{
            footerItem =
            <Collapse in={terapiaSelezionata === terapia.terapiaID}>
                <div>
                    <div className={styles.wrapper_date}>
                        <div className={styles.wrapper_vertical}>
                            <label className={styles.listaMedica_label_DATA}>Data inizio</label>
                            <input onChange={dataInizioTerapiaChangeHandler} className={styles.input_style_SHORT} type="date"></input>
                        </div>
                        <div className={styles.wrapper_vertical}>
                            <label className={styles.listaMedica_label_DATA}>Data fine</label>
                            <input onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                        </div>   
                    </div>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <GenericButton
                            onClick={(event) => {
                                event.preventDefault()
                                addInformazioniMediche(
                                    {
                                        patologiaID: patologies_ctx.patologiaSelezionataFormPaziente.patologiaID,
                                        nomePatologia: patologies_ctx.patologiaSelezionataFormPaziente.nomePatologia,
                                        terapiaID: terapia.terapiaID,
                                        terapia: terapia.terapia,
                                        note: terapia.note,
                                        dataInizio: dataInizioTerapia,
                                        dataFine: dataFineTerapia
                                    }
                                )
                            }}
                            buttonText={"Aggiungi"}
                            generic_button
                        ></GenericButton>
                    </div>
                </div>
            </Collapse>
        }
        return (
            <div className={styles.container_flexible_INFO} onClick={() => {selezionaTerapia(terapia.terapiaID)}} key={terapia.terapiaID}>
                <label className={styles.listaMedica_label_TERAPIA}>TERAPIA:</label>
                <h5 className={styles.listaMedica_content_TERAPIA}>{terapia.terapia}</h5>

                <label className={styles.listaMedica_label_NOTE}>NOTE:</label>
                <h5 className={styles.listaMedica_content_NOTE}>{terapia.note}</h5>

                {footerItem}                            
            </div>
        );
    }

    const selezionaTerapia = (id) => {
        setTerapiaSelezionata(id)
    }

    const dataInizioTerapiaChangeHandler = (event) => {
        setDataInizioTerapia(event.target.value);
    }
    const dataFineTerapiaChangeHandler = (event) => {
        setDataFineTerapia(event.target.value);
    }
    function terapiaChangeHandler(event){
        setTerapiaDaModificare(event.target.value);
        setValidTerapia(true);
    }
    function noteChangeHandler(event){
        setNoteDaModificare(event.target.value);
    }

    function salvaNuovaTerapia(patologiaID){
        if(terapiaDaModificare.length > 3){
            patologies_ctx.addNewTherapy(patologiaID, terapiaDaModificare, noteDaModificare);

            setTerapiaDaModificare("");
            setNoteDaModificare("");
            setShowFormAddTherapy(false)
        }
        else{
            setValidTerapia(false)
        }
    }
    
    const addInformazioniMediche = (oggettoMedico) => {
        setInformazioniMediche((prevList) => ([...prevList, oggettoMedico]))
        console.log(informazioniMediche)
        patologies_ctx.cambiaPatologiaSelezionataFormPaziente({})
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

        const datiPaziente = {
            doct_UID: auth_ctx.utenteLoggatoUID,
            nome: enteredNome,
            cognome: enteredCognome,
            city: enteredCittà,
            codiceFiscale: enteredCF.toUpperCase(),
            dataNascita: enteredData,
            informazioniMediche: informazioniMediche
        };

        
        let pazienteSalvatoID;
        pazienteSalvatoID = await getServerMgr().addPaziente(
            datiPaziente.doct_UID, datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.informazioniMediche
        );
        console.log("pazienteID--> " + pazienteSalvatoID)

        if(enteredEmail.includes('@') && enteredPsw.trim().length > 5 && pazienteSalvatoID){
            // setModaleCREAZIONEUTENTE(true);
            creaAccountPaziente(pazienteSalvatoID);
        }

        patients_ctx.nuovoPazienteHandler();
        
        setEnteredNome('');
        // setValidNome(true);
        setEnteredCognome('');
        // setValidCognome(true);
        setEnteredCittà('');
        // setValidCittà(true);
        setEnteredData('');
        // setValidData(true);
    }

    async function creaAccountPaziente(pazienteID){
        let result;
        result = await getServerMgr().getAccount()
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });

        if(result !== undefined){
            for(var i=0; i < result.length; i++){
                if(result[i].email === enteredEmail){
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
                result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 3, enteredEmail, enteredPsw, pazienteID)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                });

                console.log(result2)
                await getServerMgr().updatePatientWithProfileID(result2, pazienteID)
                .catch((err) => {
                    console.error(err);
                });
            }
        }
        else{
            let result2;
            result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 3, enteredEmail, enteredPsw, pazienteID)
            .then(alert("ACCOUNT CREATO!"))
            .catch((err) => {
                console.error(err);
            })

            console.log(result2)
            await getServerMgr().updatePatientWithProfileID(result2, pazienteID)
            .catch((err) => {
                console.error(err);
            });
        }  

        return
    }

    function hideForm(event){
        event.preventDefault();
        props.hideFormNewPaziente();
    }

    return(
        <div className={styles.center_form}>
            {stepAggiuntaPaziente === 1 && 
            <div className={styles.wrapper_step1}>
                <h1 className={styles.title_form}>Inserisci i dati del paziente</h1>
                <div className={styles.wrapper_vertical}>
                    {/* <section className={styles.section_style_FORM}> */}

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredNome} onChange={nomeChangeHandler}></input>
                        {!validNome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un nome valido</div>}

                        <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome:</label>
                        <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={enteredCognome} onChange={cognomeChangeHandler}></input>
                        {!validCognome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un cognome valido</div>}

                        <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita:</label>
                        <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={enteredCittà} onChange={cittàChangeHandler}></input>
                        {!validCittà && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una città esistente</div>}

                        <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita:</label>
                        <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min="01-01-1800" max="31-31-2400" value={enteredData} onChange={dataNascitaChangeHandler}></input>
                        {!validData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una data valida</div>}

                        <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                        <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={enteredCF} onChange={CFChangeHandler}></input>
                        {!validCF && <div style={{width: "100%", color: "red", textAlign: "center"}}>Il codice fiscale deve contenere 16 caratteri</div>}

                    {/* </section> */}
                </div>
                <hr className={styles.horizontal_line}></hr>
                <div className={styles.horizontal}>
                    <GenericButton
                        onClick={hideForm}
                        generic_button={true}
                        red_styling
                        buttonText='Indietro'>
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
                
            </div>
            }

            {stepAggiuntaPaziente === 2 &&
            <div className={styles.wrapper_step2}>
                <h1 className={styles.title_form}>Scheda Medica</h1>
                {informazioniMediche.length > 0 &&
                    <div style={{width: "100%"}}>
                        <Accordion>
                            <h2 className={styles.text_subtitle}>Terapie assegnate:</h2>
                            {informazioniMediche.map((oggetto) => (
                                <Accordion.Item className={`${styles.accordion_item}`} eventKey={oggetto.terapiaID}>
                                    <Accordion.Header>Terapia per {oggetto.nomePatologia}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={styles.wrapper_vertical}>
                                            <div className={styles.wrapper_horizontal}>
                                                <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Patologia:</label>
                                                <h5 className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{oggetto.nomePatologia}</h5>
                                            </div>
                                            <div className={styles.wrapper_horizontal}>
                                                <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Terapia:</label>
                                                <h5 className={`${styles.sintesiMedica_content_TERAPIA}`}>{oggetto.terapia}</h5>
                                            </div>
                                            <div className={styles.wrapper_horizontal}>
                                                <label className={`${styles.sintesiMedica_label_DATA}`}>Data inizio:</label>
                                                <h5 className={`${styles.sintesiMedica_content_DATA}`}>{oggetto.dataInizio ? oggetto.dataInizio : "N.D"}</h5>
                                            </div>
                                            <div className={styles.wrapper_horizontal}>
                                                <label className={`${styles.sintesiMedica_label_DATA}`}>Data fine:</label>
                                                <h5 className={`${styles.sintesiMedica_content_DATA}`}>{oggetto.dataFine ? oggetto.dataFine : "N.D"}</h5>
                                            </div>
                                            <div className={styles.wrapper_horizontal}>
                                                <label className={`${styles.sintesiMedica_label_NOTE}`}>Note:</label>
                                                <h5 className={`${styles.sintesiMedica_content_NOTE}`}>{oggetto.note}</h5>
                                            </div>
                                            <div style={{width: "100%", marginTop: "10px"}} className={styles.horizontal}>
                                                <DeleteButton onClick={
                                                    () => eliminaOggettoMedico(oggetto.terapiaID)
                                                }>
                                                </DeleteButton>
                                            </div>
                                            
                                        </div>
                                        
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                }
                <div className={styles.wrapper_vertical}>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h2 className={styles.text_subtitle}>Seleziona patologia:</h2>

                    </div>

                    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <select value={patologiaSelezionata} onChange={patologiaSelezionataChangeHandler} className={styles.select_style}>
                            <option hidden>--seleziona--</option>
                            {patologies_ctx.uniqueList.map((singlePat) => (
                                <option className={styles.option_style} key={singlePat.patologiaID}>{singlePat.nomePatologia}</option>
                            ))}
                        </select>
                    </div>
                
                    {showFormAddTherapy &&
                        <>
                            <div className={styles.wrapper_vertical}>
                                <label className={`${styles.label_style} ${!validTerapia ? styles.invalid : ""}`}>Inserisci terapia:</label>
                                <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={`${styles.input_style_MODIFICA_TERAPIA} ${!validTerapia ? styles.invalid : ""}`}></textarea>
                                {!validTerapia && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una terapia valida. {"(min. 4 caratteri)"}</div>}
                            </div>
                            {/* <hr style={{width: "100%", border: "1px solid #163172"}}></hr> */}
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>Note:</label>
                                <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>
                            </div>
                            {/* <hr style={{width: "100%", border: "1px solid #163172"}}></hr> */}
                            <div style={{width: "100%"}} className={styles.horizontal}>
                                <GenericButton
                                    onClick={() => {
                                        setShowFormAddTherapy(false)
                                    }}
                                    buttonText={"Annulla"}
                                    red_styling
                                    generic_button
                                ></GenericButton>
                                <GenericButton
                                    onClick={() => {
                                        salvaNuovaTerapia(patologies_ctx.patologiaSelezionataFormPaziente.patologiaID);
                                    }}
                                    buttonText={"Salva nuova terapia"}
                                    generic_button
                                ></GenericButton>
                            </div>
                        </>
                    }
                    {patologies_ctx.patologiaSelezionataFormPaziente.terapie?.length === 0 && !showFormAddTherapy && <h2>Non ci sono terapie salvate.</h2>}
                    {patologies_ctx.patologiaSelezionataFormPaziente.terapie?.length > 0 && !showFormAddTherapy && 
                        <>
                            <div className={styles.buttons_wrapper}>
                                <GenericButton
                                    onClick={() => {
                                        setPatologiaSelezionata("--seleziona--");
                                        patologies_ctx.cambiaPatologiaSelezionataFormPaziente({})
                                        setDataInizioTerapia("");
                                        setDataFineTerapia("");
                                    }}
                                    buttonText={"Annulla"}
                                    red_styling
                                    generic_button
                                ></GenericButton>
                                <GenericButton
                                    onClick={() => {
                                        setShowFormAddTherapy(true)
                                    }}
                                    buttonText={"Nuova Terapia"}
                                    generic_button
                                ></GenericButton>
                            </div>
                            <h2 className={styles.text_subtitle}>Elenco terapie:</h2>
                            <div className={styles.scrollable_wrapper_terapie}>
                                {patologies_ctx.patologiaSelezionataFormPaziente.terapie?.map(verificaTerapiaGiàAssegnata)}
                            </div>
                        </>
                    }
                    
                </div>
                
                {!showFormAddTherapy && patologiaSelezionata === "--seleziona--" &&
                <>
                    <hr className={styles.horizontal_line}></hr>
                    <div className={styles.horizontal}>
                        <GenericButton
                            onClick={stepPrecedente}
                            generic_button={true}
                            red_styling
                            buttonText='Indietro'>
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
            </div>
            }

            {stepAggiuntaPaziente === 3 &&
            <div className={styles.wrapper_step1}>
                <div className={styles.wrapper_vertical}>
                    {/* <section className={styles.section_style_FORM}> */}
                        <h3 className={styles.title_form}>Credenziali per il paziente</h3>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Email:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="email" value={enteredEmail} onChange={emailChangeHandler}></input>

                        <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Password:</label>
                        <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredPsw} onChange={pswChangeHandler}></input>
                        
                        <p className={styles.paragraph_style}><b>Attenzione! </b>
                            Queste credenziali serviranno al paziente per potersi collegare alla piattaforma e svolgere attività. Se inserite, verrà creato un profilo per il paziente
                        </p>
                        <p className={styles.paragraph_style}></p>

                    {/* </section> */}
                </div>
                <div className={styles.horizontal}>
                    <GenericButton
                        onClick={stepPrecedente}
                        generic_button={true}
                        red_styling
                        buttonText='Indietro'>
                    </GenericButton>
                    <GenericButton 
                        onClick={formSubmitHandler} 
                        generic_button={true}
                        buttonText='Salva paziente'>
                    </GenericButton>
                </div>
                
            </div>
            }
            

            {/* <hr className={styles.horizontal_line}></hr> */}

            
        </div>
    );
}
export default AddPaziente;