import { useContext, useState } from "react";
import styles from "./TestMOCA.module.css";
import PatientContext from "../../context/patients-context";
import GenericButton from "../UI/GenericButton";
import OrientamentoMOCA from "./MOCAcomponents/OrientamentoMOCA";
import MemoriaMOCA from "./MOCAcomponents/MemoriaMOCA";
import AttenzioneMOCA from "./MOCAcomponents/AttenzioneMOCA";
import DenominazioneMOCA from "./MOCAcomponents/DenominazioneMOCA";
import LinguaggioMOCA from "./MOCAcomponents/LinguaggioMOCA";
import AstrazioneMOCA from "./MOCAcomponents/AstrazioneMOCA";
import AbilitàMOCA from "./MOCAcomponents/AbilitàMOCA";
import RisultatiTestMMSE from "./RisultatiTestMMSE";
import RisultatiTestMOCA from "./RisultatatiTestMOCA";

function TestMOCA(props){
    const patients_ctx = useContext(PatientContext);
    const [IDpazSelezionato, setIDPazSelezionato] = useState("")
    const [nomePazSelezionato, setNomePazSelezionato] = useState("");
    const [cognomePazSelezionato, setCognomePazSelezionato] = useState("");

    const [testIniziato, setTestIniziato] = useState(false);
    const [testConcluso, setTestConcluso] = useState(false);
    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

    const [answersMOCA_AC1, setAnswersMOCA_AC1] = useState([]);
    const [answersMOCA_AC2, setAnswersMOCA_AC2] = useState();
    const [answersMOCA_AC3, setAnswersMOCA_AC3] = useState([]);
    const [answersMOCA_AC4, setAnswersMOCA_AC4] = useState([]);
    const [answersMOCA_AC5, setAnswersMOCA_AC5] = useState([]);
    const [answersMOCA_AC6, setAnswersMOCA_AC6] = useState([]);
    const [answersMOCA_AC7, setAnswersMOCA_AC7] = useState([]);
    const [answersMOCA_AC8, setAnswersMOCA_AC8] = useState([]);

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

    function consoleLoggaFullNamePaziente(event){
        console.log(event.target.value)

        for(var i = 0; i < patients_ctx.listaPazienti.length; i++){
            if(patients_ctx.listaPazienti[i].ID === parseInt(event.target.value)){
                console.log("TROVATO");
                setIDPazSelezionato(patients_ctx.listaPazienti[i].ID)
                setNomePazSelezionato(patients_ctx.listaPazienti[i].nome);
                setCognomePazSelezionato(patients_ctx.listaPazienti[i].cognome);
            }
            else{
                console.log("NON TROVATO");
                console.log(patients_ctx.listaPazienti[i].ID);
            }
        }
        // return -1;
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
    function setRisposteMOCA_AC3(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC3(objRisposte);
        prossimaSezioneCognitiva();
    }
    function setRisposteMOCA_AC4(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC4(objRisposte);
        prossimaSezioneCognitiva();
    }
    function setRisposteMOCA_AC5(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC5(objRisposte);
        prossimaSezioneCognitiva();
    }
    function setRisposteMOCA_AC6(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC6(objRisposte);
        prossimaSezioneCognitiva();
    }
    function setRisposteMOCA_AC7(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC7(objRisposte);
        prossimaSezioneCognitiva();
        // console.log(answersMOCA_AC1)
        // console.log(answersMOCA_AC2)
        // console.log(answersMOCA_AC3)
        // console.log(answersMOCA_AC4)
        // console.log(answersMOCA_AC5)
        // console.log(answersMOCA_AC6)
        // console.log(answersMOCA_AC7)
    }
    function setRisposteMOCA_AC8(objRisposte){
        console.log(objRisposte);
        setAnswersMOCA_AC8(objRisposte);
        //TEST FINITO
        setTestIniziato(false);
        setTestConcluso(true);
        prossimaSezioneCognitiva();
    }

    return(
        <div className={styles.test_container}>
            {!testIniziato && !testConcluso && 
            <>
                {/* <label>Ciao sono il test<br/></label> */}
                <h1>Test MoCA</h1>
                <p>Seleziona il paziente che svolgerà il test.</p>
                <select className={styles.select_style} onChange={consoleLoggaFullNamePaziente}>
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
                    step={1}
                    domandeAreaCog2={props.areaCog_2_domande}
                    risposteAreaCog2={setRisposteMOCA_AC2}
                >
                </MemoriaMOCA>
            }

            {testIniziato && sezioneCognitiva === 3 &&
                <AttenzioneMOCA
                    risposteAreaCog3={setRisposteMOCA_AC3}
                >
                </AttenzioneMOCA>
            }

            {testIniziato && sezioneCognitiva === 4 &&
                <MemoriaMOCA
                    step={2}
                    domandeAreaCog4={props.areaCog_4_domande}
                    risposteAreaCog4={setRisposteMOCA_AC4}
                >
                </MemoriaMOCA>
            }
            {testIniziato && sezioneCognitiva === 5 &&
                <DenominazioneMOCA
                    risposteAreaCog5={setRisposteMOCA_AC5}
                >
                </DenominazioneMOCA>
            }
            {testIniziato && sezioneCognitiva === 6 &&
                <LinguaggioMOCA
                    risposteAreaCog6={setRisposteMOCA_AC6}
                >
                </LinguaggioMOCA>
            }
            {testIniziato && sezioneCognitiva === 7 &&
                <AstrazioneMOCA
                    risposteAreaCog7={setRisposteMOCA_AC7}
                >
                </AstrazioneMOCA>
            }
            {testIniziato && sezioneCognitiva === 8 &&
                <AbilitàMOCA
                    risposteAreaCog8={setRisposteMOCA_AC8}
                >
                </AbilitàMOCA>
            }
            {testConcluso &&
                <RisultatiTestMOCA
                    pazienteID={IDpazSelezionato}
                    nomePaziente={nomePazSelezionato}
                    cognomePaziente={cognomePazSelezionato}
                    areaCog_1={answersMOCA_AC1}
                    areaCog_2={answersMOCA_AC2}
                    areaCog_3={answersMOCA_AC3}
                    areaCog_4={answersMOCA_AC4}
                    areaCog_5={answersMOCA_AC5}
                    areaCog_6={answersMOCA_AC6}
                    areaCog_7={answersMOCA_AC7}
                    areaCog_8={answersMOCA_AC8}
                    tornaAlMenuTest={props.nascondiTest}
                >
                </RisultatiTestMOCA>
            }
        </div>
    );
}

export default TestMOCA;