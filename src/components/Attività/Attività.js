import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestsContext from "../../context/tests-context";
import AddValutazione from "./AddValutazione";
import TabellaStoricoTest from "./TabellaStoricoTest";
import SchedaSingoloTest from "./SchedaSingoloTest";

function Attività(){
    const tests_ctx = useContext(TestsContext);

    return(
        <>
            {tests_ctx.mainPage &&
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
            }
            {!tests_ctx.formAddValutazione && <h1 className={styles.page_title}>Test</h1>}

            <div className={styles.wrapper_page}>
                {tests_ctx.formAddValutazione &&
                    <AddValutazione></AddValutazione>
                }

                {tests_ctx.mainPage &&
                    <TabellaStoricoTest></TabellaStoricoTest>
                }

                {tests_ctx.schedaSingoloTest && tests_ctx.testPaziente}
            </div>

        </>
    );
}

export default Attività;