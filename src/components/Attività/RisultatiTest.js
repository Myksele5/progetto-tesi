import { useEffect, useState } from "react";
import styles from "./RisultatiTest.module.css";

function RisultatiTest(props){
    const nomePaziente = props.nomePaziente;
    const cognomePaziente = props.cognomePaziente;

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
        <>
            <h1 className={styles.title}>Risultati del paziente: {nomePaziente} {cognomePaziente}</h1>

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
                <input className={styles.input_style}></input>
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
                <input className={styles.input_style}></input>
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
                <input className={styles.input_style}></input>
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
                <input className={styles.input_style}></input>
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
                <input className={styles.input_style}></input>
                <hr style={{border: "1px solid black"}}></hr>

                <h2 className={styles.subtitle}>AREA COGNITIVA 6 - Abilità</h2>
            </div>
        </>
    );
}

export default RisultatiTest;