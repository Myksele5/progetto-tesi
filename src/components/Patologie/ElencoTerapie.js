import styles from "./ElencoTerapie.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";
import { Card } from "react-bootstrap";

function ElencoTerapie(){
    const patologies_ctx = useContext(PatologiesContext);

    const [patologia, setPatologia] = useState(patologies_ctx.patologiaSelezionata);

    const [IDterapiaDaModificare, setIDterapiaDaModificare] = useState();
    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [noteDaModificare, setNoteDaModificare] = useState("");

    const [formNuovaTerapia, setFormNuovaTerapia] = useState(false);

    useEffect(() => {
        setPatologia(patologies_ctx.patologiaSelezionata)
    }, [patologies_ctx.patologiaSelezionata])

    function editTherapy(terapiaID, terapia, note){
        setIDterapiaDaModificare(terapiaID);
        setTerapiaDaModificare(terapia);
        setNoteDaModificare(note);
    }

    function terapiaChangeHandler(event){
        setTerapiaDaModificare(event.target.value);
    }
    function noteChangeHandler(event){
        setNoteDaModificare(event.target.value);
    }

    function salvaNuovaTerapia(){
        patologies_ctx.addNewTherapy(patologia.patologiaID, terapiaDaModificare, noteDaModificare);

        setTerapiaDaModificare("");
        setNoteDaModificare("");
        setFormNuovaTerapia(false)
    }

    function salvaModifica(){
        patologies_ctx.editTherapy(IDterapiaDaModificare, terapiaDaModificare, noteDaModificare);
        setIDterapiaDaModificare();
        setTerapiaDaModificare("");
        setNoteDaModificare("");
    }

    function annullaModifica(){
        setIDterapiaDaModificare();
        setTerapiaDaModificare("");
        setNoteDaModificare("");
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
                    <div className={styles.wrapper_horizontal}>
                        <GenericButton
                            onClick={patologies_ctx.hideTherapiesList}
                            buttonText={"Chiudi elenco"}
                            generic_button
                            red_styling
                        >
                        </GenericButton>
                        <GenericButton
                            onClick={() => {
                                setFormNuovaTerapia(true);
                            }}
                            generic_button
                            buttonText={"Aggiungi Terapia"}
                        >
                        </GenericButton>
                </div>

                    <h3 className={styles.subtitle}>Terapie per: {patologia.nomePatologia}</h3>
                    <hr style={{width: "100%", border: "1px solid #163172"}}></hr>
                </>
                }

                {formNuovaTerapia && 
                <>
                    <h2 style={{textAlign: "center"}} className={styles.subtitle}>Nuova Terapia per {patologia.nomePatologia}</h2>
 
                            <>
                                <div className={styles.wrapper_vertical}>
                                    <label style={{color: "#163172"}} className={styles.wrap_content}>Inserisci terapia:</label>
                                    <textarea value={terapiaDaModificare} onChange={terapiaChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>
                                </div>
                                {/* <hr style={{width: "100%", border: "1px solid #163172"}}></hr> */}
                                <div className={styles.wrapper_vertical}>
                                    <label style={{color: "#163172"}} className={styles.wrap_content}>Inserisci note:</label>
                                    <textarea value={noteDaModificare} onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA}></textarea>
                                </div>
                                <hr style={{width: "100%", border: "1px solid #163172"}}></hr>
                                <div className={styles.wrapper_horizontal}>
                                    <GenericButton
                                        onClick={() => {
                                            setFormNuovaTerapia(false)
                                        }}
                                        buttonText={"Annulla"}
                                        red_styling
                                        generic_button
                                    ></GenericButton>
                                    <GenericButton
                                        onClick={salvaNuovaTerapia}
                                        buttonText={"Salva terapia"}
                                        generic_button
                                    ></GenericButton>
                                </div>
                                
                            </>

                </>
                }

                {patologia.terapie.length > 0 && !formNuovaTerapia &&
                    // <div className={`${styles.wrapper_vertical} ${styles.scrollable_div}`}>  
                    <>
                        {patologia.terapie.map((therapy) => (
                            <div key={therapy.terapiaID} className={styles.wrapper_horizontal}>
                                <Card className={styles.card_style}>
                                    <div className={styles.wrapper_vertical}>
                                    {IDterapiaDaModificare !== therapy.terapiaID && 
                                    <>
                                        <label className={styles.wrap_content}>Terapia consigliata:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.terapia}</h3>
                                    </>
                                    }
                                    {IDterapiaDaModificare === therapy.terapiaID &&
                                    <>
                                        <label style={{color: "#163172"}} className={styles.wrap_content}>Terapia consigliata:</label>
                                        <textarea onChange={terapiaChangeHandler} className={styles.input_style_MODIFICA_TERAPIA} value={terapiaDaModificare}></textarea>
                                    </>
                                    }
                                    </div>
                                    {/* <hr style={{width: "100%", border: "1px solid #163172"}}></hr> */}
                                    <div className={styles.wrapper_vertical}>
                                    {IDterapiaDaModificare !== therapy.terapiaID && 
                                    <>
                                        <label className={styles.wrap_content}>Note:</label>
                                        <h3 className={styles.wrap_content_TERAPIA}>{therapy.note}</h3>
                                    </>
                                    }
                                    {IDterapiaDaModificare === therapy.terapiaID &&
                                    <>
                                        <label style={{color: "#163172"}} className={styles.wrap_content}>Note:</label>
                                        <textarea onChange={noteChangeHandler} className={styles.input_style_MODIFICA_TERAPIA} value={noteDaModificare}></textarea>
                                    </>
                                    }
                                    </div>
                                    <Card.Footer>
                                        <div className={styles.wrapper_horizontal}>
                                            {IDterapiaDaModificare !== therapy.terapiaID &&
                                            <>
                                                <GenericButton
                                                    onClick={() => {
                                                        editTherapy(therapy.terapiaID, therapy.terapia, therapy.note)
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
                                            </>
                                            }
                                            {IDterapiaDaModificare === therapy.terapiaID &&
                                            <>
                                                    <GenericButton
                                                        onClick={salvaModifica}
                                                        buttonText={"Salva modifiche"}
                                                        generic_button
                                                    ></GenericButton>
                                                <GenericButton
                                                    onClick={annullaModifica}
                                                    buttonText={"Annulla"}
                                                    red_styling
                                                    generic_button
                                                ></GenericButton>
                                            </>
                                            }
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))}
                    </>
                    // </div>
                }
                {patologia.terapie.length === 0 && 
                    <h4>Non ci sono terapie salvate per questa patologia</h4>
                }
                
            {/* </div> */}
        </div>
    );
}

export default ElencoTerapie;