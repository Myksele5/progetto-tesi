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
    hideTherapiesList: ()=>{}
})

export function PatologiesContextProvider(props){
    const arrayDummyPatologie = [
        {
            id: 1,
            patologia: "Lago",
            terapie: ["Assunzione Augmentyn 2 volte al giorno", "Terapia per sociopatia", "Contenimento del problema"],
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            id: 2,
            patologia: "Myks",
            terapie: ["Terapia contenimento", "Terapia per sociopatia", "Contenimento del problema"],
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            id: 3,
            patologia: "Domenico",
            terapie: ["Terapia contenimento", "Terapia per sociopatia", "Contenimento del problema"],
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            id: 4,
            patologia: "Marquinhos",
            terapie: ["Terapia contenimento", "Terapia per sociopatia", "Contenimento del problema"],
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            id: 5,
            patologia: "Vito",
            terapie: ["Terapia contenimento", "Terapia per sociopatia", "Contenimento del problema"],
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        }
    ];

    const [listaVisibile, setListaVisibile] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);
    const [showFormAddPat, setShowFormAddPat] = useState(false);
    const [showTherapies, setShowTherapies] = useState(false);

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
                hideTherapiesList: nascondiListaTerapie
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;