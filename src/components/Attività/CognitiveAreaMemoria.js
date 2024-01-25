import { useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./CognitiveAreaMemoria.module.css";

function CognitiveAreaMemoria(props){
    var parolaDaMemorizzare_1 = "PIANTA";
    var parolaDaMemorizzare_2 = "CANE";
    var parolaDaMemorizzare_3 = "FIUME";

    const [parolaMemorizzata1, setParolaMemorizzata1] = useState("");
    const [parolaMemorizzata2, setParolaMemorizzata2] = useState("");
    const [parolaMemorizzata3, setParolaMemorizzata3] = useState("");

    function prossimaSezione(){
        props.proxSezione();
    }

    function salvaRisposte(){
        props.risposteAreaCog2(parolaMemorizzata1, parolaMemorizzata2, parolaMemorizzata3);
    }

    function parolaMemorizzata1Handler(event){
        setParolaMemorizzata1(event.target.value.toUpperCase());
    }

    function parolaMemorizzata2Handler(event){
        setParolaMemorizzata2(event.target.value.toUpperCase());
    }

    function parolaMemorizzata3Handler(event){
        setParolaMemorizzata3(event.target.value.toUpperCase());
    }

    return (
        <>
            {props.step === 1 &&
            <>
                <h2>Leggi le seguenti parole. Quando sei pronto, chiudi gli occhi e ripetile ad alta voce</h2>

                <div className={styles.flex_vertical}>
                    <h5 className={styles.parola_memorizzata}>{parolaDaMemorizzare_1}</h5>
                    <h5 className={styles.parola_memorizzata}>{parolaDaMemorizzare_2}</h5>
                    <h5 className={styles.parola_memorizzata}>{parolaDaMemorizzare_3}</h5>
                </div>

                <GenericAlternativeButton
                    buttonText={"Prox Domand"}
                    onClick={prossimaSezione}
                >
                </GenericAlternativeButton>
            </>
            }

            {props.step === 2 &&
            <>
                <h2>Prima ti ho mostrato 3 parole, potresti riscriverle?</h2>

                <label>Prima parola</label>
                <input value={parolaMemorizzata1} onChange={parolaMemorizzata1Handler} className={styles.input_style}></input>
                <label>Seconda parola</label>
                <input value={parolaMemorizzata2} onChange={parolaMemorizzata2Handler} className={styles.input_style}></input>
                <label>Terza parola</label>
                <input value={parolaMemorizzata3} onChange={parolaMemorizzata3Handler} className={styles.input_style}></input>

                <GenericAlternativeButton
                    buttonText={"Prox Domand"}
                    onClick={salvaRisposte}
                >
                </GenericAlternativeButton>
            </>
            }
            
            
        </>
    );
}

export default CognitiveAreaMemoria;