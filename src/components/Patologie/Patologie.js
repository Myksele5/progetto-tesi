import { useContext, useEffect, useState } from "react";
import CardSmall from "../UI/CardSmall";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./Patologie.module.css";
import PatologiesContext from "../../context/patologies-context";
// import Card from "../UI/Card";
import ElencoTerapie from "./ElencoTerapie";
import AddPatologia from "./AddPatologia";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import { Card, Modal } from "react-bootstrap";
import SearchBox from "../UI/SearchBox";
import AuthContext from "../../context/auth-context";
import TerapiePaziente from "./TerapiePaziente";

function Patologie(){
    const auth_ctx = useContext(AuthContext);
    const patologies_ctx = useContext(PatologiesContext);

    const [modaleAggiuntaPatologia, setModaleAggiuntaPatologia] = useState(false);
    const [IDperModificaNome, setIDperModificaNome] = useState(-1);
    const [nomeDaModificare, setNomeDaModificare] = useState("");
    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState({});

    useEffect(() => {
        console.log(patologies_ctx.uniqueList)
    }, [])

    function visualizzaPatologia(patologia){
        console.log(patologia)
        patologies_ctx.showPatologia(patologia)
        patologies_ctx.showTherapiesList();
    }

    // function nonMostrarePatologia(patologia){
    //     let arrayTemporaneo = [...patologiaVisualizzata];
    //     arrayTemporaneo.splice(patologiaVisualizzata.indexOf(patologia), 1)
    //     setPatologiaVisualizzata(arrayTemporaneo)
    // }

    function modificaNomePatologia(ID, nome){
        setIDperModificaNome(ID);
        setNomeDaModificare(nome);
    }

    function nomePatologiaChangeHandler(event){
        setNomeDaModificare(event.target.value);
    }

    async function salvaNuovaPatologia(){
        await getServerMgr().saveNewPatologyWithTherapies(nomeDaModificare)
        patologies_ctx.createUniqueObject();
        setModaleAggiuntaPatologia(false);
    }

    async function aggiornaNomePatologia(){
        await getServerMgr().updatePatologyName(nomeDaModificare, IDperModificaNome)
        .catch((err) => {console.error(err)})

        setIDperModificaNome();
        setNomeDaModificare("");

        patologies_ctx.createUniqueObject();
    }

    function eliminaPatologia(patologiaID, nomePatologia){
        patologies_ctx.confirmDeletePatology(patologiaID, nomePatologia)
        // await getServerMgr().deletePatology(patologiaID)
        // .catch((err) => {
        //     console.error(err);
        // });
    }

    function cercaPatologia(event){
        patologies_ctx.searchPatology(event.target.value)
    }

    return(
        <>
            {patologies_ctx.showModale && patologies_ctx.modale}

            {patologies_ctx.topBar && auth_ctx.tipoAccount !== "Paziente" &&
                <div className={styles.wrap_boxes}>
                    <select onChange={(event) => {
                        patologies_ctx.selectOrder(event.target.value)
                    }} className={styles.select_style}>
                        <option hidden>Ordina per...</option>
                        <option>NOME - Asc</option>
                        <option>NOME - Disc</option>
                    </select>

                    <GenericButton
                        onClick={() => {setModaleAggiuntaPatologia(true)}}
                        buttonText={"Aggiungi Patologia"}
                        generic_button={true}
                    >
                    </GenericButton>

                    <SearchBox
                        onChange={cercaPatologia}
                    >
                    </SearchBox>
                </div>
            }
            {patologies_ctx.visibleLista && auth_ctx.tipoAccount !== "Paziente" && <h1 className={styles.page_title}>Elenco Patologie</h1>}
            {auth_ctx.tipoAccount === "Paziente" && <h1 className={styles.page_title}>Le mie terapie</h1>}

            <div className={styles.wrapper_generico}>
                {/* {patologies_ctx.visibleFormAddPatology && */}
                    {/* <AddPatologia></AddPatologia> */}
                    <Modal centered show={modaleAggiuntaPatologia}>
                        <Modal.Header className={styles.label_style}>Nuova patologia</Modal.Header>
                        <Modal.Body>
                            <label className={styles.label_style}>Nome patologia:</label>
                            <input value={nomeDaModificare} onChange={nomePatologiaChangeHandler} className={styles.input_style}></input>
                        </Modal.Body>
                        <Modal.Footer>
                            <GenericButton
                                onClick={salvaNuovaPatologia}
                                generic_button
                                buttonText={"Salva"}
                            ></GenericButton>
                            <GenericButton
                                onClick={() => {setModaleAggiuntaPatologia(false)}}
                                generic_button
                                red_styling
                                buttonText={"Annulla"}
                            ></GenericButton>
                        </Modal.Footer>
                    </Modal>
                {/* // } */}

                {patologies_ctx.visibleTherapiesList && 
                    <ElencoTerapie
                        patologiaSelezionata={patologiaVisualizzata}
                    ></ElencoTerapie>
                }

                {patologies_ctx.visibleLista && auth_ctx.tipoAccount !== "Paziente" &&
                <div className={styles.wrapper_vertical}>
                    {patologies_ctx.uniqueList.map((pat) => (
                        <>
                        {(patologies_ctx.patologySearched.length === 0 || pat.nomePatologia.toUpperCase().includes(patologies_ctx.patologySearched.toUpperCase())) &&
                        <Card className={styles.card_style}>
                            <Card.Body>
                                <div className={styles.wrapper_horizontal}>
                                    <div className={styles.wrapper_vertical}>
                                        <label className={styles.label_style}>Patologia:</label>
                                        {IDperModificaNome !== pat.patologiaID && <h3 className={styles.info_content}>{pat.nomePatologia}</h3>}
                                        {IDperModificaNome === pat.patologiaID && 
                                            <Modal centered show={IDperModificaNome === pat.patologiaID}>
                                                <Modal.Header style={{fontWeight: "bold", fontSize: "18px"}}>Cambia nome patologia</Modal.Header>
                                                <Modal.Body>
                                                    <label className={styles.label_style}>Nome patologia:</label>
                                                    <input onChange={nomePatologiaChangeHandler} value={nomeDaModificare} className={styles.input_style}></input>
                                                    <div className={styles.wrapper_horizontal}>
                                                        <GenericButton
                                                            onClick={() => {aggiornaNomePatologia()}}
                                                            buttonText={"Salva"}
                                                            generic_button
                                                            // small_button
                                                        ></GenericButton>
                                                        <GenericButton
                                                            onClick={() => {setIDperModificaNome(-1)}}
                                                            buttonText={"Annulla"}
                                                            generic_button
                                                            // small_button
                                                            red_styling
                                                        ></GenericButton>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>

                                        }
                                        <div style={{justifyContent: "start"}} className={styles.wrapper_horizontal}>
                                            {IDperModificaNome !== pat.patologiaID &&
                                                <GenericButton
                                                    onClick={() => {modificaNomePatologia(pat.patologiaID, pat.nomePatologia)}}
                                                    buttonText={"Modifica nome"}
                                                    generic_button
                                                    small_button
                                                ></GenericButton>
                                            }
                                            {IDperModificaNome === pat.patologiaID &&
                                            <>
                                                <GenericButton
                                                    onClick={() => {aggiornaNomePatologia()}}
                                                    buttonText={"Salva"}
                                                    generic_button
                                                    small_button
                                                ></GenericButton>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    <div style={{width: "fit-content"}} className={styles.wrapper_vertical}>
                                        <GenericAlternativeButton
                                            onClick={() => {
                                                visualizzaPatologia(pat)
                                            }}
                                            buttonText={"Mostra terapie"}
                                        >
                                        </GenericAlternativeButton>
                                        
                                        {/* <GenericAlternativeButton
                                            onClick={() => {
                                                eliminaPatologia(pat.patologiaID, pat.nomePatologia)
                                            }}
                                            buttonText={"Elimina"}
                                            colore_rosso
                                        ></GenericAlternativeButton> */}
                                    </div>
                                </div>
                                
                                
                            </Card.Body>
                        </Card>
                        }
                        </>
                        
                    ))}
                </div>
                }
                {auth_ctx.tipoAccount === "Paziente" &&
                    <TerapiePaziente></TerapiePaziente>
                }
            </div>
        </>
    );
}

export default Patologie;