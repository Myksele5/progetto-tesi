import styles from "./Attività.module.css";
import CambioPsw from "../Accesso/CambioPsw";
import SearchBox from "../UI/SearchBox";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";


function Attività(){

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

            <div className={styles.wrapper_generico}>
                {/* <h2>CIAO</h2> */}
                <TestCard
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
                </TestCard>

            </div>
            {/* <CambioPsw></CambioPsw> */}

        </>
    );
}

export default Attività;