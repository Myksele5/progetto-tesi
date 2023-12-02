import styles from './ExerciseGuessTheFace.module.css';
import GameButton from '../UI/GameButton';
import GenericAlternativeButton from '../UI/GenericAlternativeButton';
import { useContext, useEffect, useState } from 'react';

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

var tipoQuiz;
var secondi;
var interval;

function ExerciseGuessTheFace(props){
    tipoQuiz = props.TIPOGIOCO;

    const [risposta1, setRisposta1] = useState('');
    const [risposta2, setRisposta2] = useState('');
    const [risposta3, setRisposta3] = useState('');
    const [risposta4, setRisposta4] = useState('');
    const [risposta5, setRisposta5] = useState('');
    const [risposta6, setRisposta6] = useState('');
    const [risposta7, setRisposta7] = useState('');
    const [risposta8, setRisposta8] = useState('');

    const [gameStarted, setGameStarted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    
    const [disableButton, setDisableButton] = useState(false);
    const [coloraRispostaCorretta_N1, setColoraRispostaCorretta_N1] = useState(false);
    const [coloraRispostaCorretta_N2, setColoraRispostaCorretta_N2] = useState(false);
    const [coloraRispostaCorretta_N3, setColoraRispostaCorretta_N3] = useState(false);
    const [coloraRispostaCorretta_N4, setColoraRispostaCorretta_N4] = useState(false);
    const [coloraRispostaCorretta_N5, setColoraRispostaCorretta_N5] = useState(false);
    const [coloraRispostaCorretta_N6, setColoraRispostaCorretta_N6] = useState(false);
    const [coloraRispostaCorretta_N7, setColoraRispostaCorretta_N7] = useState(false);
    const [coloraRispostaCorretta_N8, setColoraRispostaCorretta_N8] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);
    const [coloraRispostaSbagliata_N4, setColoraRispostaSbagliata_N4] = useState(false);
    const [coloraRispostaSbagliata_N5, setColoraRispostaSbagliata_N5] = useState(false);
    const [coloraRispostaSbagliata_N6, setColoraRispostaSbagliata_N6] = useState(false);
    const [coloraRispostaSbagliata_N7, setColoraRispostaSbagliata_N7] = useState(false);
    const [coloraRispostaSbagliata_N8, setColoraRispostaSbagliata_N8] = useState(false);

    const [timer, setTimer] = useState(undefined);

    const game_ctx = useContext(GameContext);
    const questions = game_ctx.listaGiochi[props.INDICEGIOCO].domandeGioco;

    useEffect(() => {
        if(props.LIVELLOGIOCO === "NORMALE"){
            secondi = 15;
            setTimer(secondi);
        }
        if(props.LIVELLOGIOCO === "DIFFICILE"){
            secondi = 10;
            setTimer(secondi);
        }
        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);

        console.log("INTERVAL in useEffect--->" + interval);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(timer <=0){
            clearInterval(interval);
            setColoraRispostaSbagliata_N1(true);
            setColoraRispostaSbagliata_N2(true);
            setColoraRispostaSbagliata_N3(true);
            setColoraRispostaSbagliata_N4(true);
            setColoraRispostaSbagliata_N5(true);
            setColoraRispostaSbagliata_N6(true);
            setColoraRispostaSbagliata_N7(true);
            setColoraRispostaSbagliata_N8(true);
            setDisableButton(true);
            setHasAnswered(true);
        }
    }, [timer]);

    function checkTheAnswer(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, button){
        console.log("INTERVAL dentro checktheanswer--->" + interval);
        clearInterval(interval);
        setDisableButton(true);
        setHasAnswered(true);

        let risp = questions[counter_question_number].rispCorrette.correct_answer_n1;

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
        if(answer5 === risp){
            setColoraRispostaCorretta_N5(true);
            if(button === "BOTTONE_5"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_5"){
                setColoraRispostaSbagliata_N5(true);
            }
        }
        if(answer6 === risp){
            setColoraRispostaCorretta_N6(true);
            if(button === "BOTTONE_6"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_6"){
                setColoraRispostaSbagliata_N6(true);
            }
        }
        if(answer7 === risp){
            setColoraRispostaCorretta_N7(true);
            if(button === "BOTTONE_7"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_7"){
                setColoraRispostaSbagliata_N7(true);
            }
        }
        if(answer8 === risp){
            setColoraRispostaCorretta_N8(true);
            if(button === "BOTTONE_8"){
                counter_correct_answers++;
            }
        }
        else{
            if(button === "BOTTONE_8"){
                setColoraRispostaSbagliata_N8(true);
            }
        }
    }

    function shuffleAnswers(){
        quattroRisposte.length = 0;
        var numeroTotaleRisposte_CORRETTE = Object.keys(questions[counter_question_number].rispCorrette).length;
        var numeroTotaleRisposte_SBAGLIATE = Object.keys(questions[counter_question_number].rispSbagliate).length;
        // console.log(numeroTotaleRisposte);

        for(var i=0; i < numeroTotaleRisposte_CORRETTE; i++){
            if(i === 0){
                quattroRisposte[i] = questions[counter_question_number].rispCorrette.correct_answer_n1;
            }
            if(i === 1){
                quattroRisposte[i] = questions[counter_question_number].rispCorrette.correct_answer_n2;
            }
            if(i === 2){
                quattroRisposte[i] = questions[counter_question_number].rispCorrette.correct_answer_n3;
            }
            if(i === 3){
                quattroRisposte[i] = questions[counter_question_number].rispCorrette.correct_answer_n4;
            }
        }
        for(var j=0; j < numeroTotaleRisposte_SBAGLIATE; j++){
            if(j === 0){
                quattroRisposte[j+numeroTotaleRisposte_CORRETTE] = questions[counter_question_number].rispSbagliate.wrong_answer_n1;
            }
            if(j === 1){
                quattroRisposte[j+numeroTotaleRisposte_CORRETTE] = questions[counter_question_number].rispSbagliate.wrong_answer_n2;
            }
            if(j === 2){
                quattroRisposte[j+numeroTotaleRisposte_CORRETTE] = questions[counter_question_number].rispSbagliate.wrong_answer_n3;
            }
            if(j === 3){
                quattroRisposte[j+numeroTotaleRisposte_CORRETTE] = questions[counter_question_number].rispSbagliate.wrong_answer_n4;
            }
        }
        
        // quattroRisposte[0] = questions[counter_question_number].question.correct_answer;
        // quattroRisposte[1] = questions[counter_question_number].question.wrong_answer_n1;
        // quattroRisposte[2] = questions[counter_question_number].question.wrong_answer_n2;
        // quattroRisposte[3] = questions[counter_question_number].question.wrong_answer_n3;
        // quattroRisposte[4] = questions[counter_question_number].question.wrong_answer_n4;
        // console.log(quattroRisposte[4]);
        // console.log(Object.keys(questions[counter_question_number].question).length);
        
        for(let i = quattroRisposte.length-1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = quattroRisposte[i];
            quattroRisposte[i] = quattroRisposte[j];
            quattroRisposte[j] = temp;
        }
        // console.log(quattroRisposte);
        setRisposta1(quattroRisposte[0]);
        setRisposta2(quattroRisposte[1]);
        setRisposta3(quattroRisposte[2]);
        setRisposta4(quattroRisposte[3]);
        setRisposta5(quattroRisposte[4]);
        setRisposta6(quattroRisposte[5]);
        setRisposta7(quattroRisposte[6]);
        setRisposta8(quattroRisposte[7]);

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
        setColoraRispostaCorretta_N5(false);
        setColoraRispostaCorretta_N6(false);
        setColoraRispostaCorretta_N7(false);
        setColoraRispostaCorretta_N8(false);

        setColoraRispostaSbagliata_N1(false);
        setColoraRispostaSbagliata_N2(false);
        setColoraRispostaSbagliata_N3(false);
        setColoraRispostaSbagliata_N4(false);
        setColoraRispostaSbagliata_N5(false);
        setColoraRispostaSbagliata_N6(false);
        setColoraRispostaSbagliata_N7(false);
        setColoraRispostaSbagliata_N8(false);

        setDisableButton(false);
        setHasAnswered(false);

        if(props.LIVELLOGIOCO === "NORMALE"){
            secondi = 15;
            setTimer(secondi);
        }
        if(props.LIVELLOGIOCO === "DIFFICILE"){
            secondi = 10;
            setTimer(secondi);
        }
        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);

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
                    <GenericAlternativeButton
                        onClick={iniziaGioco}
                        buttonText={"INIZIA"}
                    >
                    </GenericAlternativeButton>
                </div>
            }
            
            {gameStarted &&
                <>
                    {tipoQuiz === "QUIZ CON IMMAGINI" && 
                        <>
                            <h3 className={styles.domanda}>Chi è questo personaggio?</h3>
                            <img className={styles.resize_image} src={questions[counter_question_number].indovina} alt='Face'></img>
                        </>
                    }
                    {tipoQuiz === "QUIZ" && <h1>{questions[counter_question_number].indovina}</h1>}

                    <div className={styles.wrapper_horizontal_flex}>
                        <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>
                        {props.LIVELLOGIOCO !== "FACILE" && <p>TIMER: {timer}</p>}
                    </div>
                    
                    {hasAnswered && 
                        <GenericAlternativeButton
                            onClick={aggiornaLogica}
                            buttonText={"PROSSIMA DOMANDA"}
                        >
                        </GenericAlternativeButton>
                    }
                    
                    <div className={styles.wrapper_bottoni_risposte}>
        
                        {/* {risposte} */}
        
                        <GameButton
                        onClick={() => {
                            // console.log(risposta1);
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_1')
                        }}
                        correct_answer={coloraRispostaCorretta_N1}
                        wrong_answer={coloraRispostaSbagliata_N1}
                        buttonText={risposta1}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>

                        <GameButton
                        onClick={() => {
                            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_2')
                        }}
                        correct_answer={coloraRispostaCorretta_N2}
                        wrong_answer={coloraRispostaSbagliata_N2}
                        buttonText={risposta2}
                        is_disabled={disableButton}
                        game_button={true}></GameButton>

                        {quattroRisposte.length > 2 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_3')
                            }}
                            correct_answer={coloraRispostaCorretta_N3}
                            wrong_answer={coloraRispostaSbagliata_N3}
                            buttonText={risposta3}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }

                        {quattroRisposte.length > 3 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_4')
                            }}
                            correct_answer={coloraRispostaCorretta_N4}
                            wrong_answer={coloraRispostaSbagliata_N4}
                            buttonText={risposta4}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }

                        {quattroRisposte.length > 4 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_5')
                            }}
                            correct_answer={coloraRispostaCorretta_N5}
                            wrong_answer={coloraRispostaSbagliata_N5}
                            buttonText={risposta5}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }
                        {quattroRisposte.length > 5 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_6')
                            }}
                            correct_answer={coloraRispostaCorretta_N6}
                            wrong_answer={coloraRispostaSbagliata_N6}
                            buttonText={risposta6}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }
                        {quattroRisposte.length > 6 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_7')
                            }}
                            correct_answer={coloraRispostaCorretta_N7}
                            wrong_answer={coloraRispostaSbagliata_N7}
                            buttonText={risposta7}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }
                        {quattroRisposte.length > 7 &&
                            <GameButton
                            onClick={() => {
                                checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_8')
                            }}
                            correct_answer={coloraRispostaCorretta_N8}
                            wrong_answer={coloraRispostaSbagliata_N8}
                            buttonText={risposta8}
                            is_disabled={disableButton}
                            game_button={true}></GameButton>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default ExerciseGuessTheFace;