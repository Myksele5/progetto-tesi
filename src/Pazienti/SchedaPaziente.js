import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useState } from 'react';

function SchedaPaziente(props){
    const [titoloScheda, setTitoloScheda] = useState('Dati Personali');
    const [sezioneScheda, setSezioneScheda] = useState(
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
    );

    function showDatiPersonali(){
        console.log('Mostra DATI PERSONALI');
        setTitoloScheda('Dati Personali');
        setSezioneScheda(
            <>
                <label className={styles.label_style}>Nome completo</label>
                <h3 className={styles.infos_style}>{props.nome} {props.cognome}</h3>
                {/* <hr className={styles.horizontal_line}/> */}

                <label className={styles.label_style}>Città di nascita</label>
                <h3 className={styles.infos_style}>{props.città}</h3>
                {/* <hr className={styles.horizontal_line}/> */}

                <label className={styles.label_style}>Data di nascita</label>
                <h3 className={styles.infos_style}>{props.datanascita}</h3>
                {/* <hr className={styles.horizontal_line}/> */}

                <label className={styles.label_style}>Attività associate</label>
                <h3 className={styles.infos_style}>{props.attività}</h3>
                {/* <hr className={styles.horizontal_line}/> */}

                <label className={styles.label_style}>Note opzionali</label>
                <h3 className={styles.infos_style}>Da decidere</h3>
                {/* <hr className={styles.horizontal_line}/> */}
            </>
        );
    }

    function showAttività(){
        setTitoloScheda('Attività');
        setSezioneScheda(
            <>
                <h1>Nessuna attività trovata.</h1>
                <h1>Non ci sono attività!</h1>
                <h1>Aggiungi gioco/terapia</h1>
            </>
        );
        console.log('Mostra ESERCIZI');
    }

    function showStatistiche(){
        setTitoloScheda('Statistiche');
        setSezioneScheda(
            <>
                <h1>Non ci sono statistiche!</h1>
            </>
        );
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
                    buttonText='Dati Personali'>
                    </GenericButton>
                    <GenericButton
                    onClick={showAttività}
                    buttonText='Attività'>
                    </GenericButton>
                    <GenericButton
                    onClick={showStatistiche}
                    buttonText='Statistiche'>
                    </GenericButton>
                </div>
                
                <hr className={styles.horizontal_line}></hr>
                <h1 className={styles.scheda_title}>{titoloScheda}</h1>
                <hr className={styles.horizontal_line}></hr>

                {sezioneScheda}

                <GenericButton
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