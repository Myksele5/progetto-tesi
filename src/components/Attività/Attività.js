import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestsContext from "../../context/tests-context";
import AddValutazione from "./AddValutazione";
import TabellaStoricoTest from "./TabellaStoricoTest";

function Attività(){
    const tests_ctx = useContext(TestsContext);

    return(
        <>
            <div className={styles.wrap_boxes}>
                {!tests_ctx.formAddValutazione &&
                    <GenericButton
                        onClick={tests_ctx.showFormAddValutazione}
                        generic_button={true}
                        buttonText={"Nuova valutazione"}
                    >
                    </GenericButton>
                }
                {tests_ctx.formAddValutazione &&
                    <GenericButton
                        onClick={tests_ctx.hideFormAddValutazione}
                        buttonText={"Annulla valutazione"}
                        red_styling
                        generic_button
                    ></GenericButton>
                }
            </div>
            {!tests_ctx.formAddValutazione && <h1 className={styles.page_title}>TEST</h1>}

            <div className={styles.wrapper_page}>
                {tests_ctx.formAddValutazione &&
                    <AddValutazione></AddValutazione>
                }

                {tests_ctx.mainPage &&
                <>
                    <h1>STORICO DEI TEST</h1>
                    <TabellaStoricoTest></TabellaStoricoTest>
                </>
                }
            </div>

        </>
    );
}

export default Attività;