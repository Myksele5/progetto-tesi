import React, { useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";

const TestsContext = React.createContext({
    primaFunzione: ()=>{},
    listaTest: null
})

export function TestsContextProvider(props){
    const [elencoTest, setElencoTest] = useState(null);

    const arrayTestProvvisorio = [
        {
            nomeTest: "Test MMSE"
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

    useEffect(() => {
        setElencoTest(arrayTestProvvisorio);
    }, []);

    function fromArrayToListaTest(){
        elencoTest.map(looppaSuiTest)
    }

    function looppaSuiTest(item){
        return(
            <TestCard
                // nascondiLista={nascondiListaTest}
                cardText={item.nomeTest}
            ></TestCard>
        );
    }

    return(
        <TestsContext.Provider
        value={{
            primaFunzione: fromArrayToListaTest,
            listaTest: elencoTest
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;