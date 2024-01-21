import React, { useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";

const TestsContext = React.createContext({
    listaTest: null
})

export function TestsContextProvider(props){

    var arrayTestProvvisorio = [
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

    const [elencoTest, setElencoTest] = useState(arrayTestProvvisorio);


    useEffect(() => {
        setElencoTest(arrayTestProvvisorio);
        console.log(arrayTestProvvisorio)
    }, []);

    return(
        <TestsContext.Provider
        value={{
            listaTest: elencoTest
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;