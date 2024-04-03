import { useContext, useEffect, useState } from "react";
import styles from "./TabellaStoricoTest.module.css";
import TestsContext from "../../context/tests-context";
import { Collapse, Modal } from "react-bootstrap";
import GenericButton from "../UI/GenericButton";
import DetailsButton from "../UI/DetailsButton";
import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";

function TabellaStoricoTest(){
    const tests_ctx = useContext(TestsContext)

    const [provaCaricamento, setProvaCaricamento] = useState(false);
    const [mostraBottoni, setMostraBottoni] = useState();
    const [modalEliminateTest, setModalEliminateTest] = useState(false);
    const [testID_daCancellare, setTestID_daCancellare] = useState();

    useEffect(() => {
        {tests_ctx.listaTest.length === 0
        ?
        setProvaCaricamento(false)
        :
        setProvaCaricamento(true)
        }
    }, [tests_ctx.listaTest.length])

    function showButtonsForTest(testID){
        if(testID === mostraBottoni){
            setMostraBottoni();
        }
        else{
            setMostraBottoni(testID)
        }
    }

    return(
        <>
            {!provaCaricamento && <h2>Non ci sono valutazioni salvate.</h2>}
            {provaCaricamento &&
            <div className={styles.wrapper_horizontal}>
                <div className={styles.wrapper_horizontal_labels}>
                    {/* <label className={styles.label_nome}>ID</label> */}
                    <label className={styles.label_nome}>NOME</label>
                    <label className={styles.label_cognome}>COGNOME</label>
                    <label className={styles.label_tipoTest}>TIPO</label>
                    <label className={styles.label_scoreTest}>PUNTEGGIO</label>
                    <label className={styles.label_data}>DATA</label>
                </div>
                {tests_ctx.listaTest?.map((test) => (
                    <>
                        {(tests_ctx.stringSearched.length === 0 || 
                            (test.nome.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.cognome.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.tipoTest.toUpperCase().includes(tests_ctx.stringSearched.toUpperCase()) ||
                            test.punteggioTest.toString().includes(tests_ctx.stringSearched))
                            ) && 
                        
                            <>
                                <div className={styles.wrapper_horizontal_content} onClick={() => {showButtonsForTest(test.ID)}}>
                                    <div className={styles.content_nome}>{test.nome}</div>
                                    <div className={styles.content_cognome}>{test.cognome}</div>
                                    <div className={styles.content_tipoTest}>{test.tipoTest}</div>
                                    <div className={styles.content_scoreTest}>{test.punteggioTest}</div>
                                    <div className={styles.content_data}>{test.dataSvolgimento}</div>
                                </div>

                                <Collapse in={mostraBottoni === test.ID}>
                                    <div className={styles.horizontal}>
                                        <DetailsButton
                                            onClick={() => tests_ctx.prendiTestPaziente(test.ID, test.nome, test.cognome, test.tipoTest, test.punteggioTest, test.dataSvolgimento)}
                                            schedaTest
                                            generic_button={true}
                                        >
                                        </DetailsButton>
                                        <EditButton
                                            onClick={() => tests_ctx.modificaTestPaziente(test.ID, test.tipoTest, test.pazienteID)}
                                            generic_button={true}
                                        >
                                        </EditButton>
                                        <DeleteButton
                                            onClick={() => {
                                                setModalEliminateTest(true)
                                                setTestID_daCancellare(test.ID)
                                            }}
                                            red_styling
                                            generic_button={true}
                                        >
                                        </DeleteButton>
                                    </div>
                                </Collapse> 
                            </>
                        }
                    </>
                    ))
                }
                <Modal centered show={modalEliminateTest}>
                    <Modal.Header className={styles.font_modale}>Confermi di voler eliminare questo test?</Modal.Header>
                    <Modal.Footer className={styles.horizontal}>
                        <GenericButton
                            onClick={() => {
                                tests_ctx.eliminaTestPaziente(testID_daCancellare)
                                setModalEliminateTest(false)
                            }}
                            buttonText={"Elimina"}
                            red_styling
                            generic_button
                        ></GenericButton>
                        <GenericButton
                            onClick={() => {
                                setModalEliminateTest(false)
                                setTestID_daCancellare()
                            }}
                            buttonText={"Annulla"}
                            generic_button
                        ></GenericButton>
                    </Modal.Footer>
                </Modal>
            </div>    
            }
        </>
    );
}
// onClick={tests_ctx.prendiTestPaziente(test.ID, test.nome, test.cognome, test.tipoTest, test.punteggioTest, test.dataSvolgimento)}
export default TabellaStoricoTest;