import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./CognitiveAreaOrientamento.module.css";
import { useEffect, useState } from "react";

function CognitiveAreaOrientamento(props){
    const elencoDomande = props.domandeAreaCog1;

    const [bloccoDomande, setBloccoDomande] = useState(1);

    const [annoInserito, setAnnoInserito] = useState("");
    const [meseInserito, setMeseInserito] = useState("");
    const [giornoInserito, setGiornoInserito] = useState("");
    const [giornoSettimanaInserito, setGiornoSettimanaInserito] = useState("");
    const [stagioneInserita, setStagioneInserita] = useState("");

    const [nazioneInserita, setNazioneInserita] = useState("");
    const [regioneInserita, setRegioneInserita] = useState("");
    const [cittàInserita, setCittàInserita] = useState("");
    const [luogoInserito, setLuogoInserito] = useState("");
    const [pianoInserito, setPianoInserito] = useState("");

    // useEffect(() => {
    //     console.log(nomePaziente);
    //     console.log(cognomePaziente);
    // }, [])

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

    function stagioneInseritaChangeHandler(event){
        setStagioneInserita(event.target.value);
        console.log(event.target.value);
    }


    function nazioneInseritaChangeHandler(event){
        setNazioneInserita(event.target.value);
        console.log(event.target.value);
    }

    function regioneInseritaChangeHandler(event){
        setRegioneInserita(event.target.value);
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

    function pianoInseritoChangeHandler(event){
        setPianoInserito(event.target.value);
        console.log(event.target.value);
    }

    function prossimoBlocco(){
        setBloccoDomande(2);
    }

    function salvaRisposte(){
        let oggettoDomandeRisposte = [
            {
                domanda: "In che anno ci troviamo?",
                risposta: annoInserito
            },
            {
                domanda: "In che mese ci troviamo?",
                risposta: meseInserito
            },
            {
                domanda: "Che giorno è oggi?",
                risposta: giornoInserito
            },
            {
                domanda: "Quale giorno della settimana è oggi?",
                risposta: giornoSettimanaInserito
            },
            {
                domanda: "In quale stagione ci troviamo?",
                risposta: stagioneInserita
            },
            {
                domanda: "In quale nazione siamo?",
                risposta: nazioneInserita
            },
            {
                domanda: "In quale regione?",
                risposta: regioneInserita
            },
            {
                domanda: "In quale città ci troviamo?",
                risposta: cittàInserita
            },
            {
                domanda: "In che luogo ci troviamo?",
                risposta: luogoInserito
            },
            {
                domanda: "A quale piano siamo adesso?",
                risposta: pianoInserito
            }
        ]
        props.risposteAreaCog1(oggettoDomandeRisposte);
    }

    return(
        <>
            {bloccoDomande === 1 &&
            <>
                <h2>TEMPO</h2>
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
                        <input value={stagioneInserita} onChange={stagioneInseritaChangeHandler} className={styles.input_style}></input>
                    </div>
                </section>
                <GenericAlternativeButton
                    buttonText={"Prox Domand"}
                    onClick={prossimoBlocco}
                >
                </GenericAlternativeButton>
            </>
            }

            {bloccoDomande === 2 &&
            <>
                <h2>SPAZIO</h2>
                <section>
                    <div className={styles.flex_vertical}>
                        <label>{elencoDomande.domanda_6}</label>
                        <input value={nazioneInserita} onChange={nazioneInseritaChangeHandler} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_vertical}>
                        <label>{elencoDomande.domanda_7}</label>
                        <input value={regioneInserita} onChange={regioneInseritaChangeHandler} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_vertical}>
                        <label>{elencoDomande.domanda_8}</label>
                        <input value={cittàInserita} onChange={cittàInseritaChangeHandler} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_vertical}>
                        <label>{elencoDomande.domanda_9}</label>
                        <input value={luogoInserito} onChange={luogoInseritoChangeHandler} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_vertical}>
                        <label>{elencoDomande.domanda_10}</label>
                        <input value={pianoInserito} onChange={pianoInseritoChangeHandler} className={styles.input_style}></input>
                    </div>
                </section>
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

export default CognitiveAreaOrientamento;