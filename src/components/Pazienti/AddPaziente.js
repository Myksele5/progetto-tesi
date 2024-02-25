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
        patologies_ctx.cambiaPatologiaSelezionataFormPaziente(patologies_ctx.getTherapiesListSinglePat(event.target.value));
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
    function terapiaChangeHandler(event){
        setTerapiaDaModificare(event.target.value);
    }
    function noteChangeHandler(event){
        setNoteDaModificare(event.target.value);
    }

    function salvaNuovaTerapia(patologiaID){
        patologies_ctx.addNewTherapy(patologiaID, terapiaDaModificare, noteDaModificare);

        setTerapiaDaModificare("");
        setNoteDaModificare("");
        setShowFormAddTherapy(false)
    }
    
    const addInformazioniMediche = (oggettoMedico) => {
        setInformazioniMediche((prevList) => ([...prevList, oggettoMedico]))
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

    return(
        <div className={styles.center_form}>
                {stepAggiuntaPaziente === 1 && 
                <>
                    <h1 className={styles.title_form}>Inserisci i dati del paziente</h1>
                    <div className={styles.wrapper_horizontal}>
                        <section className={styles.section_style_FORM}>

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
                    <hr className={styles.horizontal_line}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={hideForm}
                            generic_button={true}
                            red_styling
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
                    <h2 className={styles.text_subtitle}>Seleziona una patologia</h2>
                    <select value={patologiaSelezionata} onChange={patologiaSelezionataChangeHandler} className={styles.select_style}>
                        <option hidden>--seleziona--</option>
                        {patologies_ctx.uniqueList.map((singlePat) => (
                            <option className={styles.option_style} key={singlePat.patologiaID}>{singlePat.nomePatologia}</option>
                        ))}
                    </select>
                    {Object.keys(patologies_ctx.patologiaSelezionataFormPaziente).length > 0 &&
                        <>
                        <div className={styles.absolute_buttons_wrapper}>
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
                        <div className={styles.absolute_div}>                   
                            {patologies_ctx.patologiaSelezionataFormPaziente.terapie?.length === 0 && !showFormAddTherapy  && <h2>Non ci sono terapie!</h2>}
                            {patologies_ctx.patologiaSelezionataFormPaziente.terapie?.length > 0 && !showFormAddTherapy &&
                            <>
                                <h2 style={{marginTop: "8px"}} className={styles.text_subtitle}>Seleziona una terapia:</h2>
                                {patologies_ctx.patologiaSelezionataFormPaziente?.terapie?.map((terapia) => (
                                    
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
                                <hr className={styles.horizontal_line}></hr>
                            </>
                            }
                            {showFormAddTherapy &&
                                <CardSmall
                                    stileAggiuntivo
                                    children={
                                        <>
                                            <div className={styles.wrapper_vertical}>
                                                <label style={{color: "#163172"}} className={styles.wrap_content}>Inserisci terapia:</label>
                                                <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>
                                            </div>
                                            <hr style={{width: "100%", border: "1px solid #163172"}}></hr>
                                            <div className={styles.wrapper_vertical}>
                                                <label style={{color: "#163172"}} className={styles.wrap_content}>Note:</label>
                                                <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>
                                            </div>
                                            <hr style={{width: "100%", border: "1px solid #163172"}}></hr>
                                            <div className={styles.wrapper_horizontal}>
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
                                                    buttonText={"Salva terapia"}
                                                    generic_button
                                                ></GenericButton>
                                            </div>
                                            
                                        </>
                                    }
                                ></CardSmall>
                            }
                        </div>
                        </>
                    }
                    <div className={styles.wrapper_horizontal}>
                        <section className={styles.section_style}>
                        {informazioniMediche.map((oggetto) => (
                            informazioniMediche.length > 0 ?
                            <div key={oggetto.terapiaID} className={styles.wrapper_horizontal}>
                                <CardSmall
                                    children={
                                        <div className={styles.container_flexible_GENERIC}>
                                            {/* <h5>{oggetto.patologiaID}</h5> */}
                                            <div className={`${styles.container_flexible_SEZIONE_SINTESI_LABELS}`}>
                                                <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Patologia:</label>
                                                <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Terapia:</label>
                                                <label className={`${styles.sintesiMedica_label_DATA}`}>Data inizio:</label>
                                                <label className={`${styles.sintesiMedica_label_DATA}`}>Data fine:</label>
                                                <label className={`${styles.sintesiMedica_label_NOTE}`}>Note:</label>
                                                
                                            </div>
                                            <div className={`${styles.container_flexible_SEZIONE_SINTESI_CONTENTS}`}>
                                                <h5 className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{oggetto.nomePatologia}</h5>
                                                <h5 className={`${styles.sintesiMedica_content_TERAPIA}`}>{oggetto.terapia}</h5>
                                                <h5 className={`${styles.sintesiMedica_content_DATA}`}>{oggetto.dataInizio ? oggetto.dataInizio : "N.D"}</h5>
                                                <h5 className={`${styles.sintesiMedica_content_DATA}`}>{oggetto.dataFine ? oggetto.dataFine : "N.D"}</h5>
                                                <h5 className={`${styles.sintesiMedica_content_NOTE}`}>{oggetto.note}</h5>
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
                        </section>
                    </div>
                    <hr className={styles.horizontal_line}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={stepPrecedente}
                            generic_button={true}
                            red_styling
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
                    <div className={styles.wrapper_horizontal}>
                        <section className={styles.section_style_FORM}>
                            <h3 className={styles.text_subtitle}>CREDENZIALI</h3>

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
                            generic_button={true}
                            red_styling
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