import styles from "./TestMMSE.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import PatientContext from "../../context/patients-context";
import CognitiveAreaOrientamento from "./CognitiveAreaOrientamento";
import CognitiveAreaMemoria from "./CognitiveAreaMemoria";
import CognitiveAreaAttenzione from "./CognitiveAreaAttenzione";
import CognitiveAreaLinguaggio from "./CognitiveAreaLinguaggio";

function TestMMSE(){
    const patients_ctx = useContext(PatientContext);
    const [nomePazSelezionato, setNomePazSelezionato] = useState("");
    const [cognomePazSelezionato, setCognomePazSelezionato] = useState("");

    const [testIniziato, setTestIniziato] = useState(false);
    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

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
                // nome_paziente = patients_ctx.listaPazienti[i].nome;
                // cognome_paziente = patients_ctx.listaPazienti[i].cognome;
                // paziente = {
                //     nome: nome_paziente,
                //     cognome: cognome_paziente
                // }
                // console.log(paziente)
                // paziente_nome_mostrato = patients_ctx.listaPazienti[i].nome + " " + patients_ctx.listaPazienti[i].cognome
                // console.log(paziente_nome_mostrato);
                // return paziente;
            }
            else{
                console.log("NON TROVATO");
                console.log(patients_ctx.listaPazienti[i].ID);
            }
        }
        // return -1;
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
                    nomePaz={nomePazSelezionato}
                    cognomePaz={cognomePazSelezionato}
                >
                </CognitiveAreaOrientamento>
            }

            {testIniziato && sezioneCognitiva === 2 &&
                <CognitiveAreaMemoria></CognitiveAreaMemoria>
            }

            {testIniziato && sezioneCognitiva === 3 &&
                <CognitiveAreaAttenzione></CognitiveAreaAttenzione>
            }
            {testIniziato && sezioneCognitiva === 4 &&
                <CognitiveAreaLinguaggio></CognitiveAreaLinguaggio>
            }
            {testIniziato && sezioneCognitiva === 5 &&
            <>
                <h2>Adesso comparirà una frase a schermo, effettua l'azione richiesta</h2>
                <h5>Frase esempio: 'Chiudi gli occhi' oppure 'Apri e chiudi la mano due volte'</h5>
                <h2>Ottimo! Ora comparirà un'altra frase ed effettua l'azione richiesta</h2>
                <h5>Esempio: Porgi un foglio di carta e dici: 'Piega questo foglio a metà e posalo per terra'</h5>
            </>
            }
            {testIniziato && sezioneCognitiva === 6 &&
            <>
                <h2>Disegna la seguente immagine sul foglio che ti è stato fornito</h2>
                <h2>DISEGNO PENTAGONI INTRECCIATI</h2>
            </>
            }
            {testIniziato &&
            <>
                <GenericAlternativeButton
                    onClick={prossimaSezioneCognitiva}
                    buttonText={"Prossima domanda"}
                >
                </GenericAlternativeButton>
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