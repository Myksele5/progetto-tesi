import styles from "./ExerciseReflexes.module.css";

function ExerciseReflexes(){
    return(
        <>
            <hr className={styles.horizontal_line}></hr>
            <h2 className={styles.explanation}>Clicca sulla figura</h2>
            <hr className={styles.horizontal_line}></hr>
            
            <h2 className={styles.domanda}> Clicca sulla figura:</h2>
            
            <div className={styles.figura_cliccabile}>SONO LA FIGURA DA CLICCARE</div>
            
            {/* <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p> */}
        </>
    );
}

export default ExerciseReflexes;