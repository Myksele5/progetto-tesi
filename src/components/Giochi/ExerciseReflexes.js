import { useContext, useEffect, useState } from "react";
import styles from "./ExerciseReflexes.module.css";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import GameContext from "../../context/game-context";

let counter_correct_answers = 0;
let counter_round_inCorso = 1;
var randomMovement;

function ExerciseReflexes(props){
    const [gameStarted, setGameStarted] = useState(false);
    const [isMoving, setIsMoving] = useState(true);
    const [bersaglioPreso, setBersaglioPreso] = useState(null);

    const game_ctx = useContext(GameContext);
    const roundTotali = game_ctx.listaGiochi[props.INDICEGIOCO].numeroRound;

    const movingStyle = isMoving && randomMovement === 1 ? `${styles.animazione_n1_EASY}` : isMoving && randomMovement === 2 ? `${styles.animazione_n2_EASY}` : 
                        isMoving && randomMovement === 3 ? `${styles.animazione_n3_EASY}` : ""; 
    const classiFigura = `${styles.figura_cliccabile} ${movingStyle}`;

    useEffect(() => {
        randomMovement = Math.floor(Math.random() * (4-1) + 1);
        console.log("Numero RANDOM--->" + randomMovement);

        // switch (randomMovement){
        //     case 1:
        //         movingStyle = "styles.animazione_n1_EASY";
        //         break;
        //     case 2:
        //         movingStyle = "styles.animazione_n2_EASY";
        //         break;
        //     case 3:
        //         movingStyle = "styles.animazione_n3_EASY";
        //         break;
        //     default:
        //         break;
        // }
    }, [isMoving])

    function verificaRispostaPreso(event){
        // console.log("CORRETTA-->" + event.target.getBoundingClientRect());
        console.log("WIDTH dispositivo" + event.clientX);
        console.log("HEIGHT dispositivo" + event.clientY);

        setIsMoving(false);
        if(bersaglioPreso === null){
            setBersaglioPreso(true);
            counter_correct_answers++;
        }
    }

    function verificaRispostaMancato(event){
        console.log(event.target.getBoundingClientRect());
        setIsMoving(false);
        if(bersaglioPreso === null){
            setBersaglioPreso(false);
        }
    }

    function aggiornaLogica(){
        if(counter_round_inCorso < roundTotali){
            counter_round_inCorso++;
            setIsMoving(true);
        }
        else{
            setGameStarted(false);
            counter_round_inCorso = 1;
            props.giocoTerminato(counter_correct_answers, roundTotali);
        }
        setBersaglioPreso(null);
    }

    // function PROVA(){
    //     let elem = document.getElementById("AA");
    //     let rect = elem.getBoundingClientRect();
    //     console.log(rect);
    //     console.log(positionRef.current.offsetTop);
    //     var screenX = window.screen.width;
    //     var screenY = window.screen.height;
    //     console.log("dimensioni schermo" + screenX + screenY);
    // }

    function iniziaGioco(){
        setGameStarted(true);
        counter_correct_answers = 0;
        counter_round_inCorso = 1;
    }

    return(
        <>
            {!gameStarted &&
                <div className={styles.wrap_generico}>
                    <h1>Quando sei pronto, clicca sul bottone</h1>
                    <GenericAlternativeButton
                        onClick={iniziaGioco}
                        buttonText={"INIZIA"}
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {gameStarted &&
                <>
                    <hr className={styles.horizontal_line}></hr>
                    <h2 className={styles.explanation}>Clicca sulla figura</h2>
                    <hr className={styles.horizontal_line}></hr>
                    
                    <h2 className={styles.domanda}>ROUND {counter_round_inCorso}</h2>
        
                    <div className={styles.wrapper_horizontal_flex}>
                        {bersaglioPreso !== null && bersaglioPreso && <p className={styles.CORRECT}>Ottimi riflessi! +1</p>}
                        {bersaglioPreso !== null && !bersaglioPreso && <p className={styles.WRONG}>Hai mancato il bersaglio.</p>}
                        <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{roundTotali}</p>
                    </div>
                    
                    <div className={styles.spawn_area} onClick={verificaRispostaMancato}></div>
                    <div id="AA" className={classiFigura} onClick={verificaRispostaPreso}>SONO LA FIGURA DA CLICCARE</div>

        
                    {!isMoving &&
                        <GenericAlternativeButton
                            onClick={aggiornaLogica}
                            buttonText={"PROSSIMO ROUND"}
                        >
                        </GenericAlternativeButton>
                    }
                </>
            }
            
            {/* <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p> */}
        </>
    );
}

export default ExerciseReflexes;