import { useContext, useEffect, useState } from "react";
import styles from "./TabellaStoricoTest.module.css";
import TestsContext from "../../context/tests-context";

function TabellaStoricoTest(){
    const tests_ctx = useContext(TestsContext)

    const [provaCaricamento, setProvaCaricamento] = useState(false);

    useEffect(() => {
        {tests_ctx.listaTest.length === 0
        ?
        setProvaCaricamento(false)
        :
        setProvaCaricamento(true)
        }
    }, [tests_ctx.listaTest.length])

    return(
        <>
            {!provaCaricamento && <h2>Non ci sono valutazioni salvate.</h2>}
            {provaCaricamento &&
            <div className={styles.wrapper_horizontal}>
                <div className={styles.wrapper_horizontal_labels}>
                    {/* <label className={styles.label_nome}>ID</label> */}
                    <label className={styles.label_nome}>NOME</label>
                    <label className={styles.label_cognome}>COGNOME</label>
                    <label className={styles.label_tipoTest}>TIPO</label>
                    <label className={styles.label_scoreTest}>PUNTEGGIO</label>
                    <label className={styles.label_data}>DATA</label>
                </div>
                {tests_ctx.listaTest?.map((test) => (
                    <>
                        {(tests_ctx.stringSearched.length === 0 || 
                            (test.nome.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.cognome.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.tipoTest.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.punteggioTest.toString().includes(tests_ctx.stringSearched))
                            ) && 
                        
                            <div className={styles.wrapper_horizontal_content} onClick={() => {tests_ctx.prendiTestPaziente(test.ID, test.nome, test.cognome, test.tipoTest, test.punteggioTest, test.dataSvolgimento)}}>
                                {/* <div className={styles.label_nome}>{test.ID}</div> */}
                                <div className={styles.content_nome}>{test.nome}</div>
                                <div className={styles.content_cognome}>{test.cognome}</div>
                                <div className={styles.content_tipoTest}>{test.tipoTest}</div>
                                <div className={styles.content_scoreTest}>{test.punteggioTest}</div>
                                <div className={styles.content_data}>{test.dataSvolgimento}</div>
                            </div>
                        }
                    </>
                    ))
                }
            </div>    
            }
        </>
    );
}

export default TabellaStoricoTest;