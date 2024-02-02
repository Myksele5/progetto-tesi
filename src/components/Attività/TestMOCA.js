import { useContext, useState } from "react";
import styles from "./TestMOCA.module.css";
import PatientContext from "../../context/patients-context";
import GenericButton from "../UI/GenericButton";

function TestMOCA(){
    const patients_ctx = useContext(PatientContext);

    const [testIniziato, setTestIniziato] = useState(false);
    const [testConcluso, setTestConcluso] = useState(false);

    function iniziaTest(){
        //INIZIA IL TEST
    }

    return(
        <div className={styles.test_container}>
            {!testIniziato && !testConcluso && 
            <>
                {/* <label>Ciao sono il test<br/></label> */}
                <h1>Test MoCA</h1>
                <p>Seleziona il paziente che svolgerà il test.</p>
                <select className={styles.select_style}>
                    <option hidden>----- select an option -----</option>
                    {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                </select>
                <GenericButton
                    onClick={iniziaTest}
                    generic_button={true}
                    buttonText={"INIZIA TEST"}
                >
                </GenericButton>
            </>
            }
        </div>
    );
}

export default TestMOCA;