import React, { useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";

const TestsContext = React.createContext({
    listaTest: null,
    listaTestDB: null,
    qstnsAreaCog1: null,
    qstnsAreaCog2: null,
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
    const [elencoTestDB, setElencoTestDB] = useState([]);
    const [domandeTestAreaCog_1, setDomandeTestAreaCog_1] = useState([]);
    const [domandeTestAreaCog_2, setDomandeTestAreaCog_2] = useState([]);

    useEffect(() => {
        setElencoTest(arrayTestProvvisorio);
        console.log(arrayTestProvvisorio);

        getTestList();
        getQuestionsAreaCog_1();
        getQuestionsAreaCog_2();
    }, []);

    async function getTestList(){
        let resultTestList;

        const parseResult = (resultsArray) => {
            let markersList = {}
            resultsArray.forEach((item) => {
                let currentMarker = (({testID, nomeTest, tipoTest}) => ({testID, nomeTest, tipoTest, domandeID_AC1: []}))(item);
                markersList[item.testID] ??= currentMarker
                if(item.IDqstn_AC1 !== null) {
                    markersList[item.testID].domandeID_AC1.push(item.IDqstn_AC1)
                }
            })

            let arrayTests = []
            Object.keys(markersList).forEach((item) => {
                arrayTests.push(markersList[item])
            })

            return arrayTests;
        }

        resultTestList = await getServerMgr().getTestsList(1)
        .catch((err) => {console.error(err)});

        if(resultTestList !== null){
            let rispostaParsata = parseResult(resultTestList)
            setElencoTestDB(rispostaParsata);
            console.log(resultTestList);
            console.log(rispostaParsata);
        }
        else{
            setElencoTestDB([]);
        }
        
    }

    //VERIFICA
    async function getQuestionsAreaCog_1(){
        let result;

        result = await getServerMgr().getTestsQuestionsAreaCog_1()
        .catch((err) => {console.error(err)})
        console.log(result);

        if(result !== null){
            setDomandeTestAreaCog_1(result);
        }
        else{
            setDomandeTestAreaCog_1([]);
        }
    }

    async function getQuestionsAreaCog_2(){
        let result;

        result = await getServerMgr().getTestsQuestionsAreaCog_2()
        .catch((err) => {console.error(err)})
        console.log(result);

        if(result !== null){
            setDomandeTestAreaCog_2(result);
        }
        else{
            setDomandeTestAreaCog_2([]);
        }
    }
    //FUNCTION PER AREA COG2

    async function salvaRisultatoTestMMSE(resultMMSE, pazienteID){
        let result;

        result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        .catch((err) => {console.error(err)})
    }

    return(
        <TestsContext.Provider
        value={{
            listaTest: elencoTest,
            listaTestDB: elencoTestDB,
            qstnsAreaCog1: domandeTestAreaCog_1,
            qstnsAreaCog2: domandeTestAreaCog_2,
            salvaRisultatoMMSE: salvaRisultatoTestMMSE
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;