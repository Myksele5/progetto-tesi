import React, { useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";

const TestsContext = React.createContext({
    listaTest: null,
    salvaRisultatoMMSE: ()=>{}
})

export function TestsContextProvider(props){

    var arrayTestProvvisorio = [
        {
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
            }
        },
        {
            nomeTest: "Test MOCA"
        },
        {
            nomeTest: "Altro Test 1"
        },
        {
            nomeTest: "Altro Test 2"
        },
        {
            nomeTest: "Altro Test 3"
        }
    ];

    const [elencoTest, setElencoTest] = useState(arrayTestProvvisorio);


    useEffect(() => {
        setElencoTest(arrayTestProvvisorio);
        console.log(arrayTestProvvisorio)
    }, []);

    async function salvaRisultatoTestMMSE(resultMMSE, pazienteID){
        let result;

        result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        .catch((err) => {console.error(err)})
    }

    return(
        <TestsContext.Provider
        value={{
            listaTest: elencoTest,
            salvaRisultatoMMSE: salvaRisultatoTestMMSE
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;