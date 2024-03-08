import { useContext, useEffect, useState } from "react";
import styles from "./RisultatiTestMMSE.module.css";
import GenericButton from "../UI/GenericButton";
import TestsContext from "../../context/tests-context";
import PatientContext from "../../context/patients-context";

function RisultatiTestMMSE(props){
    const tests_ctx = useContext(TestsContext);
    const patients_ctx = useContext(PatientContext)

    const paziente = props.paziente;
    const tipoTest = props.tipoTest;

    const [infoPaziente, setInfoPaziente] = useState({});

    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);
    const [showSintesiRisultati, setShowSintesiRisultati] = useState(false);

    //PUNTEGGI SINGOLE AREE COGNITIVE
    const [punteggioAreaCognitiva_1, setPunteggioAreaCognitiva_1] = useState(0);
    const [punteggioAreaCognitiva_2, setPunteggioAreaCognitiva_2] = useState(0);
    const [punteggioAreaCognitiva_3, setPunteggioAreaCognitiva_3] = useState(0);
    const [punteggioAreaCognitiva_4, setPunteggioAreaCognitiva_4] = useState(0);
    const [punteggioAreaCognitiva_5, setPunteggioAreaCognitiva_5] = useState(0);
    const [punteggioAreaCognitiva_6, setPunteggioAreaCognitiva_6] = useState(0);
    const [punteggioTOT, setPunteggioTOT] = useState(0);

    //DOMANDE AREA COGNITIVA 1
    const [areaCog_1_domanda_1, set_areaCog_1_domanda_1] = useState(0);
    const [areaCog_1_domanda_2, set_areaCog_1_domanda_2] = useState(0);
    const [areaCog_1_domanda_3, set_areaCog_1_domanda_3] = useState(0);
    const [areaCog_1_domanda_4, set_areaCog_1_domanda_4] = useState(0);
    const [areaCog_1_domanda_5, set_areaCog_1_domanda_5] = useState(0);
    const [areaCog_1_domanda_6, set_areaCog_1_domanda_6] = useState(0);
    const [areaCog_1_domanda_7, set_areaCog_1_domanda_7] = useState(0);
    const [areaCog_1_domanda_8, set_areaCog_1_domanda_8] = useState(0);
    const [areaCog_1_domanda_9, set_areaCog_1_domanda_9] = useState(0);
    const [areaCog_1_domanda_10, set_areaCog_1_domanda_10] = useState(0);

    //DOMANDE AREA COGNITIVA 2
    const [areaCog_2_domanda_1, set_areaCog_2_domanda_1] = useState(0);
    const [areaCog_2_domanda_2, set_areaCog_2_domanda_2] = useState(0);
    const [areaCog_2_domanda_3, set_areaCog_2_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 3
    const [areaCog_3_domanda_1, set_areaCog_3_domanda_1] = useState(0);
    const [areaCog_3_domanda_2, set_areaCog_3_domanda_2] = useState(0);
    const [areaCog_3_domanda_3, set_areaCog_3_domanda_3] = useState(0);
    const [areaCog_3_domanda_4, set_areaCog_3_domanda_4] = useState(0);
    const [areaCog_3_domanda_5, set_areaCog_3_domanda_5] = useState(0);

    //DOMANDE AREA COGNITIVA 4
    const [areaCog_4_domanda_1, set_areaCog_4_domanda_1] = useState(0);
    const [areaCog_4_domanda_2, set_areaCog_4_domanda_2] = useState(0);
    const [areaCog_4_domanda_3, set_areaCog_4_domanda_3] = useState(0);

    //DOMANDE AREA COGNITIVA 5
    const [areaCog_5_domanda_1, set_areaCog_5_domanda_1] = useState(0);
    const [areaCog_5_domanda_2, set_areaCog_5_domanda_2] = useState(0);
    const [areaCog_5_domanda_3, set_areaCog_5_domanda_3] = useState(0);
    const [areaCog_5_domanda_4, set_areaCog_5_domanda_4] = useState(0);
    const [areaCog_5_domanda_5, set_areaCog_5_domanda_5] = useState(0);
    const [areaCog_5_domanda_6, set_areaCog_5_domanda_6] = useState(0);
    const [areaCog_5_domanda_7, set_areaCog_5_domanda_7] = useState(0);
    const [areaCog_5_domanda_8, set_areaCog_5_domanda_8] = useState(0);

    //DOMANDE AREA COGNITIVA 6
    const [areaCog_6_domanda_1, set_areaCog_6_domanda_1] = useState(0);

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
            risposta: areaCog_1_domanda_6
        },
        {
            domanda: 7,
            risposta: areaCog_1_domanda_7
        },
        {
            domanda: 8,
            risposta: areaCog_1_domanda_8
        },
        {
            domanda: 9,
            risposta: areaCog_1_domanda_9
        },
        {
            domanda: 10,
            risposta: areaCog_1_domanda_10
        },
        {
            domanda: 11,
            risposta: areaCog_2_domanda_1
        },
        {
            domanda: 12,
            risposta: areaCog_2_domanda_2
        },
        {
            domanda: 13,
            risposta: areaCog_2_domanda_3
        },
        {
            domanda: 14,
            risposta: areaCog_3_domanda_1
        },
        {
            domanda: 15,
            risposta: areaCog_3_domanda_2
        },
        {
            domanda: 16,
            risposta: areaCog_3_domanda_3
        },
        {
            domanda: 17,
            risposta: areaCog_3_domanda_4
        },
        {
            domanda: 18,
            risposta: areaCog_3_domanda_5
        },
        {
            domanda: 19,
            risposta: areaCog_4_domanda_1
        },
        {
            domanda: 20,
            risposta: areaCog_4_domanda_2
        },
        {
            domanda: 21,
            risposta: areaCog_4_domanda_3
        },
        {
            domanda: 22,
            risposta: areaCog_5_domanda_1
        },
        {
            domanda: 23,
            risposta: areaCog_5_domanda_2
        },
        {
            domanda: 24,
            risposta: areaCog_5_domanda_3
        },
        {
            domanda: 25,
            risposta: areaCog_5_domanda_4
        },
        {
            domanda: 26,
            risposta: areaCog_5_domanda_5
        },
        {
            domanda: 27,
            risposta: areaCog_5_domanda_6
        },
        {
            domanda: 28,
            risposta: areaCog_5_domanda_7
        },
        {
            domanda: 29,
            risposta: areaCog_5_domanda_8
        },
        {
            domanda: 30,
            risposta: areaCog_6_domanda_1
        }
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
    }, [areaCog_1_domanda_1, areaCog_1_domanda_2, areaCog_1_domanda_3, areaCog_1_domanda_4, areaCog_1_domanda_5, 
        areaCog_1_domanda_6, areaCog_1_domanda_7, areaCog_1_domanda_8, areaCog_1_domanda_9, areaCog_1_domanda_10]
    )

    useEffect(() => {
        punteggio_AC2();
    }, [areaCog_2_domanda_1, areaCog_2_domanda_2, areaCog_2_domanda_3])
    useEffect(() => {
        punteggio_AC3();
    }, [areaCog_3_domanda_1, areaCog_3_domanda_2, areaCog_3_domanda_3, areaCog_3_domanda_4, areaCog_3_domanda_5])
    useEffect(() => {
        punteggio_AC4();
    }, [areaCog_4_domanda_1, areaCog_4_domanda_2, areaCog_4_domanda_3])
    useEffect(() => {
        punteggio_AC5();
    }, [areaCog_5_domanda_1, areaCog_5_domanda_2, areaCog_5_domanda_3, areaCog_5_domanda_4, areaCog_5_domanda_5,
        areaCog_5_domanda_6, areaCog_5_domanda_7, areaCog_5_domanda_8])
    useEffect(() => {
        punteggio_AC6();
    }, [areaCog_6_domanda_1])

    function nextAreaCogn(){
        if(sezioneCognitiva < 6){
            setSezioneCognitiva((prevArea) => (prevArea + 1))
        }
    }
    function previousAreaCogn(){
        if(sezioneCognitiva >= 2 && !showSintesiRisultati){
            setSezioneCognitiva((prevArea) => (prevArea - 1))
        }
        if(sezioneCognitiva === 6 && showSintesiRisultati){
            setShowSintesiRisultati(false);
        }
    }

    function mostraRisultati(){
        setShowSintesiRisultati(true);
        setPunteggioTOT(punteggioAreaCognitiva_1 + punteggioAreaCognitiva_2 + punteggioAreaCognitiva_3 + punteggioAreaCognitiva_4 + punteggioAreaCognitiva_5 + punteggioAreaCognitiva_6)
    }

    function punteggio_AC1(){
        setPunteggioAreaCognitiva_1(
            areaCog_1_domanda_1 + areaCog_1_domanda_2 + areaCog_1_domanda_3 + areaCog_1_domanda_4 + areaCog_1_domanda_5 +
            areaCog_1_domanda_6 + areaCog_1_domanda_7 + areaCog_1_domanda_8 + areaCog_1_domanda_9 + areaCog_1_domanda_10
        )
    }
    function punteggio_AC2(){
        setPunteggioAreaCognitiva_2(areaCog_2_domanda_1 + areaCog_2_domanda_2 + areaCog_2_domanda_3)
    }
    function punteggio_AC3(){
        setPunteggioAreaCognitiva_3(areaCog_3_domanda_1 + areaCog_3_domanda_2 + areaCog_3_domanda_3 + areaCog_3_domanda_4 + areaCog_3_domanda_5)
    }
    function punteggio_AC4(){
        setPunteggioAreaCognitiva_4(areaCog_4_domanda_1 + areaCog_4_domanda_2 + areaCog_4_domanda_3)
    }
    function punteggio_AC5(){
        setPunteggioAreaCognitiva_5(
            areaCog_5_domanda_1 + areaCog_5_domanda_2 + areaCog_5_domanda_3 + areaCog_5_domanda_4 + areaCog_5_domanda_5 + 
            areaCog_5_domanda_6 + areaCog_5_domanda_7 + areaCog_5_domanda_8
        )
    }
    function punteggio_AC6(){
        setPunteggioAreaCognitiva_6(areaCog_6_domanda_1)
    }

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
    function ac_1_qstn6_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_6(1)
        }
        else{
            set_areaCog_1_domanda_6(0);
        }
    }
    function ac_1_qstn7_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_7(1)
        }
        else{
            set_areaCog_1_domanda_7(0);
        }
    }
    function ac_1_qstn8_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_8(1)
        }
        else{
            set_areaCog_1_domanda_8(0);
        }
    }
    function ac_1_qstn9_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_9(1)
        }
        else{
            set_areaCog_1_domanda_9(0);
        }
    }
    function ac_1_qstn10_changeHandler(event){
        if(event.target.checked){
            set_areaCog_1_domanda_10(1)
        }
        else{
            set_areaCog_1_domanda_10(0);
        }
    }


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


    function ac_3_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_3_domanda_1(1)
        }
        else{
            set_areaCog_3_domanda_1(0);
        }
    }
    function ac_3_qstn2_changeHandler(event){
        if(event.target.checked){
            set_areaCog_3_domanda_2(1)
        }
        else{
            set_areaCog_3_domanda_2(0);
        }
    }
    function ac_3_qstn3_changeHandler(event){
        if(event.target.checked){
            set_areaCog_3_domanda_3(1)
        }
        else{
            set_areaCog_3_domanda_3(0);
        }
    }
    function ac_3_qstn4_changeHandler(event){
        if(event.target.checked){
            set_areaCog_3_domanda_4(1)
        }
        else{
            set_areaCog_3_domanda_4(0);
        }
    }
    function ac_3_qstn5_changeHandler(event){
        if(event.target.checked){
            set_areaCog_3_domanda_5(1)
        }
        else{
            set_areaCog_3_domanda_5(0);
        }
    }

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
    function ac_5_qstn4_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_4(1)
        }
        else{
            set_areaCog_5_domanda_4(0);
        }
    }
    function ac_5_qstn5_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_5(1)
        }
        else{
            set_areaCog_5_domanda_5(0);
        }
    }
    function ac_5_qstn6_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_6(1)
        }
        else{
            set_areaCog_5_domanda_6(0);
        }
    }
    function ac_5_qstn7_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_7(1)
        }
        else{
            set_areaCog_5_domanda_7(0);
        }
    }
    function ac_5_qstn8_changeHandler(event){
        if(event.target.checked){
            set_areaCog_5_domanda_8(1)
        }
        else{
            set_areaCog_5_domanda_8(0);
        }
    }

    function ac_6_qstn1_changeHandler(event){
        if(event.target.checked){
            set_areaCog_6_domanda_1(1)
        }
        else{
            set_areaCog_6_domanda_1(0);
        }
    }

    return(
        <>
            <h1 className={styles.title}>Valutazione MMSE: {infoPaziente.nome} {infoPaziente.cognome}</h1>
            <div className={styles.area_cog_style}>
                {sezioneCognitiva === 1 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 1 - Orientamento</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>Temporale</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn1_changeHandler} checked={areaCog_1_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che anno ci troviamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn2_changeHandler} checked={areaCog_1_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Che giorno è oggi?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn3_changeHandler} checked={areaCog_1_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che mese siamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn4_changeHandler} checked={areaCog_1_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che stagione?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn5_changeHandler} checked={areaCog_1_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Quale giorno della settimana è oggi?</div>
                    </div>

                    <h4 className={styles.explanation}>Spaziale</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn6_changeHandler} checked={areaCog_1_domanda_6} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Dove ci troviamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn7_changeHandler} checked={areaCog_1_domanda_7} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>A che piano?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn8_changeHandler} checked={areaCog_1_domanda_8} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In quale paese?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn9_changeHandler} checked={areaCog_1_domanda_9} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In che regione siamo?</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_1_qstn10_changeHandler} checked={areaCog_1_domanda_10} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>In quale città siamo adesso?</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 1: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_1}/10</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 2 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 2 - Memoria</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>Ripetizione di parole</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn1_changeHandler} checked={areaCog_2_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Ripetere "CASA"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn2_changeHandler} checked={areaCog_2_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Ripetere "PANE"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_2_qstn3_changeHandler} checked={areaCog_2_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Ripetere "GATTO"</div>
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
                    <h3 className={styles.area_cog_title}>Area Cognitiva 3 - Attenzione e calcolo</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>
                        Far contare per sette all'indietro, partendo da 100. Fermarsi dopo 5 risposte
                        {" (In alternativa far scandire la parola 'MONDO' al contrario una lettera per volta)"}
                    </h4>
                    
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_3_qstn1_changeHandler} checked={areaCog_3_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Prima sottrazione: 93 / Prima lettera: 'O'</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_3_qstn2_changeHandler} checked={areaCog_3_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Seconda sottrazione: 86 / Seconda lettera: 'D'</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_3_qstn3_changeHandler} checked={areaCog_3_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Terza sottrazione: 79 / Terza lettera: 'N'</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_3_qstn4_changeHandler} checked={areaCog_3_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Quarta sottrazione: 72 / Quarta lettera: 'O'</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_3_qstn5_changeHandler} checked={areaCog_3_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Quinta sottrazione: 65 / Quinta lettera: 'M'</div>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 3: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_3}/5</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 4 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 4 - Richiamo</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>Richiama i tre termini precedentemente imparati</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn1_changeHandler} checked={areaCog_4_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "CASA"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn2_changeHandler} checked={areaCog_4_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "PANE"</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_4_qstn3_changeHandler} checked={areaCog_4_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Richiamo parola "GATTO"</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 4: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_4}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 5 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 5 - Linguaggio</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>Denominazione oggetti</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn1_changeHandler} checked={areaCog_5_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Come si chiama questo? {"(Indicare una matita)."}</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn2_changeHandler} checked={areaCog_5_domanda_2} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Come si chiama questo? {"(Indicare un orologio)."}</div>
                    </div>
                    <h4 className={styles.explanation}>Ripetizione frase</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn3_changeHandler} checked={areaCog_5_domanda_3} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Ripetere la frase: {"TIGRE CONTRO TIGRE"}</div>
                    </div>
                    <h4 className={styles.explanation}>Esecuzione comandi</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn4_changeHandler} checked={areaCog_5_domanda_4} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Prendi il foglio con la mano destra.</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn5_changeHandler} checked={areaCog_5_domanda_5} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Piegalo a metà.</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn6_changeHandler} checked={areaCog_5_domanda_6} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Butta il foglio per terra.</div>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn7_changeHandler} checked={areaCog_5_domanda_7} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Invitare il paziente a seguire il comando indicato sul foglio: {"(Chiuda gli occhi)."}</div>
                    </div>
                    <h4 className={styles.explanation}>Scrittura</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_5_qstn8_changeHandler} checked={areaCog_5_domanda_8} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Far scrivere una frase formata da almeno un soggetto e un verbo</div>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 5: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_5}/8</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 6 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 6 - Abilità</h3>
                    {/* <hr style={{width: "100%"}}></hr> */}

                    <h4 className={styles.explanation}>Disegnare</h4>
                    <div className={styles.wrapper_horizontal}>
                        <input onChange={ac_6_qstn1_changeHandler} checked={areaCog_6_domanda_1} className={styles.input_style} type="checkbox"></input>
                        <div className={styles.domanda_style}>Far copiare al paziente il disegno indicato. {`(Pentagoni intrecciati)`}</div>    
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.score_area_cog}>Punteggio Area Cognitiva 6: </h3>
                        <h3 className={styles.score}>{punteggioAreaCognitiva_6}/1</h3>
                    </div>
                </>
                }
                {showSintesiRisultati && sezioneCognitiva === 6 &&
                <>
                    <h3 className={styles.area_cog_title}>Riepilogo risultati</h3>
                    <div className={styles.wrapper_vertical}>
                        <div style={{width: "60%"}}>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 1:</div>
                                <div>{punteggioAreaCognitiva_1}/10</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 2:</div>
                                <div>{punteggioAreaCognitiva_2}/3</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 3:</div>
                                <div>{punteggioAreaCognitiva_3}/5</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 4:</div>
                                <div>{punteggioAreaCognitiva_4}/3</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 5:</div>
                                <div>{punteggioAreaCognitiva_5}/8</div>
                            </div>
                            <div style={{margin: "5px 0"}} className={styles.wrapper_horizontal}>
                                <div className={styles.domanda_style}>Punteggio Area Cognitiva 6:</div>
                                <div>{punteggioAreaCognitiva_6}/1</div>
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

                {sezioneCognitiva < 6 &&
                    <GenericButton
                        onClick={nextAreaCogn}
                        buttonText={"Prossima Area"}
                        generic_button
                    ></GenericButton>
                }
                {sezioneCognitiva === 6 && !showSintesiRisultati &&
                    <GenericButton
                        onClick={mostraRisultati}
                        buttonText={"Mostra riepilogo"}
                        generic_button
                    ></GenericButton>
                }
                {showSintesiRisultati &&
                    <GenericButton
                        onClick={() => {
                            tests_ctx.salvaRisultatoMMSE(punteggioTOT, paziente, arrayRiassuntivoRisposte)
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

export default RisultatiTestMMSE;