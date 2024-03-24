import ReactCardFlip from "react-card-flip";
import styles from "./ExercisePairGame.module.css";
import { useEffect, useState } from "react";
import star from "../Images-Giochi/star.png";
import fish from "../Images-Giochi/fish.png";
import questionMark from "../Images-Giochi/question-sign.png";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function ExercisePairGame(props){
    let secondi = 5;
    let interval;

    const [gameStarted, setGameStarted] = useState(false);
    const [arrayCarte, setArrayCarte] = useState([]);
    const [firstCardSelected, setFirstCardSelected] = useState();
    const [secondCardSelected, setSecondCardSelected] = useState();
    const [punteggio, setPunteggio] = useState(0);

    const [timer, setTimer] = useState(undefined);

    useEffect(() => {
        let countCard = 1;
        let arrayIniziale = []

        //CREA CARTE
        for(var i=0; i < 4; i++){
            if(countCard <= 2){
                arrayIniziale.push({carta: "stella", id: i, girata: true, bloccaPunti: false})
            }
            if(countCard > 2){
                arrayIniziale.push({carta: "pesce", id: i, girata: true, bloccaPunti: false})
            }
            console.log(i)
            countCard++;
        }
        //MISCHIA CARTE
        for(let i = arrayIniziale.length-1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = arrayIniziale[i];
            arrayIniziale[i] = arrayIniziale[j];
            arrayIniziale[j] = temp;
        }
        console.log(arrayIniziale)
        setArrayCarte(arrayIniziale)
    }, [])

    useEffect(() => {
        if(timer <=0){
            clearInterval(interval);
            setArrayCarte(arrayCarte.map((carta) => ({...carta, girata: false})))
        }
    }, [timer]);

    useEffect(() => {
        if(firstCardSelected && secondCardSelected){
            if(firstCardSelected.carta === secondCardSelected.carta){
                setArrayCarte(arrayCarte.map((carta) => (carta.id === firstCardSelected.id ? {...carta, bloccaPunti: true} : carta.id === secondCardSelected.id ? {...carta, bloccaPunti: true} : carta)))
                if(!firstCardSelected.bloccaPunti && !secondCardSelected.bloccaPunti){
                    setPunteggio((punti) => punti + 1);
                }
            }
            else{
                setArrayCarte(arrayCarte.map((carta) => ({...carta, girata: false})))
            }
            setFirstCardSelected();
            setSecondCardSelected();
        }
    }, [firstCardSelected, secondCardSelected])

    function iniziaGioco(){
        setGameStarted(true);
        setTimer(secondi);

        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);
    }

    function giraCarta(cartaCliccata){
        if(timer <= 0){
            if(!firstCardSelected && !secondCardSelected && !cartaCliccata.bloccaPunti){
                setFirstCardSelected(cartaCliccata);
                setArrayCarte(arrayCarte.map((carta) => (carta.id === cartaCliccata.id ? {...carta, girata: true} : carta)))
            }
            if(firstCardSelected && !secondCardSelected && !cartaCliccata.bloccaPunti){
                setSecondCardSelected(cartaCliccata);
                setArrayCarte(arrayCarte.map((carta) => (carta.id === cartaCliccata.id ? {...carta, girata: true} : carta)))
            }
        }
    }

    return(
        <>
            {!gameStarted &&
                <div className={styles.wrap_generico}>
                    <h1 className={styles.pre_game}>Quando sei pronto, clicca su Inizia</h1>
                    <GenericAlternativeButton
                        onClick={iniziaGioco}
                        buttonText={"INIZIA"}
                    >
                    </GenericAlternativeButton>
                    <GenericAlternativeButton
                        onClick={props.giocoAnnullato}
                        buttonText={"INDIETRO"}
                        colore_rosso
                    >
                    </GenericAlternativeButton>
                </div>
            }
            {gameStarted &&
                <div className={styles.horizontal}>
                    {timer > 0 &&
                    <>
                        <p>Memorizza le carte!</p>
                        <p>TIMER: {timer}</p>
                    </> 
                    }
                    {arrayCarte.map((carta) => (
                        <ReactCardFlip isFlipped={carta.girata}>
                            <div style={carta.bloccaPunti ? {borderColor: "green"} : {}} className={styles.card_wrapper} onClick={() => {giraCarta(carta)}}>
                                <img className={styles.card_image_style} src={questionMark}></img>
                            </div>

                            <div style={carta.bloccaPunti ? {borderColor: "green"} : {}} className={styles.card_wrapper} onClick={() => {giraCarta(carta)}}>
                                {carta.carta === "stella" && <img className={styles.card_image_style} src={star}></img>}
                                {carta.carta === "pesce" && <img className={styles.card_image_style} src={fish}></img>}
                            </div>
                        </ReactCardFlip>
                    ))}
                    <div>Punteggio: {punteggio}</div>
                </div>
            }
        </>
    );
}

export default ExercisePairGame;