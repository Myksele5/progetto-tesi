import styles from "./CognitiveAreaMemoria.module.css";

function CognitiveAreaMemoria(){
    return (
        <>
            <h2>Memorizza le tre parole mostrate qui sotto</h2>
            {/* <h2>Avrai a disposizione 15 secondi per leggerle e memorizzarle, dopo di che scrivi le parole che ricordi come risposte</h2> */}

            <div className={styles.flex_horizontal}>
                <h5 className={styles.parola_memorizzata}>PIANTA</h5>
                <h5 className={styles.parola_memorizzata}>CANE</h5>
                <h5 className={styles.parola_memorizzata}>FIUME</h5>
            </div>

            <h2>Ci serviranno più tardi!</h2>
            
        </>
    );
}

export default CognitiveAreaMemoria;