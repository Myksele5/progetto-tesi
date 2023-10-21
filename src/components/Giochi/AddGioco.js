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
    const [tipologiaGioco, setTipoGioco] = useState("");
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
        setTipoGioco(event.target.value)
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGioco(stringa);
        console.log(livelloGioco);
    }

    function creaOggettoDomande(isChecked, domandaDaAggiungere){
        console.log(domandaDaAggiungere);

        if(isChecked){
            domande_nuovo_gioco.unshift({
                face_image: domandaDaAggiungere.face_image,
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

    return(
        <Card
        animazione={true}
        altroStile={true}
        children={
            <>

                <div className={styles.wrapper_impostazioni_gioco}>
                <h2>Gestisci le impostazioni del gioco</h2>
                    <label>Tipologia di gioco</label>
                    <select onChange={tipoGiocoChangeHandler}>
                        <option hidden>-- select an option --</option>
                        <option>QUIZ</option>
                        <option>QUIZ CON IMMAGINI</option>
                        <option>COMPLETA LA PAROLA</option>
                        <option>RIFLESSI</option>
                    </select>
                    

                    <label>Difficoltà Gioco</label>
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

                    <label>Inserisci nome del gioco</label>
                    <input type="text" onChange={titoloGiocoChangeHandler}></input>

                    {/* <label>Seleziona numero di domande</label>
                    <input type="text"></input> */}

                    <h3>Domande disponibili:</h3>
                    <ElencoDomande
                        domandeNuovoGioco={creaOggettoDomande}
                    >
                    </ElencoDomande>

                    {/* <label>Assegna Gioco a... ------- PROBABILMENTE DA TOGLIERE DA QUESTO FORM</label>
                    <select>
                        <option hidden>-- select an option --</option>
                        {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                    </select> */}

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