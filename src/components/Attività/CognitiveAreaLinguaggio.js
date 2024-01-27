import styles from "./CognitiveAreaLinguaggio.module.css";
import image1 from "../Images-Giochi/BANANA.jpg";
import image2 from "../Images-Giochi/FRAGOLA.jpg";
import { useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function CognitiveAreaLinguaggio(props){
    var oggettoDaIdentificare1 = "BANANA";
    var oggettoDaIdentificare2 = "FRAGOLA";

    const [numeroDomanda, setNumeroDomanda] = useState(1);

    const [oggetto1, setOggetto1] = useState("");
    const [oggetto2, setOggetto2] = useState("");
    const [fraseInserita, setFraseInserita] = useState("");

    function oggetto1ChangeHandler(event){
        setOggetto1(event.target.value.toUpperCase());
    }

    function oggetto2ChangeHandler(event){
        setOggetto2(event.target.value.toUpperCase());
    }

    function fraseInseritaChangeHandler(event){
        console.log(event.target.value);
        setFraseInserita(event.target.value);
    }

    function prossimaDomanda(){
        setNumeroDomanda((numeroPreced) => (numeroPreced + 1));
    }

    function salvaRisposte(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Scrivi i nomi di questi oggetti",
                oggetti: [
                    {oggetto: oggettoDaIdentificare1, risposta: oggetto1},
                    {oggetto: oggettoDaIdentificare2, risposta: oggetto2},
                ],
            },
            {
                domanda: "Ripeti la frase",
                frase: "TIGRE CONTRO TIGRE"
            },
            {
                domanda: "Esegui questa azione",
                azione: "Prendi il foglio di carta, piegalo a metà e buttalo per terra."
            },
            {
                domanda: "Scrivi una frase",
                frase: fraseInserita
            },
            {
                domanda: "Esegui questa azione",
                azione: "Chiudi gli occhi"
            }
        ]
        console.log(oggetto1 === oggettoDaIdentificare1);
        console.log(oggetto2 === oggettoDaIdentificare2);
        console.log(fraseInserita);
        props.risposteAreaCog5(oggettoDomandeRisposte);
    }

    return(
        <>
            {numeroDomanda === 1 &&
            <>
                <h4>Scrivi i nomi di questi oggetti</h4>
                <div className={styles.flex_horizontal}>
                    <div className={styles.flex_vertical}>
                        <img className={styles.image_style} src={image1}></img>
                        <label>Oggetto 1</label>
                        <input value={oggetto1} onChange={oggetto1ChangeHandler} className={styles.input_style}></input>
                    </div>
                    
                    <div className={styles.flex_vertical}>
                        <img className={styles.image_style} src={image2}></img>
                        <label>Oggetto 2</label>
                        <input value={oggetto2} onChange={oggetto2ChangeHandler} className={styles.input_style}></input>
                    </div>
                </div>

                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimaDomanda}
                >
                </GenericAlternativeButton>
            </>
            }

            {numeroDomanda === 2 &&
                <div className={styles.flex_vertical}>
                    <h2>Ripeti ad alta voce la frase che ti viene mostrata qui sotto.</h2>
                    <h5>TIGRE CONTRO TIGRE</h5>
                    <GenericAlternativeButton
                        buttonText={"Prossima Domanda"}
                        onClick={prossimaDomanda}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {numeroDomanda === 3 &&
                <div className={styles.flex_vertical}>
                    <h2>Adesso prendi il foglio di carta vicino a te, piegalo a metà e buttalo per terra.</h2>
                    <GenericAlternativeButton
                        buttonText={"Prossima Domanda"}
                        onClick={prossimaDomanda}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {numeroDomanda === 4 &&
                <div className={styles.flex_vertical}>
                    <h2>Scrivi una frase con un soggetto ed un verbo</h2>
                    <input value={fraseInserita} onChange={fraseInseritaChangeHandler} className={styles.input_style}></input>
                    <GenericAlternativeButton
                        buttonText={"Prossima Domanda"}
                        onClick={prossimaDomanda}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {numeroDomanda === 5 &&
                <div className={styles.flex_vertical}>
                    <h2>Ora gentilmente chiudi gli occhi.</h2>
                    <GenericAlternativeButton
                        buttonText={"Prox Domand"}
                        onClick={salvaRisposte}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            
            
        </>
    );
}

export default CognitiveAreaLinguaggio;