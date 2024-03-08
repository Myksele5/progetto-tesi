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
    const [punteggioAreaCognitiva_7, setPunteggioAreaCognitiva_7] = useState(0);
    const [punteggioAreaCognitiva_4, setPunteggioAreaCognitiva_4] = useState(0);
    const [punteggioAreaCognitiva_5, setPunteggioAreaCognitiva_5] = useState(0);
    const [punteggioAreaCognitiva_6, setPunteggioAreaCognitiva_6] = useState(0);
    const [punteggioAreaCognitiva_2, setPunteggioAreaCognitiva_2] = useState(0);
    const [punteggioAreaCognitiva_8, setPunteggioAreaCognitiva_8] = useState(0);
    const [punteggioTOT, setPunteggioTOT] = useState(0);

    //DOMANDE AREA COGNITIVA 1
    const [areaCog_1_domanda_1, set_areaCog_1_domanda_1] = useState(0);
    const [areaCog_1_domanda_2, set_areaCog_1_domanda_2] = useState(0);
    const [areaCog_1_domanda_3, set_areaCog_1_domanda_3] = useState(0);
    const [areaCog_1_domanda_4, set_areaCog_1_domanda_4] = useState(0);
    const [areaCog_1_domanda_5, set_areaCog_1_domanda_5] = useState(0);

    //DOMANDE AREA COGNITIVA 2
    const [areaCog_2_domanda_1, set_areaCog_2_domanda_1] = useState(0);
    const [areaCog_2_domanda_2, set_areaCog_2_domanda_2] = useState(0);
    const [areaCog_2_domanda_3, set_areaCog_2_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 3
    const [numeroTentativi, setNumeroTentativi] = useState(0);

    //DOMANDE AREA COGNITIVA 4
    const [areaCog_4_domanda_1, set_areaCog_4_domanda_1] = useState(0);
    const [areaCog_4_domanda_2, set_areaCog_4_domanda_2] = useState(0);
    const [areaCog_4_domanda_3, set_areaCog_4_domanda_3] = useState(0);
    const [areaCog_4_domanda_4, set_areaCog_4_domanda_4] = useState(0);
    const [a4d4_option_1, set_a4d4_option_1] = useState(false)
    const [a4d4_option_2, set_a4d4_option_2] = useState(false)
    const [a4d4_option_3, set_a4d4_option_3] = useState(false)
    const [a4d4_option_4, set_a4d4_option_4] = useState(false)

    //DOMANDE AREA COGNITIVA 5
    const [areaCog_5_domanda_1, set_areaCog_5_domanda_1] = useState(0);
    const [areaCog_5_domanda_2, set_areaCog_5_domanda_2] = useState(0);
    const [areaCog_5_domanda_3, set_areaCog_5_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 6
    const [areaCog_6_domanda_1, set_areaCog_6_domanda_1] = useState(0);
    const [areaCog_6_domanda_2, set_areaCog_6_domanda_2] = useState(0);

    //DOMANDE AREA COGNITIVA 7
    const [areaCog_7_domanda_1, set_areaCog_7_domanda_1] = useState(0);
    const [areaCog_7_domanda_2, set_areaCog_7_domanda_2] = useState(0);
    const [areaCog_7_domanda_3, set_areaCog_7_domanda_3] = useState(0);
    const [areaCog_7_domanda_4, set_areaCog_7_domanda_4] = useState(0);
    const [areaCog_7_domanda_5, set_areaCog_7_domanda_5] = useState(0);

    //DOMANDE AREA COGNITIVA 8
    const [areaCog_8_domanda_1, set_areaCog_8_domanda_1] = useState(0);
    const [areaCog_8_domanda_2, set_areaCog_8_domanda_2] = useState(0);
    const [areaCog_8_domanda_3, set_areaCog_8_domanda_3] = useState(0);
    const [areaCog_8_domanda_4, set_areaCog_8_domanda_4] = useState(0);
    const [areaCog_8_domanda_5, set_areaCog_8_domanda_5] = useState(0);
    const [areaCog_8_domanda_6, set_areaCog_8_domanda_6] = useState(0);

    let arrayRiassuntivoRisposte = [
        {
            domanda: 1,
            risposta: areaCog_1_domanda_1
        },
        {
            domanda: 2,
            risposta: areaCog_1_domanda_2
        },
        {
            domanda: 3,
            risposta: areaCog_1_domanda_3
        },
        {
            domanda: 4,
            risposta: areaCog_1_domanda_4
        },
        {
            domanda: 5,
            risposta: areaCog_1_domanda_5
        },
        {
            domanda: 6,
            risposta: areaCog_2_domanda_1
        },
        {
            domanda: 7,
            risposta: areaCog_2_domanda_2
        },
        {
            domanda: 8,
            risposta: areaCog_2_domanda_3
        },
        {
            domanda: 9,
            risposta: numeroTentativi
        },
        {
            domanda: 10,
            risposta: areaCog_4_domanda_1
        },
        {
            domanda: 11,
            risposta: areaCog_4_domanda_2
        },
        {
            domanda: 12,
            risposta: areaCog_4_domanda_3
        },
        {
            domanda: 13,
            risposta: areaCog_4_domanda_4
        },
        {
            domanda: 14,
            risposta: areaCog_5_domanda_1
        },
        {
            domanda: 15,
            risposta: areaCog_5_domanda_2
        },
        {
            domanda: 16,
            risposta: areaCog_5_domanda_3
        },
        {
            domanda: 17,
            risposta: areaCog_6_domanda_1
        },
        {
            domanda: 18,
            risposta: areaCog_6_domanda_2
        },
        {
            domanda: 19,
            risposta: areaCog_7_domanda_1
        },
        {
            domanda: 20,
            risposta: areaCog_7_domanda_2
        },
        {
            domanda: 21,
            risposta: areaCog_7_domanda_3
        },
        {
            domanda: 22,
            risposta: areaCog_7_domanda_4
        },
        {
            domanda: 23,
            risposta: areaCog_7_domanda_5
        },
        {
            domanda: 24,
            risposta: areaCog_8_domanda_1
        },
        {
            domanda: 25,
            risposta: areaCog_8_domanda_2
        },
        {
            domanda: 26,
            risposta: areaCog_8_domanda_3
        },
        {
            domanda: 27,
            risposta: areaCog_8_domanda_4
        },
        {
            domanda: 28,
            risposta: areaCog_8_domanda_5
        },
        {
            domanda: 29,
            risposta: areaCog_8_domanda_6
        },
    ];

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
        console.log(arrayRiassuntivoRisposte)
    }, [areaCog_1_domanda_1, areaCog_1_domanda_2, areaCog_1_domanda_3, areaCog_1_domanda_4, areaCog_1_domanda_5])
    useEffect(() => {
        punteggio_AC2();
    }, [areaCog_2_domanda_1, areaCog_2_domanda_2, areaCog_2_domanda_3])
    useEffect(() => {
        punteggio_AC4();
    }, [areaCog_4_domanda_1, areaCog_4_domanda_2, areaCog_4_domanda_3, areaCog_4_domanda_4])
    useEffect(() => {
        punteggio_AC5();
    }, [areaCog_5_domanda_1, areaCog_5_domanda_2, areaCog_5_domanda_3])
    useEffect(() => {
        punteggio_AC6();
    }, [areaCog_6_domanda_1, areaCog_6_domanda_2])
    useEffect(() => {
        punteggio_AC7();
    }, [areaCog_7_domanda_1, areaCog_7_domanda_2, areaCog_7_domanda_3, areaCog_7_domanda_4, areaCog_7_domanda_5])
    useEffect(() => {
        punteggio_AC8();
    }, [areaCog_8_domanda_1, areaCog_8_domanda_2, areaCog_8_domanda_3, areaCog_8_domanda_4, areaCog_8_domanda_5, areaCog_8_domanda_6])

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
        setPunteggioTOT(punteggioAreaCognitiva_1 + punteggioAreaCognitiva_7 + punteggioAreaCognitiva_4 + 
            punteggioAreaCognitiva_5 + punteggioAreaCognitiva_6 + punteggioAreaCognitiva_2 + punteggioAreaCognitiva_8
        )
    }

    function punteggio_AC1(){
        setPunteggioAreaCognitiva_1(areaCog_1_domanda_1 + areaCog_1_domanda_2 + areaCog_1_domanda_3 + areaCog_1_domanda_4 + areaCog_1_domanda_5)
    }
    function punteggio_AC2(){
        setPunteggioAreaCognitiva_2(areaCog_2_domanda_1 + areaCog_2_domanda_2 + areaCog_2_domanda_3)
    }
    function punteggio_AC4(){
        setPunteggioAreaCognitiva_4(areaCog_4_domanda_1 + areaCog_4_domanda_2 + areaCog_4_domanda_3 + areaCog_4_domanda_4)
    }
    function punteggio_AC5(){
        setPunteggioAreaCognitiva_5(areaCog_5_domanda_1 + areaCog_5_domanda_2 + areaCog_5_domanda_3)
    }
    function punteggio_AC6(){
        setPunteggioAreaCognitiva_6(areaCog_6_domanda_1 + areaCog_6_domanda_2)
    }
    function punteggio_AC7(){
        setPunteggioAreaCognitiva_7(areaCog_7_domanda_1 + areaCog_7_domanda_2 + areaCog_7_domanda_3 + areaCog_7_domanda_4 + areaCog_7_domanda_5)
    }
    function punteggio_AC8(){
        setPunteggioAreaCognitiva_8(
            areaCog_8_domanda_1 + areaCog_8_domanda_2 + areaCog_8_domanda_3 + areaCog_8_domanda_4 + areaCog_8_domanda_5 + areaCog_8_domanda_6
        )
    }

    // HANDLER AREA COG 1
    function ac_1_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_1(1)
        }
        else{
            set_areaCog_1_domanda_1(0);
        }
    }
    function ac_1_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_2(1)
        }
        else{
            set_areaCog_1_domanda_2(0);
        }
    }
    function ac_1_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_3(1)
        }
        else{
            set_areaCog_1_domanda_3(0);
        }
    }
    function ac_1_qstn4_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_4(1)
        }
        else{
            set_areaCog_1_domanda_4(0);
        }
    }
    function ac_1_qstn5_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_5(1)
        }
        else{
            set_areaCog_1_domanda_5(0);
        }
    }

    //HANDLER AREA COG 2
    function ac_2_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_2_domanda_1(1)
        }
        else{
            set_areaCog_2_domanda_1(0);
        }
    }
    function ac_2_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_2_domanda_2(1)
        }
        else{
            set_areaCog_2_domanda_2(0);
        }
    }
    function ac_2_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_2_domanda_3(1)
        }
        else{
            set_areaCog_2_domanda_3(0);
        }
    }

    //HANDLER AREA COG 3
    function ac_3_numeroTentativiChangeHandler(event){
        setNumeroTentativi(event.target.value)
    }

    //HANDLER AREA COG 4
    function ac_4_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_4_domanda_1(1)
        }
        else{
            set_areaCog_4_domanda_1(0);
        }
    }
    function ac_4_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_4_domanda_2(1)
        }
        else{
            set_areaCog_4_domanda_2(0);
        }
    }
    function ac_4_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_4_domanda_3(1)
        }
        else{
            set_areaCog_4_domanda_3(0);
        }
    }
    function ac_4_qstn4_changeHandler(stringa){
        switch(stringa){
            case "4-5_corrette":
                set_areaCog_4_domanda_4(3);
                set_a4d4_option_1(true)
                set_a4d4_option_2(false)
                set_a4d4_option_3(false)
                set_a4d4_option_4(false)
                break;
            case "2-3_corrette":
                set_areaCog_4_domanda_4(2);
                set_a4d4_option_1(false)
                set_a4d4_option_2(true)
                set_a4d4_option_3(false)
                set_a4d4_option_4(false)
                break;
            case "1_corretta":
                set_areaCog_4_domanda_4(1);
                set_a4d4_option_1(false)
                set_a4d4_option_2(false)
                set_a4d4_option_3(true)
                set_a4d4_option_4(false)
                break;
            case "0_corrette":
                set_areaCog_4_domanda_4(0);
                set_a4d4_option_1(false)
                set_a4d4_option_2(false)
                set_a4d4_option_3(false)
                set_a4d4_option_4(true)
                break;
        }
    }

    //HANDLER AREA COG 5
    function ac_5_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_1(1)
        }
        else{
            set_areaCog_5_domanda_1(0);
        }
    }
    function ac_5_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_2(1)
        }
        else{
            set_areaCog_5_domanda_2(0);
        }
    }
    function ac_5_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_3(1)
        }
        else{
            set_areaCog_5_domanda_3(0);
        }
    }

    //HANDLER AREA COG 6
    function ac_6_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_6_domanda_1(1)
        }
        else{
            set_areaCog_6_domanda_1(0);
        }
    }
    function ac_6_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_6_domanda_2(1)
        }
        else{
            set_areaCog_6_domanda_2(0);
        }
    }

    //HANDLER AREA COG 7
    function ac_7_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_7_domanda_1(1)
        }
        else{
            set_areaCog_7_domanda_1(0);
        }
    }
    function ac_7_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_7_domanda_2(1)
        }
        else{
            set_areaCog_7_domanda_2(0);
        }
    }
    function ac_7_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_7_domanda_3(1)
        }
        else{
            set_areaCog_7_domanda_3(0);
        }
    }
    function ac_7_qstn4_changeHandler(event){
        if(event.target.checked){
            set_areaCog_7_domanda_4(1)
        }
        else{
            set_areaCog_7_domanda_4(0);
        }
    }
    function ac_7_qstn5_changeHandler(event){
        if(event.target.checked){
            set_areaCog_7_domanda_5(1)
        }
        else{
            set_areaCog_7_domanda_5(0);
        }
    }

    //HANLDER AREA COG 8
    function ac_8_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_1(1)
        }
        else{
            set_areaCog_8_domanda_1(0);
        }
    }
    function ac_8_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_2(1)
        }
        else{
            set_areaCog_8_domanda_2(0);
        }
    }
    function ac_8_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_3(1)
        }
        else{
            set_areaCog_8_domanda_3(0);
        }
    }
    function ac_8_qstn4_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_4(1)
        }
        else{
            set_areaCog_8_domanda_4(0);
        }
    }
    function ac_8_qstn5_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_5(1)
        }
        else{
            set_areaCog_8_domanda_5(0);
        }
    }
    function ac_8_qstn6_changeHandler(event){
        if(event.target.checked){
            set_areaCog_8_domanda_6(1)
        }
        else{
            set_areaCog_8_domanda_6(0);
        }
    }
    
    return(
        <>
            <h1 className={styles.title}>Valutazione MoCA: {infoPaziente.nome} {infoPaziente.cognome}</h1>
            <div className={styles.area_cog_style}>
                {sezioneCognitiva === 1 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 1 - Abilità Esecutiva/Visuospaziale</h3>
                    
                    <h4 className={styles.explanation}>Disegna un OROLOGIO alle undici e dieci: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn1_changeHandler} checked={areaCog_1_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Quadrante</div>    
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn2_changeHandler} checked={areaCog_1_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Numeri</div>    
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn3_changeHandler} checked={areaCog_1_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Lancette</div>    
                    </div>
                    <h4 className={styles.explanation}>Copia il disegno: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn4_changeHandler} checked={areaCog_1_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Cubo di Necker</div>    
                    </div>
                    <h4 className={styles.explanation}>Svolgi esercizio: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn5_changeHandler} checked={areaCog_1_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Trail-making</div>    
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 1: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_1}/5</h3>
                    </div>
                    
                </>
                }
                {sezioneCognitiva === 2 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 2 - Denominazione</h3>
                    <h4 className={styles.explanation}>Scrivi i nomi di questi animali: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn1_changeHandler} checked={areaCog_2_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Leone</div>    
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn2_changeHandler} checked={areaCog_2_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Rinoceronte</div>    
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn3_changeHandler} checked={areaCog_2_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Dromedario</div>    
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 2: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_2}/3</h3>
                    </div>   
                </>
                }
                {sezioneCognitiva === 3 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 3 - Memoria</h3>
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
                        <h3 className={styles.score_area_cog}>Numero di tentativi Area Cognitiva 3: </h3>
                        <input onChange={ac_3_numeroTentativiChangeHandler} value={numeroTentativi} className={styles.text_input} type="number"></input>
                    </div>
                </>
                }
                {sezioneCognitiva === 4 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 4 - Attenzione e calcolo</h3>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn1_changeHandler} checked={areaCog_4_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Leggi la lista di numeri e falli ripetere nello stesso ordine. {`(2, 1, 8, 5, 4)`}</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn2_changeHandler} checked={areaCog_4_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Leggi la lista di numeri e falli ripetere in ordine inverso. {`(7, 4, 2)`}</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn3_changeHandler} checked={areaCog_4_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Leggi la lista di lettere; il soggetto deve battere sul tavolo ad ogni lettera 'A' {`(FBAC MNAA JKLB AFAK DEAA AJAM OFAAB)`}</div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>Far sottrarre per sette all'indietro, partendo da 100. Fermarsi dopo 5 risposte. {`(93-86-79-72-65)`}</div>
                        <div style={{width: "100%"}} className={styles.wrapper_vertical}>
                            <div style={{width: "100%"}} className={styles.wrapper_horizontal}>
                                <input id="4-5_corrette" name={'CORRETTE'} onChange={() => {ac_4_qstn4_changeHandler("4-5_corrette")}}
                                 checked={a4d4_option_1} value={"4-5_corrette"} className={styles.input_style} type="radio">
                                </input>
                                <label htmlFor="4-5_corrette" className={styles.domanda_style}> 4-5 Corrette</label>
                            </div>
                            <div style={{width: "100%"}} className={styles.wrapper_horizontal}>
                                <input id="2-3_corrette" name={'CORRETTE'} onChange={() => {ac_4_qstn4_changeHandler("2-3_corrette")}}
                                 checked={a4d4_option_2} value={"2-3_corrette"} className={styles.input_style} type="radio">
                                </input>
                                <label htmlFor="2-3_corrette" className={styles.domanda_style}> 2-3 Corrette</label>
                            </div>
                            <div style={{width: "100%"}} className={styles.wrapper_horizontal}>
                                <input id="1_corretta" name={'CORRETTE'} onChange={() => {ac_4_qstn4_changeHandler("1_corretta")}}
                                 checked={a4d4_option_3} value={"1_corretta"} className={styles.input_style} type="radio">
                                </input>
                                <label htmlFor="1_corretta" className={styles.domanda_style}> 1 Corretta</label>
                            </div>
                            <div style={{width: "100%"}} className={styles.wrapper_horizontal}>
                                <input id="0_corrette" name={'CORRETTE'} onChange={() => {ac_4_qstn4_changeHandler("0_corrette")}}
                                 checked={a4d4_option_4} value={"0_corrette"} className={styles.input_style} type="radio">
                                </input>
                                <label htmlFor="0_corrette" className={styles.domanda_style}> 0 Corrette</label>
                            </div>
                        </div>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 4: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_4}/6</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 5 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 5 - Linguaggio</h3>
                    <h4 className={styles.explanation}>Far ripetere le frasi: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn1_changeHandler} checked={areaCog_5_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>{"So solo che Giovanni è l'unico da aiutare oggi."}</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn2_changeHandler} checked={areaCog_5_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>{"Il gatto si nascondeva sempre sotto la poltrona quando i cani erano nella stanza."}</div>
                    </div>
                    <h4 className={styles.explanation}>Elenca: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn3_changeHandler} checked={areaCog_5_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Il massimo numero di parole che cominciano con la lettera 'F'</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 5: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_5}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 6 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 6 - Astrazione</h3>
                    <h4 className={styles.explanation}>Quali sono le similarità fra: </h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_6_qstn1_changeHandler} checked={areaCog_6_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>{"Treno e Bicicletta"}</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_6_qstn2_changeHandler} checked={areaCog_6_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>{"Orologio e Righello"}</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 6: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_6}/2</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 7 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 7 - Richiamo</h3>
                    <h4 className={styles.explanation}>Richiama le cinque parole dette in precedenza</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_7_qstn1_changeHandler} checked={areaCog_7_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "FACCIA"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_7_qstn2_changeHandler} checked={areaCog_7_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "VELLUTO"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_7_qstn3_changeHandler} checked={areaCog_7_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "CHIESA"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_7_qstn4_changeHandler} checked={areaCog_7_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "MARGHERITA"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_7_qstn5_changeHandler} checked={areaCog_7_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "ROSSO"</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 7: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_7}/5</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 8 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 8 - Orientamento</h3>

                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn1_changeHandler} checked={areaCog_8_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che anno ci troviamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn2_changeHandler} checked={areaCog_8_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Che giorno è oggi?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn3_changeHandler} checked={areaCog_8_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che mese siamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn4_changeHandler} checked={areaCog_8_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Quale giorno della settimana è oggi?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn5_changeHandler} checked={areaCog_8_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che città siamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_8_qstn6_changeHandler} checked={areaCog_8_domanda_6} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Dove ci troviamo?</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 1: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_8}/6</h3>
                    </div>
                </>
                }
                {showSintesiRisultati && sezioneCognitiva === 8 &&
                <>
                    <h3 className={styles.area_cog_title}>Riepilogo risultati</h3>
                    <div className={styles.wrapper_vertical}>
                        <div style={{width: "60%"}}>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 1:</div>
                                <div>{punteggioAreaCognitiva_1}/5</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 2:</div>
                                <div>{punteggioAreaCognitiva_2}/3</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Numero di tentativi Area Cognitiva 3:</div>
                                <div>{numeroTentativi}</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 4:</div>
                                <div>{punteggioAreaCognitiva_4}/6</div>
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
                                <div>{punteggioAreaCognitiva_7}/5</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 8:</div>
                                <div>{punteggioAreaCognitiva_8}/6</div>
                            </div>
                            <hr style={{width: "100%"}}></hr>
                            <div className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>PUNTEGGIO TOTALE:</div>
                                <div>{punteggioTOT}/30</div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
            
            <div className={styles.wrapper_horizontal}>
                {sezioneCognitiva > 1 &&
                    <GenericButton
                        onClick={previousAreaCogn}
                        buttonText={showSintesiRisultati ? "Indietro" : "Area precedente"}
                        generic_button
                        red_styling
                    ></GenericButton>
                }

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
                            tests_ctx.salvaRisultatoMoCA(punteggioTOT, paziente, arrayRiassuntivoRisposte)
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