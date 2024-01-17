import styles from "./EditDomanda.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import Card from "../UI/Card";
import GameContext from "../../context/game-context";
import axios from "axios";

var counter_CORRETTE = 1;
var counter_SBAGLIATE = 1;
var image;
var file;

function EditDomanda(props){
    const game_ctx = useContext(GameContext);
    const websiteUrl = "http://myks.altervista.org/uploads/";

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(1);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(1);

    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [categoriaDomandaModifica, setCategoriaDomandaModifica] = useState(props.categoriaDomanda);
    const [domandaModifica, setDomandaModifica] = useState(props.domanda);
    const [ID, setID] = useState(props.ID);

    const [rispCorretta_1Modifica, setRispCorretta_1Modifica] = useState(props.correttaN1);
    const [rispCorretta_2Modifica, setRispCorretta_2Modifica] = useState(props.correttaN2);
    const [rispCorretta_3Modifica, setRispCorretta_3Modifica] = useState(props.correttaN3);
    const [rispCorretta_4Modifica, setRispCorretta_4Modifica] = useState(props.correttaN4);
    const [rispSbagliata_1Modifica, setRispSbagliata_1Modifica] = useState(props.sbagliataN1);
    const [rispSbagliata_2Modifica, setRispSbagliata_2Modifica] = useState(props.sbagliataN2);
    const [rispSbagliata_3Modifica, setRispSbagliata_3Modifica] = useState(props.sbagliataN3);
    const [rispSbagliata_4Modifica, setRispSbagliata_4Modifica] = useState(props.sbagliataN4);

    const [imageFile, setImageFile] = useState(websiteUrl.concat(props.immagine));
    const [myFile, setMyFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [flagUpload, setFlagUpload] = useState(1);

    useEffect(() => {
        console.log(myFile);
    }, []);

    function selectFile() {
        image = document.getElementById("mfile").click();
        // setImageFile(image.files[0]);
        // console.log(image);
    }
    function setFile(e) {
        setMyFile(e.target.files[0]);
        console.log(e.target.files[0].name);
        if(e.target.files.length > 0){
            setImageFile(URL.createObjectURL(e.target.files[0]));
        }
        // setImageFile(URL.createObjectURL(e.target.files[0]));
        setFlagUpload((prevState) => (prevState + 1))
    }
    function uploadFile(){
        const url="http://myks.altervista.org/provaScript.php"
        const data = new FormData();
        data.append("file", myFile);
        axios.post(url, data).then(response => setMsg(response.data)).catch(error => setMsg(error))
    }

    function uploadImage(){
        if(flagUpload !== 1){
            uploadFile();
        }
        else{
            alert("Si è verificato un errore! Riprova tra qualche minuto");
        }
    }

    useEffect(() => {
        counter_CORRETTE = 1;
        counter_SBAGLIATE = 1;
        if(rispCorretta_2Modifica.trim().length > 0){
            counter_CORRETTE += 1;
        }
        if(rispCorretta_3Modifica.trim().length > 0){
            counter_CORRETTE += 1;
        }
        if(rispCorretta_4Modifica.trim().length > 0){
            counter_CORRETTE += 1;
        }
        if(rispSbagliata_2Modifica.trim().length > 0){
            counter_SBAGLIATE += 1;
        }
        if(rispSbagliata_3Modifica.trim().length > 0){
            counter_SBAGLIATE += 1;
        }
        if(rispSbagliata_4Modifica.trim().length > 0){
            counter_SBAGLIATE += 1;
        }

        setTotalAnswers_CORRECT(counter_CORRETTE);
        setTotalAnswers_WRONG(counter_SBAGLIATE);
        // counter_CORRETTE = props.count_corrette;
        // counter_SBAGLIATE = props.count_sbagliate;
    }, []);

    function imageFileChangeHandler(event){
        file = event.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(props.immagine);
        console.log(file);
        console.log(imageFile);
        console.log(props.immagine === imageFile);
        // console.log(file);
    }

    function domandaChangeHandler(event){
        setDomandaModifica(event.target.value);
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
        var correct_answers = {
            correct_answer_n1: rispCorretta_1Modifica,
        };

        var wrong_answers = {
            wrong_answer_n1: rispSbagliata_1Modifica,
        };

        if(rispCorretta_2Modifica.trim().length > 0){
            correct_answers["correct_answer_n2"] = rispCorretta_2Modifica;
        }
        else{
            correct_answers["correct_answer_n2"] = "";
        }
        if(rispCorretta_3Modifica.trim().length > 0){
            correct_answers["correct_answer_n3"] = rispCorretta_3Modifica;
        }
        else{
            correct_answers["correct_answer_n3"] = "";
        }
        if(rispCorretta_4Modifica.trim().length > 0){
            correct_answers["correct_answer_n4"] = rispCorretta_4Modifica;
        }
        else{
            correct_answers["correct_answer_n4"] = "";
        }

        if(rispSbagliata_2Modifica.trim().length > 0){
            wrong_answers["wrong_answer_n2"] = rispSbagliata_2Modifica;
        }
        else{
            wrong_answers["wrong_answer_n2"] = "";
        }
        if(rispSbagliata_3Modifica.trim().length > 0){
            wrong_answers["wrong_answer_n3"] = rispSbagliata_3Modifica;
        }
        else{
            wrong_answers["wrong_answer_n3"] = "";
        }
        if(rispSbagliata_4Modifica.trim().length > 0){
            wrong_answers["wrong_answer_n4"] = rispSbagliata_4Modifica;
        }
        else{
            wrong_answers["wrong_answer_n4"] = "";
        }

        if(tipoGiocoModifica === "QUIZ"){
            modified_question = {
                domanda: domandaModifica,
                rispCorrette: correct_answers,
                rispSbagliate: wrong_answers,
                ID: ID
            }
        }

        if(tipoGiocoModifica === "QUIZ CON IMMAGINI"){
            var qualeImg;

            if(!myFile){
                qualeImg = props.immagine;
            }
            else{
                qualeImg = myFile.name;
            }
            modified_question = {
                domanda: domandaModifica,
                rispCorrette: correct_answers,
                rispSbagliate: wrong_answers,
                immagine: qualeImg,
                ID: ID
            }

            uploadImage();

        }

        if(tipoGiocoModifica === "COMPLETA LA PAROLA"){
            modified_question = {
                domanda: domandaModifica.toUpperCase(),
                rispCorrette: correct_answers,
                rispSbagliate: wrong_answers,
                ID: ID
            }
        }

        game_ctx.salvaDomandaModificata(modified_question, ID);
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
                            <input className={styles.textbox_style} type="text" value={domandaModifica} onChange={domandaChangeHandler}></input>
                        </>
                    }

                    {tipoGiocoModifica === "QUIZ CON IMMAGINI" && 
                        <>
                            <input type="file" name="mfile" id="mfile" onChange={setFile} style={{display: 'none'}}></input>
                            <button onClick={selectFile}>{"Select file"}</button>
                            <img className={styles.preview_image} src={imageFile}></img>
                            <label className={styles.label_style}>Domanda: </label>
                            <input className={styles.textbox_style} type="text" value={domandaModifica} onChange={domandaChangeHandler}></input>
                        </>
                    }

                    {tipoGiocoModifica === "COMPLETA LA PAROLA" && 
                        <>
                            <label className={styles.label_style}>Parola da indovinare: </label>
                            <input className={styles.textbox_style} type="text" value={domandaModifica} onChange={domandaChangeHandler}></input>
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