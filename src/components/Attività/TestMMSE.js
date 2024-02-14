import styles from "./TestMMSE.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import PatientContext from "../../context/patients-context";
import CognitiveAreaOrientamento from "./MMSEcomponents/CognitiveAreaOrientamento";
import CognitiveAreaMemoria from "./MMSEcomponents/CognitiveAreaMemoria";
import CognitiveAreaAttenzione from "./MMSEcomponents/CognitiveAreaAttenzione";
import CognitiveAreaLinguaggio from "./MMSEcomponents/CognitiveAreaLinguaggio";
import CognitiveAreaAbilità from "./MMSEcomponents/CognitiveAreaAbilità";
import RisultatiTest from "./RisultatiTestMMSE";

function TestMMSE(props){
    const patients_ctx = useContext(PatientContext);
    const [IDpazSelezionato, setIDPazSelezionato] = useState("")
    const [nomePazSelezionato, setNomePazSelezionato] = useState("");
    const [cognomePazSelezionato, setCognomePazSelezionato] = useState("");

    const [testIniziato, setTestIniziato] = useState(false);
    const [testConcluso, setTestConcluso] = useState(false);
    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

    //ELENCO DI STATI CHE RAPPRESENTANO LE RISPOSTE DEL PAZIENTE
    const [objRisposteAreaCognitiva1, setObjRisposteAreaCognitiva1] = useState([]);
    const [objRisposteAreaCognitiva2, setObjRisposteAreaCognitiva2] = useState();
    const [objRisposteAreaCognitiva3, setObjRisposteAreaCognitiva3] = useState([]);
    const [objRisposteAreaCognitiva4, setObjRisposteAreaCognitiva4] = useState();
    const [objRisposteAreaCognitiva5, setObjRisposteAreaCognitiva5] = useState([]);
    const [objRisposteAreaCognitiva6, setObjRisposteAreaCognitiva6] = useState();

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

    useEffect(() => {
        console.log(nomePazSelezionato);
        console.log(cognomePazSelezionato);
    }, [nomePazSelezionato, cognomePazSelezionato])
    
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

    function salvaRisposteAreaCognitiva1(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva1(objRisposte);

        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva2(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva2(objRisposte);

        prossimaSezioneCognitiva();
    }
    
    function salvaRisposteAreaCognitiva3(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva3(objRisposte);
        
        prossimaSezioneCognitiva();
    }
    
    function salvaRisposteAreaCognitiva4(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva4(objRisposte);
        
        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva5(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva5(objRisposte);

        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva6(objRisposte){
        console.log(objRisposte);
        setObjRisposteAreaCognitiva6(objRisposte);
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
                <h1>Test MMSE</h1>
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
                <CognitiveAreaOrientamento
                    domandeAreaCog1={props.areaCog_1_domande}
                    risposteAreaCog1={salvaRisposteAreaCognitiva1}
                >
                </CognitiveAreaOrientamento>
            }

            {testIniziato && sezioneCognitiva === 2 &&
                <CognitiveAreaMemoria
                    domandeAreaCog2={props.areaCog_2_domande}
                    step={1}
                    risposteAreaCog2={salvaRisposteAreaCognitiva2}
                >
                </CognitiveAreaMemoria>
            }

            {testIniziato && sezioneCognitiva === 3 &&
                <CognitiveAreaAttenzione
                    domandeAreaCog3={props.areaCog_3_domande}
                    risposteAreaCog3={salvaRisposteAreaCognitiva3}
                >
                </CognitiveAreaAttenzione>
            }

            {testIniziato && sezioneCognitiva === 4 &&
                <CognitiveAreaMemoria
                    domandeAreaCog4={props.areaCog_4_domande}
                    step={2}
                    risposteAreaCog4={salvaRisposteAreaCognitiva4}
                >
                </CognitiveAreaMemoria>
            }

            {testIniziato && sezioneCognitiva === 5 &&
                <CognitiveAreaLinguaggio
                    domandeAreaCog5={props.areaCog_5_domande}
                    risposteAreaCog5={salvaRisposteAreaCognitiva5}
                >
                </CognitiveAreaLinguaggio>
            }

            {testIniziato && sezioneCognitiva === 6 &&
            <>
                <CognitiveAreaAbilità
                    risposteAreaCog6={salvaRisposteAreaCognitiva6}
                >
                </CognitiveAreaAbilità>
                
            </>
            }
            {testConcluso &&
                <RisultatiTest
                    pazienteID={IDpazSelezionato}
                    nomePaziente={nomePazSelezionato}
                    cognomePaziente={cognomePazSelezionato}
                    areaCog_1={objRisposteAreaCognitiva1}
                    areaCog_2={objRisposteAreaCognitiva2}
                    areaCog_3={objRisposteAreaCognitiva3}
                    areaCog_4={objRisposteAreaCognitiva4}
                    areaCog_5={objRisposteAreaCognitiva5}
                    areaCog_6={objRisposteAreaCognitiva6}
                    tornaAlMenuTest={props.nascondiTest}
                >
                </RisultatiTest>
            }
            {testIniziato &&
            <>
                <GenericAlternativeButton
                    onClick={precedenteSezioneCognitiva}
                    buttonText={"Domanda precedente"}
                >
                </GenericAlternativeButton>
            </>
            }
        </div>
    );
}

export default TestMMSE;