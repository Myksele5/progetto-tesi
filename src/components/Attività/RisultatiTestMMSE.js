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

    //DOMANDE AREA COGNITIVA 6
    const [areaCog_6_domanda_1, set_areaCog_6_domanda_1] = useState(0);

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
    }, [areaCog_3_domanda_1])
    useEffect(() => {
        punteggio_AC4();
    }, [areaCog_4_domanda_1, areaCog_4_domanda_2, areaCog_4_domanda_3])
    useEffect(() => {
        punteggio_AC5();
    }, [areaCog_5_domanda_1, areaCog_5_domanda_2, areaCog_5_domanda_3, areaCog_5_domanda_4, areaCog_5_domanda_5])
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
        setPunteggioAreaCognitiva_3(areaCog_3_domanda_1)
    }
    function punteggio_AC4(){
        setPunteggioAreaCognitiva_4(areaCog_4_domanda_1 + areaCog_4_domanda_2 + areaCog_4_domanda_3)
    }
    function punteggio_AC5(){
        setPunteggioAreaCognitiva_5(areaCog_5_domanda_1 + areaCog_5_domanda_2 + areaCog_5_domanda_3 + areaCog_5_domanda_4 + areaCog_5_domanda_5)
    }
    function punteggio_AC6(){
        setPunteggioAreaCognitiva_6(areaCog_6_domanda_1)
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
    function ac_1_qstn7_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_7(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_7(0);
        }
        else{
            set_areaCog_1_domanda_7(Number(event.target.value));
        }
    }
    function ac_1_qstn8_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_8(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_8(0);
        }
        else{
            set_areaCog_1_domanda_8(Number(event.target.value));
        }
    }
    function ac_1_qstn9_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_9(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_9(0);
        }
        else{
            set_areaCog_1_domanda_9(Number(event.target.value));
        }
    }
    function ac_1_qstn10_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_1_domanda_10(1)
        }
        else if(event.target.value < 0){
            set_areaCog_1_domanda_10(0);
        }
        else{
            set_areaCog_1_domanda_10(Number(event.target.value));
        }
    }


    function ac_2_qstn1_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_2_domanda_1(1)
        }
        else if(event.target.value < 0){
            set_areaCog_2_domanda_1(0);
        }
        else{
            set_areaCog_2_domanda_1(Number(event.target.value));
        }
    }
    function ac_2_qstn2_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_2_domanda_2(1)
        }
        else if(event.target.value < 0){
            set_areaCog_2_domanda_2(0);
        }
        else{
            set_areaCog_2_domanda_2(Number(event.target.value));
        }
    }
    function ac_2_qstn3_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_2_domanda_3(1)
        }
        else if(event.target.value < 0){
            set_areaCog_2_domanda_3(0);
        }
        else{
            set_areaCog_2_domanda_3(Number(event.target.value));
        }
    }


    function ac_3_qstn1_changeHandler(event){
        if(event.target.value > 5 ){
            set_areaCog_3_domanda_1(5)
        }
        else if(event.target.value < 0){
            set_areaCog_3_domanda_1(0);
        }
        else{
            set_areaCog_3_domanda_1(Number(event.target.value));
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
    function ac_5_qstn3_changeHandler(event){
        if(event.target.value > 3 ){
            set_areaCog_5_domanda_3(3)
        }
        else if(event.target.value < 0){
            set_areaCog_5_domanda_3(0);
        }
        else{
            set_areaCog_5_domanda_3(Number(event.target.value));
        }
    }
    function ac_5_qstn4_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_5_domanda_4(1)
        }
        else if(event.target.value < 0){
            set_areaCog_5_domanda_4(0);
        }
        else{
            set_areaCog_5_domanda_4(Number(event.target.value));
        }
    }
    function ac_5_qstn5_changeHandler(event){
        if(event.target.value > 1 ){
            set_areaCog_5_domanda_5(1)
        }
        else if(event.target.value < 0){
            set_areaCog_5_domanda_5(0);
        }
        else{
            set_areaCog_5_domanda_5(Number(event.target.value));
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

    return(
        <>
            <h1 className={styles.title}>Valutazione MMSE: {infoPaziente.nome} {infoPaziente.cognome}</h1>
            <div className={styles.area_cog_style}>
                {sezioneCognitiva === 1 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 1 - Orientamento</h3>

                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In che anno ci troviamo?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn1_changeHandler} value={areaCog_1_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>Che giorno è oggi?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn2_changeHandler} value={areaCog_1_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In che mese siamo?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn3_changeHandler} value={areaCog_1_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In che stagione?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn4_changeHandler} value={areaCog_1_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>Quale giorno della settimana è oggi?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn5_changeHandler} value={areaCog_1_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>Dove ci troviamo?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn6_changeHandler} value={areaCog_1_domanda_6} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>A che piano?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn7_changeHandler} value={areaCog_1_domanda_7} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In quale paese?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn8_changeHandler} value={areaCog_1_domanda_8} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In che regione siamo?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn9_changeHandler} value={areaCog_1_domanda_9} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>
                    <div className={styles.wrapper_vertical}>
                        <div className={styles.domanda_style}>In quale città siamo adesso?</div>
                        <div className={styles.wrapper_horizontal}>
                            <input className={styles.risposta_style}></input>
                            <input onChange={ac_1_qstn10_changeHandler} value={areaCog_1_domanda_10} className={styles.input_style} type="number" min={0} max={1}></input>
                        </div>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}} className={styles.domanda_style}>Punteggio Area Cognitiva 1: </h3>
                        <h3>{punteggioAreaCognitiva_1}/10</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 2 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 2 - Memoria</h3>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "CASA"</div>
                        <input onChange={ac_2_qstn1_changeHandler} value={areaCog_2_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "PANE"</div>
                        <input onChange={ac_2_qstn2_changeHandler} value={areaCog_2_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripeti "GATTO"</div>
                        <input onChange={ac_2_qstn3_changeHandler} value={areaCog_2_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 2: </h3>
                        <h3>{punteggioAreaCognitiva_2}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 3 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 3 - Attenzione e calcolo</h3>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.wrapper_vertical}>
                            <div className={styles.domanda_style}>Far contare per sette all'indietro, partendo da 100. Fermarsi dopo 5 risposte</div>
                            <div className={styles.domanda_style}>{"(In alternativa far scandire la parola 'MONDO' al contrario una lettera per volta)"}</div>
                        </div>
                        
                        <input onChange={ac_3_qstn1_changeHandler} value={areaCog_3_domanda_1} className={styles.input_style} type="number" min={0} max={5}></input>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 3: </h3>
                        <h3>{punteggioAreaCognitiva_3}/5</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 4 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 4 - Richiamo</h3>
                    <h4>Richiama i tre termini precedentemente imparati</h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "CASA"</div>
                        <input onChange={ac_4_qstn1_changeHandler} value={areaCog_4_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "PANE"</div>
                        <input onChange={ac_4_qstn2_changeHandler} value={areaCog_4_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Richiamo parola "GATTO"</div>
                        <input onChange={ac_4_qstn3_changeHandler} value={areaCog_4_domanda_3} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 4: </h3>
                        <h3>{punteggioAreaCognitiva_4}/3</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 5 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 5 - Linguaggio</h3>

                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>
                            <div className={styles.domanda_style}>Come si chiama questo? {"(Indicare una matita)."}</div>
                            <div className={styles.domanda_style}>Come si chiama questo? {"(Indicare un orologio)."}</div>
                            
                        </div>
                        <input onChange={ac_5_qstn1_changeHandler} value={areaCog_5_domanda_1} className={styles.input_style} type="number" min={0} max={2}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Ripetere la frase: {"TIGRE CONTRO TIGRE"}</div>
                        <input onChange={ac_5_qstn2_changeHandler} value={areaCog_5_domanda_2} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <h4 style={{marginTop: "10px", marginBottom: "0"}}>Invitare il paziente a: </h4>
                    <h4 style={{marginTop: "0"}}>{"(1 punto per ogni azione corretta)"}</h4>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Prendi il foglio con la mano destra.</div>
                        <div className={styles.domanda_style}>Piegalo a metà.</div>
                        <div className={styles.domanda_style}>Butta il foglio per terra.</div>
                        <input onChange={ac_5_qstn3_changeHandler} value={areaCog_5_domanda_3} className={styles.input_style} type="number" min={0} max={3}></input>
                    </div>

                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Invitare il paziente a seguire il comando indicato sul foglio: {"(Chiuda gli occhi)."}</div>
                        <input onChange={ac_5_qstn4_changeHandler} value={areaCog_5_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Far scrivere una frase formata da almeno un soggetto e un verbo</div>
                        <input onChange={ac_5_qstn5_changeHandler} value={areaCog_5_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 5: </h3>
                        <h3>{punteggioAreaCognitiva_5}/8</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 6 && !showSintesiRisultati &&
                <>
                    <h3 className={styles.area_cog_title}>Area Cognitiva 6 - Abilità</h3>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Far copiare al paziente il disegno indicato.</div>    
                        <input onChange={ac_6_qstn1_changeHandler} value={areaCog_6_domanda_1} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>

                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 style={{width: "80%"}}  className={styles.domanda_style}>Punteggio Area Cognitiva 6: </h3>
                        <h3>{punteggioAreaCognitiva_6}/1</h3>
                    </div>
                </>
                }
                {showSintesiRisultati && sezioneCognitiva === 6 &&
                <>
                    <h3 className={styles.area_cog_title}>Riepilogo risultati</h3>
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
                            tests_ctx.salvaRisultatoMMSE(punteggioTOT, paziente)
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