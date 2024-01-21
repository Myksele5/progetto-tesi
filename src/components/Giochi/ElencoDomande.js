import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import styles from "./ElencoDomande.module.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import AuthContext from "../../context/auth-context";

var COUNT_DOMANDE = 0;

function ElencoDomande(props){
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);

    const [questionsList, setQuestionsList] = useState(game_ctx.domande);
    const [categoryFilter, setCategoryFilter] = useState(props.categoria);
    // const [imagesQuizQuestions, setImagesQuizQuestions] = useState(game_ctx.domandeDeiQuizConImmagini);
    const [imagesList, setImagesList] = useState([]);
    // const [classicQuizQuestions, setClassicQuizQuestions] = useState(game_ctx.domandeDeiQuiz);
    // const [guessTheWordQuestions, setGuessTheWordQuestions] = useState(game_ctx.elencoParole);
    const [llll, setllll] = useState([...game_ctx.domandeDaModificare]);
    const [numeroDomandeSelezionate, setNumeroDomandeSelezionate] = useState(0);

    var categorie = game_ctx.recuperaCategorieDomande(props.tipoGioco);

    const websiteUrl = "https://myks.altervista.org/uploads/";

    //------- CREA QUI L'ARRAY CHE CONTIENE LE DOMANDE DENTRO verifyIsChecked
    useEffect(() => {
        // setllll([...game_ctx.domandeDaModificare]);
        setNumeroDomandeSelezionate(game_ctx.domandeDaModificare.length);
        COUNT_DOMANDE = game_ctx.domandeDaModificare.length;
        console.log("Appena entrato queste sono le domande")
        console.log(llll);
        props.domandeNuovoGioco(llll);

    }, [game_ctx.domandeDaModificare.length]);

    function categoryChangeHandler(event){
        changingCategoryMakesQuestionsReset();
        setCategoryFilter(event.target.value);
    }

    function changingCategoryMakesQuestionsReset(){
        llll.splice(0);
        COUNT_DOMANDE = 0;
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        // console.log(llll);
        props.domandeNuovoGioco(llll);
    }

    function verifyIsChecked(event, domanda){
        console.log(domanda);
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            COUNT_DOMANDE++;
            llll.unshift(
                domanda.ID,
                // categoria: domanda.categoria,
                // domanda: domanda.domanda,
                // rispCorrettaN1: domanda.rispCorrettaN1,
                // rispCorrettaN2: domanda.rispCorrettaN2,
                // rispCorrettaN3: domanda.rispCorrettaN3,
                // rispCorrettaN4: domanda.rispCorrettaN4,
                // rispSbagliataN1: domanda.rispSbagliataN1,
                // rispSbagliataN2: domanda.rispSbagliataN2,
                // rispSbagliataN3: domanda.rispSbagliataN3,
                // rispSbagliataN4: domanda.rispSbagliataN4
            );
        }
        else{
            console.log('⛔️ Checkbox is NOT checked');
            COUNT_DOMANDE--;
            for(var i=0; i < llll.length; i++){
                if(domanda.ID === llll[i]){
                    llll.splice(i, 1);
                    break;
                }
            }
        }

        // console.log(llll.question);
        console.log(llll);
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        props.domandeNuovoGioco(llll, categoryFilter);
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
        
        // console.log(game_ctx.domandeDaModificare === llll);

        if(singleQuestion.tipoGioco === props.tipoGioco && singleQuestion.categoria === categoryFilter){
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
                    if(singleQuestion.ID === llll[i]){
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
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {props.tipoGioco === "QUIZ CON IMMAGINI" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Immagine:</h4>
                            <img className={styles.preview_image} src={websiteUrl.concat(singleQuestion.immagine)}></img>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {props.tipoGioco === "COMPLETA LA PAROLA" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Parola da indovinare:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {(props.tipoGioco === "QUIZ" || props.tipoGioco === "QUIZ CON IMMAGINI") &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Risposte:</h4>

                            <div className={styles.separa_corrette_sbagliate}>
                                <span className={styles.buttons_space}>
                                    {/* <p className={styles.subtitle_style}>CORRETTA</p> */}
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
                                    {/* <p className={styles.subtitle_style}>SBAGLIATE</p> */}
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
            <div className={styles.wrapper_generico}>
                <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>
                
                <select className={styles.select_style} onChange={categoryChangeHandler}>
                    <option hidden>---SELEZIONA CATEGORIA---</option>
                    {categorie.map(mappaCategorie)}
                </select>
            </div>
            
            <ul className={styles.wrapper_lista_domande}>
                {categoryFilter !== "" && questionsList.map(recuperaTutteLeDomande)}
            </ul>
            {/* {props.tipoGioco === "" && <p>Seleziona un tipo di gioco per visualizzare le domande</p>} */}
            {/* {props.tipoGioco === "QUIZ CON IMMAGINI" && 
                <>
                    <div className={styles.wrapper_generico}>
                        <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>
                        
                        <select className={styles.select_style} onChange={categoryChangeHandler}>
                            <option hidden>---SELEZIONA CATEGORIA---</option>
                            {categorie.map(mappaCategorie)}
                        </select>
                    </div>
                    
                    <ul className={styles.wrapper_lista_domande}>
                        {categoryFilter !== "" && imagesQuizQuestions.map(recuperaTutteLeDomande)}
                    </ul>
                    
                </>
            } */}
            {/* {props.tipoGioco === "QUIZ" && 
                <>
                    <div className={styles.wrapper_generico}>
                        <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>

                        <select className={styles.select_style} onChange={categoryChangeHandler}>
                            <option hidden>---SELEZIONA CATEGORIA---</option>
                            {categorie.map(mappaCategorie)}
                        </select>
                    </div>
                    
                    <ul className={styles.wrapper_lista_domande}>
                        {categoryFilter !== "" && classicQuizQuestions.map(recuperaTutteLeDomande)}
                    </ul>
                    
                </>
            } */}
            {/* {props.tipoGioco === "COMPLETA LA PAROLA" && 
                <>
                    <div className={styles.wrapper_generico}>
                        <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>
                        
                        <select className={styles.select_style} onChange={categoryChangeHandler}>
                            <option hidden>---SELEZIONA CATEGORIA---</option>
                            {categorie.map(mappaCategorie)}
                        </select>
                    </div>
                    
                    <ul className={styles.wrapper_lista_domande}>
                        {categoryFilter !== "" && guessTheWordQuestions.map(recuperaTutteLeDomande)}
                    </ul>
                    
                </>
            } */}
        </>
    );
}

export default ElencoDomande;