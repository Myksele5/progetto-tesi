import styles from "./AddGioco.module.css";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import RadioButton from "../UI/RadioButton";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import ElencoDomande from "./ElencoDomande";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

var domande_nuovo_gioco = [];
var categoriaGioco;

function AddGioco(props){
    const [titoloGioco, setTitoloGioco] = useState("");
    const [tipologiaGioco, setTipologiaGioco] = useState("QUIZ");
    const [livelloGioco, setLivelloGioco] = useState("NORMALE");
    // const [numeroRound, setNumeroRound] = useState(0);
    const [domandeSelected, setDomandeSelected] = useState([]);

    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(true);
    const [selectedHard, setSelectedHard] = useState(false);

    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext)

    useEffect(() => {
        setDomandeSelected([]);
    }, [tipologiaGioco])

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
        // console.log(auth_ctx.tipoAccount)
    }
    function tipoGiocoChangeHandler(event){
        setTipologiaGioco(event.target.value);
        // console.log(event.target.value);
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGioco(stringa);
        console.log(livelloGioco);
    }
    function numeroRoundChangeHandler(event){
        var array = [parseInt(event.target.value)];
        // array.push(event.target.value);
        console.log(array);
        setDomandeSelected(array);
    }

    function creaOggettoDomande(domandeSelezionate, categoriaGame){
        // domande_nuovo_gioco = JSON.stringify(domandeSelezionate);
        categoriaGioco = categoriaGame;
        setDomandeSelected(domandeSelezionate);

        console.log("DOMANDE IN AddGioco.js DA SALVARE");
        console.log(domandeSelezionate);
    }

    async function salvaNuovoGioco(){
        console.log(domandeSelected);
        if(tipologiaGioco === "RIFLESSI"){
            categoriaGioco = "REFLEXES_GAME";
        }

        await getServerMgr().addGame(auth_ctx.utenteLoggatoUID, titoloGioco, tipologiaGioco, livelloGioco, categoriaGioco, domandeSelected)
        .catch((err) => {
            console.error(err)
        });

        props.chiudiFormNuovoGioco();
        game_ctx.prendiTuttiGiochiDomande();
    }

    return(
        <Card
        animazione={true}
        altroStile={true}
        children={
            <div className={styles.wrapper_impostazioni_gioco}>
                <h2 className={styles.title_scheda}>Creazione nuovo gioco</h2>

                <div className={styles.wrapper_generico}>
                    <div className={styles.wrapper_items}>
                        <label className={styles.label_style}>Tipologia di gioco</label>
                        <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                            <option hidden>-- select an option --</option>
                            <option>QUIZ</option>
                            <option>QUIZ CON IMMAGINI</option>
                            <option>COMPLETA LA PAROLA</option>
                            <option>RIFLESSI</option>
                        </select>
                    </div>
                    
                    <div className={styles.wrapper_items}>
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
                    </div>
                    
                </div>

                <label className={styles.label_style}>Inserisci nome del gioco</label>
                <input className={styles.textbox_style} type="text" onChange={titoloGiocoChangeHandler}></input>
                {tipologiaGioco === "RIFLESSI" &&
                    <>
                        <label className={styles.label_style}>Numero di round da giocare:</label>
                        <input className={styles.textbox_style} type="number" step={1} onChange={numeroRoundChangeHandler}></input>
                    </>
                }
                
                {tipologiaGioco !== "RIFLESSI" && 
                    <ElencoDomande
                        domandeNuovoGioco={creaOggettoDomande}
                        tipoGioco={tipologiaGioco}
                        // listaDomandeDaModificare={domande_nuovo_gioco}
                    >
                    </ElencoDomande>
                }

                <div className={styles.wrapper_generico}>
                    <GenericButton
                    onClick={salvaNuovoGioco}
                    generic_button={true}
                    buttonText={"Salva Gioco"}
                    >
                    </GenericButton>

                    <GenericButton
                    onClick={props.chiudiFormNuovoGioco}
                    small_button={true}
                    buttonText={"Chiudi scheda"}
                    >
                    </GenericButton>
                </div>
            </div>
        }
        >
        </Card>

        
    );
}

export default AddGioco;