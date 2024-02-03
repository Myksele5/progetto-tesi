import { useState } from "react";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";
import styles from "./CognitiveAreaMemoria.module.css";

function CognitiveAreaMemoria(props){
    // var parolaDaMemorizzare_1 = "PIANTA";
    // var parolaDaMemorizzare_2 = "CANE";
    // var parolaDaMemorizzare_3 = "FIUME";
    const elencoParole = props.step === 1 ? props.domandeAreaCog2 : props.domandeAreaCog4;

    const [parolaMemorizzata1, setParolaMemorizzata1] = useState("");
    const [parolaMemorizzata2, setParolaMemorizzata2] = useState("");
    const [parolaMemorizzata3, setParolaMemorizzata3] = useState("");

    function parolaMemorizzata1Handler(event){
        setParolaMemorizzata1(event.target.value.toUpperCase());
    }

    function parolaMemorizzata2Handler(event){
        setParolaMemorizzata2(event.target.value.toUpperCase());
    }

    function parolaMemorizzata3Handler(event){
        setParolaMemorizzata3(event.target.value.toUpperCase());
    }
    
    function salvaRisposteAreaCognitiva2(){
        let oggettoDomandeRisposte = 
            {
                domanda: "Ripeti queste parole",
                parole: [elencoParole.parolaDaMemorizzare_1, elencoParole.parolaDaMemorizzare_2, elencoParole.parolaDaMemorizzare_3]
            }
        ;
        props.risposteAreaCog2(oggettoDomandeRisposte);
    }
    function salvaRisposteAreaCognitiva4(){
        let oggettoDomandeRisposte = 
            {
                domanda: "Scrivi le parole mostrate in precedenza",
                parole: [
                    {parola: elencoParole.parolaDaMemorizzare_1, risposta: parolaMemorizzata1},
                    {parola: elencoParole.parolaDaMemorizzare_2, risposta: parolaMemorizzata2},
                    {parola: elencoParole.parolaDaMemorizzare_3, risposta: parolaMemorizzata3},
                ],
            }
        ;
        props.risposteAreaCog4(oggettoDomandeRisposte);
    }

    return (
        <>
            {props.step === 1 &&
            <>
                <h2>Leggi le seguenti parole. Quando sei pronto, chiudi gli occhi e ripetile ad alta voce</h2>

                <div className={styles.flex_vertical}>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_1}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_2}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_3}</h5>
                </div>

                <GenericAlternativeButton
                    buttonText={"Prox Domand"}
                    onClick={salvaRisposteAreaCognitiva2}
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
                    onClick={salvaRisposteAreaCognitiva4}
                >
                </GenericAlternativeButton>
            </>
            }
            
            
        </>
    );
}

export default CognitiveAreaMemoria;