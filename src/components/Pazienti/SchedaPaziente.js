import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useEffect, useState } from 'react';
import StatistichePaziente from './StatistichePaziente';
import CardSmall from '../UI/CardSmall';

function SchedaPaziente(props){
    const [titoloScheda, setTitoloScheda] = useState('Dati Personali');
    const [sezioneScheda, setSezioneScheda] = useState('DATI_PERSONALI');

    const [informazioniMediche, setInformazioniMediche] = useState([]);

    useEffect(() => {
        console.log(props.informazioniMediche)
        if(props.informazioniMediche?.length > 0){
            setInformazioniMediche(props.informazioniMediche) 
        }
        else{
            setInformazioniMediche([]) 
        }   
    }, [])

    function showDatiPersonali(){
        console.log('Mostra DATI PERSONALI');
        setTitoloScheda('Dati Personali');
        setSezioneScheda('DATI_PERSONALI');
    }

    function showSchedaMedica(){
        console.log('Mostra SCHEDA MEDICA');
        setTitoloScheda('Scheda Medica');
        setSezioneScheda('SCHEDA_MEDICA');
    }

    function showAttività(){
        setTitoloScheda('Esercizi/Test');
        setSezioneScheda('ESERCIZI/TEST');
        console.log('Mostra ESERCIZI');
    }

    function showStatistiche(){
        setTitoloScheda('Statistiche');
        setSezioneScheda('STATISTICHE');
        console.log('MOSTRA STATISTICHE');
    }

    function selectShow(event){
        console.log(event.target.value);
        switch(event.target.value){
            case "Dati Personali":
                setTitoloScheda('Dati Personali');
                setSezioneScheda('DATI_PERSONALI');
                break;
            case "Scheda Medica":
                setTitoloScheda('Scheda Medica');
                setSezioneScheda('SCHEDA_MEDICA');
                break;
            case "Esercizi/Test":
                setTitoloScheda('Esercizi/Test');
                setSezioneScheda('ESERCIZI/TEST');
                break;
            case "Statistiche":
                setTitoloScheda('Statistiche');
                setSezioneScheda('STATISTICHE');
                break;
            default:
                break;
        }
    }

    return(
        <Card
        altroStile={true}
        animazione={true}
        children={
            <div className={styles.lista}>
                <select className={styles.select_section} onChange={selectShow}>
                    <option className={styles.option_style}>Dati Personali</option>
                    <option>Scheda Medica</option>
                    <option>Esercizi/Test</option>
                    <option>Statistiche</option>
                </select>
                <div className={styles.wrap_buttons}>
                    
                    <GenericButton
                        onClick={showDatiPersonali}
                        is_selected={sezioneScheda === "DATI_PERSONALI" ? true : false}
                        generic_button={true}
                        buttonText='Dati Personali'
                    >
                    </GenericButton>
                    <GenericButton
                        onClick={showSchedaMedica}
                        is_selected={sezioneScheda === "SCHEDA_MEDICA" ? true : false}
                        generic_button={true}
                        buttonText='Scheda Medica'
                    >
                    </GenericButton>
                    <GenericButton
                        onClick={showAttività}
                        is_selected={sezioneScheda === "ESERCIZI/TEST" ? true : false}
                        generic_button={true}
                        buttonText='Esercizi/Test'
                    >
                    </GenericButton>
                    <GenericButton
                        onClick={showStatistiche}
                        is_selected={sezioneScheda === "STATISTICHE" ? true : false}
                        generic_button={true}
                        buttonText='Statistiche'
                    >
                    </GenericButton>
                </div>
                
                <hr className={styles.horizontal_line}></hr>
                <h1 className={styles.scheda_title}>{titoloScheda}</h1>
                <hr className={styles.horizontal_line}></hr>

                {sezioneScheda === 'DATI_PERSONALI' &&
                <>
                    {/* <div className={styles.scrollable_div}> */}
                        <label className={styles.label_style}>Nome completo</label>
                        <h3>{props.nome} {props.cognome}</h3>
                        {/* <hr className={styles.horizontal_line}/> */}
            
                        <label className={styles.label_style}>Città di nascita</label>
                        <h3>{props.città}</h3>
                        {/* <hr className={styles.horizontal_line}/> */}
            
                        <label className={styles.label_style}>Data di nascita</label>
                        <h3>{props.datanascita}</h3>
                        {/* <hr className={styles.horizontal_line}/> */}

                        <label className={styles.label_style}>Codice Fiscale</label>
                        <h3>{props.codicefiscale}</h3>
                        <hr className={styles.horizontal_line}/>
                        
                    {/* </div> */}
                </>
                }
                {sezioneScheda === 'SCHEDA_MEDICA' &&
                <>
                    {informazioniMediche.length === 0 && <h3>Non ci sono informazioni mediche su questo paziente</h3>}
                    {informazioniMediche.length > 0 && <h3>Patologie e terapie</h3>}
                    {informazioniMediche?.map((objInfo) => (
                        <>
                            
                            <CardSmall
                                children={
                                    <div className={styles.wrapper_vertical}>
                                        {/* <h5>{oggetto.patologiaID}</h5> */}
                                        <div className={`${styles.wrapper_horizontal}`}>
                                            <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Patologia:</label>
                                            <label className={`${styles.listaMedica_label} ${styles.border_right} ${styles.long_width}`}>Terapia:</label>
                                            <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Data inizio:</label>
                                            <label className={`${styles.listaMedica_label} ${styles.border_right}`}>Data fine:</label>
                                            <label className={`${styles.listaMedica_label} ${styles.med_width}`}>Note:</label>
                                        </div>
                                        <div className={`${styles.wrapper_horizontal}`}>
                                            <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{objInfo.nomePatologia}</h5>
                                            <h5 className={`${styles.listaMedica_content} ${styles.border_right} ${styles.long_width} ${styles.long_height}`}>{objInfo.terapia}</h5>
                                            <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{objInfo.dataInizio}</h5>
                                            <h5 className={`${styles.listaMedica_content} ${styles.border_right}`}>{objInfo.dataFine}</h5>
                                            <h5 className={`${styles.listaMedica_content} ${styles.med_width} ${styles.long_height}`}>{objInfo.note}</h5>
                                        </div>
                                    </div>
                                }
                            ></CardSmall>
                        </>
                        ))
                    }
                    
                    <hr className={styles.horizontal_line}/>
                </>
                }
                {sezioneScheda === 'ESERCIZI/TEST' &&
                <>
                    {props.scoreMMSE &&
                    <>
                        <h1 className={styles.mmse_moca_style}>PUNTEGGIO MMSE</h1>
                        <h2>{props.scoreMMSE}/30</h2>
                    </>
                    }
                    {!props.scoreMMSE &&
                    <>
                        <h1 className={styles.mmse_moca_style}>Test MMMSE non effettuato</h1>
                    </>
                    }
                    <hr className={styles.horizontal_line}/>
                    {props.scoreMOCA &&
                    <>
                        <h1 className={styles.mmse_moca_style}>PUNTEGGIO MOCA</h1>
                        <h2>{props.scoreMOCA}/30</h2>
                    </>
                    }
                    {!props.scoreMOCA &&
                    <>
                        <h1 className={styles.mmse_moca_style}>Test MOCA non effettuato</h1>
                    </>
                    }
                    <hr className={styles.horizontal_line}/>
                    <h1 className={styles.mmse_moca_style}>Esercizi del paziente:</h1>
                    
                    <hr className={styles.horizontal_line}/>
                </>
                }
                {sezioneScheda === 'STATISTICHE' &&
                <>
                    <StatistichePaziente
                    pazienteID={props.id}
                    stats={props.stats_paziente}
                    >
                    </StatistichePaziente>
                    <hr className={styles.horizontal_line}/>
                </>
                }

                <GenericButton
                generic_button={true}
                small_button={true}
                onClick={props.goBackButton}
                buttonText='Go Back'>
                </GenericButton>
            </div>
        }>
        </Card>
    );
}

export default SchedaPaziente;