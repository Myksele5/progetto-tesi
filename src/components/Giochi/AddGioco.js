import styles from "./AddGioco.module.css";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import RadioButton from "../UI/RadioButton";
import { useContext, useState } from "react";
import PatientContext from "../../context/patients-context";
import GameContext from "../../context/game-context";
import ElencoDomande from "./ElencoDomande";

var domande_nuovo_gioco = [];

function AddGioco(){
    const [titoloGioco, setTitoloGioco] = useState("");
    const [tipologiaGioco, setTipologiaGioco] = useState("");
    const [livelloGioco, setLivelloGioco] = useState("NORMALE");

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

    function titoloGiocoChangeHandler(event){
        setTitoloGioco(event.target.value);
    }
    function tipoGiocoChangeHandler(event){
        setTipologiaGioco(event.target.value);
        // console.log(event.target.value);
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGioco(stringa);
        console.log(livelloGioco);
    }

    function creaOggettoDomande(isChecked, domandaDaAggiungere){
        console.log(domandaDaAggiungere);

        if(isChecked){
            domande_nuovo_gioco.unshift({
                indovina: domandaDaAggiungere.indovina,
                question: domandaDaAggiungere.question
            });
            // console.log("AGGIUNTA DOMANDA---> " + domande_nuovo_gioco);
        }
        else{
            for(var i=0; i < domande_nuovo_gioco.length; i++){
                if(domandaDaAggiungere.question === domande_nuovo_gioco[i].question){
                    domande_nuovo_gioco.splice(i, 1);
                    break;
                }
            }

            // console.log("rimossa DOMANDA---> " + domande_nuovo_gioco);
        }
    }

    function resettaOggettoDomande(){
        domande_nuovo_gioco.splice(0);
    }

    return(
        <Card
        animazione={true}
        altroStile={true}
        children={
            <>

                <div className={styles.wrapper_impostazioni_gioco}>
                <h2 className={styles.title_scheda}>Gestisci le impostazioni del gioco</h2>
                    <label className={styles.label_style}>Tipologia di gioco</label>
                    <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                        <option hidden>-- select an option --</option>
                        <option>QUIZ</option>
                        <option>QUIZ CON IMMAGINI</option>
                        <option>COMPLETA LA PAROLA</option>
                        <option>RIFLESSI</option>
                    </select>
                    

                    <label className={styles.label_style}>Difficoltà Gioco</label>
                    <div className={styles.group_bottoni}>

                        <RadioButton
                        onClick={() => {
                            selezioneDifficoltà("FACILE");
                            livelloGiocoChangeHandler("FACILE");
                        }}
                        isSelected={selectedEasy}
                        buttonText={"FACILE"}>
                        </RadioButton>

                        <RadioButton
                        onClick={() => {
                            selezioneDifficoltà("NORMALE");
                            livelloGiocoChangeHandler("NORMALE");
                        }}
                        isSelected={selectedNormal}
                        buttonText={"NORMALE"}>
                        </RadioButton>

                        <RadioButton
                        onClick={() => {
                            selezioneDifficoltà("DIFFICILE");
                            livelloGiocoChangeHandler("DIFFICILE")
                        }}
                        isSelected={selectedHard}
                        buttonText={"DIFFICILE"}>
                        </RadioButton>
                        
                    </div>

                    <label className={styles.label_style}>Inserisci nome del gioco</label>
                    <input className={styles.textbox_style} type="text" onChange={titoloGiocoChangeHandler}></input>

                    
                    <ElencoDomande
                        domandeNuovoGioco={creaOggettoDomande}
                        resettaDomandeNuovoGioco={resettaOggettoDomande}
                        tipoGioco={tipologiaGioco}
                    >
                    </ElencoDomande>

                    <GenericButton
                    onClick={() => {
                        game_ctx.aggiungiGiocoAllaLista(titoloGioco, tipologiaGioco, livelloGioco, domande_nuovo_gioco);
                        domande_nuovo_gioco = [];
                    }}
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