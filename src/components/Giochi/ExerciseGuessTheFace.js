import styles from './ExerciseGuessTheFace.module.css';
import GameButton from '../UI/GameButton';
import GenericButton from '../UI/GenericButton';
import { useContext, useState } from 'react';

import Einstein from '../Images-Giochi/ALBERT_EINSTEIN.jpeg';
import Dante from '../Images-Giochi/DANTE_ALIGHIERI.jpg';
import Marilyn from '../Images-Giochi/MARILYN_MONROE.jpg';
import Leonardo from '../Images-Giochi/LEONARDO_DA_VINCI.jpg';
import Napoleone from '../Images-Giochi/NAPOLEONE_BONAPARTE.jpg';
import PapaFrancesco from '../Images-Giochi/PAPA_FRANCESCO.jpg';
import GameContext from '../../context/game-context';

let counter_question_number = 0;
let counter_correct_answers = 0;
var quattroRisposte = [];

let qualcosa;

function ExerciseGuessTheFace(props){

    const [risposta1, setRisposta1] = useState('');
    const [risposta2, setRisposta2] = useState('');
    const [risposta3, setRisposta3] = useState('');
    const [risposta4, setRisposta4] = useState('');

    const [gameStarted, setGameStarted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    
    const [disableButton, setDisableButton] = useState(false);
    const [coloraRispostaCorretta_N1, setColoraRispostaCorretta_N1] = useState(false);
    const [coloraRispostaCorretta_N2, setColoraRispostaCorretta_N2] = useState(false);
    const [coloraRispostaCorretta_N3, setColoraRispostaCorretta_N3] = useState(false);
    const [coloraRispostaCorretta_N4, setColoraRispostaCorretta_N4] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);
    const [coloraRispostaSbagliata_N4, setColoraRispostaSbagliata_N4] = useState(false);

    const game_ctx = useContext(GameContext);


    const questions = game_ctx.listaGiochi[props.INDICEGIOCO].domandeGioco;

    function checkTheAnswer(answer1, answer2, answer3, answer4, button){
        setDisableButton(true);
        setHasAnswered(true);

        let risp = questions[counter_question_number].question.correct_answer;

        if(answer1 === risp){
            setColoraRispostaCorretta_N1(true);
            if(button === "BOTTONE_1"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_1"){
                setColoraRispostaSbagliata_N1(true);
            }
        }


        if(answer2 === risp){
            setColoraRispostaCorretta_N2(true);
            if(button === "BOTTONE_2"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_2"){
                setColoraRispostaSbagliata_N2(true);
            }
        }

        if(answer3 === risp){
            setColoraRispostaCorretta_N3(true);
            if(button === "BOTTONE_3"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_3"){
                setColoraRispostaSbagliata_N3(true);
            }
        }

        if(answer4 === risp){
            setColoraRispostaCorretta_N4(true);
            if(button === "BOTTONE_4"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_4"){
                setColoraRispostaSbagliata_N4(true);
            }
        }
    }

    function shuffleAnswers(){
        
        quattroRisposte[0] = questions[counter_question_number].question.correct_answer;
        quattroRisposte[1] = questions[counter_question_number].question.wrong_answer_n1;
        quattroRisposte[2] = questions[counter_question_number].question.wrong_answer_n2;
        quattroRisposte[3] = questions[counter_question_number].question.wrong_answer_n3;
        console.log(quattroRisposte);
        
        for(let i = quattroRisposte.length-1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = quattroRisposte[i];
            quattroRisposte[i] = quattroRisposte[j];
            quattroRisposte[j] = temp;
        }
        console.log(quattroRisposte);
        setRisposta1(quattroRisposte[0]);
        setRisposta2(quattroRisposte[1]);
        setRisposta3(quattroRisposte[2]);
        setRisposta4(quattroRisposte[3]);

    }

    function iniziaGioco(){
        setGameStarted(true);
        counter_correct_answers = 0;
        counter_question_number = 0;
        shuffleAnswers();
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

        setColoraRispostaCorretta_N1(false);
        setColoraRispostaCorretta_N2(false);
        setColoraRispostaCorretta_N3(false);
        setColoraRispostaCorretta_N4(false);

        setColoraRispostaSbagliata_N1(false);
        setColoraRispostaSbagliata_N2(false);
        setColoraRispostaSbagliata_N3(false);
        setColoraRispostaSbagliata_N4(false);

        setDisableButton(false);
        setHasAnswered(false);

        shuffleAnswers();
    }

    return(
        <>
            <hr className={styles.horizontal_line}></hr>
            <h2 className={styles.explanation}>Seleziona la risposta che ritieni corretta</h2>
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
                    <h3 className={styles.domanda}>Chi è questo personaggio?</h3>
                    <img className={styles.resize_image} src={questions[counter_question_number].face_image} alt='Face'></img>
                    <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>

                    {/* <div className={styles.wrap_generico}> */}
                        {hasAnswered && 
                            <GenericButton
                                onClick={aggiornaLogica}
                                alternative_button={true}
                                buttonText={"PROSSIMA DOMANDA"}
                            >
                            </GenericButton>
                        }
                    {/* </div> */}
                    
                    
                    
                    <div id={qualcosa} className={styles.wrapper_bottoni_risposte}>
        
                        {/* {risposte} */}
        
                        <GameButton
                        onClick={() => {
                            // console.log(risposta1);
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, 'BOTTONE_1')
                        }}
                        correct_answer={coloraRispostaCorretta_N1}
                        wrong_answer={coloraRispostaSbagliata_N1}
                        buttonText={risposta1}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>

                        <GameButton
                        onClick={() => {
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, 'BOTTONE_2')
                        }}
                        correct_answer={coloraRispostaCorretta_N2}
                        wrong_answer={coloraRispostaSbagliata_N2}
                        buttonText={risposta2}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>

                        <GameButton
                        onClick={() => {
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, 'BOTTONE_3')
                        }}
                        correct_answer={coloraRispostaCorretta_N3}
                        wrong_answer={coloraRispostaSbagliata_N3}
                        buttonText={risposta3}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>

                        <GameButton
                        onClick={() => {
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, 'BOTTONE_4')
                        }}
                        correct_answer={coloraRispostaCorretta_N4}
                        wrong_answer={coloraRispostaSbagliata_N4}
                        buttonText={risposta4}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>
                    </div>
                </>
            }
        </>
    );
}

export default ExerciseGuessTheFace;