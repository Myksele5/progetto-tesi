import { useContext, useState } from "react";
import styles from "./TestMOCA.module.css";
import PatientContext from "../../context/patients-context";
import GenericButton from "../UI/GenericButton";
import OrientamentoMOCA from "./MOCAcomponents/OrientamentoMOCA";
import MemoriaMOCA from "./MOCAcomponents/MemoriaMOCA";
import AttenzioneMOCA from "./MOCAcomponents/AttenzioneMOCA";

function TestMOCA(props){
    const patients_ctx = useContext(PatientContext);

    const [testIniziato, setTestIniziato] = useState(false);
    const [testConcluso, setTestConcluso] = useState(false);

    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

    const [answersMOCA_AC1, setAnswersMOCA_AC1] = useState([]);
    const [answersMOCA_AC2, setAnswersMOCA_AC2] = useState();
    const [answersMOCA_AC3, setAnswersMOCA_AC3] = useState([]);

    function iniziaTest(){
        // if(nomePazSelezionato && cognomePazSelezionato){
            setTestIniziato(true);
        // }
        // else{
        //     alert("Per iniziare il test devi selezionare un paziente!");
        // }
    }

    function prossimaSezioneCognitiva(){
        setSezioneCognitiva((prevSezione) => (prevSezione + 1));
    }
    function precedenteSezioneCognitiva(){
        setSezioneCognitiva((prevSezione) => (prevSezione - 1));
    }

    function setRisposteMOCA_AC1(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC1(objRisposte);
        prossimaSezioneCognitiva();
    }
    function setRisposteMOCA_AC2(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC2(objRisposte);
        prossimaSezioneCognitiva();
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

            {testIniziato && <h1>{"AREA COGNITIVA N." + sezioneCognitiva}</h1>}

            {testIniziato && sezioneCognitiva === 1 &&
                <OrientamentoMOCA
                    domandeAreaCog1={props.areaCog_1_domande}
                    risposteAreaCog1={setRisposteMOCA_AC1}
                >
                </OrientamentoMOCA>
            }

            {testIniziato && sezioneCognitiva === 2 &&
                <MemoriaMOCA
                    domandeAreaCog2={props.areaCog_2_domande}
                    risposteAreaCog2={setRisposteMOCA_AC2}
                >
                </MemoriaMOCA>
            }

            {testIniziato && sezioneCognitiva === 3 &&
                <AttenzioneMOCA
                >
                </AttenzioneMOCA>
            }
        </div>
    );
}

export default TestMOCA;