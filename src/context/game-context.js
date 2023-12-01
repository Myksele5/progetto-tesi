import React, {useState, useContext} from "react";
import PatientContext from "./patients-context";
import Modal from "../components/UI/Modal";

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

let counter_CODICE_GIOCO = 0;
let modal_eliminazione;

const GameContext = React.createContext({
    listaGiochi: null,
    aggiungiGiocoAllaLista: ()=>{},
    formCreaNuovoGioco: ()=>{},
    domandeDaModificare: null,
    modificaGioco: ()=>{},
    salvaGiocoModificato: ()=>{},
    eliminaGioco: ()=>{},
    domandeDeiQuizConImmagini: null,
    domandeDeiQuiz: null,
    elencoParole: null,
    aggiungiDomandaAllaLista: ()=>{},
    recuperaCategorieDomande: ()=>{},
    showModale: null,
    modale: null,
    salvaRisultatiGiocoPaziente: ()=>{},
    eliminaDomanda: ()=>{},
    salvaDomandaModificata: ()=>{}

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
                    categoria: "Personaggi Famosi",
                    indovina: Einstein,
                    question:{
                        correct_answer: 'Albert Einstein',
                        wrong_answer_n1: 'Isaac Newton',
                        wrong_answer_n2: 'Enrico Fermi',
                        wrong_answer_n3: 'Silvio Berlusconi',
                        wrong_answer_n4: 'Myks'
                    }
                },
                {
                    categoria: "Personaggi Famosi",
                    indovina: Dante,
                    question:{
                        correct_answer: 'Dante Alighieri',
                        wrong_answer_n1: 'Vincent Van Gogh',
                        wrong_answer_n2: 'Niccolò Machiavelli',
                        wrong_answer_n3: 'Giovanni Boccaccio',
                        wrong_answer_n4: 'Myks'
                    }
                },
                {
                    categoria: "Personaggi Famosi",
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
            nomeGioco: "Quiz sport",
            tipoGioco: "QUIZ",
            livelloGioco: "NORMALE",
            codiceGioco: "QUIZ_SPORTIVO",
            domandeGioco:[
                {
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
                    categoria: "Sport",
                    indovina: "Quanti mondiali ha vinto la nazionale di calcio italana?",
                    question:{
                        correct_answer: '5',
                        wrong_answer_n1: '7',
                        wrong_answer_n2: '4',
                        wrong_answer_n3: '3'
                    }
                }
            ]
        },
        {
            nomeGioco: "Completa i mesi",
            tipoGioco: "COMPLETA LA PAROLA",
            livelloGioco: "NORMALE",
            codiceGioco: "C.L.P.",
            domandeGioco:[
                {
                    categoria: "Tutti",
                    indovina: "GENNAIO",
                },
                {
                    categoria: "Tutti",
                    indovina: "FEBBRAIO",
                },
                {
                    categoria: "Tutti",
                    indovina: "MARZO",
                },
                {
                    categoria: "Tutti",
                    indovina: "APRILE",
                }
            ]
        },
        {
            nomeGioco: "Training riflessi",
            tipoGioco: "RIFLESSI",
            livelloGioco: "FACILE",
            codiceGioco: "REFLEXES-1",
            numeroRound: 3
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
            rispCorrette:{
                correct_answer_n1: 'Albert Einstein'
            },
            rispSbagliate:{
                wrong_answer_n1: 'Isaac Newton',
                wrong_answer_n2: 'Enrico Fermi',
                wrong_answer_n3: 'Silvio Berlusconi'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            indovina: Dante,
            rispCorrette:{
                correct_answer_n1: 'Dante Alighieri',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Vincent Van Gogh',
                wrong_answer_n2: 'Niccolò Machiavelli',
                wrong_answer_n3: 'Giovanni Boccaccio'
            }
        },
        {
            livelloDomanda: "normale",
            categoria: "Personaggi Famosi",
            indovina: Marilyn,
            rispCorrette:{
                correct_answer_n1: 'Marilyn Monroe',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Sophia Lauren',
                wrong_answer_n2: 'Chiara Ferragni',
                wrong_answer_n3: 'Meryl Streep'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            indovina: Leonardo,
            rispCorrette:{
                correct_answer_n1: 'Leonardo da Vinci',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Wolfgang Mozart',
                wrong_answer_n2: 'Socrate',
                wrong_answer_n3: 'Caravaggio'
            }
        },
        {
            livelloDomanda: "difficile",
            categoria: "Personaggi Famosi",
            indovina: Napoleone,
            rispCorrette:{
                correct_answer_n1: 'Napoleone Bonaparte',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Giulio Cesare',
                wrong_answer_n2: 'Luigi XIV',
                wrong_answer_n3: 'Alessandro Magno'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Personaggi Famosi",
            indovina: PapaFrancesco,
            rispCorrette:{
                correct_answer_n1: 'Papa Francesco',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Papa Giovanni Paolo II',
                wrong_answer_n2: 'Francesco Totti',
                wrong_answer_n3: 'Giorgia Meloni'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Albicocca,
            rispCorrette:{
                correct_answer_n1: 'Albicocca',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Mango',
                wrong_answer_n2: 'Nocciola',
                wrong_answer_n3: 'Arancia'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Banana,
            rispCorrette:{
                correct_answer_n1: 'Banana',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Carruba',
                wrong_answer_n2: 'Bergamotto',
                wrong_answer_n3: 'Platano'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Ciliegia,
            rispCorrette:{
                correct_answer_n1: 'Ciliegia',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Lampone',
                wrong_answer_n2: 'Pesca',
                wrong_answer_n3: 'Uva'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Fragola,
            rispCorrette:{
                correct_answer_n1: 'Fragola',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Arancia',
                wrong_answer_n2: 'Litchi',
                wrong_answer_n3: 'Prugna'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Mela,
            rispCorrette:{
                correct_answer_n1: 'Mela',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Pera',
                wrong_answer_n2: 'Limone',
                wrong_answer_n3: 'Papaya'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Mirtillo,
            rispCorrette:{
                correct_answer_n1: 'Mirtillo',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Noce',
                wrong_answer_n2: 'Lampone',
                wrong_answer_n3: 'Mora'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Frutti",
            indovina: Nespola,
            rispCorrette:{
                correct_answer_n1: 'Nespola',
            },
            rispSbagliate:{
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
            rispCorrette:{
                correct_answer_n1: 'Los Angeles Lakers',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Boston Celtics',
                wrong_answer_n2: 'New York Knicks',
                wrong_answer_n3: 'Chicago Bulls'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Sport",
            indovina: "Quanti mondiali ha vinto la nazionale di calcio italana?",
            rispCorrette:{
                correct_answer_n1: '5',
            },
            rispSbagliate:{
                wrong_answer_n1: '7',
                wrong_answer_n2: '4',
                wrong_answer_n3: '3'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Storia",
            indovina: "In quale anno è nata la Repubblica Italiana?",
            rispCorrette:{
                correct_answer_n1: '1946',
            },
            rispSbagliate:{
                wrong_answer_n1: '1956',
                wrong_answer_n2: '1990',
                wrong_answer_n3: '1961'
            }
        },
        {
            livelloDomanda: "facile",
            categoria: "Geografia",
            indovina: "Madrid è la capitale di quale nazione?",
            rispCorrette:{
                correct_answer_n1: 'Spagna',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Italia',
                wrong_answer_n2: 'Messico',
                wrong_answer_n3: 'Portogallo'
            }
        },
        {
            livelloDomanda: "normale",
            categoria: "Geografia",
            indovina: "Qual è la montagna più alta del mondo?",
            rispCorrette:{
                correct_answer_n1: 'Everest',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Annapurna I',
                wrong_answer_n2: 'K2',
                wrong_answer_n3: 'Makalu'
            }
        },
        {
            livelloDomanda: "difficile",
            categoria: "Geografia",
            indovina: "Quale tra le seguenti nazioni è la più grande per dimensione?",
            rispCorrette:{
                correct_answer_n1: 'Russia',
            },
            rispSbagliate:{
                wrong_answer_n1: 'Canada',
                wrong_answer_n2: 'Stati Uniti',
                wrong_answer_n3: 'Brasile'
            }
        }
    ];

    const lista_parole_da_completare = [
        {
            livelloDomanda: "normale",
            categoria: "Tutti",
            indovina: "GENNAIO"
        },
        {
            livelloDomanda: "normale",
            categoria: "Tutti",
            indovina: "FEBBRAIO"
        },
        {
            livelloDomanda: "normale",
            categoria: "Tutti",
            indovina: "MARZO"
        },
        {
            livelloDomanda: "facile",
            categoria: "Tutti",
            indovina: "APRILE"
        },
        {
            livelloDomanda: "difficile",
            categoria: "Tutti",
            indovina: "MAGGIO"
        }
    ];

    const [elencoGiochi, setElencoGiochi] = useState(dati_dei_giochi)
    const [elencoDomandeQuiz, setElencoDomandeQuiz] = useState(lista_domande_quiz);
    const [elencoDomandeQuizImmagini, setElencoDomandeQuizImmagini] = useState(lista_domande_quiz_immagini);
    const [elencoParoleDaCompletare, setElencoParoleDaCompletare] = useState(lista_parole_da_completare);
    const [domandeModifica, setDomandeModifica] = useState([]);
    const [showModal, setShowModal] = useState(false);

    function salvaRisultati(risposteUtente, domandeTotali, pazienteDaAggiornare){
        console.log("NUMERO DI DOMANDE ---->" + domandeTotali);
        console.log("RISPOSTE CORRETTE ---->" + risposteUtente);
        console.log("RISPOSTE SBAGLIATE ---->" + (domandeTotali - risposteUtente));

        pazienteDaAggiornare.statistiche.risposteTotali += domandeTotali;
        pazienteDaAggiornare.statistiche.risposteCorrette += risposteUtente;
        pazienteDaAggiornare.statistiche.risposteSbagliate += (domandeTotali - risposteUtente);

        patients_ctx.modificaLista(pazienteDaAggiornare);
    }

    function formCreateNewGame(){
        setDomandeModifica([]);
    }

    function addNewGameToList(name, type, level, questionsList){
        if(type === "RIFLESSI"){
            var new_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                codiceGioco: counter_CODICE_GIOCO,
                numeroRound: questionsList
            }
        }
        else{
            var new_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                codiceGioco: counter_CODICE_GIOCO,
                domandeGioco: [...questionsList]
            }
        }
        
        setElencoGiochi(vecchioElenco => {
            return [new_game, ...vecchioElenco]
        });

        console.log("CODICE DEL GIOCO APPENA CREATO---> " + counter_CODICE_GIOCO);
        counter_CODICE_GIOCO++;
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
        if(tipoGioco === "COMPLETA LA PAROLA"){
            setElencoParoleDaCompletare(vecchioElenco => {
                return [nuova_domanda, ...vecchioElenco]
            });
        }
    }

    function uniqueCategories(categoria, indice, arrayCategorie){
        return arrayCategorie.indexOf(categoria) === indice;
    }

    function getAllCategories(tipoGioco){

        var ULTIMA_CATEGORIA_AGGIUNTA;
        var elenco_temporaneo = [];
        var elenco_categorie;

        if(tipoGioco === "QUIZ"){
            for(var i=0; i < elencoDomandeQuiz.length; i++){
                ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuiz[i].categoria;
                elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
            }
            elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        }

        if(tipoGioco === "QUIZ CON IMMAGINI"){
            for(var j=0; j < elencoDomandeQuizImmagini.length; j++){
                ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuizImmagini[j].categoria;
                elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
            }
            elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            for(var x=0; x < elencoParoleDaCompletare.length; x++){
                ULTIMA_CATEGORIA_AGGIUNTA = elencoParoleDaCompletare[x].categoria;
                elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
            }
            elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        }

        // console.log(elenco_categorie);
        return elenco_categorie;
    }

    function editGame(listaa){
        if(listaa.tipoGioco !== "RIFLESSI"){
            setDomandeModifica(listaa.domandeGioco);
        }
        else{
            setDomandeModifica([listaa.numeroRound]);
        }
    }

    function addModifiedGameToList(name, type, level, gameID, questionsList){
        console.log("POCO PRIMA DI SALVARE");
        console.log(questionsList);

        if(type === "RIFLESSI"){
            var modified_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                codiceGioco: gameID,
                numeroRound: questionsList
            }
        }
        else{
            var modified_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                codiceGioco: gameID,
                domandeGioco: questionsList
            }
        }

        for(let i=0; i < elencoGiochi.length; i++){
            console.log("QUANTI GIOCHI CI SONO? --->" + elencoGiochi.length);
            if(gameID === elencoGiochi[i].codiceGioco){
                elencoGiochi[i] = modified_game;
                setElencoGiochi(elencoGiochi);
            }
        }

        console.log("CODICE DEL GIOCO MODIFICATO---> " + gameID);
    }

    function modalDeleteGame(gameID){
        modal_eliminazione =
            <Modal
                testoModale={"Sei sicuro di voler eliminare il gioco?"}
                CONFERMA={() =>{
                    deleteGame(gameID);
                    setShowModal(false);
                }}
                ANNULLA={() => {
                    setShowModal(false);
                }}>
            </Modal>;
            
        setShowModal(true);
    }

    function deleteGame(gameID){
        for(let i=0; i < elencoGiochi.length; i++){
            console.log("CERCO IL GIOCO");
            if(gameID === elencoGiochi[i].codiceGioco){
                console.log("GIOCO DA ELIMINARE TROVATO");
                elencoGiochi.splice(i, 1);
                
                break;
            }
        }
        setElencoGiochi(elencoGiochi);
    }

    function modalDeleteQuestion(tipoGioco, indovina){
        modal_eliminazione =
            <Modal
                testoModale={"Sei sicuro di voler eliminare questa domanda?"}
                CONFERMA={() =>{
                    deleteQuestion(tipoGioco, indovina);
                    setShowModal(false);
                }}
                ANNULLA={() => {
                    setShowModal(false);
                }}>
            </Modal>;
            
        setShowModal(true);
    }

    function deleteQuestion(tipoGioco, indovina){
        if(tipoGioco === "QUIZ"){
            for(var i=0; i < elencoDomandeQuiz.length; i++){
                if(indovina === elencoDomandeQuiz[i].indovina){
                    elencoDomandeQuiz.splice(i, 1);

                    break;
                }
            }
            setElencoDomandeQuiz(elencoDomandeQuiz);
        }

        if(tipoGioco === "QUIZ CON IMMAGINI"){
            for(var i=0; i < elencoDomandeQuizImmagini.length; i++){
                if(indovina === elencoDomandeQuizImmagini[i].indovina){
                    elencoDomandeQuizImmagini.splice(i, 1);

                    break;
                }
            }
            setElencoDomandeQuizImmagini(elencoDomandeQuizImmagini);
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            for(var i=0; i < elencoParoleDaCompletare.length; i++){
                if(indovina === elencoParoleDaCompletare[i].indovina){
                    elencoParoleDaCompletare.splice(i, 1);

                    break;
                }
            }
            setElencoParoleDaCompletare(elencoParoleDaCompletare);
        }
    }

    function addModifiedQuestionToList(tipoGioco, categoriaM, indovinaM, correttaM, sbagliata_1M, sbagliata_2M, sbagliata_3M){
        var modified_question;

        if(tipoGioco === "QUIZ" || tipoGioco === "QUIZ CON IMMAGINI"){
            modified_question={
                livelloDomanda: "facile",
                categoria: categoriaM,
                indovina: indovinaM,
                rispCorrette:{
                        correct_answer_n1: correttaM,
                },
                rispSbagliate:{
                        wrong_answer_n1: sbagliata_1M,
                        wrong_answer_n2: sbagliata_2M,
                        wrong_answer_n3: sbagliata_3M
                }
            }

            if(tipoGioco === "QUIZ"){
                for(var i=0; i < elencoDomandeQuiz.length; i++){
    
                //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                    if(indovinaM === elencoDomandeQuiz[i].indovina){
                        console.log("TROVATA DOMANDA DA MODIFICARE");
                        
                        elencoDomandeQuiz[i] = modified_question;
                        setElencoDomandeQuiz(elencoDomandeQuiz);
                    }
                }
            }
            if(tipoGioco === "QUIZ CON IMMAGINI"){
                for(var j=0; j < elencoDomandeQuizImmagini.length; j++){
    
                //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                    if(indovinaM === elencoDomandeQuizImmagini[j].indovina){
                        console.log("TROVATA DOMANDA DA MODIFICARE");
                        
                        elencoDomandeQuizImmagini[j] = modified_question;
                        setElencoDomandeQuizImmagini(elencoDomandeQuizImmagini);
                    }
                }
            }
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            modified_question={
                livelloDomanda: "facile",
                categoria: categoriaM,
                indovina: indovinaM.toUpperCase()
            }

            for(var x=0; x < elencoParoleDaCompletare.length; x++){
                
                //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                if(indovinaM === elencoParoleDaCompletare[x].indovina){
                    console.log("TROVATA DOMANDA DA MODIFICARE");
                    
                    elencoParoleDaCompletare[x] = modified_question;
                    setElencoDomandeQuizImmagini(elencoParoleDaCompletare);
                }
            }
        }
    }

    return(
        <GameContext.Provider
        value={{
            listaGiochi: elencoGiochi,
            aggiungiGiocoAllaLista: addNewGameToList,
            formCreaNuovoGioco: formCreateNewGame,
            domandeDaModificare: domandeModifica,
            modificaGioco: editGame,
            salvaGiocoModificato: addModifiedGameToList,
            eliminaGioco: modalDeleteGame,
            domandeDeiQuizConImmagini: elencoDomandeQuizImmagini,
            domandeDeiQuiz: elencoDomandeQuiz,
            elencoParole: elencoParoleDaCompletare,
            aggiungiDomandaAllaLista: addNewQuestionToList,
            recuperaCategorieDomande: getAllCategories,
            showModale: showModal,
            modale: modal_eliminazione,
            salvaRisultatiGiocoPaziente: salvaRisultati,
            eliminaDomanda: modalDeleteQuestion,
            salvaDomandaModificata: addModifiedQuestionToList
        }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;