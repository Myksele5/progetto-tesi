import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";

let indiceTest = -1;

let domandeAreaCog1 = {};
let domandeAreaCog2 = {};

function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);

    const testsList = tests_ctx.listaTestDB;
    const listQuestionsAreaCog_1 = tests_ctx.qstnsAreaCog1;
    const listQuestionsAreaCog_2 = tests_ctx.qstnsAreaCog2;

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
                break;
            }
            else{
                console.log("NON TROVO IL TEST")
                indiceTest = -1;
                // setIndiceTestSelezionato(-1)
            }
        }
        console.log(indiceTest)
        // console.log(listQuestionsAreaCog_1);

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

            {!showListaTest && indiceTest !== -1 &&
                <div className={styles.wrapper_test}>
                    <TestMMSE
                    //DA COMPLETARE CON LE ALTRE AREE COGNITIVE
                        areaCog_1_domande={domandeAreaCog1}
                        areaCog_2_domande={domandeAreaCog2}
                        areaCog_3_domande={testsList[indiceTest].objAreaCog_3}
                        areaCog_4_domande={testsList[indiceTest].objAreaCog_4}
                        areaCog_5_domande={testsList[indiceTest].objAreaCog_5}
                        nascondiTest={nascondiListaTest}
                    >
                    </TestMMSE>
                </div>
            }

            {showListaTest && <div className={styles.wrapper_generico}>
                {testsList.map(fromArrayToListaTest)}
            </div>}

        </>
    );
}

export default Attività;