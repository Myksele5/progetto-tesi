import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useState } from 'react';
import StatistichePaziente from './StatistichePaziente';

function SchedaPaziente(props){
    const [titoloScheda, setTitoloScheda] = useState('Dati Personali');
    const [sezioneScheda, setSezioneScheda] = useState('DATI_PERSONALI');

    function showDatiPersonali(){
        console.log('Mostra DATI PERSONALI');
        setTitoloScheda('Dati Personali');
        setSezioneScheda('DATI_PERSONALI');
    }

    function showAttività(){
        setTitoloScheda('Attività');
        setSezioneScheda('ATTIVITÀ');
        console.log('Mostra ESERCIZI');
    }

    function showStatistiche(){
        setTitoloScheda('Statistiche');
        setSezioneScheda('STATISTICHE');
        console.log('MOSTRA STATISTICHE');
    }

    return(
        <Card
        altroStile={true}
        animazione={true}
        children={
            <ul className={styles.lista}>
                <div className={styles.wrap_buttons}>
                    <GenericButton
                    onClick={showDatiPersonali}
                    generic_button={true}
                    buttonText='Dati Personali'>
                    </GenericButton>
                    <GenericButton
                    onClick={showAttività}
                    generic_button={true}
                    buttonText='Attività'>
                    </GenericButton>
                    <GenericButton
                    onClick={showStatistiche}
                    generic_button={true}
                    buttonText='Statistiche'>
                    </GenericButton>
                </div>
                
                <hr className={styles.horizontal_line}></hr>
                <h1 className={styles.scheda_title}>{titoloScheda}</h1>
                <hr className={styles.horizontal_line}></hr>

                {sezioneScheda === 'DATI_PERSONALI' &&
                    <>
                    <label className={styles.label_style}>Nome completo</label>
                    <h3>{props.nome} {props.cognome}</h3>
                    {/* <hr className={styles.horizontal_line}/> */}
        
                    <label className={styles.label_style}>Città di nascita</label>
                    <h3>{props.città}</h3>
                    {/* <hr className={styles.horizontal_line}/> */}
        
                    <label className={styles.label_style}>Data di nascita</label>
                    <h3>{props.datanascita}</h3>
                    {/* <hr className={styles.horizontal_line}/> */}
        
                    <label className={styles.label_style}>Attività associate</label>
                    <h3>{props.attività}</h3>
                    {/* <hr className={styles.horizontal_line}/> */}
        
                    <label className={styles.label_style}>Note opzionali</label>
                    <h3>Da decidere</h3>
                    {/* <hr className={styles.horizontal_line}/> */}
                    </>
                }
                {sezioneScheda === 'ATTIVITÀ' &&
                    <>
                    <h1>Nessuna attività trovata.</h1>
                    <h1>Non ci sono attività!</h1>
                    <h1>Aggiungi gioco/terapia</h1>
                    </>
                }
                {sezioneScheda === 'STATISTICHE' &&
                    // <>
                    // <h1>Non ci sono statistiche!</h1>
                    // </>
                    <StatistichePaziente></StatistichePaziente>
                }

                <GenericButton
                generic_button={true}
                small_button={true}
                onClick={props.goBackButton}
                buttonText='Go Back'>
                </GenericButton>
            </ul>
        }>
        </Card>
    );
}

export default SchedaPaziente;