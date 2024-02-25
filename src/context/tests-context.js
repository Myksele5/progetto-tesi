import React, { useContext, useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";
import PatientContext from "./patients-context";

const TestsContext = React.createContext({
    listaTest: null,
    mainPage: null,
    showMainPage: ()=>{},
    hideMainPage: ()=>{},
    formAddValutazione: null,
    showFormAddValutazione: ()=>{},
    hideFormAddValutazione: ()=>{},
    salvaRisultatoMMSE: ()=>{},
    salvaRisultatoMoCA: ()=>{}
})

export function TestsContextProvider(props){
    const patients_ctx = useContext(PatientContext);

    const [elencoTest, setElencoTest] = useState([]);
    const [mainPage, setMainPage] = useState(true);
    const [formValutazione, setFormValutazione] = useState(false);

    useEffect(() => {
        getTestsList();
        // console.log(elencoTest)
    }, []);

    async function getTestsList(){
        let result = await getServerMgr().getTestResultList().catch((err) => {console.error(err)})
        console.log(result)
        setElencoTest(result);
    }

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
        var dateee = new Date();
        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();
        let dateString = `${year}-${month}-${day}`;

        let result;

        result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        .catch((err) => {console.error(err)})

        await getServerMgr().updateTestResultList(pazienteID, "MMSE", resultMMSE, dateString)
        .catch((err) => {console.error(err)})

        getTestsList();
        patients_ctx.updateListaPazienti();
    }

    async function salvaRisultatoTestMoCA(resultMoCA, pazienteID){
        var dateee = new Date();
        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();
        let dateString = `${year}-${month}-${day}`;
        let result;

        result = await getServerMgr().saveResultMoCA(resultMoCA, pazienteID)
        .catch((err) => {console.error(err)})

        await getServerMgr().updateTestResultList(pazienteID, "MoCA", resultMoCA, dateString)
        .catch((err) => {console.error(err)})

        getTestsList();
        patients_ctx.updateListaPazienti();
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
            salvaRisultatoMMSE: salvaRisultatoTestMMSE,
            salvaRisultatoMoCA: salvaRisultatoTestMoCA
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;