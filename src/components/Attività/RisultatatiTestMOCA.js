import { useContext, useEffect, useState } from "react";
import styles from "./RisultatiTestMOCA.module.css";
import GenericButton from "../UI/GenericButton";
import TestsContext from "../../context/tests-context";
import PatientContext from "../../context/patients-context";

function RisultatiTestMOCA(props){
    const tests_ctx = useContext(TestsContext);
    const patients_ctx = useContext(PatientContext)

    const paziente = props.paziente;
    const tipoTest = props.tipoTest;

    const [infoPaziente, setInfoPaziente] = useState({});

    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);
    const [showSintesiRisultati, setShowSintesiRisultati] = useState(false);

    //PUNTEGGI SINGOLE AREE COGNITIVE
    const [punteggioAreaCognitiva_1, setPunteggioAreaCognitiva_1] = useState(0);
    // const [punteggioAreaCognitiva_2, setPunteggioAreaCognitiva_2] = useState(0);
    const [punteggioAreaCognitiva_3, setPunteggioAreaCognitiva_3] = useState(0);
    const [punteggioAreaCognitiva_4, setPunteggioAreaCognitiva_4] = useState(0);
    const [punteggioAreaCognitiva_5, setPunteggioAreaCognitiva_5] = useState(0);
    const [punteggioAreaCognitiva_6, setPunteggioAreaCognitiva_6] = useState(0);
    const [punteggioAreaCognitiva_7, setPunteggioAreaCognitiva_7] = useState(0);
    const [punteggioAreaCognitiva_8, setPunteggioAreaCognitiva_8] = useState(0);
    const [punteggioTOT, setPunteggioTOT] = useState(0);

    //DOMANDE AREA COGNITIVA 1
    const [areaCog_1_domanda_1, set_areaCog_1_domanda_1] = useState(0);
    const [areaCog_1_domanda_2, set_areaCog_1_domanda_2] = useState(0);
    const [areaCog_1_domanda_3, set_areaCog_1_domanda_3] = useState(0);
    const [areaCog_1_domanda_4, set_areaCog_1_domanda_4] = useState(0);
    const [areaCog_1_domanda_5, set_areaCog_1_domanda_5] = useState(0);
    const [areaCog_1_domanda_6, set_areaCog_1_domanda_6] = useState(0);

    //DOMANDE AREA COGNITIVA 2
    const [numeroTentativi, setNumeroTentativi] = useState(0);
    // const [areaCog_2_domanda_1, set_areaCog_2_domanda_1] = useState(0);
    // const [areaCog_2_domanda_2, set_areaCog_2_domanda_2] = useState(0);
    // const [areaCog_2_domanda_3, set_areaCog_2_domanda_3] = useState(0);
    // const [areaCog_2_domanda_4, set_areaCog_2_domanda_4] = useState(0);
    // const [areaCog_2_domanda_5, set_areaCog_2_domanda_5] = useState(0);

    //DOMANDE AREA COGNITIVA 3
    const [areaCog_3_domanda_1, set_areaCog_3_domanda_1] = useState(0);
    const [areaCog_3_domanda_2, set_areaCog_3_domanda_2] = useState(0);
    const [areaCog_3_domanda_3, set_areaCog_3_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 4
    const [areaCog_4_domanda_1, set_areaCog_4_domanda_1] = useState(0);
    const [areaCog_4_domanda_2, set_areaCog_4_domanda_2] = useState(0);
    const [areaCog_4_domanda_3, set_areaCog_4_domanda_3] = useState(0);
    const [areaCog_4_domanda_4, set_areaCog_4_domanda_4] = useState(0);
    const [areaCog_4_domanda_5, set_areaCog_4_domanda_5] = useState(0);

    //DOMANDE AREA COGNITIVA 5
    const [areaCog_5_domanda_1, set_areaCog_5_domanda_1] = useState(0);
    const [areaCog_5_domanda_2, set_areaCog_5_domanda_2] = useState(0);

    //DOMANDE AREA COGNITIVA 6
    const [areaCog_6_domanda_1, set_areaCog_6_domanda_1] = useState(0);
    const [areaCog_6_domanda_2, set_areaCog_6_domanda_2] = useState(0);

    //DOMANDE AREA COGNITIVA 7
    const [areaCog_7_domanda_1, set_areaCog_7_domanda_1] = useState(0);
    const [areaCog_7_domanda_2, set_areaCog_7_domanda_2] = useState(0);
    const [areaCog_7_domanda_3, set_areaCog_7_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 8
    const [areaCog_8_domanda_1, set_areaCog_8_domanda_1] = useState(0);
    const [areaCog_8_domanda_2, set_areaCog_8_domanda_2] = useState(0);
    const [areaCog_8_domanda_3, set_areaCog_8_domanda_3] = useState(0);
    const [areaCog_8_domanda_4, set_areaCog_8_domanda_4] = useState(0);
    const [areaCog_8_domanda_5, set_areaCog_8_domanda_5] = useState(0);

    useEffect(() => {
        patients_ctx.listaPazienti.map((paz) => {
            console.log(typeof paz.ID)
            console.log(typeof paziente)
            if(paz.ID === Number(paziente)){
                setInfoPaziente(paz);
                
            }
        })
    }, [])

    useEffect(() => {
        punteggio_AC1();
    }, [areaCog_1_domanda_1, areaCog_1_domanda_2, areaCog_1_domanda_3, areaCog_1_domanda_4, areaCog_1_domanda_5, areaCog_1_domanda_6])

    // useEffect(() => {
    //     punteggio_AC2();
    // }, [areaCog_2_domanda_1, areaCog_2_domanda_2, areaCog_2_domanda_3, areaCog_2_domanda_4, areaCog_2_domanda_5])
    useEffect(() => {
        punteggio_AC3();
    }, [areaCog_3_domanda_1, areaCog_3_domanda_2, areaCog_3_domanda_3])
    useEffect(() => {
        punteggio_AC4();
    }, [areaCog_4_domanda_1, areaCog_4_domanda_2, areaCog_4_domanda_3, areaCog_4_domanda_4, areaCog_4_domanda_5])
    useEffect(() => {
        punteggio_AC5();
    }, [areaCog_5_domanda_1, areaCog_5_domanda_2])
    useEffect(() => {
        punteggio_AC6();
    }, [areaCog_6_domanda_1, areaCog_6_domanda_2])
    useEffect(() => {
        punteggio_AC7();
    }, [areaCog_7_domanda_1, areaCog_7_domanda_2, areaCog_7_domanda_3])
    useEffect(() => {
        punteggio_AC8();
    }, [areaCog_8_domanda_1, areaCog_8_domanda_2, areaCog_8_domanda_3, areaCog_8_domanda_4, areaCog_8_domanda_5])

    function nextAreaCogn(){
        if(sezioneCognitiva < 8){
            setSezioneCognitiva((prevArea) => (prevArea + 1))
        }
    }
    function previousAreaCogn(){
        if(sezioneCognitiva >= 2 && !showSintesiRisultati){
            setSezioneCognitiva((prevArea) => (prevArea - 1))
        }
        if(sezioneCognitiva === 8 && showSintesiRisultati){
            setShowSintesiRisultati(false);
        }
    }

    function mostraRisultati(){
        setShowSintesiRisultati(true);
        setPunteggioTOT(punteggioAreaCognitiva_1 + punteggioAreaCognitiva_3 + punteggioAreaCognitiva_4 + 
            punteggioAreaCognitiva_5 + punteggioAreaCognitiva_6 + punteggioAreaCognitiva_7 + punteggioAreaCognitiva_8
        )
    }

    function punteggio_AC1(){
        setPunteggioAreaCognitiva_1(
            areaCog_1_domanda_1 + areaCog_1_domanda_2 + areaCog_1_domanda_3 + areaCog_1_domanda_4 + areaCog_1_domanda_5 + areaCog_1_domanda_6
        )
    }
    // function punteggio_AC2(){
    //     setPunteggioAreaCognitiva_2(areaCog_2_domanda_1 + areaCog_2_domanda_2 + areaCog_2_domanda_3 + areaCog_2_domanda_4 + areaCog_2_domanda_5)
    // }
    function punteggio_AC3(){
        setPunteggioAreaCognitiva_3(areaCog_3_domanda_1 + areaCog_3_domanda_2 + areaCog_3_domanda_3)
    }
    function punteggio_AC4(){
        setPunteggioAreaCognitiva_4(areaCog_4_domanda_1 + areaCog_4_domanda_2 + areaCog_4_domanda_3 + areaCog_4_domanda_4 + areaCog_4_domanda_5)
    }
    function punteggio_AC5(){
        setPunteggioAreaCognitiva_5(areaCog_5_domanda_1 + areaCog_5_domanda_2)
    }
    function punteggio_AC6(){
        setPunteggioAreaCognitiva_6(areaCog_6_domanda_1 + areaCog_6_domanda_2)
    }
    function punteggio_AC7(){
        setPunteggioAreaCognitiva_7(areaCog_7_domanda_1 + areaCog_7_domanda_2 + areaCog_7_domanda_3)
    }
    function punteggio_AC8(){
        setPunteggioAreaCognitiva_8(areaCog_8_domanda_1 + areaCog_8_domanda_2 + areaCog_8_domanda_3 + areaCog_8_domanda_4 + areaCog_8_domanda_5)
    }

    function ac_1_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_1(0);
        }
        else{
            set_areaCog_1_domanda_1(Number(event.target.value));
        }
    }
    function ac_1_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_2(0);
        }
        else{
            set_areaCog_1_domanda_2(Number(event.target.value));
        }
    }
    function ac_1_qstn3_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_3(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_3(0);
        }
        else{
            set_areaCog_1_domanda_3(Number(event.target.value));
        }
    }
    function ac_1_qstn4_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_4(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_4(0);
        }
        else{
            set_areaCog_1_domanda_4(Number(event.target.value));
        }
    }
    function ac_1_qstn5_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_5(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_5(0);
        }
        else{
            set_areaCog_1_domanda_5(Number(event.target.value));
        }
    }
    function ac_1_qstn6_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_6(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_6(0);
        }
        else{
            set_areaCog_1_domanda_6(Number(event.target.value));
        }
    }

    function ac_2_numeroTentativiChangeHandler(event){
        setNumeroTentativi(event.target.value)
    }

    // function ac_2_qstn1_changeHandler(event){
    //     if(event.target.value > 1 ){
    //         set_areaCog_2_domanda_1(1)
    //     }
    //     else if(event.target.value < 0){
    //         set_areaCog_2_domanda_1(0);
    //     }
    //     else{
    //         set_areaCog_2_domanda_1(Number(event.target.value));
    //     }
    // }
    // function ac_2_qstn2_changeHandler(event){
    //     if(event.target.value > 1 ){
    //         set_areaCog_2_domanda_2(1)
    //     }
    //     else if(event.target.value < 0){
    //         set_areaCog_2_domanda_2(0);
    //     }
    //     else{
    //         set_areaCog_2_domanda_2(Number(event.target.value));
    //     }
    // }
    // function ac_2_qstn3_changeHandler(event){
    //     if(event.target.value > 1 ){
    //         set_areaCog_2_domanda_3(1)
    //     }
    //     else if(event.target.value < 0){
    //         set_areaCog_2_domanda_3(0);
    //     }
    //     else{
    //         set_areaCog_2_domanda_3(Number(event.target.value));
    //     }
    // }
    // function ac_2_qstn4_changeHandler(event){
    //     if(event.target.value > 1 ){
    //         set_areaCog_2_domanda_4(1)
    //     }
    //     else if(event.target.value < 0){
    //         set_areaCog_2_domanda_4(0);
    //     }
    //     else{
    //         set_areaCog_2_domanda_4(Number(event.target.value));
    //     }
    // }
    // function ac_2_qstn5_changeHandler(event){
    //     if(event.target.value > 1 ){
    //         set_areaCog_2_domanda_5(1)
    //     }
    //     else if(event.target.value < 0){
    //         set_areaCog_2_domanda_5(0);
    //     }
    //     else{
    //         set_areaCog_2_domanda_5(Number(event.target.value));
    //     }
    // }


    function ac_3_qstn1_changeHandler(event){
        if(event.target.value > 2 ){
            set_areaCog_3_domanda_1(2)
        }
        else if(event.target.value < 0){
            set_areaCog_3_domanda_1(0);
        }
        else{
            set_areaCog_3_domanda_1(Number(event.target.value));
        }
    }
    function ac_3_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_3_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_3_domanda_2(0);
        }
        else{
            set_areaCog_3_domanda_2(Number(event.target.value));
        }
    }
    function ac_3_qstn3_changeHandler(event){
        if(event.target.value > 3 ){
            set_areaCog_3_domanda_3(3)
        }
        else if(event.target.value < 0){
            set_areaCog_3_domanda_3(0);
        }
        else{
            set_areaCog_3_domanda_3(Number(event.target.value));
        }
    }

    function ac_4_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_4_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_4_domanda_1(0);
        }
        else{
            set_areaCog_4_domanda_1(Number(event.target.value));
        }
    }
    function ac_4_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_4_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_4_domanda_2(0);
        }
        else{
            set_areaCog_4_domanda_2(Number(event.target.value));
        }
    }
    function ac_4_qstn3_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_4_domanda_3(1)
        }
        else if(event.target.value < 0){
            set_areaCog_4_domanda_3(0);
        }
        else{
            set_areaCog_4_domanda_3(Number(event.target.value));
        }
    }
    function ac_4_qstn4_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_4_domanda_4(1)
        }
        else if(event.target.value < 0){
            set_areaCog_4_domanda_4(0);
        }
        else{
            set_areaCog_4_domanda_4(Number(event.target.value));
        }
    }
    function ac_4_qstn5_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_4_domanda_5(1)
        }
        else if(event.target.value < 0){
            set_areaCog_4_domanda_5(0);
        }
        else{
            set_areaCog_4_domanda_5(Number(event.target.value));
        }
    }

    function ac_5_qstn1_changeHandler(event){
        if(event.target.value > 2 ){
            set_areaCog_5_domanda_1(2)
        }
        else if(event.target.value < 0){
            set_areaCog_5_domanda_1(0);
        }
        else{
            set_areaCog_5_domanda_1(Number(event.target.value));
        }
    }
    function ac_5_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_5_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_5_domanda_2(0);
        }
        else{
            set_areaCog_5_domanda_2(Number(event.target.value));
        }
    }
    function ac_6_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_6_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_6_domanda_1(0);
        }
        else{
            set_areaCog_6_domanda_1(Number(event.target.value));
        }
    }
    function ac_6_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_6_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_6_domanda_2(0);
        }
        else{
            set_areaCog_6_domanda_2(Number(event.target.value));
        }
    }

    function ac_7_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_7_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_7_domanda_1(0);
        }
        else{
            set_areaCog_7_domanda_1(Number(event.target.value));
        }
    }
    function ac_7_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_7_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_7_domanda_2(0);
        }
        else{
            set_areaCog_7_domanda_2(Number(event.target.value));
        }
    }
    function ac_7_qstn3_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_7_domanda_3(1)
        }
        else if(event.target.value < 0){
            set_areaCog_7_domanda_3(0);
        }
        else{
            set_areaCog_7_domanda_3(Number(event.target.value));
        }
    }

    function ac_8_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_8_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_8_domanda_1(0);
        }
        else{
            set_areaCog_8_domanda_1(Number(event.target.value));
        }
    }
    function ac_8_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_8_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_8_domanda_2(0);
        }
        else{
            set_areaCog_8_domanda_2(Number(event.target.value));
        }
    }
    function ac_8_qstn3_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_8_domanda_3(1)
        }
        else if(event.target.value < 0){
            set_areaCog_8_domanda_3(0);
        }
        else{
            set_areaCog_8_domanda_3(Number(event.target.value));
        }
    }
    function ac_8_qstn4_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_8_domanda_4(1)
        }
        else if(event.target.value < 0){
            set_areaCog_8_domanda_4(0);
        }
        else{
            set_areaCog_8_domanda_4(Number(event.target.value));
        }
    }
    function ac_8_qstn5_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_8_domanda_5(1)
        }
        else if(event.target.value < 0){
            set_areaCog_8_domanda_5(0);
        }
        else{
            set_areaCog_8_domanda_5(Number(event.target.value));
        }
    }
    
    return(
        <>
            <h1 className={styles.title}>Valutazione MoCA: {infoPaziente.nome} {infoPaziente.cognome}</h1>
            <div className={styles.area_cog_style}>
                {sezioneCognitiva === 1 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 1 - Orientamento</h3>

                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In che anno ci troviamo?</div>
                        <input onChange={ac_1_qstn1_changeHandler} value={areaCog_1_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Che giorno è oggi?</div>
                        <input onChange={ac_1_qstn2_changeHandler} value={areaCog_1_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In che mese siamo?</div>
                        <input onChange={ac_1_qstn3_changeHandler} value={areaCog_1_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Quale giorno della settimana è oggi?</div>
                        <input onChange={ac_1_qstn5_changeHandler} value={areaCog_1_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In che città siamo?</div>
                        <input onChange={ac_1_qstn4_changeHandler} value={areaCog_1_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Dove ci troviamo?</div>
                        <input onChange={ac_1_qstn6_changeHandler} value={areaCog_1_domanda_6} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}} className={styles.domanda_style}>Punteggio Area Cognitiva 1: </h3>
                        <h3>{punteggioAreaCognitiva_1}/6</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 2 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 2 - Memoria</h3>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "FACCIA"</div>
                        {/* <input onChange={ac_2_qstn1_changeHandler} value={areaCog_2_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input> */}
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "VELLUTO"</div>
                        {/* <input onChange={ac_2_qstn2_changeHandler} value={areaCog_2_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input> */}
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "CHIESA"</div>
                        {/* <input onChange={ac_2_qstn3_changeHandler} value={areaCog_2_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input> */}
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "MARGHERITA"</div>
                        {/* <input onChange={ac_2_qstn4_changeHandler} value={areaCog_2_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input> */}
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "ROSSO"</div>
                        {/* <input onChange={ac_2_qstn5_changeHandler} value={areaCog_2_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input> */}
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Numero di tentativi Area Cognitiva 2: </h3>
                        <input onChange={ac_2_numeroTentativiChangeHandler} value={numeroTentativi} className={styles.input_style} type="number"></input>
                    </div>
                </>
                }
                {sezioneCognitiva === 3 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 3 - Attenzione e calcolo</h3>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>
                            <div className={styles.domanda_style}>Leggi la lista di numeri e falli ripetere nello stesso ordine</div>
                            <div className={styles.domanda_style}>Leggi la lista di numeri e falli ripetere in ordine inverso</div>
                        </div>
                        <input onChange={ac_3_qstn1_changeHandler} value={areaCog_3_domanda_1} className={styles.input_style} type="number" min={0} max={2}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Leggi la lista di lettere; il soggetto deve battere le mani ad ogni lettera 'A'</div>
                        <input onChange={ac_3_qstn2_changeHandler} value={areaCog_3_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Far contare per sette all'indietro, partendo da 100. Fermarsi dopo 5 risposte</div>
                        <input onChange={ac_3_qstn3_changeHandler} value={areaCog_3_domanda_3} className={styles.input_style} type="number" min={0} max={3}></input>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 3: </h3>
                        <h3>{punteggioAreaCognitiva_3}/6</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 4 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 4 - Richiamo</h3>
                    <h4>Richiama i cinque termini precedentemente imparati</h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "FACCIA"</div>
                        <input onChange={ac_4_qstn1_changeHandler} value={areaCog_4_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "VELLUTO"</div>
                        <input onChange={ac_4_qstn2_changeHandler} value={areaCog_4_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "CHIESA"</div>
                        <input onChange={ac_4_qstn3_changeHandler} value={areaCog_4_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "MARGHERITA"</div>
                        <input onChange={ac_4_qstn4_changeHandler} value={areaCog_4_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "ROSSO"</div>
                        <input onChange={ac_4_qstn5_changeHandler} value={areaCog_4_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 4: </h3>
                        <h3>{punteggioAreaCognitiva_4}/5</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 5 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 5 - Linguaggio</h3>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Far ripetere le frasi: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>
                            <div className={styles.domanda_style}>{"(So solo che Giovanni è l'unico da aiutare oggi)."}</div>
                            <div className={styles.domanda_style}>{"(Il gatto si nascondeva sempre sotto la poltrona quando i cani erano nella stanza)."}</div>
                            
                        </div>
                        <input onChange={ac_5_qstn1_changeHandler} value={areaCog_5_domanda_1} className={styles.input_style} type="number" min={0} max={2}></input>
                    </div>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Elenca: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Il massimo numero di parole che cominciano con la lettera 'F'</div>
                        <input onChange={ac_5_qstn2_changeHandler} value={areaCog_5_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 5: </h3>
                        <h3>{punteggioAreaCognitiva_5}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 6 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 6 - Astrazione</h3>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Quali sono le similarità fra: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>{"Treno e Bicicletta"}</div>
                        <input onChange={ac_6_qstn1_changeHandler} value={areaCog_6_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>{"Orologio e Righello"}</div>
                        <input onChange={ac_6_qstn2_changeHandler} value={areaCog_6_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 6: </h3>
                        <h3>{punteggioAreaCognitiva_6}/2</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 7 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 7 - Denominazione</h3>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Scrivi i nomi di questi animali: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Leone</div>    
                        <input onChange={ac_7_qstn1_changeHandler} value={areaCog_7_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Rinoceronte</div>    
                        <input onChange={ac_7_qstn2_changeHandler} value={areaCog_7_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Dromedario</div>    
                        <input onChange={ac_7_qstn3_changeHandler} value={areaCog_7_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 7: </h3>
                        <h3>{punteggioAreaCognitiva_7}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 8 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 8 - Abilità Esecutiva/Visuospaziale</h3>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Disegna un OROLOGIO alle undici e dieci: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Quadrante</div>    
                        <input onChange={ac_8_qstn1_changeHandler} value={areaCog_8_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Numeri</div>    
                        <input onChange={ac_8_qstn2_changeHandler} value={areaCog_8_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Lancette</div>    
                        <input onChange={ac_8_qstn3_changeHandler} value={areaCog_8_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Copia il disegno: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Cubo di Necker</div>    
                        <input onChange={ac_8_qstn4_changeHandler} value={areaCog_8_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Svolgi esercizio: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Trail-making</div>    
                        <input onChange={ac_8_qstn5_changeHandler} value={areaCog_8_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 8: </h3>
                        <h3>{punteggioAreaCognitiva_8}/5</h3>
                    </div>
                </>
                }
                {showSintesiRisultati && sezioneCognitiva === 8 &&
                <>
                    <h3 className={styles.area_cog_title}>Riepilogo risultati</h3>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 1:</div>
                        <div>{punteggioAreaCognitiva_1}/6</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Numero di tentativi Area Cognitiva 2:</div>
                        <div>{numeroTentativi}</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 3:</div>
                        <div>{punteggioAreaCognitiva_3}/6</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 4:</div>
                        <div>{punteggioAreaCognitiva_4}/5</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 5:</div>
                        <div>{punteggioAreaCognitiva_5}/3</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 6:</div>
                        <div>{punteggioAreaCognitiva_6}/2</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 7:</div>
                        <div>{punteggioAreaCognitiva_7}/3</div>
                    </div>
                    <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Punteggio Area Cognitiva 8:</div>
                        <div>{punteggioAreaCognitiva_8}/5</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>PUNTEGGIO TOTALE:</div>
                        <div>{punteggioTOT}/30</div>
                    </div>
                </>
                }
            </div>
            
            <div className={styles.wrapper_horizontal}>
                <GenericButton
                    onClick={previousAreaCogn}
                    buttonText={showSintesiRisultati ? "Indietro" : "Area precedente"}
                    generic_button
                    red_styling
                ></GenericButton>

                {sezioneCognitiva < 8 &&
                    <GenericButton
                        onClick={nextAreaCogn}
                        buttonText={"Prossima Area"}
                        generic_button
                    ></GenericButton>
                }
                {sezioneCognitiva === 8 && !showSintesiRisultati &&
                    <GenericButton
                        onClick={mostraRisultati}
                        buttonText={"Mostra riepilogo"}
                        generic_button
                    ></GenericButton>
                }
                {showSintesiRisultati &&
                    <GenericButton
                        onClick={() => {
                            tests_ctx.salvaRisultatoMoCA(punteggioTOT, paziente)
                            tests_ctx.hideFormAddValutazione()
                        }}
                        buttonText={"Salva risultati"}
                        generic_button
                    ></GenericButton>
                }
            </div>
        </>
    );
}

export default RisultatiTestMOCA;