import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useEffect, useState } from 'react';
import StatistichePaziente from './StatistichePaziente';
import CardSmall from '../UI/CardSmall';
import { Accordion, ProgressBar, Tab, Tabs } from 'react-bootstrap';

function SchedaPaziente(props){
    // const [titoloScheda, setTitoloScheda] = useState('Dati Personali');
    const [sezioneScheda, setSezioneScheda] = useState('DATI_PERSONALI');

    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [listaGiochi, setListaGiochi] = useState([]);

    // let scoreMMSE_percentage;
    // let scoreMoCA_percentage;

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
        // console.log(props.informazioniMediche)
        if(props.listaGiochi?.length > 0){
            setListaGiochi(props.listaGiochi) 
        }
        else{
            setListaGiochi([]) 
        }   
    }, [])

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

    return(
        <div style={{width: "100%"}}>
            <Tabs variant='underline' fill justify id="controlled-tab-example" activeKey={sezioneScheda} onSelect={(key) => {selectShow(key)}}>
                <Tab eventKey={"DATI_PERSONALI"} title={"Dati Personali"}>
                    <div className={styles.wrapper_vertical}>
                        <label className={styles.label_style}>Nome completo</label>
                        <div className={styles.content_text_style}>{props.nome} {props.cognome}</div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <label className={styles.label_style}>Città di nascita</label>
                        <div className={styles.content_text_style}>{props.città}</div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <label className={styles.label_style}>Data di nascita</label>
                        <div className={styles.content_text_style}>{props.datanascita}</div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <label className={styles.label_style}>Codice Fiscale</label>
                        <div className={styles.content_text_style}>{props.codicefiscale}</div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <label className={styles.label_style}>Credenziali</label>
                        <GenericButton
                            buttonText={"Visualizza"}
                            generic_button
                        ></GenericButton>
                    </div>
                    <hr className={styles.horizontal_line}/>
                </Tab>
                <Tab eventKey={"SCHEDA_MEDICA"} title={"Scheda Medica"}>
                <>
                    {informazioniMediche.length === 0 && <h4 style={{textAlign: "center", marginTop: "20px"}}>Non ci sono informazioni mediche su questo paziente</h4>}
                    {informazioniMediche.length > 0 && 
                    <div className={styles.wrapper_vertical}>
                        <h3 style={{textAlign:"center"}}>Elenco delle terapie:</h3>
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
                        {props.scoreMMSE !== null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>PUNTEGGIO MMSE</h1>
                                {/* <h2>{props.scoreMMSE}/30</h2> */}
                                <div style={{width: "50%"}}>
                                    <ProgressBar variant={props.scoreMMSE >= 25 ? 'success' : props.scoreMMSE >= 18 ? 'warning' : 'danger'} 
                                    now={props.scoreMMSE} min={0} max={30} label={`${props.scoreMMSE}/30`}
                                    ></ProgressBar>
                                </div>
                            </div>
                        }
                        {props.scoreMMSE === null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>Test MMMSE non effettuato</h1>
                            </div>
                        }
                        <hr className={styles.horizontal_line}/>
                        {props.scoreMOCA !== null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>PUNTEGGIO MOCA</h1>
                                {/* <h2>{props.scoreMOCA}/30</h2> */}
                                <div style={{width: "50%"}}>
                                    <ProgressBar variant={props.scoreMOCA >= 25 ? 'success' : props.scoreMOCA >= 18 ? 'warning' : 'danger'} 
                                    now={props.scoreMOCA} min={0} max={30} label={`${props.scoreMOCA}/30`}
                                    ></ProgressBar>
                                </div>
                            </div>
                        }
                        {props.scoreMOCA === null &&
                            <div className={styles.wrapper_vertical}>
                                <h1 className={styles.mmse_moca_style}>Test MOCA non effettuato</h1>
                            </div>
                        }
                        <hr className={styles.horizontal_line}/>
                    </div>
                </Tab>
                <Tab eventKey={"GIOCHI"} title={"Giochi"}>
                <>
                    {listaGiochi.length === 0 && <h4 style={{textAlign: "center", marginTop: "20px"}}>Nessun gioco assegnato al paziente</h4>}
                    {listaGiochi.length > 0 && 
                    <div className={styles.wrapper_vertical}>
                        <h3 style={{textAlign:"center"}}>Elenco dei giochi:</h3>
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
        // <div className={styles.lista}>
        //     <select className={styles.select_section} onChange={selectShow}>
        //         <option className={styles.option_style}>Dati Personali</option>
        //         <option>Scheda Medica</option>
        //         <option>Test</option>
        //         <option>Giochi</option>
        //         <option>Statistiche</option>
        //     </select>
        //     <div className={styles.wrap_buttons}>
                
        //         <GenericButton
        //             onClick={showDatiPersonali}
        //             is_selected={sezioneScheda === "DATI_PERSONALI" ? true : false}
        //             generic_button={true}
        //             buttonText='Dati Personali'
        //         >
        //         </GenericButton>
        //         <GenericButton
        //             onClick={showSchedaMedica}
        //             is_selected={sezioneScheda === "SCHEDA_MEDICA" ? true : false}
        //             generic_button={true}
        //             buttonText='Scheda Medica'
        //         >
        //         </GenericButton>
        //         <GenericButton
        //             onClick={showTest}
        //             is_selected={sezioneScheda === "TEST" ? true : false}
        //             generic_button={true}
        //             buttonText='Test'
        //         >
        //         </GenericButton>
        //         <GenericButton
        //             onClick={showGiochi}
        //             is_selected={sezioneScheda === "GIOCHI" ? true : false}
        //             generic_button={true}
        //             buttonText='Giochi'
        //         >
        //         </GenericButton>
        //         <GenericButton
        //             onClick={showStatistiche}
        //             is_selected={sezioneScheda === "STATISTICHE" ? true : false}
        //             generic_button={true}
        //             buttonText='Statistiche'
        //         >
        //         </GenericButton>
        //     </div>
            
        //     <hr className={styles.horizontal_line}></hr>
        //     <h1 className={styles.scheda_title}>{titoloScheda}</h1>
        //     <hr className={styles.horizontal_line}></hr>

        //     {sezioneScheda === 'DATI_PERSONALI' &&
        //     <>
        //         <label className={styles.label_style}>Nome completo</label>
        //         <h3>{props.nome} {props.cognome}</h3>
    
        //         <label className={styles.label_style}>Città di nascita</label>
        //         <h3>{props.città}</h3>
    
        //         <label className={styles.label_style}>Data di nascita</label>
        //         <h3>{props.datanascita}</h3>

        //         <label className={styles.label_style}>Codice Fiscale</label>
        //         <h3>{props.codicefiscale}</h3>
        //         <hr className={styles.horizontal_line}/>
        //     </>
        //     }
        //     {sezioneScheda === 'SCHEDA_MEDICA' &&
        //     <>
        //         {informazioniMediche.length === 0 && <h3>Non ci sono informazioni mediche su questo paziente</h3>}
        //         {informazioniMediche.length > 0 && <h3 style={{margin: "10px 4px 2px 4px"}}>Patologie e terapie:</h3>}
        //         {informazioniMediche?.map((objInfo) => (
        //             <>
                        
        //                 <CardSmall
        //                     children={
        //                         <div className={styles.container_flexible_GENERIC}>
        //                             <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                                 <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Patologia:</label>
        //                                 <h5 className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{objInfo.nomePatologia}</h5>
        //                             </div>
        //                             <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                                 <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Terapia:</label>
        //                                 <h5 className={`${styles.sintesiMedica_content_TERAPIA}`}>{objInfo.terapia}</h5>
        //                             </div>
        //                             <div className={styles.wrapper_horizontal}>
        //                                 <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                                     <label className={`${styles.sintesiMedica_label_DATA}`}>Data inizio:</label>
        //                                     <h5 className={`${styles.sintesiMedica_content_DATA}`}>{objInfo.dataInizio}</h5>
        //                                 </div>
        //                                 <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                                     <label className={`${styles.sintesiMedica_label_DATA}`}>Data fine:</label>
        //                                     <h5 className={`${styles.sintesiMedica_content_DATA}`}>{objInfo.dataFine}</h5>
        //                                 </div>
        //                             </div>
        //                             <div style={{borderRight: "none"}} className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                                 <label className={`${styles.sintesiMedica_label_NOTE}`}>Note:</label>
        //                                 <h5 className={`${styles.sintesiMedica_content_NOTE}`}>{objInfo.note}</h5>
        //                             </div>
        //                         </div>
        //                     }
        //                 ></CardSmall>
        //             </>
        //             ))
        //         }
                
        //         <hr className={styles.horizontal_line}/>
        //     </>
        //     }
        //     {sezioneScheda === 'TEST' &&
        //     <>
        //         {props.scoreMMSE !== null &&
        //         <>
        //             <h1 className={styles.mmse_moca_style}>PUNTEGGIO MMSE</h1>
        //             <h2>{props.scoreMMSE}/30</h2>
        //         </>
        //         }
        //         {props.scoreMMSE === null &&
        //         <>
        //             <h1 className={styles.mmse_moca_style}>Test MMMSE non effettuato</h1>
        //         </>
        //         }
        //         <hr className={styles.horizontal_line}/>
        //         {props.scoreMOCA !== null &&
        //         <>
        //             <h1 className={styles.mmse_moca_style}>PUNTEGGIO MOCA</h1>
        //             <h2>{props.scoreMOCA}/30</h2>
        //         </>
        //         }
        //         {props.scoreMOCA === null &&
        //         <>
        //             <h1 className={styles.mmse_moca_style}>Test MOCA non effettuato</h1>
        //         </>
        //         }
        //         <hr className={styles.horizontal_line}/>
        //     </>
        //     }
        //     {sezioneScheda === 'GIOCHI' &&
        //     <>
        //         <h1 className={styles.mmse_moca_style}>Esercizi del paziente:</h1>
        //         {listaGiochi.map((gioco) => (
        //         <>
        //             <CardSmall
        //                 children={
        //                     <div className={styles.container_flexible_GENERIC}>
        //                         <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                             <label style={{padding:"5px"}}>Nome gioco</label>
        //                             <p>{gioco.nomeGioco}</p>
        //                         </div>
        //                         <div className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                             <label style={{padding:"5px"}}>Tipo gioco</label>
        //                             <p>{gioco.tipoGioco}</p>
        //                         </div>
                                
        //                         <div style={{borderRight: "none"}} className={`${styles.container_flexible_SEZIONE_SINTESI}`}>
        //                             <label style={{padding:"5px"}}>Livello gioco</label>
        //                             <p>{gioco.livelloGioco}</p>
        //                         </div>
        //                     </div>
        //                 }
        //             ></CardSmall>
        //         </>
        //         ))}
        //         <hr className={styles.horizontal_line}/>
        //     </>
        //     }
        //     {sezioneScheda === 'STATISTICHE' &&
        //     <>
        //         <StatistichePaziente
        //         pazienteID={props.id}
        //         stats={props.stats_paziente}
        //         >
        //         </StatistichePaziente>
        //         <hr className={styles.horizontal_line}/>
        //     </>
        //     }

        //     <GenericButton
        //     generic_button={true}
        //     red_styling
        //     onClick={props.goBackButton}
        //     buttonText='Indietro'>
        //     </GenericButton>
        // </div>

    );
}

export default SchedaPaziente;