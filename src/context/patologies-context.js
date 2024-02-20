import React, { useEffect, useState } from "react";
import { getServerMgr } from "../backend_conn/ServerMgr";

const PatologiesContext = React.createContext({
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
    showPatologia: ()=>{},
    getTherapiesListSinglePat: ()=>{},
    createUniqueObject: ()=>{},
    saveNewPatologyWithTherapies: ()=>{}
})

export function PatologiesContextProvider(props){
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
            // console.log(oggUnico)
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

    async function salvaNuovaPatologiaConTerapie(nuovaPatologia, terapieAssociate){
        let terapieFiltrate = [];

        terapieAssociate.map((singleTerap) => {
            if(singleTerap.terapia.length > 0){
                terapieFiltrate.push(singleTerap)
            }
        })
        
        await getServerMgr().saveNewPatologyWithTherapies(nuovaPatologia, terapieFiltrate)
        .catch((err) => {
            console.error(err);
        });

        recuperaPatologie();
        recuperaTerapie();
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

    return(
        <PatologiesContext.Provider
            value={{
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
                showPatologia: setPatologiaVisualizzata,
                getTherapiesListSinglePat: prendiListaTerapieDiPatologia,
                createUniqueObject: creaOggettoUnicoPatologieTerapie,
                saveNewPatologyWithTherapies: salvaNuovaPatologiaConTerapie
            }}
        >
            {props.children}
        </PatologiesContext.Provider>
    );
}

export default PatologiesContext;