import React, {useState, useContext} from "react";
import GameCard from "../components/UI/GameCard";
import GenericButton from "../components/UI/GenericButton";
import styles from "../components/Giochi/ListaGiochi.module.css";
import RisultatiGioco from "../components/Giochi/RisultatiGioco";
import ExerciseGuessTheFace from "../components/Giochi/ExerciseGuessTheFace";
import ExerciseGuessTheFruit from "../components/Giochi/ExerciseGuessTheFruit";
import PatientContext from "./patients-context";

let risultati_gioco;

const GameContext = React.createContext({
    listaGiochi: null,
    aggiungiGiocoAllaLista: ()=>{},
    showListaGiochi: false,
    showBarraRicercaBottone: null,
    showAggiungiNuovoGioco: null,
    oggettoGioco: null,
    risultatiGioco: null,
    risposteUtente: null,
    formCreaNuovoGioco: ()=>{},
    chiudiFormCreaNuovoGioco: ()=>{},
    iniziaGioco: ()=>{}
});

export function GameContextProvider(props){
    const patients_ctx = useContext(PatientContext);

    const elenco_giochi = [
        <GameCard
            children={
                <>
                    <div>
                        <h1 className={styles.game_title}>INDOVINA IL VOLTO DEL PERSONAGGIO</h1>
                        <h3 className={styles.game_subtitle}>Tipologia gioco: <span className={styles.game_type}>QUIZ</span></h3>
                    </div>
                    
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        onClick={()=> {
                            startGame("GUESS_THE_FACE")
                        }}
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>,

        <GameCard
            children={
                <>
                    <h1 className={styles.game_title}>INDOVINA IL FRUTTO</h1>
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        onClick={()=> {
                            startGame("GUESS_THE_FRUIT")
                        }}
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>,

        <GameCard
            children={
                <>
                    <h1 className={styles.game_title}>DOMANDE PERSONALI</h1>
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>,

        <GameCard
            children={
                <>
                    <h1 className={styles.game_title}>RIFLESSI</h1>
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>,

        <GameCard
            children={
                <>
                    <h1 className={styles.game_title}>ALTRO TIPO DI GIOCO</h1>
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>
    ];

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [elencoGiochi, setElencoGiochi] = useState(elenco_giochi)
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [gameObject, setGameObject] = useState(null);
    const [gameResults, setGameResults] = useState(false);

    function startGame(stringa){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        switch(stringa){
            case 'GUESS_THE_FACE':
                setGameObject(
                    // <div className={styles.wrapper_gioco}>
                        <ExerciseGuessTheFace
                        giocoTerminato={endGame}>
                        </ExerciseGuessTheFace>
                    // </div>
                );
                break;
            case 'GUESS_THE_FRUIT':
                setGameObject(
                    // <div className={styles.wrapper_gioco}>
                        <ExerciseGuessTheFruit
                        giocoTerminato={endGame}>
                        </ExerciseGuessTheFruit>
                    // </div>
                );
                break;
            default:
                setGameObject(null);
        }
        
    }

    function endGame(risposteUtente, domandeTotali){
        setGameObject(null);
        risultati_gioco =
            <RisultatiGioco
                numeroRisposteCorrette={risposteUtente}
                numeroDomandeTotali={domandeTotali}
                chiudiSchedaRisultati={chiudiSchedaRisultati}
                assegnaRisultatiPaziente={(pazObj) => {salvaRisultati(risposteUtente, domandeTotali, pazObj)}}
            >
            </RisultatiGioco>
        setGameResults(true);
    }

    function salvaRisultati(risposteUtente, domandeTotali, pazienteDaAggiornare){
        console.log("NUMERO DI DOMANDE ---->" + domandeTotali);
        console.log("RISPOSTE CORRETTE ---->" + risposteUtente);
        console.log("RISPOSTE SBAGLIATE ---->" + (domandeTotali - risposteUtente));

        pazienteDaAggiornare.statistiche.risposteTotali += domandeTotali;
        pazienteDaAggiornare.statistiche.risposteCorrette += risposteUtente;
        pazienteDaAggiornare.statistiche.risposteSbagliate += (domandeTotali - risposteUtente);

        patients_ctx.modificaLista(pazienteDaAggiornare);
        
        chiudiSchedaRisultati();
    }

    function chiudiSchedaRisultati(){
        risultati_gioco = null;
        setGameResults(false);
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
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

    function addNewGameToList(event){
        var new_game =
        <GameCard
            children={
                <>
                    <h1 className={styles.game_title}>PORCO IO</h1>
                    <div className={styles.buttons_wrap}>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Avvia Gioco'>
                        </GenericButton>
                        <GenericButton
                        alternative_button={true}
                        buttonText='Gestione Gioco'>
                        </GenericButton>
                    </div>
                </>
            }>
        </GameCard>
        
        setElencoGiochi(vecchioElenco => {
            return [new_game, ...vecchioElenco]
        });

        closeFormCreateNewGame();
    }

    return(
        <GameContext.Provider
        value={{
            listaGiochi: elencoGiochi,
            aggiungiGiocoAllaLista: addNewGameToList,
            showListaGiochi: showElencoGiochi,
            showBarraRicercaBottone: showSearchBoxAndButton,
            showAggiungiNuovoGioco: showAddNewGame,
            oggettoGioco: gameObject,
            risultatiGioco: gameResults,
            risposteUtente: risultati_gioco,
            formCreaNuovoGioco: formCreateNewGame,
            chiudiFormCreaNuovoGioco: closeFormCreateNewGame,
            iniziaGioco: startGame
        }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;