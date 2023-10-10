import styles from "./StatistichePaziente.module.css";

function StatistichePaziente(props){
    let fillCorrect = "0%";
    let fillWrong = "0%";

    if(props.stats.risposteTotali > 0){
        fillCorrect = Math.round((props.stats.risposteCorrette / props.stats.risposteTotali) * 100) + "%";
        fillWrong = Math.round((props.stats.risposteSbagliate / props.stats.risposteTotali) * 100) + "%";
    }

    return(
        <div className={styles.wrapper_statistiche}>
            <div className={styles.wrapper_barre}>
                <div className={styles.barra}>
                    <div style={{height: fillCorrect}} className={styles.riempimento_barra_corrette}></div>
                </div>
                <div className={styles.barra}>
                    <div style={{height: fillWrong}} className={styles.riempimento_barra_sbagliate}></div>
                </div>
            </div>
            <label>Risposte totali: {props.stats.risposteTotali}</label>
            <label>Risposte corrette: {props.stats.risposteCorrette}</label>
            <label>Risposte sbagliate: {props.stats.risposteSbagliate}</label>
        </div>
    );
}

export default StatistichePaziente;