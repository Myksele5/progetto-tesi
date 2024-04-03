import styles from "./Attività.module.css";
import GenericButton from "../UI/GenericButton";
import TestCard from "../UI/TestCard";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import TestsContext from "../../context/tests-context";
import AddValutazione from "./AddValutazione";
import TabellaStoricoTest from "./TabellaStoricoTest";
import SchedaSingoloTest from "./SchedaSingoloTest";
import SearchBox from "../UI/SearchBox";
import EditRisultatiTestMMSE from "./EditRisultatiTestMMSE";

function Attività(){
    const tests_ctx = useContext(TestsContext);

    function cercaInfoTest(event){
        tests_ctx.cercaTest(event.target.value);
        // setStringaDaCercare(event.target.value);
    }

    return(
        <>
            {(tests_ctx.mainPage || tests_ctx.formAddValutazione) &&
                <div className={styles.wrap_boxes}>
                    <select onChange={(event) => {
                        tests_ctx.selectOrder(event.target.value)
                    }} className={styles.select_style}>
                        <option hidden>Ordina per...</option>
                        <option>NOME - Asc</option>
                        <option>NOME - Disc</option>
                        <option>COGNOME - Asc</option>
                        <option>COGNOME - Disc</option>
                        <option>TIPO TEST - Asc</option>
                        <option>TIPO TEST - Disc</option>
                        <option>PUNTEGGIO - Asc</option>
                        <option>PUNTEGGIO - Disc</option>
                    </select>
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
                    <SearchBox
                        onChange={cercaInfoTest}
                    >
                    </SearchBox>
                </div>
            }
            {!tests_ctx.formAddValutazione && !tests_ctx.schedaSingoloTest && !tests_ctx.editTest && <h1 className={styles.page_title}>Test</h1>}

            <div className={styles.wrapper_page}>
                {tests_ctx.formAddValutazione &&
                    <AddValutazione></AddValutazione>
                }

                {tests_ctx.editTest && 
                    tests_ctx.schedaTestEdit
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