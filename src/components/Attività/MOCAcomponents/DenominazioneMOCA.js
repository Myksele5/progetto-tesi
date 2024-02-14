import styles from "./DenominazioneMOCA.module.css";
import leone from "../../Images-Giochi/LION.jpeg";
import rinoceronte from "../../Images-Giochi/RHINO.jpeg";
import dromedario from "../../Images-Giochi/DROMEDARY.jpeg";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";
import { useState } from "react";

function DenominazioneMOCA(props){
    const [animale_1, setAnimale_1] = useState("");
    const [animale_2, setAnimale_2] = useState("");
    const [animale_3, setAnimale_3] = useState("");

    function animale1ChangeHandler(event){
        setAnimale_1(event.target.value)
    }
    function animale2ChangeHandler(event){
        setAnimale_2(event.target.value)
    }
    function animale3ChangeHandler(event){
        setAnimale_3(event.target.value)
    }

    function salvaRisposteAreaCognitiva5(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Scrivi i nomi di questi animali",
                animali: [
                    {animale: "Leone", risposta: animale_1},
                    {animale: "Rinoceronte", risposta: animale_2},
                    {animale: "Dromdedario", risposta: animale_3},
                ],
            }
        ]

        props.risposteAreaCog5(oggettoDomandeRisposte);
    }

    return(
        <>
            <h2 className={styles.explanation}>Scrivi i nomi di questi animali</h2>

            <div style={{width: "90%", display: "flex", justifyContent: "space-evenly"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <img className={styles.image_size} src={leone}></img>
                    <input onChange={animale1ChangeHandler} className={styles.input_box}></input>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <img className={styles.image_size} src={rinoceronte}></img>
                    <input onChange={animale2ChangeHandler} className={styles.input_box}></input>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <img className={styles.image_size} src={dromedario}></img>
                    <input onChange={animale3ChangeHandler} className={styles.input_box}></input>
                </div>
            </div>

            <GenericAlternativeButton
                buttonText={"Prox Domand"}
                onClick={salvaRisposteAreaCognitiva5}
            >
            </GenericAlternativeButton>
        </>
    );
}

export default DenominazioneMOCA;