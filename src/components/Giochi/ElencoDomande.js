import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import styles from "./ElencoDomande.module.css";
import GenericButton from "../UI/GenericButton";

var COUNT_DOMANDE = 0;

function ElencoDomande(props){
    const game_ctx = useContext(GameContext);

    const [categoryFilter, setCategoryFilter] = useState(props.categoria);
    const [imagesQuizQuestions, setImagesQuizQuestions] = useState(game_ctx.domandeDeiQuizConImmagini);
    const [classicQuizQuestions, setClassicQuizQuestions] = useState(game_ctx.domandeDeiQuiz);
    const [llll, setllll] = useState([...game_ctx.domandeDaModificare]);
    const [numeroDomandeSelezionate, setNumeroDomandeSelezionate] = useState(0);

    var categorie = game_ctx.recuperaCategorieDomande(props.tipoGioco);

    //------- CREA QUI L'ARRAY CHE CONTIENE LE DOMANDE DENTRO verifyIsChecked
    useEffect(() => {
        // setllll([...game_ctx.domandeDaModificare]);
        setNumeroDomandeSelezionate(game_ctx.domandeDaModificare.length);
        COUNT_DOMANDE = game_ctx.domandeDaModificare.length;
    }, [game_ctx.domandeDaModificare.length]);

    function categoryChangeHandler(event){
        changingCategoryMakesQuestionsReset();
        // game_ctx.PROVIAMO();
        setCategoryFilter(event.target.value);
    }

    function changingCategoryMakesQuestionsReset(){
        llll.splice(0);
        COUNT_DOMANDE = 0;
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        console.log(llll);
        props.domandeNuovoGioco(llll);
    }

    function verifyIsChecked(event, domanda){
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            COUNT_DOMANDE++;
            llll.unshift({
                categoria: domanda.categoria,
                indovina: domanda.indovina,
                question: domanda.question
            });
        }
        else{
            console.log('⛔️ Checkbox is NOT checked');
            COUNT_DOMANDE--;
            for(var i=0; i < llll.length; i++){
                if(domanda.question.correct_answer === llll[i].question.correct_answer){
                    llll.splice(i, 1);
                    break;
                }
            }
        }

        console.log(llll);
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        props.domandeNuovoGioco(llll);
    }

    function mappaCategorie(categoria){
        if(categoria === props.categoria){
            return (
                <option selected>
                    {categoria}
                </option>
            );
        }
        else{
            return (
                <option>
                    {categoria}
                </option>
            );
        }
        
    }

    function recuperaTutteLeDomande(singleQuestion){
        var checkboxInputChecked;
        
        console.log(game_ctx.domandeDaModificare === llll);

        if(singleQuestion.categoria === categoryFilter){
            if(llll.length <= 0){
                checkboxInputChecked =
                    <input className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                        verifyIsChecked(event, singleQuestion)
                        }}
                    >
                    </input>
            }
            else{
                for(var i=0; i < llll.length; i++){
                    if(singleQuestion.question.correct_answer === llll[i].question.correct_answer){
                        checkboxInputChecked =
                            <input checked className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                                verifyIsChecked(event, singleQuestion)
                                }}
                            >
                            </input>
                        break;
                    }
                    else{
                        checkboxInputChecked =
                            <input className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                                verifyIsChecked(event, singleQuestion)
                                }}
                            >
                            </input>
                    }
                }
            }

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
                        {checkboxInputChecked}
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
                    <div className={styles.wrapper_generico}>
                        {/* <h3 className={styles.domande_disponibili}>Domande disponibili:</h3> */}
                        <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>
                        
                        <select className={styles.select_style} onChange={categoryChangeHandler}>
                            <option hidden>---SELEZIONA CATEGORIA---</option>
                            {categorie.map(mappaCategorie)}
                        </select>
                    </div>
                    {
                        <ul className={styles.wrapper_lista_domande}>
                            {categoryFilter !== "" && imagesQuizQuestions.map(recuperaTutteLeDomande)}
                        </ul>
                    }
                    
                </>
            }
            {props.tipoGioco === "QUIZ" && 
                <>
                    <h3 className={styles.domande_disponibili}>Domande disponibili:</h3>
                    <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>

                    <select className={styles.select_style} onChange={categoryChangeHandler}>
                        <option hidden>---SELEZIONA CATEGORIA---</option>
                        {categorie.map(mappaCategorie)}
                    </select>
                    
                    {
                        <ul className={styles.wrapper_lista_domande}>
                            {categoryFilter !== "" && classicQuizQuestions.map(recuperaTutteLeDomande)}
                        </ul>
                    }
                    
                </>
            }
        </>
    );
}

export default ElencoDomande;