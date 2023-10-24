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
                <li className={styles.LIST_ITEM_STYLE}>

                    {props.tipoGioco === "QUIZ" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.indovina}</p>
                        </div>
                    }

                    {props.tipoGioco === "QUIZ CON IMMAGINI" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Immagine:</h4>
                            <p className={styles.question_style}>{singleQuestion.question.correct_answer}</p>
                        </div>
                    }
                    

                    <div className={styles.flex_list_container}>
                        <h4 className={styles.subtitle_style}>Risposte:</h4>

                        <div className={styles.separa_corrette_sbagliate}>
                            <span className={styles.buttons_space}>
                                <p>CORRETTA</p>
                                <p className={styles.correct_answ}>{singleQuestion.question.correct_answer}</p>
                            </span>
                            
                            <span className={styles.buttons_space}>
                                <p>SBAGLIATE</p>
                                <p className={styles.wrong_answ}>{singleQuestion.question.wrong_answer_n1}</p>
                                <p className={styles.wrong_answ}>{singleQuestion.question.wrong_answer_n2}</p>
                                <p className={styles.wrong_answ}>{singleQuestion.question.wrong_answer_n3}</p>
                            </span>
                        </div>
                    </div>

                    <div className={styles.flex_list_container}>
                        <h4 className={styles.subtitle_style}>Inserisci nel quiz:</h4>
                        <input className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                            verifyIsChecked(event, singleQuestion)
                            }}
                        >
                        </input>
                    </div>

                </li>
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
                    <h3 className={styles.domande_disponibili}>Domande disponibili:</h3>
                    <select className={styles.select_style} onChange={categoryChangeHandler}>
                        <option hidden>---SELEZIONA CATEGORIA---</option>
                        <option>Personaggi Famosi</option>
                        <option>Frutti</option>
                        {/* <option>Animali</option> */}
                    </select>
                    {
                        <ul className={styles.wrapper_lista_domande}>
                            {categoryFilter !== "" && imagesQuizQuestions.map(recuperaTutteLeDomande)}
                        </ul>
                    }
                    {/* {categoryFilter === "Frutti" && categoryQuestions.map(recuperaTutteLeDomande)} */}
                </>
            }
            {props.tipoGioco === "QUIZ" && 
                <>
                    <h3 className={styles.domande_disponibili}>Domande disponibili:</h3>
                    <select className={styles.select_style} onChange={categoryChangeHandler}>
                        <option hidden>---SELEZIONA CATEGORIA---</option>
                        <option>Geografia</option>
                        <option>Storia</option>
                    </select>
                    {
                        <ul className={styles.wrapper_lista_domande}>
                            {categoryFilter !== "" && classicQuizQuestions.map(recuperaTutteLeDomande)}
                        </ul>
                    }
                    {/* {categoryFilter === "Frutti" && categoryQuestions.map(recuperaTutteLeDomande)} */}
                </>
            }
        </>
    );
}

export default ElencoDomande;