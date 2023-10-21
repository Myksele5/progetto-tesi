import React, {useState, useContext} from "react";
import RisultatiGioco from "../components/Giochi/RisultatiGioco";
import ExerciseGuessTheFace from "../components/Giochi/ExerciseGuessTheFace";
import ExerciseGuessTheFruit from "../components/Giochi/ExerciseGuessTheFruit";
import PatientContext from "./patients-context";

import Einstein from '../components/Images-Giochi/ALBERT_EINSTEIN.jpeg';
import Dante from '../components/Images-Giochi/DANTE_ALIGHIERI.jpg';
import Marilyn from '../components/Images-Giochi/MARILYN_MONROE.jpg';
import Leonardo from '../components/Images-Giochi/LEONARDO_DA_VINCI.jpg';
import Napoleone from '../components/Images-Giochi/NAPOLEONE_BONAPARTE.jpg';
import PapaFrancesco from '../components/Images-Giochi/PAPA_FRANCESCO.jpg';

let risultati_gioco;
let counter_CODICE_GIOCO = 0;

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
    iniziaGioco: ()=>{},
    domandeDeiQuizConImmagini: null
});

export function GameContextProvider(props){
    const patients_ctx = useContext(PatientContext);

    const dati_dei_giochi = [
        {
            nomeGioco: "Indovina il volto del personaggio",
            tipoGioco: "QUIZ CON IMMAGINI",
            livelloGioco: "FACILE",
            codiceGioco: "GUESS_THE_FAC",
            domandeGioco: [
                {
                    face_image: Einstein,
                    question:{
                        correct_answer: 'Albert Einstein',
                        wrong_answer_n1: 'Isaac Newton',
                        wrong_answer_n2: 'Enrico Fermi',
                        wrong_answer_n3: 'Silvio Berlusconi'
                    }
                },
                {
                    face_image: Dante,
                    question:{
                        correct_answer: 'Dante Alighieri',
                        wrong_answer_n1: 'Vincent Van Gogh',
                        wrong_answer_n2: 'Niccolò Machiavelli',
                        wrong_answer_n3: 'Giovanni Boccaccio'
                    }
                },
                {
                    face_image: Marilyn,
                    question:{
                        correct_answer: 'Marilyn Monroe',
                        wrong_answer_n1: 'Sophia Lauren',
                        wrong_answer_n2: 'Chiara Ferragni',
                        wrong_answer_n3: 'Meryl Streep'
                    }
                }
            ]
        },
        {
            nomeGioco: "Indovina il frutto",
            tipoGioco: "QUIZ",
            livelloGioco: "DIFFICILE",
            codiceGioco: "GUESS_THE_FRUIT"
        }
        // {
        //     nomeGioco: "Domande personali",
        //     tipoGioco: "QUIZ",
        //     livelloGioco: "FACILE",
        //     codiceGioco: ""
        // },
        // {
        //     nomeGioco: "Clicca la figura",
        //     tipoGioco: "RIFLESSI",
        //     livelloGioco: "FACILE",
        //     codiceGioco: ""
        // },
        // {
        //     nomeGioco: "Differenza immagini",
        //     tipoGioco: "QUIZ",
        //     livelloGioco: "NORMALE",
        //     codiceGioco: ""
        // }
    ];

    const elencoDomandeQuizImmagini = [
        
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            face_image: Einstein,
            question:{
                correct_answer: 'Albert Einstein',
                wrong_answer_n1: 'Isaac Newton',
                wrong_answer_n2: 'Enrico Fermi',
                wrong_answer_n3: 'Silvio Berlusconi'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            face_image: Dante,
            question:{
                correct_answer: 'Dante Alighieri',
                wrong_answer_n1: 'Vincent Van Gogh',
                wrong_answer_n2: 'Niccolò Machiavelli',
                wrong_answer_n3: 'Giovanni Boccaccio'
            }
        },
        {
            livelloDomanda: "normale",
            categoria: "Personaggi Famosi",
            face_image: Marilyn,
            question:{
                correct_answer: 'Marilyn Monroe',
                wrong_answer_n1: 'Sophia Lauren',
                wrong_answer_n2: 'Chiara Ferragni',
                wrong_answer_n3: 'Meryl Streep'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            face_image: Leonardo,
            question:{
                correct_answer: 'Leonardo da Vinci',
                wrong_answer_n1: 'Wolfgang Mozart',
                wrong_answer_n2: 'Socrate',
                wrong_answer_n3: 'Caravaggio'
            }
        },
        {
            livelloDomanda: "difficile",
            categoria: "Personaggi Famosi",
            face_image: Napoleone,
            question:{
                    correct_answer: 'Napoleone Bonaparte',
                    wrong_answer_n1: 'Giulio Cesare',
                    wrong_answer_n2: 'Luigi XIV',
                    wrong_answer_n3: 'Alessandro Magno'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            face_image: PapaFrancesco,
            question:{
                    correct_answer: 'Papa Francesco',
                    wrong_answer_n1: 'Papa Giovanni Paolo II',
                    wrong_answer_n2: 'Francesco Totti',
                    wrong_answer_n3: 'Giorgia Meloni'
            }
        }
    
    ];

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [elencoGiochi, setElencoGiochi] = useState(dati_dei_giochi)
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [gameObject, setGameObject] = useState(null);
    const [gameResults, setGameResults] = useState(false);

    function startGame(stringa_TIPOGIOCO, stringa_CODICEGIOCO){
        var indice_gioco;
        for(var i = 0; i < elencoGiochi.length; i++){
            if(stringa_CODICEGIOCO === elencoGiochi[i].codiceGioco){
                indice_gioco = i;
                break;
            }
        }
        console.log("CODICE DEL GIOCO SELEZIONATO----> " + stringa_CODICEGIOCO);
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);

        switch(stringa_TIPOGIOCO){
            case 'QUIZ':
                break;

            case 'QUIZ CON IMMAGINI':
                setGameObject(
                    // <div className={styles.wrapper_gioco}>
                        <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}>
                        </ExerciseGuessTheFace>
                    // </div>
                );
                break;

            case 'COMPLETA LA PAROLA':
                break;

            case 'RIFLESSI':
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

    function addNewGameToList(name, type, level, questionsList){
        var new_game = {
            nomeGioco: name,
            tipoGioco: type,
            livelloGioco: level,
            codiceGioco: counter_CODICE_GIOCO,
            domandeGioco: questionsList
        }

        setElencoGiochi(vecchioElenco => {
            return [new_game, ...vecchioElenco]
        });

        console.log("CODICE DEL GIOCO APPENA CREATO---> " + counter_CODICE_GIOCO);
        counter_CODICE_GIOCO++;

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
            iniziaGioco: startGame,
            domandeDeiQuizConImmagini: elencoDomandeQuizImmagini
        }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;