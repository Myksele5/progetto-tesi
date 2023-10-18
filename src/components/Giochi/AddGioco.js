import styles from "./AddGioco.module.css";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import RadioButton from "../UI/RadioButton";
import { useContext, useState } from "react";
import PatientContext from "../../context/patients-context";
import GameContext from "../../context/game-context";

function AddGioco(){
    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(true);
    const [selectedHard, setSelectedHard] = useState(false);

    const patients_ctx = useContext(PatientContext);
    const game_ctx = useContext(GameContext);

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
        <Card
        animazione={true}
        altroStile={true}
        children={
            <>

                <div className={styles.wrapper_impostazioni_gioco}>
                <h2>Gestisci le impostazioni del gioco</h2>
                    <label>Tipologia di gioco</label>
                    <select>
                        <option hidden>-- select an option --</option>
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

                    <label>Inserisci nome del gioco</label>
                    <input type="text"></input>

                    <label>Seleziona numero di domande</label>
                    <input type="text"></input>

                    <label>Assegna Gioco a... ------- PROBABILMENTE DA TOGLIERE DA QUESTO FORM</label>
                    <select>
                        <option hidden>-- select an option --</option>
                        {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                        {/* <option>1</option>
                        <option>2</option>
                        <option>3</option> */}
                    </select>

                    <GenericButton
                    onClick={game_ctx.aggiungiGiocoAllaLista}
                    generic_button={true}
                    buttonText={"Salva Gioco"}
                    >
                    </GenericButton>

                    <GenericButton
                    onClick={game_ctx.chiudiFormCreaNuovoGioco}
                    small_button={true}
                    buttonText={"Chiudi scheda"}
                    >
                    </GenericButton>
                </div>
            </>
        }
        >
        </Card>

        
    );
}

export default AddGioco;