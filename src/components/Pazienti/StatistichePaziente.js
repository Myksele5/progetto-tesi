import styles from "./StatistichePaziente.module.css";

function StatistichePaziente(props){
    return(
        <div className={styles.wrapper_statistiche}>
            <div className={styles.wrapper_barre}>
                <div className={styles.barra}>
                    <div className={styles.riempimento_barra_corrette}></div>
                </div>
                <div className={styles.barra}>
                    <div className={styles.riempimento_barra_sbagliate}></div>
                </div>
            </div>
            <label>Risposte totali: {props.total_answers}</label>
            <label>Risposte corrette: {props.total_correct_answers}</label>
            <label>Risposte sbagliate: {props.total_wrong_answers}</label>
        </div>
    );
}

export default StatistichePaziente;