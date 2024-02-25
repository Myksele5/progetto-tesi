import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestsContext from "../../context/tests-context";
import AddValutazione from "./AddValutazione";

function Attività(){
    const tests_ctx = useContext(TestsContext);

    return(
        <>
            <h1 className={styles.page_title}>TEST</h1>
            <div className={styles.wrap_boxes}>
                <GenericButton
                    onClick={tests_ctx.showFormAddValutazione}
                    generic_button={true}
                    buttonText={"Nuova valutazione"}
                >
                </GenericButton>
            </div>

            <div className={styles.wrapper_page}>
                {tests_ctx.formAddValutazione &&
                    <AddValutazione></AddValutazione>
                }

                {tests_ctx.mainPage &&
                <>
                    <h1>STORICO DEI TEST</h1>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.wrapper_horizontal_labels}>
                            <label className={styles.label_nome}>Nome Paziente</label>
                            <label className={styles.label_cognome}>Cognome Paziente</label>
                            <label className={styles.label_tipoTest}>Tipo Test</label>
                            <label className={styles.label_scoreTest}>Punteggio</label>
                            <label className={styles.label_data}>Data svolgimento</label>
                        </div>
                        {tests_ctx.listaTest?.map((test) => (
                            <div className={styles.wrapper_horizontal_content}>
                                <div className={styles.label_nome}>{test.nome}</div>
                                <div className={styles.label_cognome}>{test.cognome}</div>
                                <div className={styles.label_tipoTest}>{test.tipoTest}</div>
                                <div className={styles.label_scoreTest}>{test.punteggioTest}</div>
                                <div className={styles.label_data}>{test.dataSvolgimento}</div>
                            </div>
                        ))

                        }
                        
                        
                        
                    </div>
                </>
                }
            </div>

        </>
    );
}

export default Attività;