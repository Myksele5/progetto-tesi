import { useState } from "react";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";
import styles from "./MemoriaMOCA.module.css";

function MemoriaMOCA(props){
    // const elencoParole = props.step === 1 ? props.domandeAreaCog2 : props.domandeAreaCog4;
    const elencoParole = props.step === 1 ? props.domandeAreaCog2 : props.domandeAreaCog4;

    const [parolaMemorizzata1, setParolaMemorizzata1] = useState("");
    const [parolaMemorizzata2, setParolaMemorizzata2] = useState("");
    const [parolaMemorizzata3, setParolaMemorizzata3] = useState("");
    const [parolaMemorizzata4, setParolaMemorizzata4] = useState("");
    const [parolaMemorizzata5, setParolaMemorizzata5] = useState("");

    function parolaMemorizzata1Handler(event){
        setParolaMemorizzata1(event.target.value.toUpperCase());
    }

    function parolaMemorizzata2Handler(event){
        setParolaMemorizzata2(event.target.value.toUpperCase());
    }

    function parolaMemorizzata3Handler(event){
        setParolaMemorizzata3(event.target.value.toUpperCase());
    }

    function parolaMemorizzata4Handler(event){
        setParolaMemorizzata4(event.target.value.toUpperCase());
    }

    function parolaMemorizzata5Handler(event){
        setParolaMemorizzata5(event.target.value.toUpperCase());
    }

    function salvaRisposteAreaCognitiva2(){
        let oggettoDomandeRisposte = 
            {
                domanda: "Ripeti queste parole",
                parole: [elencoParole.parolaDaMemorizzare_1, elencoParole.parolaDaMemorizzare_2, elencoParole.parolaDaMemorizzare_3, elencoParole.parolaDaMemorizzare_4, elencoParole.parolaDaMemorizzare_5]
            }
        ;
        props.risposteAreaCog2(oggettoDomandeRisposte);
    }

    function salvaRisposteAreaCognitiva4(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Scrivi le parole mostrate in precedenza",
                parole: [
                    {parola: elencoParole.parolaDaMemorizzare_1, risposta: parolaMemorizzata1},
                    {parola: elencoParole.parolaDaMemorizzare_2, risposta: parolaMemorizzata2},
                    {parola: elencoParole.parolaDaMemorizzare_3, risposta: parolaMemorizzata3},
                    {parola: elencoParole.parolaDaMemorizzare_4, risposta: parolaMemorizzata4},
                    {parola: elencoParole.parolaDaMemorizzare_5, risposta: parolaMemorizzata5}
                ],
            }
        ];

        console.log(oggettoDomandeRisposte);
    }

    return(
        <>
            {props.step === 1 &&
            <>
                <h2>Leggi le seguenti parole. Quando sei pronto, chiudi gli occhi e ripetile ad alta voce</h2>

                <div className={styles.flex_horizontal}>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_1}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_2}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_3}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_4}</h5>
                    <h5 className={styles.parola_memorizzata}>{elencoParole.parolaDaMemorizzare_5}</h5>
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
                <h2>Prima ti ho mostrato 5 parole, potresti riscriverle?</h2>
                <div className={styles.flex_vertical}>
                    <label>Prima parola</label>
                    <input value={parolaMemorizzata1} onChange={parolaMemorizzata1Handler} className={styles.input_style}></input>
                    <label>Seconda parola</label>
                    <input value={parolaMemorizzata2} onChange={parolaMemorizzata2Handler} className={styles.input_style}></input>
                    <label>Terza parola</label>
                    <input value={parolaMemorizzata3} onChange={parolaMemorizzata3Handler} className={styles.input_style}></input>
                    <label>Quarta parola</label>
                    <input value={parolaMemorizzata4} onChange={parolaMemorizzata4Handler} className={styles.input_style}></input>
                    <label>Quinta parola</label>
                    <input value={parolaMemorizzata5} onChange={parolaMemorizzata5Handler} className={styles.input_style}></input>
                </div>

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

export default MemoriaMOCA;