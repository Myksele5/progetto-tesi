import styles from "./CognitiveAreaLinguaggio.module.css";
import image1 from "../Images-Giochi/orologio.jpeg";
import image2 from "../Images-Giochi/matita.jpg";
import { useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function CognitiveAreaLinguaggio(props){
    const elencoDomande = props.domandeAreaCog5;
    var oggettoDaIdentificare1 = elencoDomande.esercizio_1.oggetto_1;
    var oggettoDaIdentificare2 = elencoDomande.esercizio_1.oggetto_2;

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
                domanda: elencoDomande.esercizio_1.domanda,
                oggetti: [
                    {oggetto: oggettoDaIdentificare1, risposta: oggetto1},
                    {oggetto: oggettoDaIdentificare2, risposta: oggetto2},
                ],
            },
            {
                domanda: elencoDomande.esercizio_2.domanda,
                frase: elencoDomande.esercizio_2.frase
            },
            {
                domanda: elencoDomande.esercizio_3.domanda,
                azione: elencoDomande.esercizio_3.azione
            },
            {
                domanda: elencoDomande.esercizio_4.domanda,
                frase: fraseInserita
            },
            {
                domanda: elencoDomande.esercizio_5.domanda,
                azione: elencoDomande.esercizio_5.azione
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
                <h2>{elencoDomande.esercizio_1.domanda}</h2>
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
                    <h2>Ad alta voce, {elencoDomande.esercizio_2.domanda} che ti viene mostrata qui sotto.</h2>
                    <h2 style={{textDecoration: "underline"}}>{elencoDomande.esercizio_2.frase}</h2>
                    <GenericAlternativeButton
                        buttonText={"Prossima Domanda"}
                        onClick={prossimaDomanda}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {numeroDomanda === 3 &&
                <div className={styles.flex_vertical}>
                    <h2>{elencoDomande.esercizio_3.domanda}</h2>
                    <h2>{elencoDomande.esercizio_3.azione}</h2>
                    <GenericAlternativeButton
                        buttonText={"Prossima Domanda"}
                        onClick={prossimaDomanda}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {numeroDomanda === 4 &&
                <div className={styles.flex_vertical}>
                    <h2>{elencoDomande.esercizio_4.domanda}</h2>
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
                    <h2>{elencoDomande.esercizio_5.domanda}</h2>
                    <h2>{elencoDomande.esercizio_5.azione}</h2>
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