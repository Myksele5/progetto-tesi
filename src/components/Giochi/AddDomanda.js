import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddDomanda.module.css";
import ReactDOM from 'react-dom';
import GameContext from "../../context/game-context";
import Card from "../UI/Card";

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

    function imageFileChangeHandler(event){
        var file = event.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(file);
    }

    function gameTypeChangeHandler(event){
        setGameType(event.target.value);
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
        props.hideForm();
    }

    return(
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
                            <select className={styles.select_style} onChange={categoryQuestionChangeHandler}>
                                <option>Geografia</option>
                                <option>Storia</option>
                            </select>
                            <label className={styles.label_style}>Domanda: </label>
                            <input className={styles.textbox_style} type="text" onChange={indovinaChangeHandler}></input>
                        </>
                    }

                    {gameType === "QUIZ CON IMMAGINI" &&
                        <>
                            <select className={styles.select_style} onChange={categoryQuestionChangeHandler}>
                                <option>Personaggi Famosi</option>
                                <option>Frutti</option>
                            </select>
                            <label className={styles.label_style}>Inserisci immagine: </label>
                            <input type="file" accept="image/*" onChange={imageFileChangeHandler}></input>
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

                    <GenericButton
                        onClick={creaNuovaDomanda}
                        generic_button={true}
                        buttonText={"Salva domanda"}
                    >
                    </GenericButton>

                    <GenericButton
                        onClick={props.hideForm}
                        small_button={true}
                        buttonText={"Chiudi scheda"}
                    >
                    </GenericButton>
                </div>
            }
        >
        </Card>
        
    );
}

export default AddDomanda;