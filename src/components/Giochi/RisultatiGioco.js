import styles from "./RisultatiGioco.module.css";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import { useContext, useState } from "react";
import PatientContext from "../../context/patients-context";

function RisultatiGioco(props){
    const patients_ctx = useContext(PatientContext);

    var indice = -2;
    const [ind, setInd] = useState(indice);
    const [disabledSaveButton, setDisabledSaveButton] = useState(true);

    //console.log(patients_ctx.listaPazienti.map(ogg => ogg.id).indexOf(value));

    function trovaIndice(event){
        for(var i = 0; i < patients_ctx.listaPazienti.length; i++){
            if(patients_ctx.listaPazienti[i].id === event.target.value){
                console.log("TROVATO");
                return i;
            }
            else{
                console.log("NON TROVATO");
            }
        }
        return -1;
    }

    function passaIndiceAGiochiPuntoJS(){
        props.assegnaRisultatiPaziente(ind)
    }

    return(
        <Card
            altroStile={true}
            children={
                <div className={styles.wrapper_risultati}>
                    <h1>RISULTATI UTENTE</h1>
                    <p>Risposte corrette: {props.numeroRisposteCorrette}/{props.numeroDomandeTotali}</p>
                    <GenericButton
                    onClick={props.chiudiSchedaRisultati}
                    small_button={true}
                    buttonText='Chiudi Scheda'>
                    </GenericButton>
                    <GenericButton
                    is_disabled={disabledSaveButton}
                    onClick={passaIndiceAGiochiPuntoJS}
                    generic_button={true}
                    buttonText='Assegna risultati a...'>
                    </GenericButton>
                    <h2>PAZIENTE SELEZIONATO: {ind}</h2>
                    <select onChange={(event) => {
                        // console.log(event.target.value);
                        console.log(patients_ctx.listaPazienti.map(ogg => ogg.id).indexOf(event.target.value));
                        indice = trovaIndice(event);
                        
                        if(indice >= 0){
                            setDisabledSaveButton(false);
                            setInd(indice);
                        }
                        else{
                            setDisabledSaveButton(true);
                        }
                        }}>
                        <option hidden>-- select an option --</option>
                        {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                    </select>
                    
                </div>
                }>
        </Card>
    );
}

export default RisultatiGioco;