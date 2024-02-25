import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestsContext from "../../context/tests-context";
import AddValutazione from "./AddValutazione";

function Attività(){
    const tests_ctx = useContext(TestsContext);

    return(
        <>
            <h1 className={styles.page_title}>TEST</h1>
            <div className={styles.wrap_boxes}>
                <GenericButton
                    onClick={tests_ctx.showFormAddValutazione}
                    generic_button={true}
                    buttonText={"Nuova valutazione"}
                >
                </GenericButton>
            </div>

            <div className={styles.wrapper_page}>
                {tests_ctx.formAddValutazione &&
                    <AddValutazione></AddValutazione>
                }

                {tests_ctx.mainPage &&
                    <h1>MAIN PAGE TEST</h1>
                }
            </div>

        </>
    );
}

export default Attività;