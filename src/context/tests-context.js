import React, { useContext, useEffect, useState } from "react";
import TestCard from "../components/UI/TestCard";
import { getServerMgr } from "../backend_conn/ServerMgr";
import PatientContext from "./patients-context";
import SchedaSingoloTest from "../components/Attività/SchedaSingoloTest";
import AuthContext from "./auth-context";
import EditRisultatiTestMMSE from "../components/Attività/EditRisultatiTestMMSE";

let scheda_test_paziente;
let edit_scheda_test;

const TestsContext = React.createContext({
    listaTest: null,
    mainPage: null,
    showMainPage: ()=>{},
    hideMainPage: ()=>{},
    testPaziente: null,
    prendiTestPaziente:()=>{},
    modificaTestPaziente:()=>{},
    eliminaTestPaziente:()=>{},
    schedaSingoloTest: null,
    schedaTestEdit: null,
    editTest: null,
    showSchedaTest:()=>{},
    hideSchedaTest:()=>{},
    formAddValutazione: null,
    showFormAddValutazione: ()=>{},
    hideFormAddValutazione: ()=>{},
    hideFormEditValutazione: ()=>{},
    salvaRisultatoMMSE: ()=>{},
    aggiornaRisultatoTestMMSE: ()=>{},
    salvaRisultatoMoCA: ()=>{},
    cercaTest: ()=>{},
    stringSearched: null,
    selectOrder:()=>{}
})

