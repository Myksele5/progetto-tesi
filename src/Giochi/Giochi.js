import styles from "./Giochi.module.css";
import GenericButton from "../UI/GenericButton";
import SearchBox from "../UI/SearchBox";
import { useState } from "react";
import ListaGiochi from "./ListaGiochi";
import ExerciseGuessTheFace from "./ExerciseGuessTheFace";
import Card from '../UI/Card';

function Giochi(){
    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showListaGiochi, setShowListaGiochi] = useState(true);
    const [gameObject, setGameObject] = useState(null);
    const [gameResults, setGameResults] = useState(null);

    let lista_giochi;
    let show_boxes;

    function startGame(stringa){
        setShowSearchBoxAndButton(false);
        setShowListaGiochi(false);
        if(stringa === 'GUESS_THE_FACE'){
            setGameObject(
                <div className={styles.wrapper_gioco}>
                    <ExerciseGuessTheFace
                    giocoTerminato={endGame}>
                    </ExerciseGuessTheFace>
                </div>
            );
        }
    }

    function endGame(risposteUtente){
        setGameObject(null);
        setGameResults(
            <Card
            altroStile={true}
            children={
                <div className={styles.wrapper_generico}>
                    <h1>RISULTATI UTENTE</h1>
                    <p>Risposte corrette: {risposteUtente}</p>
                    <GenericButton
                    onClick={chiudiSchedaRisultati}
                    small_button={true}
                    buttonText='Chiudi Scheda'>
                    </GenericButton>
                </div>
                }>
            </Card>
        );
    }

    function chiudiSchedaRisultati(){
        setGameResults(null);
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
        <div className={styles.schermata_giochi}>
            <h1 className={styles.page_title}>Giochi</h1>
            {show_boxes}

            <div className={styles.wrapper_generico}>
                {gameResults}
                {gameObject}
                {lista_giochi}
            </div>
        </div>
    );
}

export default Giochi;