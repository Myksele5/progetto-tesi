import React, { useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";

const TestsContext = React.createContext({
    listaTest: null,
    mainPage: null,
    showMainPage: ()=>{},
    hideMainPage: ()=>{},
    formAddValutazione: null,
    showFormAddValutazione: ()=>{},
    hideFormAddValutazione: ()=>{},
    salvaRisultatoMMSE: ()=>{}
})

export function TestsContextProvider(props){
    var arrayTestProvvisorio = [
        {
            id: "1",
            testType: "MMSE",
            nomeTest: "Test MMSE",
            objAreaCog_1: {
                domanda_1: "In che anno ci troviamo?",
                domanda_2: "In che mese ci troviamo?",
                domanda_3: "Che giorno è oggi?",
                domanda_4: "Quale giorno della settimana è oggi?",
                domanda_5: "In quale stagione ci troviamo?",
                domanda_6: "In quale nazione siamo?",
                domanda_7: "In quale regione?",
                domanda_8: "In quale città ci troviamo?",
                domanda_9: "In che luogo ci troviamo?",
                domanda_10: "A quale piano siamo adesso?",
            },
            objAreaCog_2: {
                parolaDaMemorizzare_1: "PIANTA",
                parolaDaMemorizzare_2: "CANE",
                parolaDaMemorizzare_3: "LAGO",
            },
            objAreaCog_3: {
                parola: "MONDO"
            },
            objAreaCog_4: {
                parolaDaMemorizzare_1: "PIANTA",
                parolaDaMemorizzare_2: "CANE",
                parolaDaMemorizzare_3: "LAGO",
            },
            objAreaCog_5: {
                esercizio_1: {
                    domanda: "Scrivi i nomi di questi oggetti",
                    oggetto_1: "Banana",
                    oggetto_2: "Fragola"
                },
                esercizio_2: {
                    domanda: "Ripeti la frase",
                    frase: "TRE TRENTINI"
                },
                esercizio_3: {
                    domanda: "Esegui questa azione",
                    azione: "Prendi il foglio di carta, piegalo a metà e buttalo per terra."
                },
                esercizio_4: {
                    domanda: "Scrivi una frase"
                },
                esercizio_5: {
                    domanda: "Esegui questa azione",
                    azione: "Chiudi gli occhi"
                }
            },
        },
        {
            id: "2",
            testType: "MOCA",
            nomeTest: "Test MOCA"
        },
        {
            id: "3",
            nomeTest: "Altro Test 1"
        },
        {
            id: "4",
            nomeTest: "Altro Test 2"
        },
        {
            id: "5",
            nomeTest: "Altro Test 3"
        }
    ];

    const [elencoTest, setElencoTest] = useState(arrayTestProvvisorio);
    const [mainPage, setMainPage] = useState(true);
    const [formValutazione, setFormValutazione] = useState(false);

    useEffect(() => {
        setElencoTest(arrayTestProvvisorio);
        console.log(arrayTestProvvisorio);
    }, []);

    function showMainPage(){
        setMainPage(true);
    }
    function hideMainPage(){
        setMainPage(false);
    }

    function showFormAddValutazione(){
        setFormValutazione(true);
        hideMainPage();
    }
    function hideFormAddValutazione(){
        setFormValutazione(false);
        showMainPage();
    }

    async function salvaRisultatoTestMMSE(resultMMSE, pazienteID){
        let result;

        result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        .catch((err) => {console.error(err)})
    }

    return(
        <TestsContext.Provider
        value={{
            listaTest: elencoTest,
            mainPage: mainPage,
            showMainPage: showMainPage,
            hideMainPage: hideMainPage,
            formAddValutazione: formValutazione,
            showFormAddValutazione: showFormAddValutazione,
            hideFormAddValutazione: hideFormAddValutazione,
            salvaRisultatoMMSE: salvaRisultatoTestMMSE
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;