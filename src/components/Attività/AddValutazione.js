import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddValutazione.module.css";
import TestsContext from "../../context/tests-context";
import PatientContext from "../../context/patients-context";
import RisultatiTestMMSE from "./RisultatiTestMMSE";
import RisultatiTestMOCA from "./RisultatatiTestMOCA";

function AddValutazione(){
    const tests_ctx = useContext(TestsContext)
    const patients_ctx = useContext(PatientContext)

    const [pazienteSelezionato, setPazienteSelezionato] = useState({});
    const [tipoTestSelezionato, setTipoTestSelezionato] = useState("");

    function pazienteSelezionatoChangeHandler(event){
        setPazienteSelezionato(event.target.value)
    }
    function tipoTestSelezionatoChangeHandler(event){
        setTipoTestSelezionato(event.target.value)
    }

    return(
        <div className={styles.form_wrapper}>
            {tipoTestSelezionato.length === 0 &&
                <>
                    <label className={styles.label_style}>Seleziona paziente</label>

                    <select className={styles.select_style} onChange={pazienteSelezionatoChangeHandler}>
                        <option hidden>--seleziona--</option>
                        {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                    </select>
                </>
            }
            {Object.keys(pazienteSelezionato).length > 0 && tipoTestSelezionato.length === 0 &&
                <>
                    <label className={styles.label_style}>Seleziona il tipo di test</label>

                    <select className={styles.select_style} onChange={tipoTestSelezionatoChangeHandler}>
                        <option hidden>--seleziona--</option>
                        <option>Test MMSE</option>
                        <option>Test MoCA</option>
                    </select>
                </>
            }

            {tipoTestSelezionato === "Test MMSE" &&
                <RisultatiTestMMSE
                    paziente={pazienteSelezionato}
                ></RisultatiTestMMSE>
            }
            {tipoTestSelezionato === "Test MoCA" &&
                <RisultatiTestMOCA
                    paziente={pazienteSelezionato}
                ></RisultatiTestMOCA>
            }
        </div>
    );
}

export default AddValutazione;