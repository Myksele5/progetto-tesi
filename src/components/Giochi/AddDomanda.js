import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddDomanda.module.css";
import GameContext from "../../context/game-context";
import Card from "../UI/Card";
import ElencoDomande from "./ElencoDomande";
import ElencoDomandeModificabili from "./ElencoDomandeModificabili";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

var counter_CORRETTE = 1;
var counter_SBAGLIATE = 1;

function AddDomanda(props){
    const game_ctx = useContext(GameContext)

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(counter_CORRETTE);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(counter_SBAGLIATE);

    const [imageFile, setImageFile] = useState(null);
    const [gameType, setGameType] = useState("QUIZ");
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [indovina, setIndovina] = useState("");
    const [rispCorretta_1, setRispCorretta_1] = useState("");
    const [rispCorretta_2, setRispCorretta_2] = useState("");
    const [rispCorretta_3, setRispCorretta_3] = useState("");
    const [rispCorretta_4, setRispCorretta_4] = useState("");
    const [rispSbagliata_1, setRispSbagliata_1] = useState("");
    const [rispSbagliata_2, setRispSbagliata_2] = useState("");
    const [rispSbagliata_3, setRispSbagliata_3] = useState("");
    const [rispSbagliata_4, setRispSbagliata_4] = useState("");

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

    function rispostaCorretta_1_ChangeHandler(event){
        setRispCorretta_1(event.target.value)
    }
    function rispostaCorretta_2_ChangeHandler(event){
        setRispCorretta_2(event.target.value)
    }
    function rispostaCorretta_3_ChangeHandler(event){
        setRispCorretta_3(event.target.value)
    }
    function rispostaCorretta_4_ChangeHandler(event){
        setRispCorretta_4(event.target.value)
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
    function rispostaSbagliata_4_ChangeHandler(event){
        setRispSbagliata_4(event.target.value)
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

        var correct_answers = {
            correct_answer_n1: rispCorretta_1,
        };

        var wrong_answers = {
            wrong_answer_n1: rispSbagliata_1,
        };

        if(rispCorretta_2.trim().length > 0){
            correct_answers["correct_answer_n2"] = rispCorretta_2;
        }
        if(rispCorretta_3.trim().length > 0){
            correct_answers["correct_answer_n3"] = rispCorretta_3;
        }
        if(rispCorretta_4.trim().length > 0){
            correct_answers["correct_answer_n4"] = rispCorretta_4;
        }
        

        if(rispSbagliata_2.trim().length > 0){
            wrong_answers["wrong_answer_n2"] = rispSbagliata_2;
        }
        if(rispSbagliata_3.trim().length > 0){
            wrong_answers["wrong_answer_n3"] = rispSbagliata_3;
        }
        if(rispSbagliata_4.trim().length > 0){
            wrong_answers["wrong_answer_n4"] = rispSbagliata_4;
        }

        // console.log(all_answers);

        if(gameType === "QUIZ"){
            new_question = {
                livelloDomanda: "facile",
                categoria: categoryQuestion,
                indovina: indovina,
                rispCorrette: correct_answers,
                rispSbagliate: wrong_answers
            }
        }

        if(gameType === "QUIZ CON IMMAGINI"){
            new_question = {
                livelloDomanda: "facile",
                categoria: categoryQuestion,
                indovina: imageFile,
                rispCorrette: correct_answers,
                rispSbagliate: wrong_answers
            }
        }

        if(gameType === "COMPLETA LA PAROLA"){
            new_question = {
                livelloDomanda: "facile",
                categoria: categoryQuestion,
                indovina: indovina.toUpperCase(),
            }
        }

        props.aggiornaDomande(new_question, gameType);
        props.chiudiFormNuovaDomanda();
    }

    function mostraFormModificaDomanda(tipoGioco, singleQuestion){
        props.mostraModificaDomanda(tipoGioco, singleQuestion);
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
                            <div className={styles.wrapper_impostazioni_gioco}>
                                <h1 className={styles.title_scheda}>Aggiungi nuova domanda</h1>

                                <div className={styles.wrapper_label_and_box}>
                                    <div className={styles.wrapper_items}>
                                        <label className={styles.label_style}>Tipo di gioco</label>
                                        <select className={styles.select_style} onChange={gameTypeChangeHandler}>
                                            <option>QUIZ</option>
                                            <option>QUIZ CON IMMAGINI</option>
                                            <option>COMPLETA LA PAROLA</option>
                                            {/* <option>RIFLESSI</option> */}
                                        </select>
                                    </div>

                                    <div className={styles.wrapper_items}>
                                        <label className={styles.label_style}>Categoria domanda</label>
                                        
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
                                    </div>
                                </div>
                                

                                {gameType === "QUIZ" &&
                                    <>
                                        <label className={styles.label_style}>Inserisci domanda: </label>
                                        <input className={styles.textbox_style} type="text" onChange={indovinaChangeHandler}></input>
                                    </>
                                }

                                {gameType === "QUIZ CON IMMAGINI" &&
                                    <>
                                        <label className={styles.label_style}>Inserisci immagine: </label>
                                        <input type="file" accept="image/*" onChange={imageFileChangeHandler}></input>
                                        <img className={styles.preview_image} src={imageFile}></img>
                                    </>
                                }

                                {gameType === "COMPLETA LA PAROLA" &&
                                    <>
                                        <label className={styles.label_style}>Inserisci parola da indovinare: </label>
                                        <input className={styles.textbox_style} type="text" onChange={indovinaChangeHandler}></input>
                                    </>
                                }
                                
                                {(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI") &&
                                    <div className={styles.wrapper_generico}>
                                        <div className={styles.wrapper_items}>
                                            <label className={styles.label_style}>Risposta Corretta: </label>
                                            <input className={styles.textbox_style} type="text" onChange={rispostaCorretta_1_ChangeHandler}></input>

                                            {totalAnswers_CORRECT > 1 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Corretta: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaCorretta_2_ChangeHandler}></input>
                                                </>
                                            }

                                            {totalAnswers_CORRECT > 2 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Corretta: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaCorretta_3_ChangeHandler}></input>
                                                </>
                                            }

                                            {totalAnswers_CORRECT > 3 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Corretta: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaCorretta_4_ChangeHandler}></input>
                                                </>
                                            }

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

                                        <div className={styles.wrapper_items}>
                                            <label className={styles.label_style}>Risposta Sbagliata 1: </label>
                                            <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_1_ChangeHandler}></input>

                                            {totalAnswers_WRONG > 1 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_2_ChangeHandler}></input>
                                                </>
                                            }

                                            {totalAnswers_WRONG > 2 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_3_ChangeHandler}></input>
                                                </>
                                            }

                                            {totalAnswers_WRONG > 3 &&
                                                <>
                                                    <label className={styles.label_style}>Risposta Sbagliata 4: </label>
                                                    <input className={styles.textbox_style} type="text" onChange={rispostaSbagliata_4_ChangeHandler}></input>
                                                </>
                                            }

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
                                }

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