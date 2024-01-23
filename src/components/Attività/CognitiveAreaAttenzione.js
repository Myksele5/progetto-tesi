import styles from "./CognitiveAreaAttenzione.module.css";

function CognitiveAreaAttenzione(){
    return(
        <>
            <h1 style={{fontSize: "15px", color: "red"}}>!!!!! In alternativa qui si possono mettere esercizi matematici semplici !!!!!</h1>
            <h2>Adesso ti verrà mostrata una parola ed il tuo obiettivo è scriverla al contrario</h2>

            <h5 className={styles.parola_al_contrario}>MONDO</h5>

            <label>Riscrivi la parola al contrario</label>
            <input className={styles.input_style}></input>
        </>
    );
}

export default CognitiveAreaAttenzione;