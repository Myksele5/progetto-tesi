import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddDomanda.module.css";
import ReactDOM from 'react-dom';
import GameContext from "../../context/game-context";

function AddDomandaToPort(props){
    const game_ctx = useContext(GameContext)

    const [gameType, setGameType] = useState("");
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [indovina, setIndovina] = useState("");
    const [rispCorretta, setRispCorretta] = useState("");
    const [rispSbagliata_1, setRispSbagliata_1] = useState("");
    const [rispSbagliata_2, setRispSbagliata_2] = useState("");
    const [rispSbagliata_3, setRispSbagliata_3] = useState("");

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
        var new_question = {
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

        props.aggiornaDomande(new_question);
        props.hideForm();
    }

    return(
        <div className={styles.background_wrapper}>
            <div className={styles.wrapper_flex}>
                <label>Tipo di gioco</label>
                <select onChange={gameTypeChangeHandler}>
                    <option>QUIZ</option>
                    <option>QUIZ CON IMMAGINI</option>
                    <option>COMPLETA LA PAROLA</option>
                    <option>RIFLESSI</option>
                </select>

                <label>Categoria domanda</label>
                <select onChange={categoryQuestionChangeHandler}>
                    <option>Geografia</option>
                    <option>Storia</option>
                </select>

                <label>Domanda: </label>
                <input type="text" onChange={indovinaChangeHandler}></input>

                <label>Risposta Corretta: </label>
                <input type="text" onChange={rispostaCorrettaChangeHandler}></input>

                <label>Risposta Sbagliata 1: </label>
                <input type="text" onChange={rispostaSbagliata_1_ChangeHandler}></input>

                <label>Risposta Sbagliata 2: </label>
                <input type="text" onChange={rispostaSbagliata_2_ChangeHandler}></input>

                <label>Risposta Sbagliata 3: </label>
                <input type="text" onChange={rispostaSbagliata_3_ChangeHandler}></input>

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
        </div>
    );
}

function AddDomanda(props){
    return(
        <>
            {ReactDOM.createPortal(
                <AddDomandaToPort
                    hideForm={props.hideForm}
                    aggiornaDomande={props.aggiornaDomande}
                >
                </AddDomandaToPort>, document.getElementById('add_domanda'))}
        </>
        
    );
}

export default AddDomanda;