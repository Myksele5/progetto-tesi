import { useContext, useState } from "react";
import GameContext from "../../context/game-context";
import styles from "./ElencoDomande.module.css";

function ElencoDomande(props){
    const game_ctx = useContext(GameContext);

    const [categoryFilter, setCategoryFilter] = useState("");
    const [imagesQuizQuestions, setImagesQuizQuestions] = useState(game_ctx.domandeDeiQuizConImmagini);
    const [classicQuizQuestions, setClassicQuizQuestions] = useState(game_ctx.domandeDeiQuiz);

    function categoryChangeHandler(event){
        changingCategoryMakesQuestionsReset();
        
        // if(event.target.value === "Personaggi Famosi"){
            setCategoryFilter(event.target.value);
            // setCategoryQuestions(game_ctx.domandeDeiQuizConImmagini);
            // setCategoryQuestions(game_ctx.domandeDeiQuizConImmagini);
            // return;
        // }
        // if(event.target.value === "Frutti"){
            // setCategoryFilter("Frutti");
            // setCategoryQuestions(game_ctx.domandeDeiQuizConImmagini);
            // setCategoryQuestions(game_ctx.domandeDeiQuizConImmaginiFrutti);
            // return;
        // }
    }

    // function filterQuestionsByCategory(item){
    //     if(categoryFilter === "Personaggi Famosi"){
    //         return item.categoria !== "Personaggi Famosi";
    //     }
    //     if(categoryFilter === "Frutti"){
    //         return item.categoria !== "Frutti";
    //     }
    // }

    function verifyIsChecked(event, domanda){
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
        }
        else{
            console.log('⛔️ Checkbox is NOT checked');
        }
        props.domandeNuovoGioco(event.target.checked, domanda);
    }

    function changingCategoryMakesQuestionsReset(){
        props.resettaDomandeNuovoGioco();
    }

    function recuperaTutteLeDomande(singleQuestion){
        if(singleQuestion.categoria === categoryFilter){
            return(
                <div className={styles.flex_list_container}>
                    <li className={styles.list_item_content}>
                        <h4>Volto da indovinare</h4>
                        <p>{singleQuestion.question.correct_answer}</p>
                    </li>
    
                    <li className={styles.list_item_content}>
                        <h4>Risposta sbagliata 1</h4>
                        <p>{singleQuestion.question.wrong_answer_n1}</p>
                    </li>
    
                    <li className={styles.list_item_content}>
                        <h4>Risposta sbagliata 2</h4>
                        <p>{singleQuestion.question.wrong_answer_n2}</p>
                    </li>
    
                    <li className={styles.list_item_content}>
                        <h4>Risposta sbagliata 3</h4>
                        <p>{singleQuestion.question.wrong_answer_n3}</p>
                    </li>
    
                    <li className={styles.list_item_content}>
                        <h4>Livello Difficoltà</h4>
                        <p>{singleQuestion.livelloDomanda}</p>
                    </li>
                    
                    <li className={styles.list_item_content}>
                        <input onChange={(event)=>{
                            verifyIsChecked(event, singleQuestion)
                        }} type="checkbox"></input>
                        <label>Inserisci nel quiz</label>
                        {/* <button>RIMUOVI</button> */}
                    </li>
                    
                </div>
            );
        }
        else{
            return null;
        }
    }

    return (
        <>
            {props.tipoGioco === "" && <p>Seleziona un tipo di gioco per visualizzare le domande</p>}
            {props.tipoGioco === "QUIZ CON IMMAGINI" && 
                <>
                    <select onChange={categoryChangeHandler}>
                        <option hidden>---SELEZIONA CATEGORIA---</option>
                        <option>Personaggi Famosi</option>
                        <option>Frutti</option>
                        {/* <option>Animali</option> */}
                    </select>
                    {categoryFilter !== "" && imagesQuizQuestions.map(recuperaTutteLeDomande)}
                    {/* {categoryFilter === "Frutti" && categoryQuestions.map(recuperaTutteLeDomande)} */}
                </>
            }
            {props.tipoGioco === "QUIZ" && 
                <>
                    <select onChange={categoryChangeHandler}>
                        <option hidden>---SELEZIONA CATEGORIA---</option>
                        <option>Geografia</option>
                        <option>Storia</option>
                    </select>
                    {categoryFilter !== "" && classicQuizQuestions.map(recuperaTutteLeDomande)}
                    {/* {categoryFilter === "Frutti" && categoryQuestions.map(recuperaTutteLeDomande)} */}
                </>
            }
        </>
    );
}

export default ElencoDomande;