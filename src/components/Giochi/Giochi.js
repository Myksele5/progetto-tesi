import styles from "./Giochi.module.css";
import GenericButton from "../UI/GenericButton";
import SearchBox from "../UI/SearchBox";
import { useContext, useState } from "react";
import ListaGiochi from "./ListaGiochi";
import ExerciseGuessTheFace from "./ExerciseGuessTheFace";
import Card from '../UI/Card';
import ExerciseGuessTheFruit from "./ExerciseGuessTheFruit";
import GameContext from "../../context/game-context";
import PatientContext from "../../context/patients-context";
import RisultatiGioco from "./RisultatiGioco";

let risultati_gioco;

function Giochi(){
    const patients_ctx = useContext(PatientContext);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showListaGiochi, setShowListaGiochi] = useState(true);
    const [gameObject, setGameObject] = useState(null);
    const [gameResults, setGameResults] = useState(false);

    let lista_giochi;
    let show_boxes;

    function startGame(stringa){
        setShowSearchBoxAndButton(false);
        setShowListaGiochi(false);
        switch(stringa){
            case 'GUESS_THE_FACE':
                setGameObject(
                    <div className={styles.wrapper_gioco}>
                        <ExerciseGuessTheFace
                        giocoTerminato={endGame}>
                        </ExerciseGuessTheFace>
                    </div>
                );
                break;
            case 'GUESS_THE_FRUIT':
                setGameObject(
                    <div className={styles.wrapper_gioco}>
                        <ExerciseGuessTheFruit
                        giocoTerminato={endGame}>
                        </ExerciseGuessTheFruit>
                    </div>
                );
                break;
            default:
                setGameObject(null);
        }
        
    }

    function endGame(risposteUtente, domandeTotali){
        setGameObject(null);
        risultati_gioco =
            <RisultatiGioco
                numeroRisposteCorrette={risposteUtente}
                numeroDomandeTotali={domandeTotali}
                chiudiSchedaRisultati={chiudiScheda}
                assegnaRisultatiPaziente={(INDICE) => {salvaRisultati(risposteUtente, domandeTotali, INDICE)}}
            >
            </RisultatiGioco>
        setGameResults(true);
    }

    function salvaRisultati(risposteUtente, domandeTotali, INDICEArrayPaziente){
        patients_ctx.listaPazienti[INDICEArrayPaziente].statistiche.risposte_totali += domandeTotali;
        patients_ctx.listaPazienti[INDICEArrayPaziente].statistiche.risposte_corrette += risposteUtente;
        patients_ctx.listaPazienti[INDICEArrayPaziente].statistiche.risposte_sbagliate += (domandeTotali - risposteUtente);
        // console.log(patients_ctx.listaPazienti[0].statistiche.risposte_sbagliate);
        console.log("NUMERO DI DOMANDE ---->" + domandeTotali);
        console.log("RISPOSTE CORRETTE ---->" + risposteUtente);
        console.log("RISPOSTE SBAGLIATE ---->" + (domandeTotali - risposteUtente));
        chiudiScheda();
    }

    function chiudiScheda(){
        risultati_gioco = null;
        setGameResults(false);
        setShowSearchBoxAndButton(true);
        setShowListaGiochi(true);
    }

    if(showSearchBoxAndButton){
        show_boxes = 
        <div className={styles.wrap_boxes}>
            <SearchBox></SearchBox>

            <GenericButton
            generic_button={true}
            buttonText={"Aggiungi Gioco"}>
            </GenericButton>
        </div>
    }
    else{
        show_boxes = null;
    }

    if(showListaGiochi){
        lista_giochi = 
        <ListaGiochi
        nascondiListaGiochi={startGame}>
        </ListaGiochi>
    }
    else{
        lista_giochi = null;
    }

    return(
        // <GameContext.Provider>
            <div className={styles.schermata_giochi}>
                <h1 className={styles.page_title}>Giochi</h1>
                {show_boxes}

                <div className={styles.wrapper_generico}>
                    {gameResults && risultati_gioco}
                    {gameObject}
                    {lista_giochi}
                </div>
            </div>
        // </GameContext.Provider>
    );
}

export default Giochi;