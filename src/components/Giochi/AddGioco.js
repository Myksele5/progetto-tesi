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
    const [tipologiaGioco, setTipologiaGioco] = useState("");
    const [titoloGioco, setTitoloGioco] = useState("");
    const [validTitolo, setValidTitolo] = useState(true)
    const [livelloGioco, setLivelloGioco] = useState("MEDIA");
    const [numeroRound, setNumeroRound] = useState(null);
    const [domandeSelected, setDomandeSelected] = useState([]);
    const [validNumeroDomande, setValidNumeroDomande] = useState(true);

    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(true);
    const [selectedHard, setSelectedHard] = useState(false);

    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext)

    useEffect(() => {
        setDomandeSelected([]);
        setNumeroRound(null);
    }, [tipologiaGioco])

    useEffect(() => {
        domandeSelected.length === 0 ? setValidNumeroDomande(false) : setValidNumeroDomande(true)
    }, [domandeSelected])

    function selezioneDifficoltà(stringaDifficoltà){
        switch (stringaDifficoltà){
            case "FACILE":
                if(!selectedEasy){
                    setSelectedEasy(true);
                    setSelectedNormal(false);
                    setSelectedHard(false);
                }
                break;

            case "MEDIA":
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
        setValidTitolo(true)
        // console.log(auth_ctx.tipoAccount)
    }
    function tipoGiocoChangeHandler(event){
        setTipologiaGioco(event.target.value);
        setValidNumeroDomande(true)
        // console.log(event.target.value);
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGioco(stringa);
        console.log(livelloGioco);
    }
    function numeroRoundChangeHandler(event){
        setNumeroRound(event.target.value);
        console.log(event.target.value);
    }

    function creaOggettoDomande(domandeSelezionate, categoriaGame){
        // domande_nuovo_gioco = JSON.stringify(domandeSelezionate);
        categoriaGioco = categoriaGame;

        domandeSelected.length === 0 ? setValidNumeroDomande(false) : setValidNumeroDomande(true);
        setDomandeSelected(domandeSelezionate);

        console.log("DOMANDE IN AddGioco.js DA SALVARE");
        console.log(domandeSelezionate);
    }

    async function salvaNuovoGioco(){
        console.log(domandeSelected);
        let valore_TITOLO = true;
        let valore_DOMANDE = true;

        if(titoloGioco.length === 0){
            setValidTitolo(false);
            valore_TITOLO = false
        }
        else{
            setValidTitolo(true)
            valore_TITOLO = true
        }
        if(domandeSelected.length === 0){
            setValidNumeroDomande(false)
            valore_DOMANDE = false;
        }
        else{
            setValidNumeroDomande(true);
            valore_DOMANDE = true
        }

        if(valore_TITOLO && valore_DOMANDE){
            let resultID = await getServerMgr().addGame(auth_ctx.utenteLoggatoUID, titoloGioco, tipologiaGioco, livelloGioco, categoriaGioco, domandeSelected, numeroRound)
            .catch((err) => {
                console.error(err)
            });

            console.log(resultID)

            props.chiudiFormNuovoGioco();
            game_ctx.prendiTuttiGiochiDomande();
        }
    }

    return(
        <div className={styles.wrapper_impostazioni_gioco}>
            <h2 className={styles.title_scheda}>Creazione nuovo gioco</h2>

            <label className={styles.label_style}>Seleziona un tipo di gioco:</label>
            <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                <option hidden>-- select an option --</option>
                <option>QUIZ</option>
                <option>QUIZ CON IMMAGINI</option>
                <option>COMPLETA LA PAROLA</option>
            </select>
            
            {tipologiaGioco !== "" &&
            <>
                <div className={styles.wrapper_items}>
                    <label className={styles.label_style}>Difficoltà Gioco:</label>
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
                            selezioneDifficoltà("MEDIA");
                            livelloGiocoChangeHandler("MEDIA");
                        }}
                        isSelected={selectedNormal}
                        buttonText={"MEDIA"}>
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

                <label className={`${styles.label_style} ${!validTitolo ? styles.invalid : ""}`}>Nome del gioco:</label>
                <input className={`${styles.textbox_style} ${!validTitolo ? styles.invalid : ""}`} type="text" onChange={titoloGiocoChangeHandler}></input>
                {!validTitolo && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un nome per il gioco</div>}

                {!validNumeroDomande && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi selezionare almeno una domanda per il gioco</div>}
                
                <ElencoDomande
                    domandeNuovoGioco={creaOggettoDomande}
                    tipoGioco={tipologiaGioco}
                    // listaDomandeDaModificare={domande_nuovo_gioco}
                >
                </ElencoDomande>
            </>
            }

            <div className={styles.wrapper_generico}>
                {tipologiaGioco !== "" &&
                    <GenericButton
                        onClick={salvaNuovoGioco}
                        generic_button={true}
                        buttonText={"Salva Gioco"}
                        is_disabled={!validTitolo ? true : !validNumeroDomande ? true : false}
                    >
                    </GenericButton>
                }

                <GenericButton
                onClick={props.chiudiFormNuovoGioco}
                generic_button={true}
                red_styling
                buttonText={"Indietro"}
                >
                </GenericButton>
            </div>
        </div>

        
    );
}

export default AddGioco;