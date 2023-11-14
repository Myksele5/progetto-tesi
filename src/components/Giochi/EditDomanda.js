import styles from "./EditDomanda.module.css";
import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";
import GameContext from "../../context/game-context";

function EditDomanda(props){
    const game_ctx = useContext(GameContext);

    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [categoriaDomandaModifica, setCategoriaDomandaModifica] = useState(props.categoriaDomanda);
    const [indovinaModifica, setIndovinaModifica] = useState(props.indovina);

    const [rispCorrettaModifica, setRispCorrettaModifica] = useState(props.corretta);
    const [rispSbagliata_1Modifica, setRispSbagliata_1Modifica] = useState(props.sbagliata_1);
    const [rispSbagliata_2Modifica, setRispSbagliata_2Modifica] = useState(props.sbagliata_2);
    const [rispSbagliata_3Modifica, setRispSbagliata_3Modifica] = useState(props.sbagliata_3);

    function indovinaChangeHandler(event){
        setIndovinaModifica(event.target.value);
    }

    function rispostaCorrettaChangeHandler(event){
        setRispCorrettaModifica(event.target.value)
    }

    function rispostaSbagliata_1_ChangeHandler(event){
        setRispSbagliata_1Modifica(event.target.value)
    }

    function rispostaSbagliata_2_ChangeHandler(event){
        setRispSbagliata_2Modifica(event.target.value)
    }
    
    function rispostaSbagliata_3_ChangeHandler(event){
        setRispSbagliata_3Modifica(event.target.value)
    }

    return(
        <Card
            animazione={true}
            altroStile={true}
            children={
                <div className={styles.wrapper_flex}>
                    <h1 className={styles.title_scheda}>Modifica domanda</h1>

                    <label className={styles.label_style}>Tipo di gioco</label>
                    <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>

                    <label className={styles.label_style}>Categoria domanda</label>
                    <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={categoriaDomandaModifica} readOnly></input>

                    <label className={styles.label_style}>Domanda: </label>
                    <input className={styles.textbox_style} type="text" value={indovinaModifica} onChange={indovinaChangeHandler}></input>

                    <label className={styles.label_style}>Risposta Corretta: </label>
                    <input className={styles.textbox_style} type="text" value={rispCorrettaModifica} onChange={rispostaCorrettaChangeHandler}></input>

                    <label className={styles.label_style}>Risposta Sbagliata 1: </label>
                    <input className={styles.textbox_style} type="text" value={rispSbagliata_1Modifica} onChange={rispostaSbagliata_1_ChangeHandler}></input>

                    <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                    <input className={styles.textbox_style} type="text" value={rispSbagliata_2Modifica} onChange={rispostaSbagliata_2_ChangeHandler}></input>

                    <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                    <input className={styles.textbox_style} type="text" value={rispSbagliata_3Modifica} onChange={rispostaSbagliata_3_ChangeHandler}></input>

                    <div className={styles.wrapper_generico}>
                        <GenericButton
                            onClick={() => {
                                game_ctx.salvaDomandaModificata(tipoGiocoModifica, categoriaDomandaModifica, indovinaModifica, rispCorrettaModifica, rispSbagliata_1Modifica, rispSbagliata_2Modifica, rispSbagliata_3Modifica);
                                props.chiudiFormModificaDomanda();
                            }}
                            generic_button={true}
                            buttonText={"Salva domanda"}
                        >
                        </GenericButton>

                        <GenericButton
                            onClick={props.chiudiFormModificaDomanda}
                            small_button={true}
                            buttonText={"Chiudi scheda"}
                        >
                        </GenericButton>
                    </div>
                </div>
            }
        >
        </Card>
        
    );
}

export default EditDomanda;