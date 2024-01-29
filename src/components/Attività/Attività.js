import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";


function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);
    const [testSelected, setTestSelected] = useState("");

    const testsList = tests_ctx.listaTest;

    function nascondiListaTest(){
        setShowListaTest((prevShowTest) => (!prevShowTest));
    }

    function fromArrayToListaTest(item){
        return(
            <TestCard
                children={
                    <>
                        <GenericAlternativeButton
                            onClick={() => {
                                nascondiListaTest();
                                setTestSelected(item.nomeTest)
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

            {!showListaTest && testSelected === "Test MMSE" &&
                <div className={styles.wrapper_test}>
                    <TestMMSE
                    //DA COMPLETARE CON LE ALTRE AREE COGNITIVE
                        areaCog_1_domande={testsList[0].objAreaCog_1}
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