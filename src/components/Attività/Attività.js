import styles from "./Attività.module.css";
import CambioPsw from "../Accesso/CambioPsw";
import SearchBox from "../UI/SearchBox";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestMMSE from "./TestMMSE";
import TestsContext from "../../context/tests-context";


function Attività(){
    const tests_ctx = useContext(TestsContext);
    const [showListaTest, setShowListaTest] = useState(true);

    function nascondiListaTest(){
        setShowListaTest((prevShowTest) => (!prevShowTest));
    }

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
                {tests_ctx.primaFunzione}
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