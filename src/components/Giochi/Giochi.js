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

let modifica_gioco;
let modifica_domanda;
let risultati_utente_gioco;

function Giochi(){
    const game_ctx = useContext(GameContext);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [showEditGame, setShowEditGame] = useState(false);
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const [showGameResults, setShowGameResults] = useState(false);
    const [gameObject, setGameObject] = useState(null);
    
    function formCreateNewQuestion(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewQuestion(true);
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
        if(listaa.tipoGioco === "RIFLESSI"){
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                difficulty={listaa.livelloGioco}
                numeroRound={listaa.numeroRound}
                codiceGioco={listaa.codiceGioco}
                chiudiFormModifica={closeFormEditGame}
            >
            </EditGioco>
        }
        else{
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                categoria={listaa.domandeGioco[0].categoria}
                difficulty={listaa.livelloGioco}
                codiceGioco={listaa.codiceGioco}
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
            if(stringa_CODICEGIOCO === game_ctx.listaGiochi[i].codiceGioco){
                indice_gioco = i;
                break;
            }
        }
        console.log("CODICE DEL GIOCO SELEZIONATO----> " + stringa_CODICEGIOCO);
        
        switch(stringa_TIPOGIOCO){
            case 'QUIZ':
            case 'QUIZ CON IMMAGINI':
                setGameObject(
                    <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                    >
                    </ExerciseGuessTheFace>
                );
                break;

            case 'COMPLETA LA PAROLA':
                setGameObject(
                    <GuessTheWord
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                    >
                    </GuessTheWord>
                );
                break;

            case 'RIFLESSI':
                setGameObject(
                    <ExerciseReflexes
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
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
                assegnaRisultatiPaziente={(pazObj) => {
                    game_ctx.salvaRisultatiGiocoPaziente(risposteUtente, domandeTotali, pazObj)
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

    function formEditQuestion(tipoGioco, singleQuestion){
        if(tipoGioco === "QUIZ"){
            modifica_domanda =
            <EditDomanda
                id={singleQuestion.id}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                indovina={singleQuestion.indovina}
                corrette={singleQuestion.rispCorrette}
                sbagliate={singleQuestion.rispSbagliate}
                count_corrette={Object.keys(singleQuestion.rispCorrette).length}
                count_sbagliate={Object.keys(singleQuestion.rispSbagliate).length}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        if(tipoGioco === "QUIZ CON IMMAGINI"){
            modifica_domanda =
            <EditDomanda
                id={singleQuestion.id}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                indovina={singleQuestion.indovina}
                immagine={singleQuestion.immagine}
                corrette={singleQuestion.rispCorrette}
                sbagliate={singleQuestion.rispSbagliate}
                count_corrette={Object.keys(singleQuestion.rispCorrette).length}
                count_sbagliate={Object.keys(singleQuestion.rispSbagliate).length}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            modifica_domanda =
            <EditDomanda
                id={singleQuestion.id}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                indovina={singleQuestion.indovina}
                corrette={""}
                sbagliate={""}
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
            {showSearchBoxAndButton && 
                <div className={styles.wrap_boxes}>
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
                        aggiornaDomande={game_ctx.aggiungiDomandaAllaLista}
                        mostraModificaDomanda={formEditQuestion}
                    >
                    </AddDomanda>
                }

                {showEditQuestion && modifica_domanda}

                {showElencoGiochi && 
                    <ListaGiochi
                        iniziaGioco={startGame}
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