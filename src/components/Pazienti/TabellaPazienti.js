// import { useState } from 'react';
import styles from './TabellaPazienti.module.css';

function TabellaPazienti(props){
    console.log(props.elenco.length);

    if(props.elenco.length > 0){
        return(
            <table className={styles.table_wrapper}>
                <thead>
                    <tr>
                        <th className={`${styles['intestazione_tabella']} ${styles['nome']}`}>NOME</th>
                        <th className={`${styles['intestazione_tabella']} ${styles['cognome']}`}>COGNOME</th>
                        <th className={`${styles['intestazione_tabella']} ${styles['città']}`}>CITTA' DI NASCITA</th>
                        <th className={`${styles['intestazione_tabella']} ${styles['data']}`}>DATA DI NASCITA</th>
                        <th className={`${styles['intestazione_tabella']} ${styles['codicefiscale']}`}>CODICE FISCALE</th>
                        {/* <th className={styles.intestazione_tabella}>ATTIVITÀ</th> */}
                        <th className={`${styles['intestazione_tabella']} ${styles['opzioni']}`}>OPZIONI</th>
                    </tr>
                </thead>
                <tbody>
                    {props.elenco}
                </tbody>
            </table>
        );
    }
    else{
        return(
            <table className={styles.table_wrapper}>
                <thead>
                    <tr>
                        <th className={`${styles['intestazione_tabella']} ${styles['nome']}`}>NESSUN RISULTATO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{textAlign: "center", fontSize: "20px"}}><td style={{display: "block", padding: "10px"}}>Crea il primo paziente per visualizzare la tabella.</td></tr>
                </tbody>
            </table>
        );
    }
}

export default TabellaPazienti;