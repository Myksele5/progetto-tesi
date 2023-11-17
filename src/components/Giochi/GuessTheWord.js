import styles from "./GuessTheWord.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GameContext from "../../context/game-context";

let counter_question_number = 0;
let counter_correct_answers = 0;
var parolaDaMostrare = [];

function GuessTheWord(props){
    const [gameStarted, setGameStarted] = useState(false);
    // const [parolaDaIndovinare, setParolaDaIndovinare] = useState("");
    // const [parolaDaMostrare, setParolaDaMostrare] = useState([]);
    const [indiceLetteraRimossa, setIndiceLetteraRimossa] = useState();
    const [letteraInseritaDaUtente, setLetteraInseritaDaUtente] = useState("");

    const [rispostaCorretta, setRispostaCorretta] = useState(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const game_ctx = useContext(GameContext);
    const questions = game_ctx.listaGiochi[props.INDICEGIOCO].domandeGioco;

    var parolaDaIndovinare = questions[counter_question_number].indovina;
    

    // useEffect(() => {
    //     setParolaDaIndovinare(questions[counter_question_number].indovina);
    // }, []);

    function iniziaGioco(){
        setGameStarted(true);
        parolaDaMostrare = [];
        counter_correct_answers = 0;
        counter_question_number = 0;
        dividiParolaInLettere();
    }

    function letteraInseritaHandler(event){
        setLetteraInseritaDaUtente(event.target.value.toUpperCase());
    }

    function dividiParolaInLettere(){
        var min=0;
        var max=parolaDaIndovinare.length - 1;
        var letteraRandomDaTogliere = Math.floor(Math.random() * (max - min));

        for(var i=0; i < parolaDaIndovinare.length; i++){
            if(i === letteraRandomDaTogliere){
                parolaDaMostrare.push(<input className={styles.prova_rettangoli_lettere} type="text" maxLength="1" onChange={letteraInseritaHandler}></input>)
            }
            else{
                parolaDaMostrare.push(<span className={styles.prova_rettangoli_lettere}>{parolaDaIndovinare[i].toUpperCase()}</span>);
            }
            // console.log(parolaDaIndovinare[i]);
        }
        for(var j=0; j < parolaDaMostrare.length; j++){
            console.log(parolaDaMostrare[j].props.children);
        }

        console.log(parolaDaIndovinare);
        setIndiceLetteraRimossa(letteraRandomDaTogliere);
    }

    function verificaRisposta(){
        var rispostaFINALE = "";
        setHasAnswered(true);

        for(var i=0; i < parolaDaIndovinare.length; i++){
            if(i === indiceLetteraRimossa){
                // console.log(rispostaFINALE);
                rispostaFINALE = rispostaFINALE + letteraInseritaDaUtente;
            }
            else{
                rispostaFINALE = rispostaFINALE + parolaDaIndovinare[i];
            }
            // console.log(rispostaFINALE);
        }

        console.log(rispostaFINALE);
        console.log(rispostaFINALE === parolaDaIndovinare);

        if(rispostaFINALE === parolaDaIndovinare){
            setRispostaCorretta(true);
            counter_correct_answers++;
        }
        else{
            setRispostaCorretta(false);
        }
    }

    function aggiornaLogica(){
        if(counter_question_number < questions.length-1){
            counter_question_number++;
        }
        else{
            setGameStarted(false);
            counter_question_number = 0;
            props.giocoTerminato(counter_correct_answers, questions.length);
        }
        setLetteraInseritaDaUtente("");
        setRispostaCorretta(null);
        parolaDaIndovinare = questions[counter_question_number].indovina;
        parolaDaMostrare = [];
        dividiParolaInLettere();
        setHasAnswered(false);
    }

    return(
        <>
            <hr className={styles.horizontal_line}></hr>
            <h2 className={styles.explanation}>Inserisci le lettere mancanti</h2>
            <hr className={styles.horizontal_line}></hr>

            {!gameStarted &&
                <div className={styles.wrap_generico}>
                    <h1>Quando sei pronto, clicca sul bottone</h1>
                    <GenericButton
                        onClick={iniziaGioco}
                        alternative_button={true}
                        buttonText={"INIZIA"}
                    >
                    </GenericButton>
                </div>
            }

            {gameStarted && 
                <>
                    <h2 className={styles.domanda}>Completa la seguente parola:</h2>
                    <div className={styles.wrapper_horizontal_flex}>
                        {parolaDaMostrare}
                    </div>

                    <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>

                    {rispostaCorretta !== null && !rispostaCorretta && <h2>sei proprio SCARSO</h2>}
                    {rispostaCorretta !== null && rispostaCorretta && <h2>RISPOSTA CORRETTA BRAVO u WAGNON MI</h2>}

                    <div className={styles.wrapper_horizontal_flex}>
                        
                        <GenericButton
                            onClick={verificaRisposta}
                            alternative_button={true}
                            buttonText={"Verifica risposta"}
                        >
                        </GenericButton>

                        {hasAnswered &&
                            <GenericButton
                                onClick={aggiornaLogica}
                                alternative_button={true}
                                buttonText={"Prossima parola"}
                            >
                            </GenericButton>
                        }
                        
                    </div>
                    
                </>
            }
        </>
    );
}

export default GuessTheWord;