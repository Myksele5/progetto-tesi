// import { useState } from 'react';
import styles from './TabellaPazienti.module.css';

function TabellaPazienti(props){
    // const arrayDummyPazienti = [
    //     {
    //         nome: 'Michele',
    //         cognome: 'Sardone',
    //         città: 'Bari',
    //         datanascita: '05/07/1995',
    //         attività: 0,
    //         opzioni: '',
    //         id: 'n_1'
    //     },
    //     {
    //         nome: 'Vito',
    //         cognome: 'Sardone',
    //         città: 'Bari',
    //         datanascita: '31/01/1989',
    //         attività: 5,
    //         opzioni: '',
    //         id: 'n_2'
    //     },
    //     {
    //         nome: 'Domenico',
    //         cognome: 'Casaburi',
    //         città: 'Bari',
    //         datanascita: '02/08/1995',
    //         attività: 2,
    //         opzioni: '',
    //         id: 'n_3'
    //     }
    // ]
    
    // const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);

    // function fromArrayToTablePazienti(arrayDummyPazienti){
    //     return(
    //         <tr key={arrayDummyPazienti.id}>
    //             <th className='dati_tabella'>{arrayDummyPazienti.nome}</th>
    //             <th className='dati_tabella'>{arrayDummyPazienti.cognome}</th>
    //             <th className='dati_tabella città'>{arrayDummyPazienti.città}</th>
    //             <th className='dati_tabella data'>{arrayDummyPazienti.datanascita}</th>
    //             <th className='dati_tabella'>{arrayDummyPazienti.attività}</th>
    //             <th className='dati_tabella'>{arrayDummyPazienti.opzioni}</th>
    //         </tr>
    //     );
    // }

    // function listaNuovoPaziente(nuovoPaziente){
    //     console.log("I DATI DEL NUOVO PAZIENTE SONO ARRIVATI");
    //     console.log(nuovoPaziente);
    // }

    return(
        <div className={styles.table_wrapper}>
        <table>
            <thead>
                <tr>
                    <th className={styles.intestazione_tabella}>NOME</th>
                    <th className={styles.intestazione_tabella}>COGNOME</th>
                    <th className={`${styles['intestazione_tabella']} ${styles['città']}`}>CITTA' DI NASCITA</th>
                    <th className={`${styles['intestazione_tabella']} ${styles['data']}`}>DATA DI NASCITA</th>
                    <th className={styles.intestazione_tabella}>ATTIVITA'</th>
                    <th className={styles.intestazione_tabella}>OPZIONI</th>
                </tr>
            </thead>
            <tbody>
                {props.elenco}
            </tbody>
        </table>
        </div>
    );
}

export default TabellaPazienti;