import styles from "./Attività.module.css";
import CambioPsw from "../Accesso/CambioPsw";
import SearchBox from "../UI/SearchBox";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";


function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);

    const testsList = tests_ctx.listaTest;

    function nascondiListaTest(){
        setShowListaTest((prevShowTest) => (!prevShowTest));
    }

    function fromArrayToListaTest(item){
        if(item.nomeTest === "Test MMSE" || item.nomeTest === "Test MOCA"){
            return(
                <TestCard
                    nascondiLista={nascondiListaTest}
                    cardText={item.nomeTest}
                ></TestCard>
            );
        }
        else{
            return(
                <TestCard
                    testEliminabile={true}
                    nascondiLista={nascondiListaTest}
                    cardText={item.nomeTest}
                ></TestCard>
            );
        }

        
    }

    useEffect(() => {
        console.log(testsList);
    }, [])

    return(
        <>

            <h1 className={styles.page_title}>TESTING</h1>
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

            {!showListaTest && 
                <div className={styles.wrapper_test}>
                    <TestMMSE></TestMMSE>
                </div>
            }

            {showListaTest && <div className={styles.wrapper_generico}>
                {testsList.map(fromArrayToListaTest)}
                {/* <TestCard
                    // nascondiLista={nascondiListaTest}
                    cardText={"Test MMSE"}
                >
                </TestCard>
                <TestCard
                    cardText={"Test MOCA"}
                >
                </TestCard>
                <TestCard
                    testEliminabile={true}
                    cardText={"Altro Test"}
                >
                </TestCard>
                <TestCard
                    testEliminabile={true}
                    cardText={"Altro Test"}
                >
                </TestCard>
                <TestCard
                    testEliminabile={true}
                    cardText={"Altro Test"}
                >
                </TestCard>
                <TestCard
                    testEliminabile={true}
                    cardText={"Altro Test"}
                >
                </TestCard> */}

            </div>}
            {/* <CambioPsw></CambioPsw> */}

        </>
    );
}

export default Attività;