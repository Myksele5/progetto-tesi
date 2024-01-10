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
        let result;

        result = await getServerMgr().getQuestionsList(auth_ctx.utenteLoggatoUID)
        .catch((err) => {
            console.error(err)
        });

        if(result !== null){
            setElencoDomande(result);
            console.log(result);
        }
        else{
            setElencoDomande([]);
        }

        // const domandeQuiz = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz`);
        // const domandeQuizImmagini = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz-immagini`);
        // const domandeCLP = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-c.l.p.`);
        const giochiDB = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `giochi`);

        // const docsDomandeQuiz = await getDocs(domandeQuiz);
        // const docsDomandeQuizImmagini = await getDocs(domandeQuizImmagini);
        // const docsDomandeCLP = await getDocs(domandeCLP);
        const docsGiochi = await getDocs(giochiDB);

        // const listaDomandeQuiz = docsDomandeQuiz.docs.map((domanda) => ({
        //     ...domanda.data(),
        //     id: domanda.id
        // }))
        // console.log(listaDomandeQuiz);

        // const listaDomandeQuizImmagini = docsDomandeQuizImmagini.docs.map((domanda) => ({
        //     ...domanda.data(),
        //     id: domanda.id
        // }))
        // console.log(listaDomandeQuizImmagini);

        // const listaDomandeCLP = docsDomandeCLP.docs.map((domanda) => ({
        //     ...domanda.data(),
        //     id: domanda.id
        // }))
        // console.log(listaDomandeCLP);

        const listaGiochi = docsGiochi.docs.map((gioco) => ({
            ...gioco.data(),
            id: gioco.id
        }))
        console.log(listaGiochi);

        // setElencoDomandeQuiz(listaDomandeQuiz);
        // setElencoDomandeQuizImmagini(listaDomandeQuizImmagini);
        // setElencoParoleDaCompletare(listaDomandeCLP);
        setElencoGiochi(listaGiochi);
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

    async function addNewGameToList(name, type, level, questionsList){
        if(type === "RIFLESSI"){
            var new_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                numeroRound: questionsList
            }
        }
        else{
            var new_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                domandeGioco: [...questionsList]
            }
        }

        const listaGiochiReference = collection(db, `${auth_ctx.utenteLoggato}`, `info`, `giochi`)
        try {
            await addDoc(listaGiochiReference, new_game)
        } catch (err) {
            console.error(err)
        }
        
        setElencoGiochi(vecchioElenco => {
            return [new_game, ...vecchioElenco]
        });

        // console.log("CODICE DEL GIOCO APPENA CREATO---> " + counter_CODICE_GIOCO);
        // counter_CODICE_GIOCO++;
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

        // if(tipoGioco === "QUIZ"){
        //     for(var i=0; i < elencoDomande.length; i++){
        //         ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuiz[i].categoria;
        //         elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
        //     }
        //     elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        // }

        // if(tipoGioco === "QUIZ CON IMMAGINI"){
        //     for(var j=0; j < elencoDomandeQuizImmagini.length; j++){
        //         ULTIMA_CATEGORIA_AGGIUNTA = elencoDomandeQuizImmagini[j].categoria;
        //         elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
        //     }
        //     elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        // }

        // if(tipoGioco === "COMPLETA LA PAROLA"){
        //     for(var x=0; x < elencoParoleDaCompletare.length; x++){
        //         ULTIMA_CATEGORIA_AGGIUNTA = elencoParoleDaCompletare[x].categoria;
        //         elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
        //     }
        //     elenco_categorie = elenco_temporaneo.filter(uniqueCategories);
        // }

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

    async function addModifiedGameToList(name, type, level, gameID, questionsList){
        console.log("POCO PRIMA DI SALVARE");
        console.log(questionsList);

        if(type === "RIFLESSI"){
            var modified_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                // codiceGioco: gameID,
                numeroRound: questionsList
            }
        }
        else{
            var modified_game = {
                nomeGioco: name,
                tipoGioco: type,
                livelloGioco: level,
                // codiceGioco: gameID,
                domandeGioco: questionsList
            }
        }

        for(let i=0; i < elencoGiochi.length; i++){
            console.log("QUANTI GIOCHI CI SONO? --->" + elencoGiochi.length);
            if(gameID === elencoGiochi[i].id){
                const giocoReference = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `giochi`, `${elencoGiochi[i].id}`);
                await updateDoc(giocoReference, modified_game)
                .catch((err) => {
                    console.error(err)
                })
                // elencoGiochi[i] = modified_game;
                // setElencoGiochi(elencoGiochi);
            }
        }
        getAllGamesQuestions();
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

    async function deleteGame(gameID){
        for(let i=0; i < elencoGiochi.length; i++){
            console.log("CERCO IL GIOCO");
            if(gameID === elencoGiochi[i].id){
                const giocoReference = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `giochi`, `${gameID}`);
                await deleteDoc(giocoReference)
                .catch((err) => {
                    console.error(err);
                });

                console.log("GIOCO DA ELIMINARE TROVATO");
                // elencoGiochi.splice(i, 1);
                
                break;
            }
        }
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

        // if(tipoGioco === "QUIZ"){

        //     for(var i=0; i < elencoDomandeQuiz.length; i++){
        //         if(indovina === elencoDomandeQuiz[i].indovina){
        //             var id = elencoDomandeQuiz[i].id;
        //             const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz`, id);
        //             await deleteDoc(giocoDoc)
        //             .catch((err) => {console.error(err)});

        //             elencoDomandeQuiz.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // setElencoDomandeQuiz(elencoDomandeQuiz);
        // }

        // if(tipoGioco === "QUIZ CON IMMAGINI"){
        //     for(var i=0; i < elencoDomandeQuizImmagini.length; i++){
        //         if(indovina === elencoDomandeQuizImmagini[i].indovina){
        //             var id = elencoDomandeQuizImmagini[i].id;
        //             const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz-immagini`, id);
        //             await deleteDoc(giocoDoc)
        //             .catch((err) => {console.error(err)});

        //             const listaImmaginiQuizRef= ref(storage, `${auth_ctx.utenteLoggato}/${id}`);
        //             await deleteObject(listaImmaginiQuizRef)
        //             .then(() => {alert("Immagine cancellata.")})
        //             .catch((err) => {console.error(err)});

        //             // elencoDomandeQuizImmagini.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // setElencoDomandeQuizImmagini(elencoDomandeQuizImmagini);
        // }

        // if(tipoGioco === "COMPLETA LA PAROLA"){
        //     for(var i=0; i < elencoParoleDaCompletare.length; i++){
        //         if(indovina === elencoParoleDaCompletare[i].indovina){
        //             // elencoParoleDaCompletare.splice(i, 1);
        //             var id = elencoParoleDaCompletare[i].id;
        //             const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-c.l.p.`, id);
        //             await deleteDoc(giocoDoc)
        //             .catch((err) => {console.error(err)});

        //             // elencoParoleDaCompletare.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // setElencoParoleDaCompletare(elencoParoleDaCompletare);
        // }
        getAllGamesQuestions();
    }

    async function addModifiedQuestionToList(tipoGioco, domandaModificata, ID){
        if(tipoGioco === "QUIZ"){
            delete domandaModificata.fileXstorage;
            delete domandaModificata.fileXstorageDACANCELLARE;
            delete domandaModificata.indovinaDACANCELLARE;

            for(var i=0; i < elencoDomandeQuiz.length; i++){
            //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                if(ID === elencoDomandeQuiz[i].id){
                    console.log("TROVATA DOMANDA DA MODIFICARE");
                    const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz`, ID);
                    await updateDoc(giocoDoc, domandaModificata)
                    .then(() => {alert("Domanda modificata!")})
                    .catch((err) => {console.error(err)});

                    // elencoDomandeQuiz[i] = domandaModificata;
                    // setElencoDomandeQuiz(elencoDomandeQuiz);
                }
            }
            // getAllGamesQuestions();
        }
        if(tipoGioco === "QUIZ CON IMMAGINI"){
            delete domandaModificata.indovina;

            for(var j=0; j < elencoDomandeQuizImmagini.length; j++){

            //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                if(ID === elencoDomandeQuizImmagini[j].id){
                    console.log("TROVATA DOMANDA DA MODIFICARE");
                    var image = null;

                    if(Object.hasOwn(domandaModificata, 'fileXstorage')){
                        image = domandaModificata.fileXstorage;
                    }
                    delete domandaModificata.fileXstorage;

                    const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-quiz-immagini`, ID);
                    await updateDoc(giocoDoc, domandaModificata)
                    .then(() => {alert("Domanda modificata!")})
                    .catch((err) => {console.error(err)});
                    
                    
                    if(image !== null){
                        const listaImmaginiStorage = ref(storage, `${auth_ctx.utenteLoggato}/${ID}`);
                        await uploadBytes(listaImmaginiStorage, image)
                        .then(() => {
                            alert("Immagine salvata!");
                        })
                        .catch((err) => {
                            console.error(err)
                        });
                    }

                    // elencoDomandeQuizImmagini[j] = domandaModificata;
                    // setElencoDomandeQuizImmagini(elencoDomandeQuizImmagini);
                    // setElencoDomandeQuizImmagini(vecchioElenco => {
                    //     return [nuova_domanda, ...vecchioElenco]
                    // });
                }
            }
            // getAllGamesQuestions();
        }
        

        if(tipoGioco === "COMPLETA LA PAROLA"){
            for(var x=0; x < elencoParoleDaCompletare.length; x++){
                
                //QUESTO CONTROLLO NON FUNZIONA BISOGNA INSERIRE UN ID UNICO---> si risolve con FIREBASE
                if(ID === elencoParoleDaCompletare[x].id){
                    console.log("TROVATA DOMANDA DA MODIFICARE");
                    const giocoDoc = doc(db, `${auth_ctx.utenteLoggato}`, `info`, `domande-c.l.p.`, ID);
                    await updateDoc(giocoDoc, domandaModificata)
                    .then(() => {alert("Domanda modificata!")})
                    .catch((err) => {console.error(err)});
                    
                    // elencoParoleDaCompletare[x] = domandaModificata;
                    // setElencoDomandeQuizImmagini(elencoParoleDaCompletare);
                }
            }
            // getAllGamesQuestions();
        }
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