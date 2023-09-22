import styles from './ExerciseGuessTheFace.module.css';
import GenericButton from '../UI/GenericButton';
import { useState } from 'react';

import Einstein from '../Images-Giochi/ALBERT_EINSTEIN.jpeg';
import Dante from '../Images-Giochi/DANTE_ALIGHIERI.jpg';
import Marilyn from '../Images-Giochi/MARILYN_MONROE.jpg';
import Leonardo from '../Images-Giochi/LEONARDO_DA_VINCI.jpg';
import Napoleone from '../Images-Giochi/NAPOLEONE_BONAPARTE.jpg';

let counter_question_number = 0;

function ExerciseGuessTheFace(){
    
    const [questionNumber, setQuestionNumber] = useState(counter_question_number);
    const [coloraRispostaCorretta, setColoraRispostaCorretta] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);
    
    const questions = [
        {
            face_image: Einstein,
            correct_answer: 'Albert Einstein',
            wrong_answer_n1: 'Isaac Newton',
            wrong_answer_n2: 'Enrico Fermi',
            wrong_answer_n3: 'Silvio Berlusconi',
        },
        {
            face_image: Dante,
            correct_answer: 'Dante Alighieri',
            wrong_answer_n1: 'Vincent Van Gogh',
            wrong_answer_n2: 'Niccolò Machiavelli',
            wrong_answer_n3: 'Giovanni Boccaccio',
        },
        {
            face_image: Marilyn,
            correct_answer: 'Marilyn Monroe',
            wrong_answer_n1: 'Sophia Lauren',
            wrong_answer_n2: 'Chiara Ferragni',
            wrong_answer_n3: 'Meryl Streep',
        },
        {
            face_image: Leonardo,
            correct_answer: 'Leonardo da Vinci',
            wrong_answer_n1: 'Wolfgang Mozart',
            wrong_answer_n2: 'Socrate',
            wrong_answer_n3: 'Caravaggio',
        },
        {
            face_image: Napoleone,
            correct_answer: 'Napoleone Bonaparte',
            wrong_answer_n1: 'Giulio Cesare',
            wrong_answer_n2: 'Luigi XIV',
            wrong_answer_n3: 'Alessandro Magno',
        }
    ];

    let risposte = [
        
        <GenericButton
        onClick={() => {
            checkTheAnswer('CORRECT');
        }}
        correct_answer={coloraRispostaCorretta}
        game_button={true}
        buttonText={questions[questionNumber].correct_answer}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N1');
        }}
        wrong_answer={coloraRispostaSbagliata_N1}
        game_button={true}
        buttonText={questions[questionNumber].wrong_answer_n1}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N2');
        }}
        wrong_answer={coloraRispostaSbagliata_N2}
        game_button={true}
        buttonText={questions[questionNumber].wrong_answer_n2}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N3');
        }}
        wrong_answer={coloraRispostaSbagliata_N3}
        game_button={true}
        buttonText={questions[questionNumber].wrong_answer_n3}>
        </GenericButton>

    ];

    function checkTheAnswer(answer){
        console.log(counter_question_number + ' Contatore iniziale');
        // console.log(questions.length + '-----> GRANDEZZA ARRAY');
        
        // IMPOSTA IL COLORE DEI BOTTONI IN BASE ALLA RISPOSTA
        if(answer === 'CORRECT'){
            console.log('Risposta CORRETTA!');
            setColoraRispostaCorretta(true);
        }
        if(answer === 'WRONG_N1'){
            console.log('Risposta SBAGLIATA!');
            setColoraRispostaSbagliata_N1(true);
            setColoraRispostaCorretta(true);
        }
        if(answer === 'WRONG_N2'){
            console.log('Risposta SBAGLIATA!');
            setColoraRispostaSbagliata_N2(true);
            setColoraRispostaCorretta(true);
        }
        if(answer === 'WRONG_N3'){
            console.log('Risposta SBAGLIATA!');
            setColoraRispostaSbagliata_N3(true);
            setColoraRispostaCorretta(true);
        }

        // AGGIORNA CONTATORE DELLA DOMANDA ======= SE LE DOMANDE SONO FINITE RICOMINCIA DA CAPO
        if(counter_question_number < questions.length - 1){
            console.log(counter_question_number);
            counter_question_number++;

            setTimeout(() => {
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
                setQuestionNumber(counter_question_number);
            }, 1500);            
        }
        else{
            setTimeout(() => {
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
                counter_question_number = 0; //--------> GIOCO FINITO RESETTA IL CONTATORE
                setQuestionNumber(counter_question_number);
            }, 1500);  
        }
        console.log(counter_question_number + ' Contatore dopo UPDATE');
    }

    function randomizeAnswers(){
        // Math.floor(Math.random() * risposte.length)
    }

    return(
        <>
            <h1>Seleziona la risposta che ritieni corretta</h1>
            <h2>Chi è questo personaggio?</h2>
            <img className={styles.resize_image} src={questions[questionNumber].face_image} alt='Face'></img>
            <div className={styles.wrapper_bottoni_risposte}>
                {risposte[0]}

                {risposte[1]}

                {risposte[2]}

                {risposte[3]}
            </div>
        </>
    );
}

export default ExerciseGuessTheFace;