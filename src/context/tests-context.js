import React, { useContext, useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";
import PatientContext from "./patients-context";
import SchedaSingoloTest from "../components/Attività/SchedaSingoloTest";
import AuthContext from "./auth-context";

let scheda_test_paziente;

const TestsContext = React.createContext({
    listaTest: null,
    mainPage: null,
    showMainPage: ()=>{},
    hideMainPage: ()=>{},
    testPaziente: null,
    prendiTestPaziente:()=>{},
    schedaSingoloTest: null,
    showSchedaTest:()=>{},
    hideSchedaTest:()=>{},
    formAddValutazione: null,
    showFormAddValutazione: ()=>{},
    hideFormAddValutazione: ()=>{},
    salvaRisultatoMMSE: ()=>{},
    salvaRisultatoMoCA: ()=>{}
})

export function TestsContextProvider(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    const [elencoTest, setElencoTest] = useState([]);
    const [mainPage, setMainPage] = useState(true);
    const [schedaTest, setSchedaTest] = useState(false);
    const [formValutazione, setFormValutazione] = useState(false);

    useEffect(() => {
        getTestsList();
        // console.log(elencoTest)
    }, []);

    async function getTestsList(){
        let result = await getServerMgr().getTestResultList(auth_ctx.utenteLoggatoUID).catch((err) => {console.error(err)})
        console.log(result)
        if(result){
            setElencoTest(result);
        }
        else{
            setElencoTest([]);
        }
    }

    async function getPatientTest(testID, nome, cognome, tipoTest, punteggioTest, dataSvolgimento){
        let risultatiTest;

        if(tipoTest === "MMSE"){
            risultatiTest = await getServerMgr().getSingleTestMMSE(testID).catch((err) => {console.error(err)})
        }

        if(tipoTest === "MoCA"){
            risultatiTest = await getServerMgr().getSingleTestMoCA(testID).catch((err) => {console.error(err)})
        }

        console.log(risultatiTest)

        showSchedaTest();

        scheda_test_paziente = 
        <SchedaSingoloTest
            id={testID}
            nome={nome}
            cognome={cognome}
            tipoTest={tipoTest}
            punteggioTest={punteggioTest}
            dataSvolgimento={dataSvolgimento}
            risultatiTest={risultatiTest}
        ></SchedaSingoloTest>
    }

    function showMainPage(){
        setMainPage(true);
    }
    function hideMainPage(){
        setMainPage(false);
    }

    function showSchedaTest(){
        setSchedaTest(true);
        hideMainPage();
    }
    function hideSchedaTest(){
        setSchedaTest(false);
        showMainPage();
    }

    function showFormAddValutazione(){
        setFormValutazione(true);
        hideMainPage();
    }
    function hideFormAddValutazione(){
        setFormValutazione(false);
        showMainPage();
    }

    async function salvaRisultatoTestMMSE(resultMMSE, pazienteID, arrayRisposte, doctorID){
        var dateee = new Date();
        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();
        let dateString = `${year}-${month}-${day}`;

        let result;

        result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        .catch((err) => {console.error(err)})

        await getServerMgr().updateTestResultList(pazienteID, "MMSE", resultMMSE, dateString, arrayRisposte, doctorID)
        .catch((err) => {console.error(err)})

        getTestsList();
        patients_ctx.updateListaPazienti();
    }

    async function salvaRisultatoTestMoCA(resultMoCA, pazienteID, arrayRisposte, doctorID){
        var dateee = new Date();
        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();
        let dateString = `${year}-${month}-${day}`;
        let result;

        result = await getServerMgr().saveResultMoCA(resultMoCA, pazienteID)
        .catch((err) => {console.error(err)})

        await getServerMgr().updateTestResultList(pazienteID, "MoCA", resultMoCA, dateString, arrayRisposte, doctorID)
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
            testPaziente: scheda_test_paziente,
            prendiTestPaziente: getPatientTest,
            schedaSingoloTest: schedaTest,
            showSchedaTest:showSchedaTest,
            hideSchedaTest:hideSchedaTest,
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