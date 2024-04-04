import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import PatientContext from "../../context/patients-context";
import CardSmall from "../UI/CardSmall";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import { Accordion, Collapse, Modal } from "react-bootstrap";
import EditButton from "../UI/EditButton";

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
    const [errorMinData, setErrorMinData] = useState(false)

    const [validCF, setValidCF] = useState(true);
    const [enteredCF, setEnteredCF] = useState('');

    const [patologiaSelezionata, setPatologiaSelezionata] = useState("");
    const [patologiaSelezionataOggetto, setPatologiaSelezionataOggetto] = useState({});

    const [terapiaSelezionata, setTerapiaSelezionata] = useState();
    const [showFormAddTherapy, setShowFormAddTherapy] = useState(false);

    const [countTerapie, setCountTerapie] = useState(1);
    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [validTerapia, setValidTerapia] = useState(true);
    const [noteDaModificare, setNoteDaModificare] = useState("")

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [ID_modificaTerapia, setID_modificaTerapia] = useState();
    const [modaleAggiungiTerapia, setModaleAggiungiTerapia] = useState(false);
    const [modaleModificaTerapia, setModaleModificaTerapia] = useState(false);

    const [modaleCreazioneAccount, setModaleCreazioneAccount] = useState(false);
    const [credenzialiInserite, setCredenzialiInserite] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [enteredPsw, setEnteredPsw] = useState('');
    const [validPsw, setValidPsw] = useState(true);

    useEffect(() => {
        setPatologiaSelezionata("");
        patologies_ctx.cambiaPatologiaSelezionataFormPaziente({})
        setDataInizioTerapia("");
        setDataFineTerapia("");
    }, [informazioniMediche])

    const stepSuccessivo = () => {
        var dateee = new Date(enteredData);

        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();

        let dateString = `${year}-${month}-${day}`;

        switch(stepAggiuntaPaziente){
            case 1:
                
                if(stepAggiuntaPaziente === 1){
                    if(enteredNome.trim().length < 1 
                    || enteredCognome.trim().length < 1 
                    || enteredCittà.trim().length < 1 
                    || isNaN(dateee) || dateString < "1870-01-01"
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
                        else if(dateString < "1870-01-01"){
                            setValidData(false);
                            setErrorMinData(true);
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
        setErrorMinData(false);
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

    const selezionaTerapia = (id) => {
        setTerapiaSelezionata(id)
    }

    const dataInizioTerapiaChangeHandler = (event) => {
        console.log(event.target.value)
        setDataInizioTerapia(event.target.value);
        setErrorMinData(false);
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
    
    const addInformazioniMediche = (oggettoMedico) => {
        console.log(dataInizioTerapia)
        if(dataInizioTerapia < "2010-01-01"){
            setErrorMinData(true)
        }
        else{
            setInformazioniMediche((prevList) => ([...prevList, oggettoMedico]))
            console.log(informazioniMediche)
            patologies_ctx.cambiaPatologiaSelezionataFormPaziente({})
        }
    }

    const modificaTerapia = (terapiaID) => {
        informazioniMediche.map((terapia) => {
            if(terapia.terapiaID === terapiaID){
                terapia.terapia = terapiaDaModificare
                terapia.note = noteDaModificare
                terapia.dataInizio = dataInizioTerapia
                terapia.dataFine = dataFineTerapia
            }
        })
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
        setValidEmail(true);
    }

    const pswChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredPsw(event.target.value);
        setValidPsw(true);
    }

    async function formSubmitHandler(){
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

        if(validEmail && validPsw && pazienteSalvatoID && modaleCreazioneAccount){
            // setModaleCREAZIONEUTENTE(true);
            creaAccountPaziente(pazienteSalvatoID);
        }
        
        if(!modaleCreazioneAccount){
            patients_ctx.nuovoPazienteHandler();
        }
        
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
                    setValidEmail(false)
                    setErrorEmailMsg("Email già associata ad un account!");
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

                patients_ctx.nuovoPazienteHandler();
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

            patients_ctx.nuovoPazienteHandler();
        }  

        return
    }

    function hideForm(event){
        event.preventDefault();
        props.hideFormNewPaziente();
    }

    function validateForm(bool_crea_account){
        let validate_email = true;
        let validate_password = true;

        if(!bool_crea_account){
            formSubmitHandler();
        }
        else{
            if(!enteredEmail.includes('@')){
                setValidEmail(false);
                setErrorEmailMsg("Inserisci una email valida")
                validate_email = false;
            }
            if(enteredPsw.trim().length <= 5){
                setValidPsw(false);
                validate_password = false;
            }
            if(validate_email && validate_password){
                formSubmitHandler();
            }
        }
    }

    return(
        <div className={styles.center_form}>
            {stepAggiuntaPaziente === 1 && 
            <div className={styles.wrapper_step1}>
                <h1 className={styles.title_form}>Inserisci i dati del paziente</h1>
                <div className={styles.wrapper_vertical}>

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
                    <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min={"1870-01-01"} max="31-31-2400" value={enteredData} onChange={dataNascitaChangeHandler}></input>
                    {!validData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una data valida</div>}
                    {errorMinData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Non puoi inserire una data antecedente al 01-01-1870</div>}

                    <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                    <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={enteredCF} onChange={CFChangeHandler}></input>
                    {!validCF && <div style={{width: "100%", color: "red", textAlign: "center"}}>Il codice fiscale deve contenere 16 caratteri</div>}

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
                                                <EditButton
                                                    onClick={() => {
                                                        setModaleModificaTerapia(true)
                                                        setTerapiaDaModificare(oggetto.terapia)
                                                        setNoteDaModificare(oggetto.note)
                                                        setDataInizioTerapia(oggetto.dataInizio)
                                                        setDataFineTerapia(oggetto.dataFine)
                                                        setID_modificaTerapia(oggetto.terapiaID)
                                                    }}
                                                ></EditButton>
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

                <Modal size="lg" centered show={modaleModificaTerapia}>
                    <Modal.Header className={styles.text_subtitle}>Modifica terapia</Modal.Header>
                    <Modal.Body>
                        <label className={`${styles.label_style} ${!validTerapia ? styles.invalid : ""}`}>Terapia:</label>
                        <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={`${styles.input_style_MODIFICA_TERAPIA} ${!validTerapia ? styles.invalid : ""}`}></textarea>
                        {!validTerapia && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una terapia valida. {"(min. 4 caratteri)"}</div>}

                        <label className={styles.label_style}>Note:</label>
                        <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>

                        <label className={styles.label_style}>Data inizio</label>
                        <input value={dataInizioTerapia} onChange={dataInizioTerapiaChangeHandler} min={"2010-01-01"} className={styles.input_style_SHORT} type="date"></input>
                        {errorMinData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Non puoi inserire una data antecedente al 01-01-2010</div>}

                        <label className={styles.label_style}>Data fine</label>
                        <input value={dataFineTerapia} onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <GenericButton
                            onClick={() => {
                                if(terapiaDaModificare.length > 3 && dataInizioTerapia >= "2010-01-01"){
                                    setModaleModificaTerapia(false)
                                    modificaTerapia(ID_modificaTerapia);
                                }
                                if(terapiaDaModificare.length <= 3){
                                    setValidTerapia(false)
                                }
                                if(dataInizioTerapia < "2010-01-01"){
                                    setErrorMinData(true)
                                }
                            }}
                            generic_button={true}
                            // red_styling
                            buttonText="Aggiorna"
                        >
                        </GenericButton>
                        <GenericButton
                            onClick={() => {setModaleModificaTerapia(false)}}
                            generic_button={true}
                            red_styling
                            buttonText="Chiudi"
                        >
                        </GenericButton>
                    </Modal.Footer>
                </Modal>
                
                <div className={styles.vertical}>
                    <GenericButton
                        onClick={() => {
                            setModaleAggiungiTerapia(true)
                        }}
                        generic_button={true}
                        // red_styling
                        buttonText="Aggiungi terapia"
                    >
                    </GenericButton>

                    <Modal size="lg" centered show={modaleAggiungiTerapia}>
                        <Modal.Header className={styles.text_subtitle}>Nuova terapia</Modal.Header>
                        <Modal.Body>
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
                            {patologiaSelezionata.length > 0 &&
                            <>
                                <label className={`${styles.label_style} ${!validTerapia ? styles.invalid : ""}`}>Terapia:</label>
                                <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={`${styles.input_style_MODIFICA_TERAPIA} ${!validTerapia ? styles.invalid : ""}`}></textarea>
                                {!validTerapia && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una terapia valida. {"(min. 4 caratteri)"}</div>}

                                <label className={styles.label_style}>Note:</label>
                                <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>

                                <label className={styles.label_style}>Data inizio</label>
                                <input value={dataInizioTerapia} onChange={dataInizioTerapiaChangeHandler} min={"2010-01-01"} className={styles.input_style_SHORT} type="date"></input>
                                {errorMinData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Non puoi inserire una data antecedente al 01-01-2010</div>}

                                <label className={styles.label_style}>Data fine</label>
                                <input value={dataFineTerapia} onChange={dataFineTerapiaChangeHandler} min={dataInizioTerapia} className={styles.input_style_SHORT} type="date"></input>
                            </>
                            }
                        </Modal.Body>
                        <Modal.Footer style={{justifyContent: "center"}}>
                            <GenericButton
                                onClick={() => {
                                    console.log(dataInizioTerapia >= "2010-01-01")
                                    if(terapiaDaModificare.length > 3 && dataInizioTerapia >= "2010-01-01"){
                                        setModaleAggiungiTerapia(false)
                                        addInformazioniMediche(
                                            {
                                                patologiaID: patologies_ctx.patologiaSelezionataFormPaziente.patologiaID,
                                                nomePatologia: patologies_ctx.patologiaSelezionataFormPaziente.nomePatologia,
                                                terapiaID: countTerapie,
                                                terapia: terapiaDaModificare,
                                                note: noteDaModificare,
                                                dataInizio: dataInizioTerapia,
                                                dataFine: dataFineTerapia
                                            }
                                        )
                                        setCountTerapie((countTerapie) => countTerapie + 1)
                                    }
                                    if(terapiaDaModificare.length <= 3){
                                        setValidTerapia(false)
                                    }
                                    if(dataInizioTerapia < "2010-01-01"){
                                        setErrorMinData(true)
                                    }
                                    
                                }}
                                generic_button={true}
                                // red_styling
                                buttonText="Aggiungi"
                            >
                            </GenericButton>
                            <GenericButton
                                onClick={() => {setModaleAggiungiTerapia(false)}}
                                generic_button={true}
                                red_styling
                                buttonText="Chiudi"
                            >
                            </GenericButton>
                        </Modal.Footer>
                    </Modal>
                    
                </div>
                
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
                    
                {/* } */}
            </div>
            }

            {stepAggiuntaPaziente === 3 &&
            <div className={styles.wrapper_step1}>
                <div className={styles.wrapper_vertical}>
                    {/* <section className={styles.section_style_FORM}> */}
                        <h3 className={styles.title_form}>Account per il paziente</h3>
                        <h5>Se vuoi creare subito un account per il paziente, clicca sul pulsante 'Crea account' ed inserisci i dati richiesti.</h5>
                        <div style={{width: "100%"}} className={styles.horizontal}>
                            <GenericButton 
                                onClick={() => {setModaleCreazioneAccount(true)}}
                                generic_button={true}
                                buttonText='Crea account'>
                            </GenericButton>
                        </div>
                        
                        <h5>Altrimenti puoi salvare subito il paziente e creare un account successivamente andando sulla scheda del paziente</h5>

                        <Modal centered show={modaleCreazioneAccount}>
                            <Modal.Header style={{fontWeight: "bold"}}>Creazione account paziente</Modal.Header>
                            <Modal.Body>
                                <label className={`${styles.label_style} ${!validEmail ? styles.invalid : ""}`}>Email:</label>
                                <input className={`${styles.input_style} ${!validEmail ? styles.invalid : ""}`} type="email" value={enteredEmail} onChange={emailChangeHandler}></input>
                                {!validEmail && <div style={{width: "100%", color: "red", textAlign: "center"}}>{errorEmailMsg}</div>}

                                <label className={`${styles.label_style} ${!validPsw ? styles.invalid : ""}`}>Password:</label>
                                <input className={`${styles.input_style} ${!validPsw ? styles.invalid : ""}`} type="text" value={enteredPsw} onChange={pswChangeHandler}></input>
                                {!validPsw && <div style={{width: "100%", color: "red", textAlign: "center"}}>La password deve contenere minimo 6 caratteri</div>}
                                <p className={styles.paragraph_style}><b>Attenzione! </b>
                                    Queste credenziali serviranno al paziente per potersi collegare alla piattaforma e svolgere attività. Se inserite, verrà creato un profilo per il paziente
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <GenericButton
                                    onClick={() => {setModaleCreazioneAccount(false)}}
                                    generic_button={true}
                                    red_styling
                                    buttonText='Annulla'>
                                </GenericButton>
                                <GenericButton 
                                    onClick={() => {validateForm(true)}} 
                                    generic_button={true}
                                    buttonText='Salva paziente'>
                                </GenericButton>
                            </Modal.Footer>
                        </Modal>
                        
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
                        onClick={() => {validateForm(false)}} 
                        generic_button={true}
                        buttonText='Salva senza account'>
                    </GenericButton>
                    {/* <GenericButton 
                        onClick={formSubmitHandler} 
                        generic_button={true}
                        buttonText='Salva paziente'>
                    </GenericButton> */}
                </div>
                
            </div>
            }
            

            {/* <hr className={styles.horizontal_line}></hr> */}

            
        </div>
    );
}
export default AddPaziente;