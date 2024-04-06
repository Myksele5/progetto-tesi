import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useEffect, useState } from 'react';
import StatistichePaziente from './StatistichePaziente';
import CardSmall from '../UI/CardSmall';
import { Accordion, Col, Modal, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import { getServerMgr } from '../../backend_conn/ServerMgr';
import QRCode from 'react-qr-code';
// import QrReader from 'react-qr-scanner';

function SchedaPaziente(props){
    let emailEsistente = null;

    // const [titoloScheda, setTitoloScheda] = useState('Dati Personali');
    const [sezioneScheda, setSezioneScheda] = useState('DATI_PERSONALI');

    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [listaTest, setListaTest] = useState([]);
    const [listaGiochi, setListaGiochi] = useState([]);

    const [lastMMSE, setLastMMSE] = useState(null);
    const [lastMoCA, setLastMoCA] = useState(null);

    const [showCredentials, setShowCredentials] = useState(false);
    const [createCredentials, setCreateCredentials] = useState(false);
    const [credentials, setCredentials] = useState([]);

    const [enteredEmail, setEnteredEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true)
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true)

    useEffect(() => {
        let dataUltimoMMSE = "";
        let dataUltimoMoCA = "";

        if(props.listaTest?.length > 0){
            for(var i=0; i < props.listaTest.length; i++){
                if(props.listaTest[i].tipoTest === "MMSE"){
                    if(props.listaTest[i].dataSvolgimento > dataUltimoMMSE || dataUltimoMMSE.length === 0){
                        console.log("WEWEWEWE")
                        dataUltimoMMSE = props.listaTest[i].dataSvolgimento;
                        setLastMMSE(props.listaTest[i].punteggioTest)
                    }
                }
                if(props.listaTest[i].tipoTest === "MoCA"){
                    if(props.listaTest[i].dataSvolgimento > dataUltimoMoCA || dataUltimoMoCA.length === 0){
                        dataUltimoMoCA = props.listaTest[i].dataSvolgimento;
                        setLastMoCA(props.listaTest[i].punteggioTest)
                    }
            }
            }
    }
    }, [])

    useEffect(() => {
        // console.log(props.informazioniMediche)
        if(props.informazioniMediche?.length > 0){
            setInformazioniMediche(props.informazioniMediche) 
        }
        else{
            setInformazioniMediche([]) 
        }   
    }, [])

    useEffect(() => {
        console.log(props.listaTest)
        if(props.listaTest?.length > 0){
            setListaTest(props.listaTest) 
        }
        else{
            setListaTest([]) 
        }   
    }, [])

    useEffect(() => {
        // console.log(props.informazioniMediche)
        if(props.listaGiochi?.length > 0){
            setListaGiochi(props.listaGiochi) 
        }
        else{
            setListaGiochi([]) 
        }   
    }, [])

    useEffect(() => {
        // console.log(props.informazioniMediche)
        if(props.credentialsAccount?.length > 0){
            setCredentials(props.credentialsAccount) 
        }
        else{
            setCredentials([]) 
        }
        // console.log(props.id)
    }, [createCredentials])

    function selectShow(stringa){
        // console.log(event.target.value);
        switch(stringa){
            case "DATI_PERSONALI":
                // setTitoloScheda('Dati Personali');
                setSezioneScheda('DATI_PERSONALI');
                break;
            case "SCHEDA_MEDICA":
                // setTitoloScheda('Scheda Medica');
                setSezioneScheda('SCHEDA_MEDICA');
                break;
            case "TEST":
                // setTitoloScheda('Test');
                setSezioneScheda('TEST');
                break;
            case "GIOCHI":
                // setTitoloScheda('Giochi');
                setSezioneScheda('GIOCHI');
                break;
            case "STATISTICHE":
                // setTitoloScheda('Statistiche');
                setSezioneScheda('STATISTICHE');
                break;
            default:
                break;
        }
    }

    function emailChangeHandler(event){
        setEnteredEmail(event.target.value)
        setValidEmail(true);
    }
    function passwordChangeHandler(event){
        setEnteredPassword(event.target.value)
        setValidPassword(true);
    }

    async function creaAccountPaziente(){
        if(enteredEmail.includes('@') && enteredPassword.trim().length >= 6){
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
                    result2 = await getServerMgr().addAccount(props.nome, props.cognome, 3, enteredEmail, enteredPassword, props.id)
                    .then(alert("ACCOUNT CREATO!"))
                    .catch((err) => {
                        console.error(err);
                    });

                    console.log(result2)
                    await getServerMgr().updatePatientWithProfileID(result2, props.id)
                    .catch((err) => {
                        console.error(err);
                    });

                    setCreateCredentials(false);
                    let resultCredentialsPatients = await getServerMgr().getPatientCredentials(props.id);
                    setCredentials(resultCredentialsPatients);
                }
            }
            else{
                let result2;
                result2 = await getServerMgr().addAccount(props.nome, props.cognome, 3, enteredEmail, enteredPassword, props.id)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                })

                console.log(result2)
                await getServerMgr().updatePatientWithProfileID(result2, props.id)
                .catch((err) => {
                    console.error(err);
                });

                setCreateCredentials(false);
                let resultCredentialsPatients = await getServerMgr().getPatientCredentials(props.id);
                setCredentials(resultCredentialsPatients);
            }
        }
        else{
            if(!enteredEmail.includes('@')){
                setValidEmail(false);
                setErrorEmailMsg("Inserisci una email valida")
            }
            if(enteredPassword.trim().length < 6){
                setValidPassword(false);
            }
        }

        
    }

    return(
        <div style={{width: "100%"}}>
            <h1 className={styles.page_title}>Scheda paziente: {props.nome} {props.cognome}</h1>
            <Tabs variant='underline' fill id="controlled-tab-example" activeKey={sezioneScheda} onSelect={(key) => {selectShow(key)}}>
                <Tab className={styles.tab_text} eventKey={"DATI_PERSONALI"} title={"Dati"}>
                    <div className={styles.horizontal}>
                        <div className={styles.section_dati}>
                            <div className={styles.wrapper_vertical}>
                                <h3 className={styles.text_dati_personali_title}>ANAGRAFICA</h3>
                                <label className={styles.label_style}>NOME COMPLETO:</label>
                                <div className={styles.content_text_style}>{props.nome} {props.cognome}</div>
                            </div>
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>CITTÀ DI NASCITA:</label>
                                <div className={styles.content_text_style}>{props.città}</div>
                            </div>
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>DATA DI NASCITA:</label>
                                <div className={styles.content_text_style}>{props.datanascita}</div>
                            </div>
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>CODICE FISCALE:</label>
                                <div className={styles.content_text_style}>{props.codicefiscale}</div>
                            </div>
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>CREDENZIALI</label>
                                {credentials.length === 0 && 
                                <>
                                    <GenericButton
                                        onClick={() => {setCreateCredentials((prevBool) => (!prevBool))}}
                                        buttonText={"Crea credenziali"}
                                        generic_button
                                    >
                                    </GenericButton>
                                    {createCredentials &&
                                        <Modal centered show={createCredentials}>
                                            <Modal.Header style={{fontWeight: "bold", fontSize: "18px"}}>Crea credenziali paziente</Modal.Header>
                                            <Modal.Body>
                                                <label className={`${styles.tag_style} ${!validEmail ? styles.invalid : ''}`}>Email:</label>
                                                <input autoFocus value={enteredEmail} onChange={emailChangeHandler} className={`${styles.input_style} ${!validEmail ? styles.invalid : ''}`}></input>
                                                {!validEmail && <div style={{width: "100%", color: "red", textAlign: "center"}}>{errorEmailMsg}</div>}
                                                <label className={`${styles.tag_style} ${!validPassword ? styles.invalid : ''}`}>Password:</label>
                                                <input value={enteredPassword} onChange={passwordChangeHandler} className={`${styles.input_style} ${!validPassword ? styles.invalid : ''}`}></input>
                                                {!validPassword && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una password con almeno 6 caratteri</div>}
                                                <p className={styles.paragraph_style}><b>Attenzione! </b>
                                                    Queste credenziali serviranno al paziente per potersi collegare alla piattaforma e svolgere attività. Se inserite, verrà creato un profilo per il paziente
                                                </p>
                                                <div style={{marginTop: "10px"}} className={styles.horizontal}>
                                                    <GenericButton
                                                        onClick={() => setCreateCredentials((prevBool) => (!prevBool))}
                                                        buttonText={"Chiudi"}
                                                        generic_button
                                                        red_styling
                                                    ></GenericButton>
                                                    <GenericButton
                                                        onClick={() => creaAccountPaziente()}
                                                        buttonText={"Crea account"}
                                                        generic_button
                                                    ></GenericButton>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    }
                                </>
                                }
                                {credentials.length > 0 && 
                                <>
                                    <GenericButton
                                        onClick={() => {setShowCredentials((prevBool) => (!prevBool))}}
                                        buttonText={!showCredentials ? "Visualizza" : "Nascondi"}
                                        generic_button
                                    ></GenericButton>
                                    {showCredentials &&
                                    <>
                                        <Modal centered show={showCredentials}>
                                            <Modal.Header style={{fontWeight: "bold", fontSize: "18px"}}>Credenziali paziente</Modal.Header>
                                            <Modal.Body>
                                                <div style={{justifyContent:"space-between"}} className={styles.horizontal}>
                                                    <div className={styles.wrapper_vertical}>
                                                        <label className={styles.tag_style}>Email:</label>
                                                        <div style={{textAlign: "start"}} className={styles.content_text_style}>{credentials[0].email}</div>
                                                        <label className={styles.tag_style}>Password:</label>
                                                        <div style={{textAlign: "start"}} className={styles.content_text_style}>{credentials[0].password}</div>
                                                    </div>
                                                    <div className={styles.wrapper_vertical}>
                                                        <label className={styles.tag_style}>QR Code:</label>
                                                        <QRCode value={`https://cognicare.altervista.org/QRCodeLogin/${credentials[0].UID}`} size={160}></QRCode>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer style={{justifyContent: "center"}}>
                                                <GenericButton
                                                    onClick={() => setShowCredentials((prevBool) => (!prevBool))}
                                                    buttonText={"Chiudi"}
                                                    generic_button
                                                    red_styling
                                                ></GenericButton>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                    }
                                </>
                                }
                            </div>
                        </div>
                        <div className={styles.section_dati}>
                            <div className={styles.wrapper_vertical}>
                                <h3 className={styles.text_dati_personali_title}>CONTATTI</h3>
                                <label className={styles.label_style}>EMAIL:</label>
                                <div className={styles.content_text_style}>{!props.contattoEmail ? "Non inserito" : props.contattoEmail}</div>
                            </div>
                            <div className={styles.wrapper_vertical}>
                                <label className={styles.label_style}>CELLULARE:</label>
                                <div className={styles.content_text_style}>{!props.contattoCellulare ? "Non inserito" : props.contattoCellulare}</div>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.horizontal_line}/>
                </Tab>
                <Tab eventKey={"SCHEDA_MEDICA"} title={"Scheda Medica"}>
                <>
                    {informazioniMediche.length === 0 && <h4 style={{textAlign: "center", marginTop: "20px"}}>Non ci sono informazioni mediche su questo paziente</h4>}
                    {informazioniMediche.length > 0 && 
                    <div className={styles.wrapper_vertical}>
                        <h3 className={styles.subtitle_text}>Elenco terapie assegnate:</h3>
                        <div style={{width: "80%"}}>
                            <Accordion>
                            {informazioniMediche?.map((objInfo) => (
                                <Accordion.Item className={`${styles.accordion_item}`} eventKey={objInfo.terapiaID}>
                                    <Accordion.Header>Terapia per: {objInfo.nomePatologia}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Patologia:</label>
                                            <p className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{objInfo.nomePatologia}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Terapia:</label>
                                            <p className={`${styles.sintesiMedica_content_TERAPIA}`}>{objInfo.terapia}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_DATA}`}>Data inizio:</label>
                                            <p className={`${styles.sintesiMedica_content_DATA}`}>{objInfo.dataInizio}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_DATA}`}>Data fine:</label>
                                            <p className={`${styles.sintesiMedica_content_DATA}`}>{objInfo.dataFine}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_NOTE}`}>Note:</label>
                                            <p className={`${styles.sintesiMedica_content_NOTE}`}>{objInfo.note}</p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                ))
                            }
                            </Accordion>
                        </div>
                    </div>
                    }
                    <hr className={styles.horizontal_line}/>
                </>
                </Tab>
                <Tab eventKey={"TEST"} title={"Test"}>
                    <div style={{margin: "15px"}}>
                        {lastMMSE !== null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>PUNTEGGIO MMSE</h1>
                                {/* <h2>{lastMMSE}/30</h2> */}
                                <div style={{width: "50%"}}>
                                    <ProgressBar variant={lastMMSE >= 25 ? 'success' : lastMMSE >= 18 ? 'warning' : 'danger'} 
                                    now={lastMMSE} min={0} max={30} label={`${lastMMSE}/30`}
                                    ></ProgressBar>
                                </div>
                            </div>
                        }
                        {lastMMSE === null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>Test MMMSE non effettuato</h1>
                            </div>
                        }
                        <hr className={styles.horizontal_line}/>
                        {lastMoCA !== null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>PUNTEGGIO MOCA</h1>
                                {/* <h2>{lastMoCA}/30</h2> */}
                                <div style={{width: "50%"}}>
                                    <ProgressBar variant={lastMoCA >= 25 ? 'success' : lastMoCA >= 18 ? 'warning' : 'danger'} 
                                    now={lastMoCA} min={0} max={30} label={`${lastMoCA}/30`}
                                    ></ProgressBar>
                                </div>
                            </div>
                        }
                        {lastMoCA === null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>Test MOCA non effettuato</h1>
                            </div>
                        }
                        <hr className={styles.horizontal_line}/>
                        <h3 className={styles.subtitle_text}>Elenco test eseguiti:</h3>
                        <div className={styles.horizontal}>
                            <div className={styles.wrap_lista_test}>
                                <Col style={{textAlign: "center", fontWeight: "bold"}}>Tipo</Col>
                                <Col style={{textAlign: "center", fontWeight: "bold"}}>Punteggio</Col>
                                <Col style={{textAlign: "center", fontWeight: "bold"}}>Svolto il</Col>
                            </div>
                        </div>
                        {props.listaTest?.map((test) => (
                            <div className={styles.horizontal}>
                                <div className={styles.wrap_lista_test}>
                                    <Col style={{textAlign: "center"}}>{test.tipoTest}</Col>
                                    <Col style={{textAlign: "center"}}>{test.punteggioTest}</Col>
                                    <Col style={{textAlign: "center"}}>{test.dataSvolgimento}</Col>
                                </div>
                            </div>
                        ))}
                    </div>
                </Tab>
                <Tab eventKey={"GIOCHI"} title={"Giochi"}>
                <>
                    {listaGiochi.length === 0 && <h4 style={{textAlign: "center", marginTop: "20px"}}>Nessun gioco assegnato al paziente</h4>}
                    {listaGiochi.length > 0 && 
                    <div className={styles.wrapper_vertical}>
                        <h3 className={styles.subtitle_text}>Elenco giochi assegnati:</h3>
                        <div style={{width: "80%"}}>
                            <Accordion>
                            {listaGiochi?.map((objInfo) => (
                                <Accordion.Item className={`${styles.accordion_item}`} eventKey={objInfo.gameID}>
                                    <Accordion.Header>{objInfo.nomeGioco}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Nome gioco:</label>
                                            <p className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{objInfo.nomeGioco}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Tipo gioco:</label>
                                            <p className={`${styles.sintesiMedica_content_TERAPIA}`}>{objInfo.tipoGioco}</p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={`${styles.sintesiMedica_label_DATA}`}>Livello gioco:</label>
                                            <p className={`${styles.sintesiMedica_content_DATA}`}>{objInfo.livelloGioco}</p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                ))
                            }
                            </Accordion>
                        </div>
                    </div>
                    }
                    <hr className={styles.horizontal_line}/>
                </>
                </Tab>
                <Tab eventKey={"STATISTICHE"} title={"Statistiche"}>
                    <h3 className={styles.subtitle_text}>Statistiche dei giochi:</h3>
                    <div className={styles.wrapper_vertical}>
                        <StatistichePaziente
                            pazienteID={props.id}
                            stats={props.statsPaziente}
                        ></StatistichePaziente>
                    </div>
                    
                </Tab>
            </Tabs>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <GenericButton
                    generic_button={true}
                    red_styling
                    onClick={props.goBackButton}
                    buttonText='Indietro'
                ></GenericButton>
            </div>
            
        </div>
    );
}

export default SchedaPaziente;