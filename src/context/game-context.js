import React, {useState, useContext} from "react";
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

    const dati_dei_giochi = [
        {
            nomeGioco: "Indovina il volto del personaggio",
            tipoGioco: "QUIZ",
            livelloGioco: "FACILE",
            codiceGioco: "GUESS_THE_FACE"
        },
        {
            nomeGioco: "Indovina il frutto",
            tipoGioco: "QUIZ",
            livelloGioco: "DIFFICILE",
            codiceGioco: "GUESS_THE_FRUIT"
        },
        {
            nomeGioco: "Domande personali",
            tipoGioco: "QUIZ",
            livelloGioco: "FACILE",
            codiceGioco: ""
        },
        {
            nomeGioco: "Clicca la figura",
            tipoGioco: "RIFLESSI",
            livelloGioco: "FACILE",
            codiceGioco: ""
        },
        {
            nomeGioco: "Differenza immagini",
            tipoGioco: "QUIZ",
            livelloGioco: "NORMALE",
            codiceGioco: ""
        }
    ];

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [elencoGiochi, setElencoGiochi] = useState(dati_dei_giochi)
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

    

    function addNewGameToList(name, type, level){
        var new_game = {
            nomeGioco: name,
            tipoGioco: type,
            livelloGioco: level,
            codiceGioco: "QUALCOSA"
        }

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