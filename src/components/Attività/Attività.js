import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";
import TestMOCA from "./TestMOCA";

let indiceTest = -1;

let domandeAreaCog1 = {};
let domandeAreaCog2 = {};
let domandeAreaCog3 = {};
let domandeAreaCog5 = {};

function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);
    const [testType, setTestType] = useState("");

    const testsList = tests_ctx.listaTestDB;
    const listQuestionsAreaCog_1 = tests_ctx.qstnsAreaCog1;
    const listQuestionsAreaCog_2 = tests_ctx.qstnsAreaCog2;
    const listQuestionsAreaCog_3 = tests_ctx.qstnsAreaCog3;
    const listQuestionsAreaCog_5 = tests_ctx.qstnsAreaCog5;

    // useEffect(() => {
    //     console.log(tests_ctx.qstnsAreaCog1)
    // }, [])

    function nascondiListaTest(){
        setShowListaTest((prevShowTest) => (!prevShowTest));
    }

    function trovaTestTramiteID(testID){
        let indiceStrano = 1;
        let stringaStrana = "domanda_";
        console.log(testsList);
        
        for(var i=0; i < testsList.length; i++){
            if(testsList[i].testID === testID){
                console.log("TROVATO")
                // setIndiceTestSelezionato(i)
                indiceTest = i;
                setTestType(testsList[i].tipoTest)
                break;
            }
            else{
                console.log("NON TROVO IL TEST")
                indiceTest = -1;
                // setIndiceTestSelezionato(-1)
            }
        }
        console.log(indiceTest)

        for(var i=0; i < listQuestionsAreaCog_1.length; i++){
            
            stringaStrana.concat(indiceStrano);
            console.log(stringaStrana.concat(indiceStrano));

            if(listQuestionsAreaCog_1[i].IDtest === testsList[indiceTest].testID){
                domandeAreaCog1[stringaStrana.concat(indiceStrano)] = listQuestionsAreaCog_1[i].domanda
                indiceStrano = indiceStrano + 1;
            }
        }
        console.log(domandeAreaCog1);
        indiceStrano = 1;
        stringaStrana = "parolaDaMemorizzare_";

        for(var i=0; i < listQuestionsAreaCog_2.length; i++){
            
            stringaStrana.concat(indiceStrano);
            console.log(stringaStrana.concat(indiceStrano));

            if(listQuestionsAreaCog_2[i].IDtest === testsList[indiceTest].testID){
                domandeAreaCog2[stringaStrana.concat(indiceStrano)] = listQuestionsAreaCog_2[i].parolaDaMemorizzare
                indiceStrano = indiceStrano + 1;
            }
        }
        console.log(domandeAreaCog2);
        indiceStrano = 1;
        stringaStrana = "parola";

        for(var i=0; i < listQuestionsAreaCog_3.length; i++){
            
            stringaStrana.concat(indiceStrano);
            console.log(stringaStrana.concat(indiceStrano));

            if(listQuestionsAreaCog_3[i].IDtest === testsList[indiceTest].testID){
                domandeAreaCog3[stringaStrana] = listQuestionsAreaCog_3[i].parola
                indiceStrano = indiceStrano + 1;
            }
        }
        console.log(domandeAreaCog3);
        indiceStrano = 1;
        stringaStrana = "esercizio_";

        for(var i=0; i < listQuestionsAreaCog_5.length; i++){
            
            stringaStrana.concat(indiceStrano);
            console.log(stringaStrana.concat(indiceStrano));

            if(listQuestionsAreaCog_5[i].IDtest === testsList[indiceTest].testID){
                domandeAreaCog5[stringaStrana.concat(indiceStrano)] = {
                    domanda: listQuestionsAreaCog_5[i].domanda,
                    oggetto_1: listQuestionsAreaCog_5[i].oggetto_1,
                    oggetto_2: listQuestionsAreaCog_5[i].oggetto_2,
                    frase: listQuestionsAreaCog_5[i].frase,
                    azione: listQuestionsAreaCog_5[i].azione
                }
                indiceStrano = indiceStrano + 1;
            }
        }
        console.log(domandeAreaCog5);
    }

    function fromArrayToListaTest(item){
        return(
            <TestCard
                children={
                    <>
                        <GenericAlternativeButton
                            onClick={() => {
                                console.log(item.testID)
                                trovaTestTramiteID(item.testID)
                                console.log(indiceTest)
                                if(indiceTest === -1){
                                    alert("ERRORE! Non trovo il test.")
                                }
                                else{
                                    nascondiListaTest();
                                }
                                
                            }}
                            buttonText={"Avvia Test"}
                        >
                        </GenericAlternativeButton>
                        <GenericAlternativeButton
                            buttonText={"Modifica Test"}
                        >
                        </GenericAlternativeButton>
                    </>
                }
                // nascondiLista={nascondiListaTest}
                cardText={item.nomeTest}
            ></TestCard>
        );   
    }

    // useEffect(() => {
    //     console.log(testsList);
    //     console.log(listQuestionsAreaCog_1);
    // }, [])

    return(
        <>
            <h1 className={styles.page_title}>TEST</h1>
            <div className={styles.wrap_boxes}>
                <GenericButton
                    generic_button={true}
                    buttonText={"Crea nuovo Test"}
                >
                </GenericButton>
            </div>

            <GenericAlternativeButton
                onClick={nascondiListaTest}
                buttonText={"ON/OFF"}
            >
            </GenericAlternativeButton>

            {!showListaTest && indiceTest !== -1 && testType === "MMSE" &&
                <div className={styles.wrapper_test}>
                    <TestMMSE
                        areaCog_1_domande={domandeAreaCog1}
                        areaCog_2_domande={domandeAreaCog2}
                        areaCog_3_domande={domandeAreaCog3}
                        //AREA COG.4 HA LA STESSA STRUTTURA E CONTENUTO DI AREA COG.2
                        areaCog_4_domande={domandeAreaCog2}
                        //
                        areaCog_5_domande={domandeAreaCog5}
                        nascondiTest={nascondiListaTest}
                    >
                    </TestMMSE>
                </div>
            }

            {!showListaTest && indiceTest !== -1 && testType === "MOCA" &&
                <div className={styles.wrapper_test}>
                    <TestMOCA
                        areaCog_1_domande={domandeAreaCog1}
                        areaCog_2_domande={domandeAreaCog2}
                    >
                    </TestMOCA>
                </div>
            }

            {showListaTest && <div className={styles.wrapper_generico}>
                {testsList.map(fromArrayToListaTest)}
            </div>}

        </>
    );
}

export default Attività;