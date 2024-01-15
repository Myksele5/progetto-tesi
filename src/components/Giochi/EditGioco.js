import styles from "./EditGioco.module.css";
import Card from "../UI/Card";
import RadioButton from "../UI/RadioButton";
import GenericButton from "../UI/GenericButton";
import ElencoDomande from "./ElencoDomande";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

var domande_gioco_da_modificare = [];
var categoriaGioco;

function EditGioco(props){
    const game_ctx = useContext(GameContext);

    const [nomeGiocoModifica, setNomeGiocoModifica] = useState(props.nomeGioco);
    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [livelloGiocoModifica, setLivelloGiocoModifica] = useState(props.difficulty);
    // const [numeroRoundModifica, setNumeroRoundModifica] =  useState(game_ctx.domandeDaModificare[0]);
    const [domandeSelected, setDomandeSelected] = useState(game_ctx.domandeDaModificare);

    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(false);
    const [selectedHard, setSelectedHard] = useState(false);

    var giocoID = props.gameID;
    // var categoriaFiltro = props.categoria;

    function highlightDifficulty(livelloGiocoModifica){
        if(livelloGiocoModifica === "FACILE"){
            setSelectedEasy(true);
        }
        if(livelloGiocoModifica === "NORMALE"){
            setSelectedNormal(true);
        }
        if(livelloGiocoModifica === "DIFFICILE"){
            setSelectedHard(true);
        }
    }
    useEffect(() => {
        categoriaGioco = props.categoria;
        console.log(game_ctx.domandeDaModificare)
    }, [])

    useEffect(() => {
        highlightDifficulty(livelloGiocoModifica);
        // domande_gioco_da_modificare = Array.from(props.listaDomande);
    });

    function nomeGiocoChangeHandler(event){
        setNomeGiocoModifica(event.target.value);
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGiocoModifica(stringa);
        // console.log(livelloGioco);
    }
    function numeroRoundChangeHandler(event){
        var array = [parseInt(event.target.value)];
        // array.push(event.target.value);
        console.log(array);
        setDomandeSelected(array);
    }

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

    function modificaOggettoDomande(domandeSelezionate, categoriaGame){
        // domande_gioco_da_modificare = JSON.stringify(domandeSelezionate);
        setDomandeSelected(domandeSelezionate);
        categoriaGioco = categoriaGame;

        console.log("DOMANDE IN EditGioco.js DA SALVARE");
        console.log(domandeSelezionate);
    }

    async function salvaGiocoAggiornato(){
    
        await getServerMgr().updateGame(nomeGiocoModifica, livelloGiocoModifica, categoriaGioco, domandeSelected, giocoID)
        .catch((err) => {
            console.error(err)
        });

        props.chiudiFormModifica();
        game_ctx.prendiTuttiGiochiDomande();
    }

    return(
        <Card
        animazione={true}
        altroStile={true}
        children={
            <div className={styles.wrapper_impostazioni_gioco}>
                <h2 className={styles.title_scheda}>Modifica il gioco</h2>

                <div className={styles.wrapper_generico}>
                    <div className={styles.wrapper_items}>
                        <label className={styles.label_style}>Tipologia Gioco:</label>
                        <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>
                    </div>

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

                <label className={styles.label_style}>Nome Gioco:</label>
                <input className={styles.textbox_style} type="text" value={nomeGiocoModifica} onChange={nomeGiocoChangeHandler}></input>
                {tipoGiocoModifica === "RIFLESSI" &&
                    <>
                        <label className={styles.label_style}>Numero di round da giocare:</label>
                        <input className={styles.textbox_style} type="number" step={1} value={domandeSelected} onChange={numeroRoundChangeHandler}></input>
                    </>
                }

                {tipoGiocoModifica !== "RIFLESSI" && 
                    <ElencoDomande
                        domandeNuovoGioco={modificaOggettoDomande}
                        tipoGioco={tipoGiocoModifica}
                        categoria={props.categoria}
                    >
                    </ElencoDomande>
                }

                        {/* () => {
                            {tipoGiocoModifica !== "RIFLESSI" && game_ctx.salvaGiocoModificato(nomeGiocoModifica, livelloGiocoModifica, categoriaFiltro, domande_gioco_da_modificare, giocoID)}
                            {tipoGiocoModifica === "RIFLESSI" && game_ctx.salvaGiocoModificato(nomeGiocoModifica, livelloGiocoModifica, "REFLEXES_GAME", numeroRoundModifica, giocoID)}
 
                            props.chiudiFormModifica();
                        } */}

                <div className={styles.wrapper_generico}>
                    <GenericButton
                        onClick={salvaGiocoAggiornato}
                        generic_button={true}
                        buttonText={"Salva modifiche"}
                    >
                    </GenericButton>

                    <GenericButton
                        onClick={props.chiudiFormModifica}
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

export default EditGioco;