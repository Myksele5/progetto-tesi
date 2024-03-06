import { useContext } from "react";
import styles from "./TabellaStoricoTest.module.css";
import TestsContext from "../../context/tests-context";

function TabellaStoricoTest(){
    const tests_ctx = useContext(TestsContext)

    return(
        <>
            <div className={styles.wrapper_horizontal_labels}>
                <label className={styles.label_nome}>Nome</label>
                <label className={styles.label_cognome}>Cognome</label>
                <label className={styles.label_tipoTest}>Tipo</label>
                <label className={styles.label_scoreTest}>Punteggio</label>
                <label className={styles.label_data}>Data</label>
            </div>
            {tests_ctx.listaTest?.map((test) => (
                <>
                    <div className={styles.wrapper_horizontal_content}>
                        <div className={styles.label_nome}>{test.nome}</div>
                        <div className={styles.label_cognome}>{test.cognome}</div>
                        <div className={styles.label_tipoTest}>{test.tipoTest}</div>
                        <div className={styles.label_scoreTest}>{test.punteggioTest}</div>
                        <div className={styles.label_data}>{test.dataSvolgimento}</div>
                    </div>
                </>
                ))
            }
        </>
    );
}

export default TabellaStoricoTest;