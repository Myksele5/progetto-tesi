import styles from "./TabellaAttività.module.css";

function TabellaAttività(props){
    return(
        <div className={styles.table_wrapper}>
        <table>
            <thead>
                <tr>
                    <th className={styles.intestazione_tabella}>NOME ATTIVITA'</th>
                    <th className={styles.intestazione_tabella}>INIZIO ATTIVITA'</th>
                    <th className={styles.intestazione_tabella}>FINE ATTIVITA'</th>
                    <th className={styles.intestazione_tabella}>GIOCHI</th>
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

export default TabellaAttività;