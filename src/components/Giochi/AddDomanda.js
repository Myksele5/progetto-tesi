import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddDomanda.module.css";
import GameContext from "../../context/game-context";
import Card from "../UI/Card";
import ElencoDomande from "./ElencoDomande";
import ElencoDomandeModificabili from "./ElencoDomandeModificabili";

function AddDomanda(props){
    const game_ctx = useContext(GameContext)

    const [imageFile, setImageFile] = useState(null);
    const [gameType, setGameType] = useState("QUIZ");
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [indovina, setIndovina] = useState("");
    const [rispCorretta, setRispCorretta] = useState("");
    const [rispSbagliata_1, setRispSbagliata_1] = useState("");
    const [rispSbagliata_2, setRispSbagliata_2] = useState("");
    const [rispSbagliata_3, setRispSbagliata_3] = useState("");

    const [showQuestionsList, setShowQuestionsList] = useState(true);
    const [aggiungiCategoria, setAggiungiCategoria] = useState(false);

    var categorie = game_ctx.recuperaCategorieDomande(gameType);

    function imageFileChangeHandler(event){
        var file = event.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(file);
    }

    function gameTypeChangeHandler(event){
        setGameType(event.target.value);
        setAggiungiCategoria(false);
    }

    function categoryQuestionChangeHandler(event){
        setCategoryQuestion(event.target.value);
    }

    function indovinaChangeHandler(event){
        setIndovina(event.target.value);
    }

    function rispostaCorrettaChangeHandler(event){
        setRispCorretta(event.target.value)
    }

    function rispostaSbagliata_1_ChangeHandler(event){
        setRispSbagliata_1(event.target.value)
    }

    function rispostaSbagliata_2_ChangeHandler(event){
        setRispSbagliata_2(event.target.value)
    }
    
    function rispostaSbagliata_3_ChangeHandler(event){
        setRispSbagliata_3(event.target.value)
    }

    function categoriaCheckbox(event){
        if(event.target.checked){
            setAggiungiCategoria(true);
        }
        else{
            setAggiungiCategoria(false);
        }
    }

    function mappaCategorie(categoria){
        return (
            <option>
                {categoria}
            </option>
        );
    }
    
    function creaNuovaDomanda(){
        var new_question;

        if(gameType === "QUIZ"){
            new_question = {
                livelloDomanda: "facile",
                categoria: categoryQuestion,
                indovina: indovina,
                question: {
                    correct_answer: rispCorretta,
                    wrong_answer_n1: rispSbagliata_1,
                    wrong_answer_n2: rispSbagliata_2,
                    wrong_answer_n3: rispSbagliata_3
                }
            }
        }

        if(gameType === "QUIZ CON IMMAGINI"){
            new_question = {
                livelloDomanda: "facile",
                categoria: categoryQuestion,
                indovina: imageFile,
                question: {
                    correct_answer: rispCorretta,
                    wrong_answer_n1: rispSbagliata_1,
                    wrong_answer_n2: rispSbagliata_2,
                    wrong_answer_n3: rispSbagliata_3
                }
            }
        }

        props.aggiornaDomande(new_question, gameType);
        props.chiudiFormNuovaDomanda();
    }

    function mostraFormModificaDomanda(tipoGioco, singleQuestion){
        props.mostraModificaDomanda(tipoGioco, singleQuestion);
    }

    return(
        <>
            {showQuestionsList &&
                <>
                    <GenericButton
                        onClick={() => {
                            setShowQuestionsList(false);
                        }}
                        generic_button={true}
                        buttonText={"Aggiungi nuova domanda"}
                    >
                    </GenericButton>
                    <ElencoDomandeModificabili
                        modificaSingolaDomanda={mostraFormModificaDomanda}
                    >
                    </ElencoDomandeModificabili>
                </>
            }
            {!showQuestionsList &&
                <>
                    <Card
                        animazione={true}
                        altroStile={true}
                        children={
                            <div className={styles.wrapper_flex}>
                                <h1 className={styles.title_scheda}>Aggiungi nuova domanda</h1>

                                <label className={styles.label_style}>Tipo di gioco</label>
                                <select className={styles.select_style} onChange={gameTypeChangeHandler}>
                                    <option>QUIZ</option>
                                    <option>QUIZ CON IMMAGINI</option>
                                    <option>COMPLETA LA PAROLA</option>
                                    <option>RIFLESSI</option>
                                </select>

                                <label className={styles.label_style}>Categoria domanda</label>
                                

                                {gameType === "QUIZ" &&
                                    <>
                                        {!aggiungiCategoria &&
                                            <>
                                                <select className={styles.select_style} onChange={categoryQuestionChangeHandler}>
                                                    <option hidden>---SELEZIONA CATEGORIA---</option>
                                                    {categorie.map(mappaCategorie)}
                                                </select>
                                            </>
                                        }
                                        {aggiungiCategoria &&
                                            <>
                                                <input className={styles.textbox_style} type="text" onChange={categoryQuestionChangeHandler}></input> 
                                            </>
                                        }

                                        <div className={styles.horizontal_flex}>
                                            <input className={styles.horizontal_flex_content} type="checkbox" onChange={categoriaCheckbox}></input>
                                            <label className={styles.horizontal_flex_content}>Aggiungi nuova categoria</label>
                                        </div>
                                        
                                        
                                        <label className={styles.label_style}>Domanda: </label>
                                        <input className={styles.textbox_style} type="text" onChange={indovinaChangeHandler}></input>
                                    </>
                                }

                                {gameType === "QUIZ CON IMMAGINI" &&
                                    <>
                                        {!aggiungiCategoria &&
                                            <>
                                                <select className={styles.select_style} onChange={categoryQuestionChangeHandler}>
                                                    <option hidden>---SELEZIONA CATEGORIA---</option>
                                                    {categorie.map(mappaCategorie)}
                                                </select>
                                            </>
                                        }
                                        {aggiungiCategoria &&
                                            <>
                                                <input className={styles.textbox_style} type="text" onChange={categoryQuestionChangeHandler}></input> 
                                            </>
                                        }

                                        <div className={styles.horizontal_flex}>
                                            <input className={styles.horizontal_flex_content} type="checkbox" onChange={categoriaCheckbox}></input>
                                            <label className={styles.horizontal_flex_content}>Aggiungi nuova categoria</label>
                                        </div>
                                        
                                        <label className={styles.label_style}>Inserisci immagine: </label>
                                        <input type="file" accept="image/*" onChange={imageFileChangeHandler}></input>
                                        <img className={styles.preview_image} src={imageFile}></img>
                                    </>
                                }
                                

                                <label className={styles.label_style}>Risposta Corretta: </label>
                                <input className={styles.textbox_style} type="text" onChange={rispostaCorrettaChangeHandler}></input>

                                <label className={styles.label_style}>Risposta Sbagliata 1: </label>
                                <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_1_ChangeHandler}></input>

                                <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                                <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_2_ChangeHandler}></input>

                                <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                                <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_3_ChangeHandler}></input>

                                <div className={styles.wrapper_generico}>
                                    <GenericButton
                                        onClick={creaNuovaDomanda}
                                        generic_button={true}
                                        buttonText={"Salva domanda"}
                                    >
                                    </GenericButton>

                                    <GenericButton
                                        onClick={props.chiudiFormNuovaDomanda}
                                        small_button={true}
                                        buttonText={"Chiudi scheda"}
                                    >
                                    </GenericButton>
                                </div>
                            </div>
                        }
                    >
                    </Card>
                    <GenericButton
                        onClick={() => {
                            setShowQuestionsList(true);
                        }}
                        generic_button={true}
                        buttonText={"Visualizza tutte le domande"}
                    >
                    </GenericButton>
                </>
            }
            
            
        </>
    );
}

export default AddDomanda;