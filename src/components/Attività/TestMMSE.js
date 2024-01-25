import styles from "./TestMMSE.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import PatientContext from "../../context/patients-context";
import CognitiveAreaOrientamento from "./CognitiveAreaOrientamento";
import CognitiveAreaMemoria from "./CognitiveAreaMemoria";
import CognitiveAreaAttenzione from "./CognitiveAreaAttenzione";
import CognitiveAreaLinguaggio from "./CognitiveAreaLinguaggio";
import CognitiveAreaAbilità from "./CognitiveAreaAbilità";

function TestMMSE(){
    const patients_ctx = useContext(PatientContext);
    const [nomePazSelezionato, setNomePazSelezionato] = useState("");
    const [cognomePazSelezionato, setCognomePazSelezionato] = useState("");

    const [testIniziato, setTestIniziato] = useState(false);
    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

    //ELENCO DI STATI CHE RAPPRESENTANO LE RISPOSTE DEL PAZIENTE
    const [nomeImmesso, setNomeImmesso] = useState("");
    const [cognomeImmesso, setCognomeImmesso] = useState("");
    const [dataImmessa, setDataImmessa] = useState("");
    const [luogoImmesso, setLuogoImmesso] = useState("");

    const [parolaInvertitaImmessa, setParolaInvertitaImmessa] = useState("");

    const [parolaMemorizzataImmessa1, setParolaMemorizzataImmessa1] = useState("");
    const [parolaMemorizzataImmessa2, setParolaMemorizzataImmessa2] = useState("");
    const [parolaMemorizzataImmessa3, setParolaMemorizzataImmessa3] = useState("");

    const [oggettoImmesso1, setOggettoImmesso1] = useState("");
    const [oggettoImmesso2, setOggettoImmesso2] = useState("");
    const [fraseImmessa, setFraseImmessa] = useState("");

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

    function salvaRisposteAreaCognitiva1(nome, cognome, data, luogo){
        console.log(nome);
        console.log(cognome);
        console.log(data);
        console.log(luogo);
        setNomeImmesso(nome);
        setCognomeImmesso(cognome);
        setDataImmessa(data);
        setLuogoImmesso(luogo);

        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva2(parola_1, parola_2, parola_3){
        console.log(parola_1);
        console.log(parola_2);
        console.log(parola_3);
        setParolaMemorizzataImmessa1(parola_1);
        setParolaMemorizzataImmessa2(parola_2);
        setParolaMemorizzataImmessa3(parola_3);

        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva3(parolaInvertita){
        console.log(parolaInvertita);
        setParolaInvertitaImmessa(parolaInvertita);

        prossimaSezioneCognitiva();
    }

    function salvaRisposteAreaCognitiva4(nomeOggetto1, nomeOggetto2, frasePaziente){
        console.log(nomeOggetto1);
        console.log(nomeOggetto2);
        console.log(frasePaziente);
        setOggettoImmesso1(nomeOggetto1);
        setOggettoImmesso2(nomeOggetto2);
        setFraseImmessa(frasePaziente);

        prossimaSezioneCognitiva();
    }

    return(
        <div className={styles.test_container}>
            {!testIniziato && 
            <>
                <label>Ciao sono il test<br/></label>
                <label>INFO PRIMA DI INIZIARE IL TEST</label>
                <p>Seleziona il paziente che svolgerà il test.</p>
                <select onChange={consoleLoggaFullNamePaziente}>
                    <option hidden>-- select an option --</option>
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
                    risposteAreaCog1={salvaRisposteAreaCognitiva1}
                >
                </CognitiveAreaOrientamento>
            }

            {testIniziato && sezioneCognitiva === 2 &&
                <CognitiveAreaMemoria
                    step={1}
                    proxSezione={prossimaSezioneCognitiva}
                    // risposteAreaCog2={salvaRisposteAreaCognitiva2}
                >
                </CognitiveAreaMemoria>
            }

            {testIniziato && sezioneCognitiva === 3 &&
                <CognitiveAreaAttenzione
                    risposteAreaCog3={salvaRisposteAreaCognitiva3}
                >
                </CognitiveAreaAttenzione>
            }

            {testIniziato && sezioneCognitiva === 4 &&
                <CognitiveAreaMemoria
                    step={2}
                    risposteAreaCog2={salvaRisposteAreaCognitiva2}
                >
                </CognitiveAreaMemoria>
            }

            {testIniziato && sezioneCognitiva === 5 &&
                <CognitiveAreaLinguaggio
                    risposteAreaCog4={salvaRisposteAreaCognitiva4}
                >
                </CognitiveAreaLinguaggio>
            }

            {testIniziato && sezioneCognitiva === 6 &&
            <>
                <CognitiveAreaAbilità>
                </CognitiveAreaAbilità>
            </>
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