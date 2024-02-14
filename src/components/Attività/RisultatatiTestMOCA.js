import { useContext, useEffect, useState } from "react";
import TestsContext from "../../context/tests-context";
import styles from "./RisultatiTestMOCA.module.css";

function RisultatiTestMOCA(props){
    const tests_ctx = useContext(TestsContext);

    const pazienteID = props.pazienteID;
    const nomePaziente = props.nomePaziente;
    const cognomePaziente = props.cognomePaziente;

    const [risposteAreaCognitiva_1, setRisposteAreaCognitiva_1] = useState(props.areaCog_1);
    const risposteAreaCognitiva_2 = props.areaCog_2;
    const risposteAreaCognitiva_3 = props.areaCog_3;

    const [punteggioAreaCogn_1, setPunteggioAreaCogn_1] = useState(0);
    const [punteggioAreaCogn_2, setPunteggioAreaCogn_2] = useState(0);
    const [punteggioAreaCogn_3, setPunteggioAreaCogn_3] = useState(0);
    const [punteggioAreaCogn_4, setPunteggioAreaCogn_4] = useState(0);
    const [punteggioAreaCogn_5, setPunteggioAreaCogn_5] = useState(0);
    const [punteggioAreaCogn_6, setPunteggioAreaCogn_6] = useState(0);
    const [punteggioTOT, setPunteggioTOT] = useState(0);

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

    useEffect(() => {
        console.log(risposteAreaCognitiva_1);
        console.log(risposteAreaCognitiva_2);
        console.log(props.areaCog_3);
        console.log(props.areaCog_4);
        console.log(props.areaCog_5);
        console.log(props.areaCog_6);
    }, [])
    return(
        <>
            <div style={{position: "sticky", top: "10px", backgroundColor: "lightblue", textAlign: "center"}}>
                <h1 className={styles.title}>Risultati del paziente: {nomePaziente} {cognomePaziente}</h1>
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
                        <div style={{width: "70%", display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
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

                <h2 className={styles.subtitle}>AREA COGNITIVA 3 - Attenzione</h2>
                <section className={styles.area_cog_style}>
                    <div style={{display: "flex", alignItems:"center", borderBottom: "1px solid black"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>{risposteAreaCognitiva_3[0].domanda}{":"}</label>
                        <div style={{width: "70%" ,display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            {risposteAreaCognitiva_3[0].listaNumeri.map(element => {
                                return(
                                    <h3 className={styles.risposta_style}>{element}</h3>
                                );
                            })}
                        </div>    
                    </div>
                    <div style={{display: "flex", alignItems:"center", borderBottom: "1px solid black"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>{risposteAreaCognitiva_3[1].domanda}{":"}</label>
                        <div style={{width: "70%" ,display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            {risposteAreaCognitiva_3[1].listaNumeri.map(element => {
                                return(
                                    <h3 className={styles.risposta_style}>{element}</h3>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>{risposteAreaCognitiva_3[2].domanda}{":"}</label>
                        <div style={{width: "90%" ,display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            {risposteAreaCognitiva_3[2].listaLettere.map(element => {
                                return(
                                    <h3 className={styles.risposta_style}>{element}</h3>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>Lettere 'A' cliccate:</label>
                        <div style={{width: "70%", display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            <h3 className={styles.risposta_style}>{risposteAreaCognitiva_3[2].lettereCliccate}</h3>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <label style={{margin: "5px"}} className={styles.label_style}>Lettere da cliccare:</label>
                        <div style={{width: "70%" ,display: "flex", justifyContent: "space-evenly", alignItems:"center"}}>
                            <h3 className={styles.risposta_style}>{risposteAreaCognitiva_3[2].lettereDaCliccare}</h3>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default RisultatiTestMOCA;