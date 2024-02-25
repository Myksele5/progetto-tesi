import React, { useEffect, useState } from "react";
import { getServerMgr } from "../backend_conn/ServerMgr";
import Modal from "../components/UI/Modal";

let modal;

const PatologiesContext = React.createContext({
    showModale: null,
    modale: null,
    uniqueList: null,
    listaTerapie: null,
    visibleLista: null,
    showListaPatologie: ()=>{},
    hideListaPatologie: ()=>{},
    topBar: null,
    showTopBar: ()=>{},
    hideTopBar: ()=>{},
    visibleFormAddPatology: null,
    showFormAddPatology: ()=>{},
    hideFormAddPatology: ()=>{},
    visibleTherapiesList: null,
    showTherapiesList: ()=>{},
    hideTherapiesList: ()=>{},
    patologiaSelezionata: null,
    patologiaSelezionataFormPaziente: null,
    cambiaPatologiaSelezionataFormPaziente: ()=>{},
    showPatologia: ()=>{},
    getTherapiesListSinglePat: ()=>{},
    createUniqueObject: ()=>{},
    saveNewPatologyWithTherapies: ()=>{},
    confirmDeletePatology: ()=>{},
    confirmDeleteTherapy: ()=>{},
    addNewTherapy: ()=>{},
    editTherapy: ()=>{}
})

