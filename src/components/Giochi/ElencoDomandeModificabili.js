import styles from "./ElencoDomandeModificabili.module.css";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import GenericButton from "../UI/GenericButton";
import AuthContext from "../../context/auth-context";

function ElencoDomandeModificabili(props){
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);

    const [questionsList, setQuestionsList] = useState(game_ctx.domande);
    const [imagesQuizQuestions, setImagesQuizQuestions] = useState(game_ctx.domandeDeiQuizConImmagini);
    const [imagesList, setImagesList] = useState([]);
    const [classicQuizQuestions, setClassicQuizQuestions] = useState(game_ctx.domandeDeiQuiz);
    const [guessTheWordQuestions, setGuessTheWordQuestions] = useState(game_ctx.elencoParole);
    const [gameType, setGameType] = useState("QUIZ");
    
    var categorie = game_ctx.recuperaCategorieDomande(gameType);
    const [categoryFilter, setCategoryFilter] = useState(categorie[0]);

    const websiteUrl = "https://myks.altervista.org/uploads/";

    function gameTypeChangeHandler(event){
        setGameType(event.target.value);
        categorie = game_ctx.recuperaCategorieDomande(event.target.value);
        {event.target.value === "QUIZ" && setCategoryFilter(categorie[0])}
        {event.target.value === "QUIZ CON IMMAGINI" && setCategoryFilter(categorie[0])}
        {event.target.value === "COMPLETA LA PAROLA" && setCategoryFilter(categorie[0])}
    }

    function categoryFilterChangeHandler(event){
        setCategoryFilter(event.target.value);
        console.log(imagesList);
    }

    function mappaCategorie(categoria){
        return (
            <option>
                {categoria}
            </option>
        );
    }

    function recuperaTutteLeDomande(singleQuestion){

        // console.log(Object.keys(singleQuestion.rispCorrette).length);
        if(singleQuestion.tipoGioco === gameType && singleQuestion.categoria === categoryFilter){
            // console.log(singleQuestion.categoria);
            return(
                <li className={styles.LIST_ITEM_STYLE}>

                    {gameType === "QUIZ" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "QUIZ CON IMMAGINI" && 
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Immagine:</h4>
                            {/* <p className={styles.question_style}>{singleQuestion.rispCorrettaN1}</p> */}
                            <img className={styles.preview_image} src={websiteUrl.concat(singleQuestion.immagine)}></img>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "COMPLETA LA PAROLA" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Parola da indovinare:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }
                    
                    {(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI") &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Risposte:</h4>

                            <div className={styles.separa_corrette_sbagliate}>
                                <span className={styles.buttons_space}>
                                    <p className={styles.subtitle_style}>CORRETTA</p>
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN1}</p>

                                    {singleQuestion.rispCorrettaN2.trim().length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN2.toString()}</p>
                                    }
                                    {singleQuestion.rispCorrettaN3.trim().length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN3.toString()}</p>
                                    }
                                    {singleQuestion.rispCorrettaN4.trim().length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN4.toString()}</p>
                                    }
                                </span>
                                
                                <span className={styles.buttons_space}>
                                    <p className={styles.subtitle_style}>SBAGLIATE</p>
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN1}</p>
                                    
                                    {singleQuestion.rispSbagliataN2.trim().length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN2.toString()}</p>
                                    }
                                    {singleQuestion.rispSbagliataN3.trim().length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN3.toString()}</p>
                                    }
                                    {singleQuestion.rispSbagliataN4.trim().length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN4.toString()}</p>
                                    }

                                </span>
                            </div>
                        </div>
                    }

                    <div className={styles.flex_list_container}>
                        <h4 className={styles.subtitle_style}>Opzioni:</h4>
                        <div className={styles.option_buttons}>
                            <GenericButton
                                onClick={() => {
                                    props.modificaSingolaDomanda(gameType, singleQuestion, singleQuestion.ID);
                                }}
                                generic_button={true}
                                buttonText={"Modifica domanda"}
                            >
                            </GenericButton>
                            <GenericButton
                                onClick={() => {
                                    game_ctx.eliminaDomanda(singleQuestion.ID);
                                }}
                                generic_button={true}
                                red_styling
                                buttonText={"Elimina domanda"}
                            >
                            </GenericButton>
                        </div>
                        
                        
                    </div>

                </li>
            );
        }
        else{
            return null;
        }
    }

    return(
        <div>
            {game_ctx.showModale && game_ctx.modale}
            
            <div className={styles.wrap_flex_generico}>
                <select className={styles.select_style} defaultValue={gameType} onChange={gameTypeChangeHandler}>
                    <option>QUIZ</option>
                    <option>QUIZ CON IMMAGINI</option>
                    <option>COMPLETA LA PAROLA</option>
                    {/* <option>RIFLESSI</option> */}
                </select>

                <select className={styles.select_style} onChange={categoryFilterChangeHandler}>
                    {categorie.map(mappaCategorie)}
                </select>
            </div>

            <ul className={styles.wrapper_lista_domande}>
                    {categoryFilter !== "" && questionsList.map(recuperaTutteLeDomande)}
            </ul>

            {/* {gameType === "QUIZ" &&
                <ul className={styles.wrapper_lista_domande}>
                    {categoryFilter !== "" && classicQuizQuestions.map(recuperaTutteLeDomande)}
                </ul>
            }

            {gameType === "QUIZ CON IMMAGINI" &&
                <ul className={styles.wrapper_lista_domande}>
                    {categoryFilter !== "" && imagesQuizQuestions.map(recuperaTutteLeDomande)}
                </ul>
            }

            {gameType === "COMPLETA LA PAROLA" &&
                <ul className={styles.wrapper_lista_domande}>
                    {categoryFilter !== "" && guessTheWordQuestions.map(recuperaTutteLeDomande)}
                </ul>
            } */}
            
        </div>
    );
}

export default ElencoDomandeModificabili;