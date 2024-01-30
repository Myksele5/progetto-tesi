import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";

let indiceTest = -1;

function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);

    const testsList = tests_ctx.listaTest;

    function nascondiListaTest(){
        setShowListaTest((prevShowTest) => (!prevShowTest));
    }

    function trovaTestTramiteID(testID){
        for(var i=0; i < testsList.length; i++){
            if(testsList[i].id === testID){
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
    }

    function fromArrayToListaTest(item){
        return(
            <TestCard
                children={
                    <>
                        <GenericAlternativeButton
                            onClick={() => {
                                console.log(item.id)
                                trovaTestTramiteID(item.id)
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

    useEffect(() => {
        console.log(testsList);
    }, [])

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
                        areaCog_1_domande={testsList[indiceTest].objAreaCog_1}
                        areaCog_2_domande={testsList[indiceTest].objAreaCog_2}
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