export function TestsContextProvider(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    const [elencoTest, setElencoTest] = useState([]);
    const [mainPage, setMainPage] = useState(true);
    const [schedaTest, setSchedaTest] = useState(false);
    const [formValutazione, setFormValutazione] = useState(false);

    const [showEditTest, setShowEditTest] = useState(false);
    const [showEditTestMoCA, setShowEditTestMoCA] = useState(false);

    const [ordinamentoSelezionato, setOrdinamentoSelezionato] = useState("");
    const [stringaCercata, setStringaCercata] = useState("");

    useEffect(() => {
        if(auth_ctx.utenteLoggato !== null){
            console.log("Carico lista dei test...")
            getTestsList();
        }
    }, [auth_ctx.utenteLoggato]);

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

        //USA VARIABILE GLOBALE PER FARE MODIFICA TEST
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
    async function editPatientTest(testID, tipoTest, pazienteID){
        let risultatiTest;

        if(tipoTest === "MMSE"){
            risultatiTest = await getServerMgr().getSingleTestMMSE(testID).catch((err) => {console.error(err)})
        }

        if(tipoTest === "MoCA"){
            risultatiTest = await getServerMgr().getSingleTestMoCA(testID).catch((err) => {console.error(err)})
        }

        if(tipoTest === "MMSE"){
            setShowEditTest(true)
            edit_scheda_test = 
            <EditRisultatiTestMMSE
                testID={testID}
                paziente={pazienteID}
                risultatiTest={risultatiTest}
            ></EditRisultatiTestMMSE>
        }
        // if(tipoTest === "MoCA"){
        //     setShowEditTestMoCA(true)
        // }
        
        console.log(risultatiTest)
        hideMainPage();
    }

    async function deletePatientTest(testID){
        await getServerMgr().deletePatientTest(testID)

        getTestsList();
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
    function hideFormEditValutazione(){
        setShowEditTest(false);
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

    async function aggiornaRisultatoTestMMSE(resultMMSE, pazienteID, arrayRisposte, doctorID, testID){
        var dateee = new Date();
        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();
        let dateString = `${year}-${month}-${day}`;

        let result;

        // result = await getServerMgr().saveResultMMSE(resultMMSE, pazienteID)
        // .catch((err) => {console.error(err)})

        await getServerMgr().realUpdateTestResultList(pazienteID, "MMSE", resultMMSE, dateString, arrayRisposte, doctorID, testID)
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

    function searchTest(stringaDaCercare){
        console.log(stringaDaCercare)
        setStringaCercata(stringaDaCercare);
    }

    function ordinamento(orderBy){
        switch(orderBy){
            case "NOME - Asc":
                ordinaPerNome("ASC");
                break;
            case "NOME - Disc":
                ordinaPerNome("DISC");
                break;
            case "COGNOME - Asc":
                ordinaPerCognome("ASC");
                break;
            case "COGNOME - Disc":
                ordinaPerCognome("DISC");
                break;
            case "TIPO TEST - Asc":
                ordinaPerTipoTest("ASC");
                break;
            case "TIPO TEST - Disc":
                ordinaPerTipoTest("DISC");
                break;
            case "PUNTEGGIO - Asc":
                ordinaPerPunteggioTest("ASC");
                break;
            case "PUNTEGGIO - Disc":
                ordinaPerPunteggioTest("DISC");
                break;
            default:
                break;
        }
        setOrdinamentoSelezionato(orderBy);
    }

    function ordinaPerNome(verso){
        if(verso === "ASC"){
            setElencoTest(elencoTest.sort(comparazionePerNome_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoTest(elencoTest.sort(comparazionePerNome_DISCENDENTE));
        }
        // console.log(elencoPazienti);
    }

    function comparazionePerNome_ASCENDENTE(a, b){
        if(a.nome.toUpperCase() < b.nome.toUpperCase()){
            return -1;
        }
        if(a.nome.toUpperCase() > b.nome.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerNome_DISCENDENTE(a, b){
        if(a.nome.toUpperCase() > b.nome.toUpperCase()){
            return -1;
        }
        if(a.nome.toUpperCase() < b.nome.toUpperCase()){
            return 1;
        }
        return 0;
    }

    function ordinaPerCognome(verso){
        if(verso === "ASC"){
            setElencoTest(elencoTest.sort(comparazionePerCognome_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoTest(elencoTest.sort(comparazionePerCognome_DISCENDENTE));
        }
        // console.log(elencoPazienti);
    }

    function comparazionePerCognome_ASCENDENTE(a, b){
        if(a.cognome.toUpperCase() < b.cognome.toUpperCase()){
            return -1;
        }
        if(a.cognome.toUpperCase() > b.cognome.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerCognome_DISCENDENTE(a, b){
        if(a.cognome.toUpperCase() > b.cognome.toUpperCase()){
            return -1;
        }
        if(a.cognome.toUpperCase() < b.cognome.toUpperCase()){
            return 1;
        }
        return 0;
    }

    function ordinaPerTipoTest(verso){
        if(verso === "ASC"){
            setElencoTest(elencoTest.sort(comparazionePerTipoTest_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoTest(elencoTest.sort(comparazionePerTipoTest_DISCENDENTE));
        }
        // console.log(elencoPazienti);
    }

    function comparazionePerTipoTest_ASCENDENTE(a, b){
        if(a.tipoTest.toUpperCase() < b.tipoTest.toUpperCase()){
            return -1;
        }
        if(a.tipoTest.toUpperCase() > b.tipoTest.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerTipoTest_DISCENDENTE(a, b){
        if(a.tipoTest.toUpperCase() > b.tipoTest.toUpperCase()){
            return -1;
        }
        if(a.tipoTest.toUpperCase() < b.tipoTest.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function ordinaPerPunteggioTest(verso){
        if(verso === "ASC"){
            setElencoTest(elencoTest.sort(comparazionePerPunteggioTest_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoTest(elencoTest.sort(comparazionePerPunteggioTest_DISCENDENTE));
        }
        // console.log(elencoPazienti);
    }

    function comparazionePerPunteggioTest_ASCENDENTE(a, b){
        if(a.punteggioTest < b.punteggioTest){
            return -1;
        }
        if(a.punteggioTest > b.punteggioTest){
            return 1;
        }
        return 0;
    }
    function comparazionePerPunteggioTest_DISCENDENTE(a, b){
        if(a.punteggioTest > b.punteggioTest){
            return -1;
        }
        if(a.punteggioTest < b.punteggioTest){
            return 1;
        }
        return 0;
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
            modificaTestPaziente: editPatientTest,
            eliminaTestPaziente: deletePatientTest,
            schedaSingoloTest: schedaTest,
            editTest: showEditTest,
            schedaTestEdit: edit_scheda_test,
            showSchedaTest:showSchedaTest,
            hideSchedaTest:hideSchedaTest,
            formAddValutazione: formValutazione,
            showFormAddValutazione: showFormAddValutazione,
            hideFormAddValutazione: hideFormAddValutazione,
            hideFormEditValutazione: hideFormEditValutazione,
            salvaRisultatoMMSE: salvaRisultatoTestMMSE,
            aggiornaRisultatoTestMMSE: aggiornaRisultatoTestMMSE,
            salvaRisultatoMoCA: salvaRisultatoTestMoCA,
            cercaTest: searchTest,
            stringSearched: stringaCercata,
            selectOrder: ordinamento,
        }}
        >
            {props.children}
        </TestsContext.Provider>
    );
}

export default TestsContext;