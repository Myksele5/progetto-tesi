import styles from "./RisultatiGioco.module.css";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import { useContext, useState } from "react";
import PatientContext from "../../context/patients-context";

var paziente_selezionato_ID;

function RisultatiGioco(props){
    const patients_ctx = useContext(PatientContext);

    var paziente_selezionato;

    const [paz, setPaz] = useState(null);
    const [disabledSaveButton, setDisabledSaveButton] = useState(true);

    //console.log(patients_ctx.listaPazienti.map(ogg => ogg.id).indexOf(value));

    function trovaPaziente(event){
        var paziente_nome_mostrato;
        console.log(event.target.value);

        for(var i = 0; i < patients_ctx.listaPazienti.length; i++){
            if(patients_ctx.listaPazienti[i].ID === parseInt(event.target.value)){
                console.log("TROVATO");
                paziente_nome_mostrato = patients_ctx.listaPazienti[i].nome + " " + patients_ctx.listaPazienti[i].cognome
                paziente_selezionato_ID = patients_ctx.listaPazienti[i].ID;
                return paziente_nome_mostrato;
            }
            else{
                console.log("NON TROVATO");
                console.log(patients_ctx.listaPazienti[i].ID);
            }
        }
        return -1;
    }

    function passaIndiceAGiochiPuntoJS(){
        console.log(paziente_selezionato_ID);
        props.assegnaRisultatiPaziente(paziente_selezionato_ID);
        // props.assegnaRisultatiPaziente(paziente_selezionato_obj)
    }

    return(
        <Card
            altroStile={true}
            children={
                <div className={styles.wrapper_risultati}>
                    <h1 className={styles.title_scheda}>RISULTATI UTENTE</h1>

                    <h3 className={styles.numero_risposte}>Risposte corrette: {props.numeroRisposteCorrette}/{props.numeroDomandeTotali}</h3>

                    <GenericButton
                    onClick={props.chiudiSchedaRisultati}
                    generic_button={true}
                    red_styling
                    buttonText='Chiudi Scheda'>
                    </GenericButton>

                    <GenericButton
                    is_disabled={disabledSaveButton}
                    onClick={passaIndiceAGiochiPuntoJS}
                    generic_button={true}
                    buttonText='Assegna risultati a...'>
                    </GenericButton>
                    
                    <h2 className={styles.paz_selezionato}>PAZIENTE SELEZIONATO:</h2>
                    {/* <h2 className={styles.paz_selezionato}>{paz}</h2> */}
                    {/* <div className={styles.select_box}> */}
                        <select className={styles.select_box} onChange={(event) => {
                            // console.log(event.target.value);
                            console.log(patients_ctx.listaPazienti.map(ogg => ogg.ID).indexOf(event.target.value));
                            // indice = trovaIndice(event);
                            paziente_selezionato = trovaPaziente(event);
                            
                            if(paziente_selezionato !== -1){
                                setDisabledSaveButton(false);
                                setPaz(paziente_selezionato);
                            }
                            else{
                                setDisabledSaveButton(true);
                            }
                            }}>
                            <option hidden>-- select an option --</option>
                            {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                        </select>
                    {/* </div> */}
                    
                    
                </div>
                }>
        </Card>
    );
}

export default RisultatiGioco;