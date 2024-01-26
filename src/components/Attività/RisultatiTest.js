import { useEffect, useState } from "react";
import styles from "./RisultatiTest.module.css";

function RisultatiTest(props){
    const [risposteAreaCognitiva_1, setRisposteAreaCognitiva_1] = useState(props.areaCog_1);
    const risposteAreaCognitiva_2 = props.areaCog_2;
    const risposteAreaCognitiva_3 = props.areaCog_3;
    const risposteAreaCognitiva_4 = props.areaCog_4;
    const risposteAreaCognitiva_5 = props.areaCog_5;
    const risposteAreaCognitiva_6 = props.areaCog_6;

    useEffect(() => {
        console.log(risposteAreaCognitiva_1);
        console.log(props.areaCog_2);
        console.log(props.areaCog_3);
        console.log(props.areaCog_4);
        console.log(props.areaCog_5);
        console.log(props.areaCog_6);
    }, [])

    return(
        <div style={{width: "100%"}}>
            <h1>Risultati del paziente</h1>
            <h2>AREA COGNITIVA 1 - Orientamento</h2>
            {risposteAreaCognitiva_1.map(element => {
                return (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label>{element.domanda}{"----->"}</label>
                        <h3>{element.risposta}</h3>
                    </div>
                );
            })}

            <h2>AREA COGNITIVA 2 - Memoria</h2>
            {risposteAreaCognitiva_2.map(element => {
                return (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label>{element.domanda}{"----->"}</label>
                        <h3>{element.parola}</h3>
                    </div>
                );
            })}

            <h2>AREA COGNITIVA 3 - Attenzione/Calcolo</h2>
            <div style={{display: "flex", alignItems:"center"}}>
                <label>{risposteAreaCognitiva_3.domanda}{"--"}{risposteAreaCognitiva_3.parola}{"----->"}</label>
                <h3>{risposteAreaCognitiva_3.risposta}</h3>
            </div>

            <h2>AREA COGNITIVA 4 - Richiamo</h2>
            {risposteAreaCognitiva_4.map(element => {
                return (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label>{element.parola}{"----->"}</label>
                        <h3>{element.risposta}</h3>
                    </div>
                );
            })}
            <h2>AREA COGNITIVA 5 - Linguaggio</h2>
            <div style={{display: "flex", alignItems: "center"}}>
                <label>{risposteAreaCognitiva_5[0].domanda}{"----->"}</label>
                <h3>{risposteAreaCognitiva_5[0].oggetto_1}</h3>
                <h3>{risposteAreaCognitiva_5[0].oggetto_2}</h3>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <label>{risposteAreaCognitiva_5[1].domanda}</label>
                <h3>{risposteAreaCognitiva_5[1].frase}</h3>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <label>{risposteAreaCognitiva_5[2].domanda}</label>
                <h3>{risposteAreaCognitiva_5[2].azione}</h3>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <label>{risposteAreaCognitiva_5[3].domanda}</label>
                <h3>{risposteAreaCognitiva_5[3].frase}</h3>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <label>{risposteAreaCognitiva_5[4].domanda}</label>
                <h3>{risposteAreaCognitiva_5[4].azione}</h3>
            </div>
            <h2>AREA COGNITIVA 6 - Abilità</h2>
        </div>
    );
}

export default RisultatiTest;