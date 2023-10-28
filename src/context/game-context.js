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

import Albicocca from '../components/Images-Giochi/ALBICOCCA.jpg';
import Banana from '../components/Images-Giochi/BANANA.jpg';
import Ciliegia from '../components/Images-Giochi/CILIEGIA.jpg';
import Fragola from '../components/Images-Giochi/FRAGOLA.jpg';
import Mela from '../components/Images-Giochi/MELA.jpg';
import Mirtillo from '../components/Images-Giochi/MIRTILLO_NERO.jpg';
import Nespola from '../components/Images-Giochi/NESPOLA.jpeg';

let risultati_gioco;
let counter_CODICE_GIOCO = 0;

const GameContext = React.createContext({
    listaGiochi: null,
    aggiungiGiocoAllaLista: ()=>{},
    showListaGiochi: false,
    showBarraRicercaBottone: null,
    oggettoGioco: null,
    risultatiGioco: null,
    risposteUtente: null,
    showAggiungiNuovoGioco: null,
    formCreaNuovoGioco: ()=>{},
    chiudiFormCreaNuovoGioco: ()=>{},
    iniziaGioco: ()=>{},
    domandeDeiQuizConImmagini: null,
    domandeDeiQuiz: null,
    showAggiungiNuovaDomanda: null,
    formCreaNuovaDomanda: ()=>{},
    chiudiFormCreaNuovaDomanda: ()=>{},
    aggiungiDomandaAllaLista: ()=>{},
    PROVIAMO: ()=>{}
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
                    indovina: Einstein,
                    question:{
                        correct_answer: 'Albert Einstein',
                        wrong_answer_n1: 'Isaac Newton',
                        wrong_answer_n2: 'Enrico Fermi',
                        wrong_answer_n3: 'Silvio Berlusconi'
                    }
                },
                {
                    indovina: Dante,
                    question:{
                        correct_answer: 'Dante Alighieri',
                        wrong_answer_n1: 'Vincent Van Gogh',
                        wrong_answer_n2: 'Niccolò Machiavelli',
                        wrong_answer_n3: 'Giovanni Boccaccio'
                    }
                },
                {
                    indovina: Marilyn,
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

    const lista_domande_quiz_immagini = [
        
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            indovina: Einstein,
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
            indovina: Dante,
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
            indovina: Marilyn,
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
            indovina: Leonardo,
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
            indovina: Napoleone,
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
            indovina: PapaFrancesco,
            question:{
                    correct_answer: 'Papa Francesco',
                    wrong_answer_n1: 'Papa Giovanni Paolo II',
                    wrong_answer_n2: 'Francesco Totti',
                    wrong_answer_n3: 'Giorgia Meloni'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Albicocca,
            question:{
                correct_answer: 'Albicocca',
                wrong_answer_n1: 'Mango',
                wrong_answer_n2: 'Nocciola',
                wrong_answer_n3: 'Arancia'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Banana,
            question:{
                correct_answer: 'Banana',
                wrong_answer_n1: 'Carruba',
                wrong_answer_n2: 'Bergamotto',
                wrong_answer_n3: 'Platano'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Ciliegia,
            question:{
                correct_answer: 'Ciliegia',
                wrong_answer_n1: 'Lampone',
                wrong_answer_n2: 'Pesca',
                wrong_answer_n3: 'Uva'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Fragola,
            question:{
                correct_answer: 'Fragola',
                wrong_answer_n1: 'Arancia',
                wrong_answer_n2: 'Litchi',
                wrong_answer_n3: 'Prugna'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Mela,
            question:{
                    correct_answer: 'Mela',
                    wrong_answer_n1: 'Pera',
                    wrong_answer_n2: 'Limone',
                    wrong_answer_n3: 'Papaya'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Mirtillo,
            question:{
                    correct_answer: 'Mirtillo',
                    wrong_answer_n1: 'Noce',
                    wrong_answer_n2: 'Lampone',
                    wrong_answer_n3: 'Mora'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Nespola,
            question:{
                    correct_answer: 'Nespola',
                    wrong_answer_n1: 'Pesca',
                    wrong_answer_n2: 'Frutto della passione',
                    wrong_answer_n3: 'Kiwi'
            }
        }
    
    ];

    const lista_domande_quiz = [
        
        {
            livelloDomanda: "facile",
            categoria: "Sport",
            indovina: "Quale tra le seguenti squadre NBA ha vinto più titoli?",
            question:{
                correct_answer: 'Los Angeles Lakers',
                wrong_answer_n1: 'Boston Celtics',
                wrong_answer_n2: 'New York Knicks',
                wrong_answer_n3: 'Chicago Bulls'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Sport",
            indovina: "Quanti mondiali ha vinto la nazionale di calcio italana?",
            question:{
                correct_answer: '5',
                wrong_answer_n1: '7',
                wrong_answer_n2: '4',
                wrong_answer_n3: '3'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Storia",
            indovina: "In quale anno è nata la Repubblica Italiana?",
            question:{
                correct_answer: '1946',
                wrong_answer_n1: '1956',
                wrong_answer_n2: '1990',
                wrong_answer_n3: '1961'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Geografia",
            indovina: "Madrid è la capitale di quale nazione?",
            question:{
                correct_answer: 'Spagna',
                wrong_answer_n1: 'Italia',
                wrong_answer_n2: 'Messico',
                wrong_answer_n3: 'Portogallo'
            }
        },
        {
            livelloDomanda: "normale",
            categoria: "Geografia",
            indovina: "Qual è la montagna più alta del mondo?",
            question:{
                correct_answer: 'Everest',
                wrong_answer_n1: 'Annapurna I',
                wrong_answer_n2: 'K2',
                wrong_answer_n3: 'Makalu'
            }
        },
        {
            livelloDomanda: "difficile",
            categoria: "Geografia",
            indovina: "Quale tra le seguenti nazioni è la più grande per dimensione?",
            question:{
                correct_answer: 'Russia',
                wrong_answer_n1: 'Canada',
                wrong_answer_n2: 'Stati Uniti',
                wrong_answer_n3: 'Brasile'
            }
        }
    
    ];

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [elencoGiochi, setElencoGiochi] = useState(dati_dei_giochi)
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
    const [gameObject, setGameObject] = useState(null);
    const [gameResults, setGameResults] = useState(false);
    const [elencoDomandeQuiz, setElencoDomandeQuiz] = useState(lista_domande_quiz);
    const [elencoDomandeQuizImmagini, setElencoDomandeQuizImmagini] = useState(lista_domande_quiz_immagini);

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
            case 'QUIZ CON IMMAGINI':
                setGameObject(
                    <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                    >
                    </ExerciseGuessTheFace>
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

    function formCreateNewQuestion(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewQuestion(true);
    }

    function closeformCreateNewQuestion(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAddNewQuestion(false);
    }

    function addNewQuestionToList(nuova_domanda, tipoGioco){
        if(tipoGioco === "QUIZ"){
            setElencoDomandeQuiz(vecchioElenco => {
                return [nuova_domanda, ...vecchioElenco]
            });
        }
        if(tipoGioco === "QUIZ CON IMMAGINI"){
            setElencoDomandeQuizImmagini(vecchioElenco => {
                return [nuova_domanda, ...vecchioElenco]
            });
        }
        
    }

    function PROVAPROVA(tipoGioco){

        // var QUALE_GIOCO_ARRAY = [];
        var ULTIMA_CATEGORIA_AGGIUNTA;
        var elenco_categorie = [];

        if(tipoGioco === "QUIZ"){
            for(var i=0; i < elencoDomandeQuiz.length; i++){
                if(elenco_categorie.length <= 0){
                    ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuiz[i].categoria;
                    elenco_categorie.unshift({
                        categoria: ULTIMA_CATEGORIA_AGGIUNTA
                    });
                    continue;
                }
                else{
                    for(var j=0; j < elenco_categorie.length; j++){
                        if(elencoDomandeQuiz[i].categoria === elenco_categorie[j]){
                            break;
                        }
                        if(elencoDomandeQuiz[i].categoria !== elenco_categorie[j] && elencoDomandeQuiz[i].categoria !== ULTIMA_CATEGORIA_AGGIUNTA){
                            ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuiz[i].categoria;
                            elenco_categorie.unshift({
                                categoria: ULTIMA_CATEGORIA_AGGIUNTA
                            });
                        }
                    }
                }
            }
        }

        if(tipoGioco === "QUIZ CON IMMAGINI"){
            for(var i=0; i < elencoDomandeQuizImmagini.length; i++){
                if(elenco_categorie.length <= 0){
                    ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuizImmagini[i].categoria;
                    elenco_categorie.unshift({
                        categoria: ULTIMA_CATEGORIA_AGGIUNTA
                    });
                    continue;
                }
                else{
                    for(var j=0; j < elenco_categorie.length; j++){
                        if(elencoDomandeQuizImmagini[i].categoria === elenco_categorie[j]){
                            break;
                        }
                        if(elencoDomandeQuizImmagini[i].categoria !== elenco_categorie[j] && elencoDomandeQuizImmagini[i].categoria !== ULTIMA_CATEGORIA_AGGIUNTA){
                            ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuizImmagini[i].categoria;
                            elenco_categorie.unshift({
                                categoria: ULTIMA_CATEGORIA_AGGIUNTA
                            });
                        }
                    }
                }
            }
        }

        

        console.log(elenco_categorie);
        return elenco_categorie;
    }

    return(
        <GameContext.Provider
        value={{
            listaGiochi: elencoGiochi,
            aggiungiGiocoAllaLista: addNewGameToList,
            showListaGiochi: showElencoGiochi,
            showBarraRicercaBottone: showSearchBoxAndButton,
            oggettoGioco: gameObject,
            risultatiGioco: gameResults,
            risposteUtente: risultati_gioco,
            showAggiungiNuovoGioco: showAddNewGame,
            formCreaNuovoGioco: formCreateNewGame,
            chiudiFormCreaNuovoGioco: closeFormCreateNewGame,
            iniziaGioco: startGame,
            domandeDeiQuizConImmagini: elencoDomandeQuizImmagini,
            domandeDeiQuiz: elencoDomandeQuiz,
            showAggiungiNuovaDomanda: showAddNewQuestion,
            formCreaNuovaDomanda: formCreateNewQuestion,
            chiudiFormCreaNuovaDomanda: closeformCreateNewQuestion,
            aggiungiDomandaAllaLista: addNewQuestionToList,
            PROVIAMO: PROVAPROVA
        }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;