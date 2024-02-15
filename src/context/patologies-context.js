import React, { useState } from "react";

const PatologiesContext = React.createContext({
    listaPatologie: null,
    visibleLista: null,
    showListaPatologie: ()=>{},
    hideListaPatologie: ()=>{},
    topBar: null,
    showTopBar: ()=>{},
    hideTopBar: ()=>{},
    showFormAddPatology: ()=>{}
})

export function PatologiesContextProvider(props){
    const arrayDummyPatologie = [
        {
            patologia: "Lago",
            terapia: "Medicina 2 volte al giorno a giorni alterni",
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            patologia: "Myks",
            terapia: "Medicina 2 volte al giorno a giorni alterni",
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            patologia: "Domenico",
            terapia: "Medicina 2 volte al giorno a giorni alternidadad dadad ad d adadadaadad adadada adadadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            patologia: "Marquinhos",
            terapia: "Medicina 2 volte al giorno a giorni alternidadad dadad ad d adadadaadad adadada adadadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        },
        {
            patologia: "Vito",
            terapia: "Medicina 2 volte al giorno a giorni alternidadad dadad ad d adadadaadad adadada adadadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            dataInizio: "01-01-1990",
            dataFine: "31-12-1990"
        }
    ];

    const [listaVisibile, setListaVisibile] = useState(true);
    const [showTopBar, setShowTopBar] = useState(true);

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

    function mostraFormAggiuntaPatologia(){
        nascondiListaPatologie();
        nascondiTopBar();
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
                showFormAddPatology: mostraFormAggiuntaPatologia
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;