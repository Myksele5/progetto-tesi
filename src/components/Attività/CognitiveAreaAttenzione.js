import { useState } from "react";
import styles from "./CognitiveAreaAttenzione.module.css";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function CognitiveAreaAttenzione(props){
    // let parolaDaInvertire = "MONDO";
    const parolaDaInvertire = props.domandeAreaCog3.parola;

    const [parolaInseritaAlContrario, setParolaInseritaAlContrario] = useState("");

    function parolaInseritaAlContrarioHandler(event){
        setParolaInseritaAlContrario(event.target.value.toUpperCase());
        console.log(event.target.value.toUpperCase());
    }

    // function reverseString() {
    //     const strRev =  parolaDaInvertire.split('').reverse().join('');
    //     console.log(strRev);

    //     console.log(strRev === parolaInseritaAlContrario)
    // }

    function salvaRisposte(){
        let oggettoDomandeRisposte = {
            domanda: `Scrivi ${parolaDaInvertire} al contrario`,
            parola: parolaDaInvertire,
            risposta: parolaInseritaAlContrario
        }
        props.risposteAreaCog3(oggettoDomandeRisposte);
    }

    return(
        <>
            <h1 style={{fontSize: "15px", color: "red"}}>!!!!! In alternativa qui si possono mettere esercizi matematici semplici !!!!!</h1>
            <h2>Adesso ti verrà mostrata una parola ed il tuo obiettivo è scriverla al contrario</h2>

            {/* <button onClick={reverseString}>LOGGA PAROLA INVERTITA</button> */}

            <h5 className={styles.parola_al_contrario}>{parolaDaInvertire}</h5>

            <label>Riscrivi la parola al contrario</label>
            <input value={parolaInseritaAlContrario} onChange={parolaInseritaAlContrarioHandler} className={styles.input_style}></input>

            <GenericAlternativeButton
                buttonText={"Prox Domand"}
                onClick={salvaRisposte}
            >
            </GenericAlternativeButton>
        </>
    );
}

export default CognitiveAreaAttenzione;