export function PatologiesContextProvider(props){
    const [elencoPatologie, setElencoPatologie] = useState([]);
    const [elencoTerapie, setElencoTerapie] = useState([]);
    const [elencoUnico, setElencoUnico] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [listaVisibile, setListaVisibile] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showFormAddPat, setShowFormAddPat] = useState(false);
    const [showTherapies, setShowTherapies] = useState(false);
    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState({})
    const [patologiaSelezionataFormPaziente, setPatologiaSelezionataFormPaziente] = useState({})

    async function creaOggettoUnicoPatologieTerapie(){
        let resultPatologie;
        //PRENDO PATOLOGIE
        resultPatologie = await getServerMgr().getPatologies()
        .catch((err) => {
            console.error(err)
        });

        console.log(resultPatologie)

        if(resultPatologie !== null){
            setElencoPatologie(resultPatologie);
        }
        else{
            setElencoPatologie([]);
        }

        let resultTerapie;
        //PRENDO TERAPIE
        resultTerapie = await getServerMgr().getTherapies()
        .catch((err) => {
            console.error(err)
        });

        console.log(resultTerapie)

        if(resultTerapie !== null){
            setElencoTerapie(resultTerapie);
        }
        else{
            setElencoTerapie([]);
        }
        //CREO ARRAY UNICO CON PATOLOGIE E TERAPIE ASSOCIATE
        let arrayProva = [];

        resultPatologie.map((pat) => {
            let terapie = [];
            resultTerapie.map((terap) => {
                if(pat.patologiaID === terap.patolog_ID){
                    let oggetto = {
                        terapiaID: terap.terapiaID,
                        terapia: terap.terapia,
                        note: terap.note
                    }
                    terapie.push(oggetto);
                }
            })
            let oggUnico = {...pat, terapie}
            // console.log(oggUnico)
            arrayProva = [...arrayProva, oggUnico]
        })
        setElencoUnico(arrayProva)

        if(Object.keys(patologiaVisualizzata).length > 0){
            arrayProva.map((patologia) => {
                if(patologia.patologiaID === patologiaVisualizzata.patologiaID){
                    console.log(patologia)
                    console.log(patologiaVisualizzata)
                    setPatologiaVisualizzata(patologia)
                }
            })
        }
        if(Object.keys(patologiaSelezionataFormPaziente).length > 0){
            arrayProva.map((patologia) => {
                if(patologia.patologiaID === patologiaSelezionataFormPaziente.patologiaID){
                    console.log(patologia)
                    console.log(patologiaSelezionataFormPaziente)
                    setPatologiaSelezionataFormPaziente(patologia)
                }
            })
        }
        // console.log(patologiaVisualizzata)

        return arrayProva;
    }

    useEffect(() => {
        // recuperaPatologie();
        // recuperaTerapie();
        creaOggettoUnicoPatologieTerapie();
    }, [])

    function salvaNuovaPatologiaConTerapie(){
        // recuperaPatologie();
        // recuperaTerapie();
        creaOggettoUnicoPatologieTerapie();
        nascondiFormAggiuntaPatologia();
    }

    function mostraListaPatologie(){
        setListaVisibile(true);
    }
    function nascondiListaPatologie(){
        setListaVisibile(false);
    }

    function mostraTopBar(){
        setShowTopBar(true);
    }
    function nascondiTopBar(){
        setShowTopBar(false);
    }

    function mostraFormNuovaPat(){
        setShowFormAddPat(true);
    }

    function nascondiFormaNuovaPat(){
        setShowFormAddPat(false);
    }

    function mostraElencoTerapie(){
        setShowTherapies(true);
    }

    function nascondiElencoTerapie(){
        setShowTherapies(false);
    }

    function mostraFormAggiuntaPatologia(){
        nascondiListaPatologie();
        nascondiTopBar();
        mostraFormNuovaPat();
    }

    function nascondiFormAggiuntaPatologia(){
        mostraListaPatologie();
        mostraTopBar();
        nascondiFormaNuovaPat();
    }

    function mostraListaTerapie(){
        nascondiListaPatologie();
        nascondiTopBar();
        mostraElencoTerapie();
    }

    function nascondiListaTerapie(){
        mostraListaPatologie();
        mostraTopBar();
        nascondiElencoTerapie();
    }

    function prendiListaTerapieDiPatologia(singlePat){
        let patologia;
        for(let i=0; i < elencoUnico.length; i++){
            if(elencoUnico[i].nomePatologia === singlePat){
                patologia = elencoUnico[i]
            }
        }
        return patologia;
    }

    function confermaEliminazionePatologia(patologiaID, nomePatologia){
        modal = 
        <Modal
        testoModale={"Sei sicuro di voler eliminare questa patologia e tutte le terapie associate?"}
        patologia={nomePatologia}
        CONFERMA={() =>{
            eliminaPatologia(patologiaID);
            setShowModal(false);
            // setShowTabella(true);
        }}
        ANNULLA={() => {
            setShowModal(false);
            // setShowTabella(true);
        }}>
        </Modal>;
        setShowModal(true);
    }

    async function eliminaPatologia(patologiaID){
        await getServerMgr().deletePatology(patologiaID)
        .catch((err) => {console.error(err)})

        creaOggettoUnicoPatologieTerapie();
    }

    function confermaEliminazioneTerapia(terapiaID){
        modal = 
        <Modal
        testoModale={"Vuoi eliminare definitivamente questa terapia?"}
        CONFERMA={() =>{
            eliminaTerapia(terapiaID);
            setShowModal(false);
            // setShowTabella(true);
        }}
        ANNULLA={() => {
            setShowModal(false);
            // setShowTabella(true);
        }}>
        </Modal>;
        setShowModal(true);
    }

    async function salvaNuovaTerapia(patologiaID, terapia, note){
        await getServerMgr().saveNewTherapy(patologiaID, terapia, note)
        .catch((err) => {console.error(err)})

        creaOggettoUnicoPatologieTerapie();
    }
    async function eliminaTerapia(terapiaID){
        await getServerMgr().deleteTherapy(terapiaID)
        .catch((err) => {console.error(err)})

        creaOggettoUnicoPatologieTerapie();
    }

    async function modificaTerapia(terapiaID, terapia, note){
        await getServerMgr().editTherapy(terapiaID, terapia, note)
        .catch((err) => {console.error(err)})

        creaOggettoUnicoPatologieTerapie();
    }

    function aggiornaPatologiaSelezionataFormPaziente(pat){
        setPatologiaSelezionataFormPaziente(pat);
    }

    return(
        <PatologiesContext.Provider
            value={{
                showModale: showModal,
                modale: modal,
                uniqueList: elencoUnico,
                listaTerapie: elencoTerapie,
                visibleLista: listaVisibile,
                showListaPatologie: mostraListaPatologie,
                hideListaPatologie: nascondiListaPatologie,
                topBar: showTopBar,
                showTopBar: mostraTopBar,
                hideTopBar: nascondiTopBar,
                visibleFormAddPatology: showFormAddPat,
                showFormAddPatology: mostraFormAggiuntaPatologia,
                hideFormAddPatology: nascondiFormAggiuntaPatologia,
                visibleTherapiesList: showTherapies,
                showTherapiesList: mostraListaTerapie,
                hideTherapiesList: nascondiListaTerapie,
                patologiaSelezionata: patologiaVisualizzata,
                patologiaSelezionataFormPaziente: patologiaSelezionataFormPaziente,
                cambiaPatologiaSelezionataFormPaziente: aggiornaPatologiaSelezionataFormPaziente,
                showPatologia: setPatologiaVisualizzata,
                getTherapiesListSinglePat: prendiListaTerapieDiPatologia,
                createUniqueObject: creaOggettoUnicoPatologieTerapie,
                saveNewPatologyWithTherapies: salvaNuovaPatologiaConTerapie,
                confirmDeletePatology: confermaEliminazionePatologia,
                confirmDeleteTherapy: confermaEliminazioneTerapia,
                addNewTherapy: salvaNuovaTerapia,
                editTherapy: modificaTerapia
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;