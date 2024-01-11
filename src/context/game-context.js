import React, {useState, useContext, useEffect} from "react";
import PatientContext from "./patients-context";
import Modal from "../components/UI/Modal";

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase-config";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import AuthContext from "./auth-context";
import { getServerMgr } from "../backend_conn/ServerMgr";

// let counter_CODICE_GIOCO = 0;
let modal_eliminazione;

const GameContext = React.createContext({
    listaGiochi: null,
    aggiungiGiocoAllaLista: ()=>{},
    formCreaNuovoGioco: ()=>{},
    domandeDaModificare: null,
    modificaGioco: ()=>{},
    salvaGiocoModificato: ()=>{},
    eliminaGioco: ()=>{},
    domande: null,
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

    const [elencoGiochi, setElencoGiochi] = useState([])
    const [elencoDomande, setElencoDomande] = useState([]);
    const [elencoDomandeQuiz, setElencoDomandeQuiz] = useState([]);
    const [elencoDomandeQuizImmagini, setElencoDomandeQuizImmagini] = useState([]);
    const [elencoParoleDaCompletare, setElencoParoleDaCompletare] = useState([]);
    const [domandeModifica, setDomandeModifica] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const auth_ctx = useContext(AuthContext);

    useEffect(() => {
        getAllGamesQuestions();
    }, [])

    async function getAllGamesQuestions(){
        let resultQuestions;
        let resultGames;

        resultQuestions = await getServerMgr().getQuestionsList(auth_ctx.utenteLoggatoUID)
        .catch((err) => {
            console.error(err)
        });

        if(resultQuestions !== null){
            setElencoDomande(resultQuestions);
            console.log(resultQuestions);
        }
        else{
            setElencoDomande([]);
        }

        resultGames = await getServerMgr().getGamesList(auth_ctx.utenteLoggatoUID)
        .catch((err) => {
            console.error(err)
        });

        if(resultGames !== null){
            setElencoGiochi(resultGames);
            console.log(resultGames);
        }
        else{
            setElencoGiochi([]);
        }
    }

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

    async function addNewGameToList(name, type, level, category, questionsList){
        let result;

        result = await getServerMgr().addGame(auth_ctx.utenteLoggatoUID, name, type, level, category, questionsList)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
    }

    async function addNewQuestionToList(nuova_domanda){
        
        let result;

        result = await getServerMgr().addQuestion(
            nuova_domanda.doctor_UID, nuova_domanda.tipoGioco, nuova_domanda.categoria, nuova_domanda.domanda,
            nuova_domanda.rispCorrette.correct_answer_n1, nuova_domanda.rispCorrette.correct_answer_n2, nuova_domanda.rispCorrette.correct_answer_n3, nuova_domanda.rispCorrette.correct_answer_n4,
            nuova_domanda.rispSbagliate.wrong_answer_n1, nuova_domanda.rispSbagliate.wrong_answer_n2, nuova_domanda.rispSbagliate.wrong_answer_n3, nuova_domanda.rispSbagliate.wrong_answer_n4
        )

        // const listaDomandeGiochiReference = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz`);

        // try {
        //     await addDoc(listaDomandeGiochiReference, nuova_domanda)
        // } catch (err) {
        //     console.error(err)
        // }
        
        getAllGamesQuestions();
    }

    function uniqueCategories(categoria, indice, arrayCategorie){
        return arrayCategorie.indexOf(categoria) === indice;
    }

    function getAllCategories(tipoGioco){

        var ULTIMA_CATEGORIA_AGGIUNTA;
        var elenco_temporaneo = [];
        var elenco_categorie;

        for(var i=0; i < elencoDomande.length; i++){
            if(tipoGioco === elencoDomande[i].tipoGioco){
                // console.log(elencoDomande[i].categoria);
                ULTIMA_CATEGORIA_AGGIUNTA = elencoDomande[i].categoria;
                elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
            }
        }
        // console.log(elenco_temporaneo);

        elenco_categorie = elenco_temporaneo.filter(uniqueCategories);

        return elenco_categorie;
    }

    function editGame(listaa){
        let domandeParsate = JSON.parse(listaa.domande);
        console.log(domandeParsate);

        if(listaa.tipoGioco !== "RIFLESSI"){
            setDomandeModifica(domandeParsate);
        }
        else{
            setDomandeModifica([listaa.numeroRound]);
        }
    }

    async function addModifiedGameToList(name, level, category, questionsList, gameID){
        console.log("POCO PRIMA DI SALVARE");
        console.log(questionsList);

        let result;

        result = await getServerMgr().updateGame(name, level, category, questionsList, gameID)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
        // console.log("CODICE DEL GIOCO MODIFICATO---> " + gameID);
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

    async function deleteGame(gameID){
        let result;

        result = await getServerMgr().deleteGame(gameID)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
    }

    function modalDeleteQuestion(tipoGioco, ID){
        modal_eliminazione =
            <Modal
                testoModale={"Sei sicuro di voler eliminare questa domanda?"}
                CONFERMA={() =>{
                    deleteQuestion(tipoGioco, ID);
                    setShowModal(false);
                }}
                ANNULLA={() => {
                    setShowModal(false);
                }}>
            </Modal>;
            
        setShowModal(true);
    }

    async function deleteQuestion(ID){
        let result;

        result = await getServerMgr().deleteQuestion(ID)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
    }

    async function addModifiedQuestionToList(domandaModificata, ID){
        let result;

        result = await getServerMgr().updateQuestion(
            domandaModificata.domanda, domandaModificata.rispCorrette.correct_answer_n1, domandaModificata.rispCorrette.correct_answer_n2, 
            domandaModificata.rispCorrette.correct_answer_n3, domandaModificata.rispCorrette.correct_answer_n4, domandaModificata.rispSbagliate.wrong_answer_n1,
            domandaModificata.rispSbagliate.wrong_answer_n2, domandaModificata.rispSbagliate.wrong_answer_n3, domandaModificata.rispSbagliate.wrong_answer_n4, ID
        )
        getAllGamesQuestions();
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
            domande: elencoDomande,
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