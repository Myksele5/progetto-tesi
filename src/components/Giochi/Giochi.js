import styles from "./Giochi.module.css";
import { useContext, useState } from "react";
import GameContext from "../../context/game-context";
import GenericButton from "../UI/GenericButton";
import RisultatiGioco from "./RisultatiGioco";
import ListaGiochi from "./ListaGiochi";
import AddGioco from "./AddGioco";
import EditGioco from "./EditGioco";
import AddDomanda from "./AddDomanda";
import ExerciseGuessTheFace from "./ExerciseGuessTheFace";
import EditDomanda from "./EditDomanda";
import GuessTheWord from "./GuessTheWord";
import ExerciseReflexes from "./ExerciseReflexes";
import AuthContext from "../../context/auth-context";

let modifica_gioco;
let modifica_domanda;
let risultati_utente_gioco;

var giocoSvoltoID;

function Giochi(){
    const auth_ctx = useContext(AuthContext);
    const game_ctx = useContext(GameContext);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [showEditGame, setShowEditGame] = useState(false);
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const [showGameResults, setShowGameResults] = useState(false);
    const [gameObject, setGameObject] = useState(null);

    const [tipoGiocoCercato, setTipoGiocoCercato] = useState("");

    function tipoGiocoChangeHandler(event){
        setTipoGiocoCercato(event.target.value);
    }
    
    function formCreateNewQuestion(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewQuestion(true);
        var domandeDelGioco = [];
        var oggettoDomandeIDGioco = game_ctx.listaGiochi[1].domandeID;
        for(var i=0; i < game_ctx.domande.length; i++){
            oggettoDomandeIDGioco.forEach((item) => {
                if(item === game_ctx.domande[i].ID){
                    // console.log(game_ctx.domande[i]);
                    domandeDelGioco.push(game_ctx.domande[i]);
                }
            })
        }

        console.log(domandeDelGioco);
        
        console.log(game_ctx.domande[0]);
        console.log(oggettoDomandeIDGioco);
    }

    function closeFormCreateNewQuestion(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAddNewQuestion(false);
    }

    function formCreateNewGame(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewGame(true);
    }

    function closeFormCreateNewGame(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAddNewGame(false);
    }

    function formEditGame(listaa){
        // let numeroRound = JSON.parse(listaa.domande);
        // console.log(testjson);

        if(listaa.tipoGioco === "RIFLESSI"){
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                difficulty={listaa.livelloGioco}
                categoria={listaa.categoriaGioco}
                numeroRound={listaa.numeroRound}
                gameID={listaa.gameID}
                chiudiFormModifica={closeFormEditGame}
            >
            </EditGioco>
        }
        else{
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                categoria={listaa.categoriaGioco}
                difficulty={listaa.livelloGioco}
                gameID={listaa.gameID}
                chiudiFormModifica={closeFormEditGame}
                // listaDomande={listaa.domandeGioco}
            >
            </EditGioco>
        }
        
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowEditGame(true);
    }

    function closeFormEditGame(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowEditGame(false);
    }

    function avviaGiocoNascondiItems(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
    }

    function startGame(stringa_TIPOGIOCO, stringa_CODICEGIOCO, stringa_LIVELLOGIOCO){
        var indice_gioco;
        for(var i = 0; i < game_ctx.listaGiochi.length; i++){
            if(stringa_CODICEGIOCO === game_ctx.listaGiochi[i].gameID){
                indice_gioco = i;
                giocoSvoltoID = game_ctx.listaGiochi[i].gameID;
                break;
            }
        }
        console.log("CODICE DEL GIOCO SELEZIONATO----> " + stringa_CODICEGIOCO);

        var domandeDelGioco = [];
        var oggettoDomandeIDGioco = game_ctx.listaGiochi[indice_gioco].domandeID;
        console.log(oggettoDomandeIDGioco);
        for(var i=0; i < game_ctx.domande.length; i++){
            oggettoDomandeIDGioco.forEach((item) => {
                if(item === game_ctx.domande[i].ID){
                    // console.log(game_ctx.domande[i]);
                    domandeDelGioco.push(game_ctx.domande[i]);
                }
            })
        }
        console.log(game_ctx.listaGiochi[indice_gioco]);
        
        switch(stringa_TIPOGIOCO){
            case 'QUIZ':
            case 'QUIZ CON IMMAGINI':
                setGameObject(
                    <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                        domandeGioco={domandeDelGioco}
                    >
                    </ExerciseGuessTheFace>
                );
                break;

            case 'COMPLETA LA PAROLA':
                // const listaParole = JSON.parse(game_ctx.listaGiochi[indice_gioco].domande);
                // console.log(listaParole);
                // for(var i=0; i < listaParole.length; i++){
                //     console.log(listaParole[i]);
                // }
                setGameObject(
                    <GuessTheWord
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                        domandeGioco={domandeDelGioco}
                    >
                    </GuessTheWord>
                );
                break;

            case 'RIFLESSI':
                // const n_rounds = JSON.parse(game_ctx.listaGiochi[indice_gioco].domande);
                console.log(domandeDelGioco)
                setGameObject(
                    <ExerciseReflexes
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        numeroRound={game_ctx.listaGiochi[indice_gioco].numeroRound}
                    >
                    </ExerciseReflexes>
                );
                break;

            default:
                setGameObject(null);
        }
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
    }

    function endGame(risposteUtente, domandeTotali){
        setGameObject(null);
        risultati_utente_gioco =
            <RisultatiGioco
                numeroRisposteCorrette={risposteUtente}
                numeroDomandeTotali={domandeTotali}
                chiudiSchedaRisultati={closeGameResults}
                assegnaRisultatiPaziente={(pazID) => {
                    game_ctx.salvaRisultatiGiocoPaziente(pazID, giocoSvoltoID, domandeTotali, risposteUtente, (domandeTotali-risposteUtente))
                    closeGameResults();
                }}
            >
            </RisultatiGioco>
        setShowGameResults(true);
    }

    function closeGameResults(){
        risultati_utente_gioco = null;
        setShowGameResults(false);
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
    }

    function formEditQuestion(tipoGioco, singleQuestion, ID){
        if(tipoGioco === "QUIZ"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        if(tipoGioco === "QUIZ CON IMMAGINI"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                immagine={singleQuestion.immagine}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        
        setShowAddNewQuestion(false);
        setShowEditQuestion(true);
    }

    function closeFormEditQuestion(){
        setShowEditQuestion(false);
        setShowAddNewQuestion(true);
    }

    return(
        <>
            <h1 className={styles.page_title}>Giochi</h1>
            {showSearchBoxAndButton && auth_ctx.tipoAccount !== "Paziente" &&
                <div className={styles.wrap_boxes}>
                    <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                        <option hidden>Tipo Gioco</option>
                        <option>TUTTI</option>
                        <option>QUIZ</option>
                        <option>QUIZ CON IMMAGINI</option>
                        <option>COMPLETA LA PAROLA</option>
                        <option>RIFLESSI</option>
                    </select>
                    <GenericButton
                        onClick={formCreateNewQuestion}
                        generic_button={true}
                        buttonText={"Crea nuove domande"}
                    >
                    </GenericButton>
        
                    <GenericButton
                        onClick={() => {
                            formCreateNewGame();
                            //LA SEGUENTE FUNZIONE SERVE PER RESETTARE L'OGGETTO CHE SI OCCUPA DI MODIFICARE LE DOMANDE DI UN GIOCO
                            game_ctx.formCreaNuovoGioco();
                        }}
                        generic_button={true}
                        buttonText={"Aggiungi Gioco"}
                    >
                    </GenericButton>
                </div>
            }

            <div className={styles.wrapper_generico}>
                {showAddNewGame && 
                    <AddGioco
                        chiudiFormNuovoGioco={closeFormCreateNewGame}
                    >
                    </AddGioco>
                }

                {showEditGame && modifica_gioco}

                {showAddNewQuestion &&
                    <AddDomanda
                        chiudiFormNuovaDomanda={closeFormCreateNewQuestion}
                        aggiungiDomanda={game_ctx.aggiungiDomandaAllaLista}
                        mostraModificaDomanda={formEditQuestion}
                    >
                    </AddDomanda>
                }

                {showEditQuestion && modifica_domanda}

                {showElencoGiochi && 
                    <ListaGiochi
                        iniziaGioco={startGame}
                        tipoGioco={tipoGiocoCercato}
                        mostraFormModificaGioco={formEditGame}
                        avvioGiocoChiudoIlResto={avviaGiocoNascondiItems}
                    >
                    </ListaGiochi>
                }

                {showGameResults && risultati_utente_gioco}

                {gameObject}
                
            </div>
        </>
);
}

export default Giochi;