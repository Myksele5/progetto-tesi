import styles from "./EditGioco.module.css";
import Card from "../UI/Card";
import RadioButton from "../UI/RadioButton";
import GenericButton from "../UI/GenericButton";
import ElencoDomande from "./ElencoDomande";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";

var domande_gioco_da_modificare = [];

function EditGioco(props){
    const [nomeGiocoModifica, setNomeGiocoModifica] = useState(props.nomeGioco);
    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [livelloGiocoModifica, setLivelloGiocoModifica] = useState(props.difficulty);

    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(false);
    const [selectedHard, setSelectedHard] = useState(false);

    const game_ctx = useContext(GameContext);

    var categoriaFiltro = props.categoria;

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

    function modificaOggettoDomande(domandeSelezionate){
        domande_gioco_da_modificare = domandeSelezionate;

        console.log("DOMANDE IN EditGioco.js DA SALVARE");
        console.log(domandeSelezionate);
    }

    return(
        <Card
        children={
            <div className={styles.wrapper_flex}>
                <h1 className={styles.title_scheda}>Modifica il gioco</h1>

                <label className={styles.label_style}>Tipologia Gioco:</label>
                <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>

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

                <label className={styles.label_style}>Nome Gioco:</label>
                <input className={styles.textbox_style} type="text" value={nomeGiocoModifica} onChange={nomeGiocoChangeHandler}></input>


                <ElencoDomande
                    domandeNuovoGioco={modificaOggettoDomande}
                    tipoGioco={tipoGiocoModifica}
                    categoria={categoriaFiltro}
                >
                </ElencoDomande>

                <div className={styles.wrapper_generico}>
                    <GenericButton
                        onClick={() => {
                            game_ctx.salvaGiocoModificato(nomeGiocoModifica, tipoGiocoModifica, livelloGiocoModifica, props.codiceGioco, domande_gioco_da_modificare)
                            props.chiudiFormModifica();
                        }}
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