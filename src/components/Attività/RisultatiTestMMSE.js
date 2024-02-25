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

    //PUNTEGGI SINGOLE AREE COGNITIVE
    const [punteggioAreaCognitiva_1, setPunteggioAreaCognitiva_1] = useState(0);
    const [punteggioAreaCognitiva_2, setPunteggioAreaCognitiva_2] = useState(0);
    const [punteggioAreaCognitiva_3, setPunteggioAreaCognitiva_3] = useState(0);
    const [punteggioAreaCognitiva_4, setPunteggioAreaCognitiva_4] = useState(0);
    const [punteggioAreaCognitiva_5, setPunteggioAreaCognitiva_5] = useState(0);
    const [punteggioAreaCognitiva_6, setPunteggioAreaCognitiva_6] = useState(0);

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

    function nextAreaCogn(){
        setSezioneCognitiva((prevArea) => (prevArea + 1))
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

    return(
        <>
            <h1 className={styles.title}>Valutazione MMSE: {infoPaziente.nome} {infoPaziente.cognome}</h1>
            <div className={styles.area_cog_style}>
                {sezioneCognitiva === 1 &&
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
                        <div className={styles.domanda_style}>In che stagione?</div>
                        <input onChange={ac_1_qstn4_changeHandler} value={areaCog_1_domanda_4} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Quale giorno della settimana è oggi?</div>
                        <input onChange={ac_1_qstn5_changeHandler} value={areaCog_1_domanda_5} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>Dove ci troviamo?</div>
                        <input onChange={ac_1_qstn6_changeHandler} value={areaCog_1_domanda_6} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>A che piano?</div>
                        <input onChange={ac_1_qstn7_changeHandler} value={areaCog_1_domanda_7} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In quale paese?</div>
                        <input onChange={ac_1_qstn8_changeHandler} value={areaCog_1_domanda_8} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In che regione siamo?</div>
                        <input onChange={ac_1_qstn9_changeHandler} value={areaCog_1_domanda_9} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <div className={styles.wrapper_horizontal}>
                        <div className={styles.domanda_style}>In quale città siamo adesso?</div>
                        <input onChange={ac_1_qstn10_changeHandler} value={areaCog_1_domanda_10} className={styles.input_style} type="number" min={0} max={1}></input>
                    </div>
                    <hr style={{width: "100%"}}></hr>
                    <div className={styles.wrapper_horizontal}>
                        <h3 className={styles.domanda_style}>Punteggio Area Cognitiva 1: </h3>
                        <h3>{punteggioAreaCognitiva_1}/10</h3>
                    </div>
                </>
                }
                {sezioneCognitiva === 2 &&
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
                        <h3 className={styles.domanda_style}>Punteggio Area Cognitiva 2: </h3>
                        <h3>{punteggioAreaCognitiva_2}/3</h3>
                    </div>
                </>
                }
            </div>
            <GenericButton
                onClick={nextAreaCogn}
                buttonText={"Prossima Area"}
                generic_button
            ></GenericButton>
        </>
    );
}

export default RisultatiTestMMSE;