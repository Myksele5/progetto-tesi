import styles from "./SchedaSingoloTest.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import TestsContext from "../../context/tests-context";

function SchedaSingoloTest(props){
    const tests_ctx = useContext(TestsContext);

    const [risultatiTest, setRisultatiTest] = useState(props.risultatiTest)

    return(
        <div style={{width:"80%"}} className={styles.wrapper_vertical}>
            <div style={{position: "sticky", top: "0px"}}>
                <GenericButton
                    onClick={tests_ctx.hideSchedaTest}
                    buttonText={"Indietro"}
                    generic_button
                    red_styling
                ></GenericButton>
            </div>
            
            <h3 className={styles.scheda_test_di}>Scheda Test di: {props.nome} {props.cognome}</h3>
            <div className={styles.wrapper_horizontal}>
                <label className={styles.label_style}>Tipo test svolto: </label>
                <div className={styles.dettagli_test}>{props.tipoTest}</div>
            </div>
            <div className={styles.wrapper_horizontal}>
                <label className={styles.label_style}>Punteggio ottenuto: </label>
                <div className={styles.dettagli_test}>{props.punteggioTest}/30</div>
            </div>
            <div className={styles.wrapper_horizontal}>
                <label className={styles.label_style}>Svolto il: </label>
                <div className={styles.dettagli_test}>{props.dataSvolgimento}</div>
            </div>

            <hr className={styles.horizontal_line}></hr>

            {props.tipoTest === "MMSE" && 
            <>
                {risultatiTest.map((riga) => (
                    <>
                        {riga.ID === 1 && <h2 className={styles.area_cog_title}>Area Cognitiva 1</h2>}
                        {riga.ID === 11 && <h2 className={styles.area_cog_title}>Area Cognitiva 2</h2>}
                        {riga.ID === 14 && <h2 className={styles.area_cog_title}>Area Cognitiva 3</h2>}
                        {riga.ID === 19 && <h2 className={styles.area_cog_title}>Area Cognitiva 4</h2>}
                        {riga.ID === 22 && <h2 className={styles.area_cog_title}>Area Cognitiva 5</h2>}
                        {riga.ID === 30 && <h2 className={styles.area_cog_title}>Area Cognitiva 6</h2>}
                        <div className={styles.wrapper_risposte}>
                            <label className={styles.domanda_style}>{riga.domanda}:</label>
                            {riga.risposta === 0 &&
                            <div className={styles.risposta_style}>{riga.risposta} punti</div> 
                            }
                            {riga.risposta > 0 &&
                            <div className={styles.risposta_style}>+{riga.risposta} {riga.risposta === 1 ? "punto" : "punti"}</div>
                            }
                        </div>
                        <hr className={styles.horizontal_line}></hr>
                    </>
                ))
                }
            </>
            }

            {props.tipoTest === "MoCA" && 
            <>
                {risultatiTest.map((riga) => (
                    <>
                        {riga.ID === 1 && <h2 className={styles.area_cog_title}>Area Cognitiva 1</h2>}
                        {riga.ID === 6 && <h2 className={styles.area_cog_title}>Area Cognitiva 2</h2>}
                        {riga.ID === 9 && <h2 className={styles.area_cog_title}>Area Cognitiva 3</h2>}
                        {riga.ID === 10 && <h2 className={styles.area_cog_title}>Area Cognitiva 4</h2>}
                        {riga.ID === 14 && <h2 className={styles.area_cog_title}>Area Cognitiva 5</h2>}
                        {riga.ID === 17 && <h2 className={styles.area_cog_title}>Area Cognitiva 6</h2>}
                        {riga.ID === 19 && <h2 className={styles.area_cog_title}>Area Cognitiva 7</h2>}
                        {riga.ID === 24 && <h2 className={styles.area_cog_title}>Area Cognitiva 8</h2>}
                        <div className={styles.wrapper_risposte}>
                            <label className={styles.domanda_style}>{riga.domanda}:</label>
                            {riga.domanda !== "Numero tentativi ripetizione parole" && riga.risposta === 0 &&
                            <div className={styles.risposta_style}>{riga.risposta} punti</div> 
                            }
                            {riga.domanda !== "Numero tentativi ripetizione parole" && riga.risposta > 0 &&
                            <div className={styles.risposta_style}>+{riga.risposta} {riga.risposta === 1 ? "punto" : "punti"}</div>
                            }
                            {riga.domanda === "Numero tentativi ripetizione parole" &&
                            <div className={styles.risposta_style}>{riga.risposta} tentativi</div>
                            }
                        </div>
                        <hr className={styles.horizontal_line}></hr>
                    </>
                ))
                }
            </>
            }
            
        </div>
    );
}

export default SchedaSingoloTest;