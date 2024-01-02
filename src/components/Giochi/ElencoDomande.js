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

    const [categoryFilter, setCategoryFilter] = useState(props.categoria);
    const [imagesQuizQuestions, setImagesQuizQuestions] = useState(game_ctx.domandeDeiQuizConImmagini);
    const [imagesList, setImagesList] = useState([]);
    const [classicQuizQuestions, setClassicQuizQuestions] = useState(game_ctx.domandeDeiQuiz);
    const [guessTheWordQuestions, setGuessTheWordQuestions] = useState(game_ctx.elencoParole);
    const [llll, setllll] = useState([...game_ctx.domandeDaModificare]);
    const [numeroDomandeSelezionate, setNumeroDomandeSelezionate] = useState(0);

    var categorie = game_ctx.recuperaCategorieDomande(props.tipoGioco);

    //------- CREA QUI L'ARRAY CHE CONTIENE LE DOMANDE DENTRO verifyIsChecked
    useEffect(() => {
        // setllll([...game_ctx.domandeDaModificare]);
        setNumeroDomandeSelezionate(game_ctx.domandeDaModificare.length);
        COUNT_DOMANDE = game_ctx.domandeDaModificare.length;
        console.log("Appena entrato queste sono le domande")
        console.log(llll);
        props.domandeNuovoGioco(llll);

    }, [game_ctx.domandeDaModificare.length]);

    useEffect(() => {
        getAllImages()
        // console.log(imagesList);
        // setClassicQuizQuestions(game_ctx.domandeDeiQuiz)
    }, [])

    async function getAllImages(){
        setImagesList([]);
        const listaImmaginiStorage = ref(storage, `${auth_ctx.utenteLoggato}/`);
        const response = await listAll(listaImmaginiStorage)
        .catch((err) => {
            console.error(err);
        });
        for(var i=0; i < response.items.length; i++){
            // console.log(response);
            await getDownloadURL(response.items[i])
            .then((url) => {
                var imageName = response.items[i].name;
                setImagesList((previous) => [...previous, {
                    imageURL: url,
                    name: imageName
                }]);
                // console.log(imagesList.name);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }

    function getSingleImage(domandaSingola){
        for(var i=0; i < imagesList.length; i++){
            // console.log(imagesList[i].name)
            // console.log(domandaSingola.indovina)
            if(domandaSingola.id === imagesList[i].name){
                domandaSingola['immagine'] = imagesList[i].imageURL;
                // console.log(domandaSingola.immagine);
                return domandaSingola.immagine;
            }
        }
        return;
    }

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
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            COUNT_DOMANDE++;
            llll.unshift({
                id: domanda.id,
                categoria: domanda.categoria,
                indovina: domanda.indovina,
                rispCorrette: domanda.rispCorrette,
                rispSbagliate: domanda.rispSbagliate
            });
        }
        else{
            console.log('⛔️ Checkbox is NOT checked');
            COUNT_DOMANDE--;
            for(var i=0; i < llll.length; i++){
                if(domanda.id === llll[i].id){
                    llll.splice(i, 1);
                    break;
                }
            }
        }

        // console.log(llll.question);
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
        
        // console.log(game_ctx.domandeDaModificare === llll);

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
                    if(singleQuestion.id === llll[i].id){
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
                            <p className={styles.question_style}>{singleQuestion.rispCorrette.correct_answer_n1}</p>
                            <img className={styles.preview_image} src={getSingleImage(singleQuestion)}></img>
                        </div>
                    }

                    {props.tipoGioco === "COMPLETA LA PAROLA" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Parola da indovinare:</h4>
                            <p className={styles.question_style}>{singleQuestion.indovina}</p>
                        </div>
                    }

                    {(props.tipoGioco === "QUIZ" || props.tipoGioco === "QUIZ CON IMMAGINI") &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Risposte:</h4>

                            <div className={styles.separa_corrette_sbagliate}>
                                <span className={styles.buttons_space}>
                                    {/* <p className={styles.subtitle_style}>CORRETTA</p> */}
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrette.correct_answer_n1}</p>

                                    {Object.keys(singleQuestion.rispCorrette).length > 1 && singleQuestion.rispCorrette.correct_answer_n2.length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrette.correct_answer_n2.toString()}</p>
                                    }
                                    {Object.keys(singleQuestion.rispCorrette).length > 2 && singleQuestion.rispCorrette.correct_answer_n3.length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrette.correct_answer_n3.toString()}</p>
                                    }
                                    {Object.keys(singleQuestion.rispCorrette).length > 3 && singleQuestion.rispCorrette.correct_answer_n4.length > 0 &&
                                        <p className={styles.correct_answ}>{singleQuestion.rispCorrette.correct_answer_n4.toString()}</p>
                                    }
                                </span>
                                
                                <span className={styles.buttons_space}>
                                    {/* <p className={styles.subtitle_style}>SBAGLIATE</p> */}
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliate.wrong_answer_n1.toString()}</p>
                                    
                                    {Object.keys(singleQuestion.rispSbagliate).length > 1 && singleQuestion.rispSbagliate.wrong_answer_n2.length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliate.wrong_answer_n2.toString()}</p>
                                    }
                                    {Object.keys(singleQuestion.rispSbagliate).length > 2 && singleQuestion.rispSbagliate.wrong_answer_n3.length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliate.wrong_answer_n3.toString()}</p>
                                    }
                                    {Object.keys(singleQuestion.rispSbagliate).length > 3 && singleQuestion.rispSbagliate.wrong_answer_n4.length > 0 &&
                                        <p className={styles.wrong_answ}>{singleQuestion.rispSbagliate.wrong_answer_n4.toString()}</p>
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
            {props.tipoGioco === "" && <p>Seleziona un tipo di gioco per visualizzare le domande</p>}
            {props.tipoGioco === "QUIZ CON IMMAGINI" && 
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
            }
            {props.tipoGioco === "QUIZ" && 
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
            }
            {props.tipoGioco === "COMPLETA LA PAROLA" && 
                <>
                    <div className={styles.wrapper_generico}>
                        {/* <h3 className={styles.domande_disponibili}>Domande disponibili:</h3> */}
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
            }
        </>
    );
}

export default ElencoDomande;