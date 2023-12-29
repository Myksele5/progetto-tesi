import styles from "./EditDomanda.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import Card from "../UI/Card";
import GameContext from "../../context/game-context";

var counter_CORRETTE;
var counter_SBAGLIATE;

function EditDomanda(props){
    const game_ctx = useContext(GameContext);

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(props.count_corrette);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(props.count_sbagliate);

    const [imageFile, setImageFile] = useState(props.immagine);
    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [categoriaDomandaModifica, setCategoriaDomandaModifica] = useState(props.categoriaDomanda);
    const [indovinaModifica, setIndovinaModifica] = useState(props.indovina);
    const [ID, setID] = useState(props.id);

    const [rispCorretta_1Modifica, setRispCorretta_1Modifica] = useState(props.corrette.correct_answer_n1);
    const [rispCorretta_2Modifica, setRispCorretta_2Modifica] = useState(props.corrette.correct_answer_n2);
    const [rispCorretta_3Modifica, setRispCorretta_3Modifica] = useState(props.corrette.correct_answer_n3);
    const [rispCorretta_4Modifica, setRispCorretta_4Modifica] = useState(props.corrette.correct_answer_n4);
    const [rispSbagliata_1Modifica, setRispSbagliata_1Modifica] = useState(props.sbagliate.wrong_answer_n1);
    const [rispSbagliata_2Modifica, setRispSbagliata_2Modifica] = useState(props.sbagliate.wrong_answer_n2);
    const [rispSbagliata_3Modifica, setRispSbagliata_3Modifica] = useState(props.sbagliate.wrong_answer_n3);
    const [rispSbagliata_4Modifica, setRispSbagliata_4Modifica] = useState(props.sbagliate.wrong_answer_n4);

    useEffect(() => {
        counter_CORRETTE = props.count_corrette;
        counter_SBAGLIATE = props.count_sbagliate;
    }, []);

    function imageFileChangeHandler(event){
        var file = event.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(file);
    }

    function indovinaChangeHandler(event){
        setIndovinaModifica(event.target.value);
    }

    function rispostaCorretta_1_ChangeHandler(event){
        setRispCorretta_1Modifica(event.target.value)
    }
    function rispostaCorretta_2_ChangeHandler(event){
        setRispCorretta_2Modifica(event.target.value)
    }
    function rispostaCorretta_3_ChangeHandler(event){
        setRispCorretta_3Modifica(event.target.value)
    }
    function rispostaCorretta_4_ChangeHandler(event){
        setRispCorretta_4Modifica(event.target.value)
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
    function rispostaSbagliata_4_ChangeHandler(event){
        setRispSbagliata_4Modifica(event.target.value)
    }

    function aggiungiAlternativaCorretta(){
        if(totalAnswers_CORRECT < 4){
            counter_CORRETTE += 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
        console.log(counter_CORRETTE);
    }

    function rimuoviAlternativaCorretta(){
        if(totalAnswers_CORRECT > 1){
            counter_CORRETTE -= 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
        console.log(counter_CORRETTE);
    }

    function aggiungiAlternativaSbagliata(){
        if(totalAnswers_WRONG < 4){
            counter_SBAGLIATE += 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
        console.log(counter_SBAGLIATE);
    }

    function rimuoviAlternativaSbagliata(){
        if(totalAnswers_WRONG > 1){
            counter_SBAGLIATE -= 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
        console.log(counter_SBAGLIATE);
    }

    function salvaDomanda(){
        var modified_question;
        var risposteCORRETTE;
        var risposteSBAGLIATE;

        if(tipoGiocoModifica === "QUIZ" || tipoGiocoModifica === "QUIZ CON IMMAGINI"){
            risposteCORRETTE = {
                correct_answer_n1: rispCorretta_1Modifica
            }
            risposteSBAGLIATE = {
                wrong_answer_n1: rispSbagliata_1Modifica
            }

            if(typeof rispCorretta_2Modifica !== undefined && totalAnswers_CORRECT === 2){
                risposteCORRETTE = {
                    correct_answer_n1: rispCorretta_1Modifica,
                    correct_answer_n2: rispCorretta_2Modifica
                }
            }
            if(rispCorretta_3Modifica !== undefined && totalAnswers_CORRECT === 3){
                risposteCORRETTE = {
                    correct_answer_n1: rispCorretta_1Modifica,
                    correct_answer_n2: rispCorretta_2Modifica,
                    correct_answer_n3: rispCorretta_3Modifica
                }
            }
            if(rispCorretta_4Modifica !== undefined && totalAnswers_CORRECT === 4){
                risposteCORRETTE = {
                    correct_answer_n1: rispCorretta_1Modifica,
                    correct_answer_n2: rispCorretta_2Modifica,
                    correct_answer_n3: rispCorretta_3Modifica,
                    correct_answer_n4: rispCorretta_4Modifica
                }
            }
            if(rispSbagliata_2Modifica !== undefined && totalAnswers_WRONG === 2){
                risposteSBAGLIATE = {
                    wrong_answer_n1: rispSbagliata_1Modifica,
                    wrong_answer_n2: rispSbagliata_2Modifica
                }
            }
            if(rispSbagliata_3Modifica !== undefined && totalAnswers_WRONG === 3){
                risposteSBAGLIATE = {
                    wrong_answer_n1: rispSbagliata_1Modifica,
                    wrong_answer_n2: rispSbagliata_2Modifica,
                    wrong_answer_n3: rispSbagliata_3Modifica
                }
            }
            if(rispSbagliata_4Modifica !== undefined && totalAnswers_WRONG === 4){
                risposteSBAGLIATE = {
                    wrong_answer_n1: rispSbagliata_1Modifica,
                    wrong_answer_n2: rispSbagliata_2Modifica,
                    wrong_answer_n3: rispSbagliata_3Modifica,
                    wrong_answer_n4: rispSbagliata_4Modifica,
                }
            }

            modified_question = {
                categoria: categoriaDomandaModifica,
                indovina: indovinaModifica,
                rispCorrette: risposteCORRETTE,
                rispSbagliate: risposteSBAGLIATE
            }
        }

        if(tipoGiocoModifica === "COMPLETA LA PAROLA"){
            modified_question = {
                categoria: categoriaDomandaModifica,
                indovina: indovinaModifica.toUpperCase()
            }
        }

        game_ctx.salvaDomandaModificata(tipoGiocoModifica, modified_question, ID);
        props.chiudiFormModificaDomanda();
    }

    return(
        <Card
            animazione={true}
            altroStile={true}
            children={
                <div className={styles.wrapper_flex}>
                    <h1 className={styles.title_scheda}>Modifica domanda</h1>

                    <div className={styles.wrapper_label_and_box}>
                        <div className={styles.wrapper_items}>
                            <label className={styles.label_style}>Tipo di gioco</label>
                            <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>
                        </div>
                        <div className={styles.wrapper_items}>
                            <label className={styles.label_style}>Categoria domanda</label>
                            <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={categoriaDomandaModifica} readOnly></input>
                        </div>
                        
                    </div>

                    {tipoGiocoModifica === "QUIZ" && 
                        <>
                            <label className={styles.label_style}>Domanda: </label>
                            <input className={styles.textbox_style} type="text" value={indovinaModifica} onChange={indovinaChangeHandler}></input>
                        </>
                    }

                    {tipoGiocoModifica === "QUIZ CON IMMAGINI" && 
                        <>
                            <label className={styles.label_style}>Immagine: </label>
                            <input type="file" accept="image/*" onChange={imageFileChangeHandler}></input>
                            <img className={styles.preview_image} src={imageFile}></img>
                            <label className={styles.label_style}>Inserisci nome immagine: </label>
                            <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={indovinaModifica} onChange={indovinaChangeHandler} readOnly></input>
                        </>
                    }

                    {tipoGiocoModifica === "COMPLETA LA PAROLA" && 
                        <>
                            <label className={styles.label_style}>Parola da indovinare: </label>
                            <input className={styles.textbox_style} type="text" value={indovinaModifica} onChange={indovinaChangeHandler}></input>
                        </>
                    }

                    {(tipoGiocoModifica === "QUIZ" || tipoGiocoModifica === "QUIZ CON IMMAGINI") &&
                        <>
                            <div className={styles.wrapper_generico}>
                                <div className={styles.wrapper_items}>
                                    <label className={styles.label_style}>Risposta Corretta: </label>
                                    <input className={styles.textbox_style} type="text" value={rispCorretta_1Modifica} onChange={rispostaCorretta_1_ChangeHandler}></input>

                                    {totalAnswers_CORRECT > 1 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta: </label>
                                            <input className={styles.textbox_style} type="text" value={rispCorretta_2Modifica} onChange={rispostaCorretta_2_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_CORRECT > 2 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta: </label>
                                            <input className={styles.textbox_style} type="text" value={rispCorretta_3Modifica} onChange={rispostaCorretta_3_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_CORRECT > 3 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta: </label>
                                            <input className={styles.textbox_style} type="text" value={rispCorretta_4Modifica} onChange={rispostaCorretta_4_ChangeHandler}></input>
                                        </>
                                    }

                                    <div className={styles.wrapper_generico}>
                                        <GenericAlternativeButton
                                            onClick={aggiungiAlternativaCorretta}
                                            buttonText={"Aggiungi corretta"}
                                        >
                                        </GenericAlternativeButton>
                                        <GenericAlternativeButton
                                            onClick={rimuoviAlternativaCorretta}
                                            colore_rosso={true}
                                            buttonText={"Rimuovi corretta"}
                                        >
                                        </GenericAlternativeButton>
                                    </div>
                                    
                                </div>

                                <div className={styles.wrapper_items}>
                                    <label className={styles.label_style}>Risposta Sbagliata 1: </label>
                                    <input className={styles.textbox_style} type="text" value={rispSbagliata_1Modifica} onChange={rispostaSbagliata_1_ChangeHandler}></input>

                                    {totalAnswers_WRONG > 1 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                                            <input className={styles.textbox_style} type="text" value={rispSbagliata_2Modifica} onChange={rispostaSbagliata_2_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_WRONG > 2 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                                            <input className={styles.textbox_style} type="text" value={rispSbagliata_3Modifica} onChange={rispostaSbagliata_3_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_WRONG > 3 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 4: </label>
                                            <input className={styles.textbox_style} type="text" value={rispSbagliata_4Modifica} onChange={rispostaSbagliata_4_ChangeHandler}></input>
                                        </>
                                    }

                                    <div className={styles.wrapper_generico}>
                                        <GenericAlternativeButton
                                            onClick={aggiungiAlternativaSbagliata}
                                            buttonText={"Aggiungi sbagliata"}
                                        >
                                        </GenericAlternativeButton>
                                        <GenericAlternativeButton
                                            onClick={rimuoviAlternativaSbagliata}
                                            colore_rosso={true}
                                            buttonText={"Rimuovi sbagliata"}
                                        >
                                        </GenericAlternativeButton>
                                    </div>
                                    
                                </div>  
                            </div>
                        </>
                    }

                    <div className={styles.wrapper_generico}>
                        <GenericButton
                            onClick={salvaDomanda}
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