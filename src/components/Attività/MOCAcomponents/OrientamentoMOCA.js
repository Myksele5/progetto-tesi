import { useState } from "react";
import styles from "./OrientamentoMOCA.module.css";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";

function OrientamentoMOCA(props){
    const elencoDomande = props.domandeAreaCog1;

    const [annoInserito, setAnnoInserito] = useState("");
    const [meseInserito, setMeseInserito] = useState("");
    const [giornoInserito, setGiornoInserito] = useState("");
    const [giornoSettimanaInserito, setGiornoSettimanaInserito] = useState("");
    const [cittàInserita, setCittàInserita] = useState("");
    const [luogoInserito, setLuogoInserito] = useState("");

    function annoInseritoChangeHandler(event){
        setAnnoInserito(event.target.value);
        console.log(event.target.value);
    }

    function meseInseritoChangeHandler(event){
        setMeseInserito(event.target.value);
        console.log(event.target.value);
    }

    function giornoInseritoChangeHandler(event){
        setGiornoInserito(event.target.value);
        console.log(event.target.value);
    }

    function giornoSettimanaInseritoChangeHandler(event){
        setGiornoSettimanaInserito(event.target.value);
        console.log(event.target.value);
    }

    function cittàInseritaChangeHandler(event){
        setCittàInserita(event.target.value);
        console.log(event.target.value);
    }

    function luogoInseritoChangeHandler(event){
        setLuogoInserito(event.target.value);
        console.log(event.target.value);
    }

    function salvaRisposte(){
        let oggettoDomandeRisposte = [
            {
                domanda: elencoDomande.domanda_1,
                risposta: annoInserito
            },
            {
                domanda: elencoDomande.domanda_2,
                risposta: meseInserito
            },
            {
                domanda: elencoDomande.domanda_3,
                risposta: giornoInserito
            },
            {
                domanda: elencoDomande.domanda_4,
                risposta: giornoSettimanaInserito
            },
            {
                domanda: elencoDomande.domanda_5,
                risposta: cittàInserita
            },
            {
                domanda: elencoDomande.domanda_6,
                risposta: luogoInserito
            }
        ]
        props.risposteAreaCog1(oggettoDomandeRisposte);
    }

    return (
        <>
            <section>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_1}</label>
                    <input value={annoInserito} onChange={annoInseritoChangeHandler} className={styles.input_style}></input>
                </div>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_2}</label>
                    <input value={meseInserito} onChange={meseInseritoChangeHandler} className={styles.input_style}></input>
                </div>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_3}</label>
                    <input value={giornoInserito} onChange={giornoInseritoChangeHandler} className={styles.input_style}></input>
                </div>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_4}</label>
                    <input value={giornoSettimanaInserito} onChange={giornoSettimanaInseritoChangeHandler} className={styles.input_style}></input>
                </div>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_5}</label>
                    <input value={cittàInserita} onChange={cittàInseritaChangeHandler} className={styles.input_style}></input>
                </div>
                <div className={styles.flex_vertical}>
                    <label>{elencoDomande.domanda_6}</label>
                    <input value={luogoInserito} onChange={luogoInseritoChangeHandler} className={styles.input_style}></input>
                </div>
            </section>
            <GenericAlternativeButton
                buttonText={"Prox Domand"}
                onClick={salvaRisposte}
            >
            </GenericAlternativeButton>
        </>
    );
}

export default OrientamentoMOCA;