import { useContext, useEffect, useState } from "react";
import styles from "./RisultatiTest.module.css";
import GenericButton from "../UI/GenericButton";
import TestsContext from "../../context/tests-context";

function RisultatiTest(props){
    const tests_ctx = useContext(TestsContext);

    const pazienteID = props.pazienteID;
    const nomePaziente = props.nomePaziente;
    const cognomePaziente = props.cognomePaziente;

    const [risposteAreaCognitiva_1, setRisposteAreaCognitiva_1] = useState(props.areaCog_1);
    const risposteAreaCognitiva_2 = props.areaCog_2;
    const risposteAreaCognitiva_3 = props.areaCog_3;
    const risposteAreaCognitiva_4 = props.areaCog_4;
    const risposteAreaCognitiva_5 = props.areaCog_5;
    const risposteAreaCognitiva_6 = props.areaCog_6;

    const [punteggioAreaCogn_1, setPunteggioAreaCogn_1] = useState(0);
    const [punteggioAreaCogn_2, setPunteggioAreaCogn_2] = useState(0);
    const [punteggioAreaCogn_3, setPunteggioAreaCogn_3] = useState(0);
    const [punteggioAreaCogn_4, setPunteggioAreaCogn_4] = useState(0);
    const [punteggioAreaCogn_5, setPunteggioAreaCogn_5] = useState(0);
    const [punteggioAreaCogn_6, setPunteggioAreaCogn_6] = useState(0);
    const [punteggioTOT, setPunteggioTOT] = useState(0);

    function salvaRisultato(){
        tests_ctx.salvaRisultatoMMSE(punteggioTOT, pazienteID);
        props.tornaAlMenuTest();
    }

    function puntiAreaCognitiva1Handler(event){
        setPunteggioAreaCogn_1(event.target.value);
        if(event.target.value > 10){
            setPunteggioAreaCogn_1(10)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_1(0)
        }
    }
    function puntiAreaCognitiva2Handler(event){
        setPunteggioAreaCogn_2(event.target.value);
        if(event.target.value > 3){
            setPunteggioAreaCogn_2(3)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_2(0)
        }
    }
    function puntiAreaCognitiva3Handler(event){
        setPunteggioAreaCogn_3(event.target.value);
        if(event.target.value > 5){
            setPunteggioAreaCogn_3(5)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_3(0)
        }
    }
    function puntiAreaCognitiva4Handler(event){
        setPunteggioAreaCogn_4(event.target.value);
        if(event.target.value > 3){
            setPunteggioAreaCogn_4(3)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_4(0)
        }
    }
    function puntiAreaCognitiva5Handler(event){
        setPunteggioAreaCogn_5(event.target.value);
        if(event.target.value > 8){
            setPunteggioAreaCogn_5(8)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_5(0)
        }
    }
    function puntiAreaCognitiva6Handler(event){
        setPunteggioAreaCogn_6(event.target.value);
        if(event.target.value > 1){
            setPunteggioAreaCogn_6(1)
        }
        if(event.target.value < 0){
            setPunteggioAreaCogn_6(0)
        }
    }

    useEffect(() => {
        console.log(typeof punteggioAreaCogn_1)
        setPunteggioTOT(Number(punteggioAreaCogn_1) + Number(punteggioAreaCogn_2) + Number(punteggioAreaCogn_3) + Number(punteggioAreaCogn_4) + Number(punteggioAreaCogn_5) + Number(punteggioAreaCogn_6))
    }, [punteggioAreaCogn_1, punteggioAreaCogn_2, punteggioAreaCogn_3, punteggioAreaCogn_4, punteggioAreaCogn_5, punteggioAreaCogn_6])

    useEffect(() => {
        console.log(risposteAreaCognitiva_1);
        console.log(props.areaCog_2);
        console.log(props.areaCog_3);
        console.log(props.areaCog_4);
        console.log(props.areaCog_5);
        console.log(props.areaCog_6);
    }, [])

    return(
        <>
            <h1 className={styles.title}>Risultati del paziente: {nomePaziente} {cognomePaziente}</h1>

            <div style={{position: "sticky", top: "10px", backgroundColor: "lightblue", textAlign: "center"}}>
                <h4 className={styles.title}>Punteggio Totale</h4>
                <h4 className={styles.title}>{punteggioTOT}/30</h4>
            </div>

            <div>
                <h2 className={styles.subtitle}>AREA COGNITIVA 1 - Orientamento</h2>
                <section className={styles.area_cog_style}>
                    
                    <div className={styles.grid_container}>
                        <label className={styles.label_style}>DOMANDE:</label>
                        <label className={styles.label_style}>RISPOSTE:</label>
                        {risposteAreaCognitiva_1.map(element => {
                            return (
                                <>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        {/* <label>DOMANDA:</label> */}
                                        <h3 className={styles.domanda_style}>{element.domanda}</h3>
                                        
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        {/* <label>RISPOSTA:</label> */}
                                        <h3 className={styles.risposta_style}>{element.risposta}</h3>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 1: </label>
                <input value={punteggioAreaCogn_1} onChange={puntiAreaCognitiva1Handler} className={styles.input_style} type="number" min={0} max={10}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 2 - Memoria</h2>
                <section className={styles.area_cog_style}>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>{risposteAreaCognitiva_2.domanda}{":"}</label>
                        <div style={{width: "70%" ,display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            {risposteAreaCognitiva_2.parole.map(element => {
                                return(
                                    <h3 className={styles.risposta_style}>{element}</h3>
                                );
                            })
                            }
                        </div>
                    </div>
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 2: </label>
                <input value={punteggioAreaCogn_2} onChange={puntiAreaCognitiva2Handler} className={styles.input_style} type="number" min={0} max={3}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 3 - Attenzione/Calcolo</h2>
                <section className={styles.area_cog_style}>
                    <div className={styles.grid_container}>
                        <label className={styles.label_style}>DOMANDA:</label>
                        <label className={styles.label_style}>RISPOSTA:</label>
                        <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                            <h3 className={styles.domanda_style}>{risposteAreaCognitiva_3.domanda}{":"}</h3>
                        </div>
                        <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                            <h3 className={styles.risposta_style}>{risposteAreaCognitiva_3.risposta}</h3>
                        </div>
                    </div>
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 3: </label>
                <input value={punteggioAreaCogn_3} onChange={puntiAreaCognitiva3Handler} className={styles.input_style} type="number" min={0} max={5}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 4 - Richiamo</h2>
                <section className={styles.area_cog_style}>
                    <label className={styles.label_style}>{risposteAreaCognitiva_4.domanda}</label>
                    <div className={styles.grid_container}>
                        <label className={styles.label_style}>PAROLE:</label>
                        <label className={styles.label_style}>RISPOSTE:</label>
                        {risposteAreaCognitiva_4.parole.map(element => {
                            return(
                                <>
                                    <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        <h3 className={styles.domanda_style}>{element.parola}</h3>
                                    </div>
                                    <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        <h3 className={styles.risposta_style}>{element.risposta}</h3>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 4: </label>
                <input value={punteggioAreaCogn_4} onChange={puntiAreaCognitiva4Handler} className={styles.input_style} type="number" min={0} max={3}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 5 - Linguaggio</h2>
                <section className={styles.area_cog_style}>
                    <label className={styles.label_style}>{risposteAreaCognitiva_5[0].domanda}</label>
                    <div className={styles.grid_container}>
                        <label className={styles.label_style}>OGGETTI:</label>
                        <label className={styles.label_style}>RISPOSTE:</label>
                        {risposteAreaCognitiva_5[0].oggetti.map(element => {
                            return(
                                <>
                                    <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        <h3 className={styles.domanda_style}>{element.oggetto}</h3>
                                    </div>
                                    <div style={{display: "flex", alignItems:"center", marginBottom: "2px", borderBottom: "1px solid black"}}>
                                        <h3 className={styles.risposta_style}>{element.risposta}</h3>
                                    </div>
                                </>
                            );
                        })}
                    </div>

                    {/* INSERIRE E/O AGGIUSTARE MARGINE */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label className={styles.label_style}>{risposteAreaCognitiva_5[1].domanda}</label>
                        <h3 className={styles.risposta_style}>{risposteAreaCognitiva_5[1].frase}</h3>
                    </div>
                    {/* INSERIRE E/O AGGIUSTARE MARGINE */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label className={styles.label_style}>{risposteAreaCognitiva_5[2].domanda}</label>
                        <h3 className={styles.risposta_style}>{risposteAreaCognitiva_5[2].azione}</h3>
                    </div>
                    {/* INSERIRE E/O AGGIUSTARE MARGINE */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label className={styles.label_style}>{risposteAreaCognitiva_5[3].domanda}</label>
                        <h3 className={styles.risposta_style}>{risposteAreaCognitiva_5[3].frase}</h3>
                    </div>
                    {/* INSERIRE E/O AGGIUSTARE MARGINE */}
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label className={styles.label_style}>{risposteAreaCognitiva_5[4].domanda}</label>
                        <h3 className={styles.risposta_style}>{risposteAreaCognitiva_5[4].azione}</h3>
                    </div>
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 5: </label>
                <input value={punteggioAreaCogn_5} onChange={puntiAreaCognitiva5Handler} className={styles.input_style} type="number" min={0} max={8}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 6 - Abilità</h2>
                <section className={styles.area_cog_style}>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>{risposteAreaCognitiva_6}</label>
                    </div>
                </section>
                <label className={styles.label_style}>PUNTEGGIO AREA COGNITIVA 6: </label>
                <input value={punteggioAreaCogn_6} onChange={puntiAreaCognitiva6Handler} className={styles.input_style} type="number" min={0} max={1}></input>
            </div>

            <GenericButton
                onClick={salvaRisultato}
                buttonText={"Salva risultati test"}
                generic_button={true}
            >
            </GenericButton>
        </>
    );
}

export default RisultatiTest;