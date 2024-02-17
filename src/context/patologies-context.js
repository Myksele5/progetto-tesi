import React, { useState } from "react";

const PatologiesContext = React.createContext({
    listaPatologie: null,
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
    getTherapiesListSinglePat: ()=>{}
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
                {terapia: "Antibiotico per 2 settimane; una pillola al giorno fino ad un massimo di due a distanza di 8 ore l'una dall'altra", note: ""}
            ]
        }
    ];

    const [listaVisibile, setListaVisibile] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showFormAddPat, setShowFormAddPat] = useState(false);
    const [showTherapies, setShowTherapies] = useState(false);
    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState({})

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
        for(let i=0; i < arrayDummyPatologie.length; i++){
            if(arrayDummyPatologie[i].patologia === singlePat){
                patologia = arrayDummyPatologie[i]
            }
        }
        return patologia;
    }

    return(
        <PatologiesContext.Provider
            value={{
                listaPatologie: arrayDummyPatologie,
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
                getTherapiesListSinglePat: prendiListaTerapieDiPatologia
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;