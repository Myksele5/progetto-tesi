import styles from "./ElencoTerapie.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";
import { Card, Modal } from "react-bootstrap";

function ElencoTerapie(){
    const patologies_ctx = useContext(PatologiesContext);

    const [patologia, setPatologia] = useState(patologies_ctx.patologiaSelezionata);

    const [modaleModificaTerapia, setModaleModificaTerapia] = useState(false);
    const [IDterapiaDaModificare, setIDterapiaDaModificare] = useState();
    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [validTerapia, setValidTerapia] = useState(true);
    const [noteDaModificare, setNoteDaModificare] = useState("");
    const [dataInizioDaModificare, setDataInizioDaModificare] = useState("");
    const [dataFineDaModificare, setDataFineDaModificare] = useState("");

    const [formNuovaTerapia, setFormNuovaTerapia] = useState(false);

    useEffect(() => {
        setPatologia(patologies_ctx.patologiaSelezionata)
    }, [patologies_ctx.patologiaSelezionata])

    function editTherapy(terapiaID, terapia, note, dataInizio, dataFine){
        setModaleModificaTerapia(true);
        setIDterapiaDaModificare(terapiaID);
        setTerapiaDaModificare(terapia);
        setNoteDaModificare(note);
        setDataInizioDaModificare(dataInizio);
        setDataFineDaModificare(dataFine);
    }

    function terapiaChangeHandler(event){
        setTerapiaDaModificare(event.target.value);
        setValidTerapia(true)
    }
    function noteChangeHandler(event){
        setNoteDaModificare(event.target.value);
    }

    function dataInizioChangeHandler(event){
        console.log(event.target.value)
        setDataInizioDaModificare(event.target.value)
    }
    function dataFineChangeHandler(event){
        setDataFineDaModificare(event.target.value)
    }

    function salvaModifica(){
        if(terapiaDaModificare.length > 3){
            console.log(dataInizioDaModificare)
            patologies_ctx.editTherapy(IDterapiaDaModificare, terapiaDaModificare, noteDaModificare, dataInizioDaModificare, dataFineDaModificare);
            setIDterapiaDaModificare();
            setTerapiaDaModificare("");
            setNoteDaModificare("");
            setDataInizioDaModificare("");
            setDataFineDaModificare("");
        }
        else{
            setValidTerapia(false);
        }
    }

    function annullaModifica(){
        setIDterapiaDaModificare();
        setTerapiaDaModificare("");
        setNoteDaModificare("");
        setDataInizioDaModificare("")
        setDataFineDaModificare("")
    }

    function deleteTherapy(terapiaID){
        patologies_ctx.confirmDeleteTherapy(terapiaID)
    }

    return(
        <div style={{width: "80%"}}>
            {patologies_ctx.showModale && patologies_ctx.modale}


            {/* <div key={patologia.patologiaID} className={styles.wrapper_vertical}> */}
                {!formNuovaTerapia &&
                <>
                    <div style={{position: "sticky", top:"0", zIndex: "1000"}} className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={patologies_ctx.hideTherapiesList}
                            buttonText={"Chiudi elenco"}
                            generic_button
                            red_styling
                        >
                        </GenericButton>
                    </div>

                    <h3 className={styles.subtitle}>Terapie per: {patologia.nomePatologia}</h3>
                    <hr style={{width: "100%", border: "1px solid #163172"}}></hr>
                </>
                } 

                {patologia.terapie?.length > 0 &&
                    // <div className={`${styles.wrapper_vertical} ${styles.scrollable_div}`}>  
                    <>
                        {patologia.terapie.map((therapy) => (
                            <div key={therapy.terapiaID} className={styles.wrapper_horizontal}>
                                <Card className={styles.card_style}>
                                    <div className={styles.wrapper_vertical}>
                                        <label className={styles.wrap_content}>Terapia:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.terapia}</h3>
                                    </div>
                                    <div className={styles.wrapper_vertical}>
                                        <label className={styles.wrap_content}>Note:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.note}</h3>
                                        <label className={styles.wrap_content}>Data inizio terapia:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.dataInizio ? therapy.dataInizio : "N.D"}</h3>
                                        <label className={styles.wrap_content}>Data fine terapia:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.dataFine ? therapy.dataFine : "N.D"}</h3>
                                        <label className={styles.wrap_content}>Assegnata a:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.nomePaziente} {therapy.cognomePaziente}</h3>
                                    </div>
                                    <Card.Footer>
                                        <div className={styles.wrapper_horizontal}>
                                            <GenericButton
                                                onClick={() => {
                                                    editTherapy(therapy.terapiaID, therapy.terapia, therapy.note, therapy.dataInizio, therapy.dataFine)
                                                }}
                                                generic_button
                                                buttonText={"Modifica"}
                                            ></GenericButton>
                                            <GenericButton
                                                onClick={() => {
                                                    deleteTherapy(therapy.terapiaID)
                                                }}
                                                generic_button
                                                red_styling
                                                buttonText={"Elimina"}
                                            ></GenericButton>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </>
                    // </div>
                }
                <Modal size="lg" centered show={modaleModificaTerapia} className={styles.label_style}>
                    <Modal.Header className={styles.text_subtitle}>Modifica terapia</Modal.Header>
                    <Modal.Body>
                        <label className={`${styles.label_style} ${!validTerapia ? styles.invalid : ""}`}>Terapia:</label>
                        <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={`${styles.input_style_MODIFICA_TERAPIA} ${!validTerapia ? styles.invalid : ""}`}></textarea>
                        {!validTerapia && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una terapia valida. {"(min. 4 caratteri)"}</div>}

                        <label className={styles.label_style}>Note:</label>
                        <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>

                        <label className={styles.label_style}>Data inizio</label>
                        <input value={dataInizioDaModificare} onChange={dataInizioChangeHandler} className={styles.input_style} type="date"></input>

                        <label className={styles.label_style}>Data fine</label>
                        <input value={dataFineDaModificare} onChange={dataFineChangeHandler} min={dataInizioDaModificare} className={styles.input_style} type="date"></input>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <GenericButton
                            onClick={() => {
                                if(terapiaDaModificare.length > 3){
                                    setModaleModificaTerapia(false)
                                    salvaModifica();
                                }
                                else{
                                    setValidTerapia(false)
                                }
                            }}
                            generic_button={true}
                            // red_styling
                            buttonText="Aggiorna"
                        >
                        </GenericButton>
                        <GenericButton
                            onClick={() => {setModaleModificaTerapia(false)}}
                            generic_button={true}
                            red_styling
                            buttonText="Chiudi"
                        >
                        </GenericButton>
                    </Modal.Footer>
                </Modal>
                {patologia.terapie?.length === 0 && 
                    <h4>Non ci sono terapie salvate per questa patologia</h4>
                }
                
            {/* </div> */}
        </div>
    );
}

export default ElencoTerapie;