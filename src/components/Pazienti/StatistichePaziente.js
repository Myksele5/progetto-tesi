import { useEffect, useState } from "react";
import styles from "./StatistichePaziente.module.css";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function StatistichePaziente(props){
    let fillCorrect = "0%";
    let fillWrong = "0%";

    const [risposteTotali, setRisposteTotali] = useState(0);
    const [risposteCorrette, setRisposteCorrette] = useState(0);
    const [risposteSbagliate, setRisposteSbagliate] = useState(0);

    const [filtroStatistiche, setFiltroStatistiche] = useState("Totali");

    const patientID = props.pazienteID;

    useEffect(() => {
        setRisposteTotali(0);
        setRisposteCorrette(0);
        setRisposteSbagliate(0);
        getPatientLifetimeStatistics();
    }, [filtroStatistiche])

    async function getPatientLifetimeStatistics(){
        let result;

        result = await getServerMgr().getPatientStatistics(patientID);

        var today = new Date();
        var day = parseInt(today.toLocaleString('it-IT', {day: '2-digit'}))
        var month = parseInt(today.toLocaleString('it-IT', {month: '2-digit'}))
        var year = parseInt(today.getFullYear());

        console.log(day);


        // console.log(result[0].rispTotali);
        if(result){
            switch(filtroStatistiche){
                case "Totali":
                    result.forEach((item) => {
                        setRisposteTotali((prevRispTot) => (prevRispTot + item.rispTotali));
                        setRisposteCorrette((prevRispCorr) => (prevRispCorr + item.rispCorrette));
                        setRisposteSbagliate((prevRispSbag) => (prevRispSbag + item.rispSbagliate));
                    });
                    break;
                case "ultime 48 ore":
                    result.forEach((item) => {
                        var dataEsecuzioneGioco = new Date(item.dataSvolgimento);

                        // console.log(dataEsecuzioneGioco.getFullYear() === year);
                        // console.log((dataEsecuzioneGioco.getMonth() + 1) === month);
                        // console.log((dataEsecuzioneGioco.getDate() + 1) === day);
                        // console.log(dataEsecuzioneGioco.getDate() === day);
                        
                        if(dataEsecuzioneGioco.getFullYear() === year && (dataEsecuzioneGioco.getMonth() + 1) === month && 
                            ((dataEsecuzioneGioco.getDate() + 1) === day || dataEsecuzioneGioco.getDate() === day)){
                            setRisposteTotali((prevRispTot) => (prevRispTot + item.rispTotali));
                            setRisposteCorrette((prevRispCorr) => (prevRispCorr + item.rispCorrette));
                            setRisposteSbagliate((prevRispSbag) => (prevRispSbag + item.rispSbagliate));
                        }
                        
                    });
                    break;
                case "ultimo mese":
                    result.forEach((item) => {
                        var dataEsecuzioneGioco = new Date(item.dataSvolgimento);

                        // console.log(dataEsecuzioneGioco.getFullYear() === year);
                        // console.log((dataEsecuzioneGioco.getMonth() + 1) === month);
                        // console.log((dataEsecuzioneGioco.getDate() + 1) === day);
                        // console.log(dataEsecuzioneGioco.getDate() === day);
                        
                        if(dataEsecuzioneGioco.getFullYear() === year && 
                            ((dataEsecuzioneGioco.getMonth() + 1) === month || 
                             ((dataEsecuzioneGioco.getMonth() + 2) === month && (day - dataEsecuzioneGioco.getDate()) < 0) 
                            )
                        ){
                            setRisposteTotali((prevRispTot) => (prevRispTot + item.rispTotali));
                            setRisposteCorrette((prevRispCorr) => (prevRispCorr + item.rispCorrette));
                            setRisposteSbagliate((prevRispSbag) => (prevRispSbag + item.rispSbagliate));
                        }
                        
                    });
                    break;
                default:
                    break;
            }
            
        }
    }

    function filtroStatisticheChangeHandler(event){
        setFiltroStatistiche(event.target.value);
        console.log(event.target.value)
    }

    if(risposteTotali > 0){
        fillCorrect = Math.round((risposteCorrette / risposteTotali) * 100) + "%";
        fillWrong = Math.round((risposteSbagliate / risposteTotali) * 100) + "%";
    }

    return(
        <>
            <select value={filtroStatistiche} onChange={filtroStatisticheChangeHandler} className={styles.select_style}>
                <option>Totali</option>
                <option>ultime 48 ore</option>
                <option>ultimo mese</option>
            </select>
            {/* <h1>CIAOO</h1> */}
            <div className={styles.wrapper_statistiche}>
                <div className={styles.wrapper_barre}>
                    <div className={styles.barra}>
                        <div style={{height: fillCorrect}} className={styles.riempimento_barra_corrette}></div>
                    </div>
                    <div className={styles.barra}>
                        <div style={{height: fillWrong}} className={styles.riempimento_barra_sbagliate}></div>
                    </div>
                </div>
                <label className={styles.content_style}>Risposte totali: {risposteTotali}</label>
                <label className={styles.content_style}>Risposte corrette: {risposteCorrette}</label>
                <label className={styles.content_style}>Risposte sbagliate: {risposteSbagliate}</label>
            </div>
        </>
    );
}

export default StatistichePaziente;