import React, { useEffect, useState } from "react";
import { getServerMgr } from "../backend_conn/ServerMgr";

const PatologiesContext = React.createContext({
    listaPatologie: null,
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
    showPatologia: ()=>{},
    getTherapiesListSinglePat: ()=>{},
    uniqueList: null,
    createUniqueObject: ()=>{}
})

export function PatologiesContextProvider(props){
    const arrayDummyPatologie = [
        {
            id: 1,
            patologia: "Alzheimer",
            terapie: [
                {terapia: "Assunzione Augmentyn 2 volte al giorno", note: "..."}, 
                {terapia: "Esercizi cognitivi da svolgere quotidianamente; almeno due esercizi al giorno", note: "Consigliati quiz"}, 
                {terapia: "Contenimento del problema", note: "Valutare stato psicofisico del paziente"}
            ]
        },
        {
            id: 2,
            patologia: "Frattura clavicola",
            terapie: [
                {terapia: "Tutore spalla per bloccaggio clavicola", note: "Lasciare liberi gomito e mano"},
                {terapia: "Ebyndo antidolorifico una pillola al giorno fino ad un massimo di tre ogni 8 ore", note: "Chiedere di eventuali allergie"},
            ]
        },
        {
            id: 3,
            patologia: "Parkinson",
            terapie: [
                {terapia: "Assunzione Augmentyn polvere in busta 2 volte al giorno", note: ""}, 
                {terapia: "Terapia per sociopatia", note: ""}, 
                {terapia: "Assunzione olio CBD, 0.5 mg al giorno massimo", note: ""}
            ]
        },
        {
            id: 4,
            patologia: "Cancro",
            terapie: [
                
            ]
        },
        {
            id: 5,
            patologia: "Febbre",
            terapie: [
                {terapia: "Antibiotico per 2 settimane; una pillola al giorno fino ad un massimo di due a distanza di 8 ore l'una dall'altra", note: "A necessità aggiungere sciroppo"}
            ]
        }
    ];

    const [elencoPatologie, setElencoPatologie] = useState([]);
    const [elencoTerapie, setElencoTerapie] = useState([]);
    const [elencoUnico, setElencoUnico] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [listaVisibile, setListaVisibile] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showFormAddPat, setShowFormAddPat] = useState(false);
    const [showTherapies, setShowTherapies] = useState(false);
    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState({})

    async function recuperaPatologie(){
        let result;

        result = await getServerMgr().getPatologies()
        .catch((err) => {
            console.error(err)
        });

        console.log(result)

        if(result !== null){
            setElencoPatologie(result);
        }
        else{
            setElencoPatologie([]);
        }
    }
    async function recuperaTerapie(){
        let result;

        result = await getServerMgr().getTherapies()
        .catch((err) => {
            console.error(err)
        });

        console.log(result)

        if(result !== null){
            setElencoTerapie(result);
        }
        else{
            setElencoTerapie([]);
        }
    }

    function creaOggettoUnicoPatologieTerapie(){
        let arrayProva = [];

        elencoPatologie.map((pat) => {
            let terapie = [];
            elencoTerapie.map((terap) => {
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
            console.log(oggUnico)
            arrayProva = [...arrayProva, oggUnico]
        })
        setElencoUnico(arrayProva)
        return arrayProva;
        // console.log(elencoUnico)
    }

    useEffect(() => {
        recuperaPatologie();
        recuperaTerapie();
        // creaOggettoUnicoPatologieTerapie();
    }, [])

    

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

    return(
        <PatologiesContext.Provider
            value={{
                listaPatologie: elencoUnico,
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
                showPatologia: setPatologiaVisualizzata,
                getTherapiesListSinglePat: prendiListaTerapieDiPatologia,
                uniqueList: elencoUnico,
                createUniqueObject: creaOggettoUnicoPatologieTerapie
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;