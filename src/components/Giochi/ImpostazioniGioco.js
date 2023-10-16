import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import RadioButton from "../UI/RadioButton";
import styles from "./ImpostazioniGioco.module.css";
import PatientContext from "../../context/patients-context";

function ImpostazioniGioco(){
    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(true);
    const [selectedHard, setSelectedHard] = useState(false);

    const patients_ctx = useContext(PatientContext);

    function selezioneDifficoltà(stringaDifficoltà){
        switch (stringaDifficoltà){
            case "FACILE":
                if(!selectedEasy){
                    setSelectedEasy(true);
                    setSelectedNormal(false);
                    setSelectedHard(false);
                }
                break;

            case "NORMALE":
                if(!selectedNormal){
                    setSelectedEasy(false);
                    setSelectedNormal(true);
                    setSelectedHard(false);
                }
                break;

            case "DIFFICILE":
                if(!selectedHard){
                    setSelectedEasy(false);
                    setSelectedNormal(false);
                    setSelectedHard(true);
                }
                break;

            default:
                break;
        }
    }

    return(
        <div className={styles.wrapper_generico}>

            <h2>Gestisci le impostazioni del gioco</h2>

            <div className={styles.wrapper_impostazioni_gioco}>
                <label>Seleziona gioco</label>
                <select>
                    <option>QUIZ</option>
                    <option>DIFFERENZE TRA IMMAGINI</option>
                    <option>RIFLESSI</option>
                </select>
                

                <label>Difficoltà Gioco</label>
                <div className={styles.group_bottoni}>

                    <RadioButton
                    onClick={() => {
                        selezioneDifficoltà("FACILE");
                    }}
                    isSelected={selectedEasy}
                    buttonText={"FACILE"}>
                    </RadioButton>

                    <RadioButton
                    onClick={() => {
                        selezioneDifficoltà("NORMALE");
                    }}
                    isSelected={selectedNormal}
                    buttonText={"NORMALE"}>
                    </RadioButton>

                    <RadioButton
                    onClick={() => {
                        selezioneDifficoltà("DIFFICILE");
                    }}
                    isSelected={selectedHard}
                    buttonText={"DIFFICILE"}>
                    </RadioButton>
                    
                </div>
            
                <label>Seleziona numero di domande</label>
                <input type="text"></input>
                <label>Assegna Gioco a...</label>
                <select>
                    <option hidden>-- select an option --</option>
                    {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                    {/* <option>1</option>
                    <option>2</option>
                    <option>3</option> */}
                </select>
            
                <label>Fai un test del Gioco</label>
                <GenericButton
                generic_button={true}
                buttonText={"AVVIA"}>
                </GenericButton>
            </div>
        </div>
    );
}

export default ImpostazioniGioco;