import GenericAlternativeButton from "../../UI/GenericAlternativeButton";
import styles from "./MemoriaMOCA.module.css";

function MemoriaMOCA(props){
    // const elencoParole = props.step === 1 ? props.domandeAreaCog2 : props.domandeAreaCog4;
    const elencoParole = props.domandeAreaCog2;

    function salvaRisposteAreaCognitiva2(){
        let oggettoDomandeRisposte = 
            {
                domanda: "Ripeti queste parole",
                parole: [elencoParole.parolaDaMemorizzare_1, elencoParole.parolaDaMemorizzare_2, elencoParole.parolaDaMemorizzare_3, elencoParole.parolaDaMemorizzare_4, elencoParole.parolaDaMemorizzare_5]
            }
        ;
        props.risposteAreaCog2(oggettoDomandeRisposte);
    }

    return(
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
    );
}

export default MemoriaMOCA;