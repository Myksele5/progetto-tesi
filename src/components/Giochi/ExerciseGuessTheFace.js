import styles from './ExerciseGuessTheFace.module.css';
import GameButton from '../UI/GameButton';
import { useState } from 'react';

import Einstein from '../Images-Giochi/ALBERT_EINSTEIN.jpeg';
import Dante from '../Images-Giochi/DANTE_ALIGHIERI.jpg';
import Marilyn from '../Images-Giochi/MARILYN_MONROE.jpg';
import Leonardo from '../Images-Giochi/LEONARDO_DA_VINCI.jpg';
import Napoleone from '../Images-Giochi/NAPOLEONE_BONAPARTE.jpg';
import GameContext from '../../context/game-context';

let counter_question_number = 0;
let counter_correct_answers = 0;

function ExerciseGuessTheFace(props){
    
    const [disableButton, setDisableButton] = useState(false);
    const [coloraRispostaCorretta, setColoraRispostaCorretta] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);

    const questions = [
        {
            face_image: Einstein,
            question:{
                correct_answer: 'Albert Einstein',
                wrong_answer_n1: 'Isaac Newton',
                wrong_answer_n2: 'Enrico Fermi',
                wrong_answer_n3: 'Silvio Berlusconi'
            }
        },
        {
            face_image: Dante,
            question:{
                correct_answer: 'Dante Alighieri',
                wrong_answer_n1: 'Vincent Van Gogh',
                wrong_answer_n2: 'Niccolò Machiavelli',
                wrong_answer_n3: 'Giovanni Boccaccio'
            }
        },
        {
            face_image: Marilyn,
            question:{
                correct_answer: 'Marilyn Monroe',
                wrong_answer_n1: 'Sophia Lauren',
                wrong_answer_n2: 'Chiara Ferragni',
                wrong_answer_n3: 'Meryl Streep'
            }
        },
        {
            face_image: Leonardo,
            question:{
                correct_answer: 'Leonardo da Vinci',
                wrong_answer_n1: 'Wolfgang Mozart',
                wrong_answer_n2: 'Socrate',
                wrong_answer_n3: 'Caravaggio'
            }
        },
        {
            face_image: Napoleone,
            question:{
                    correct_answer: 'Napoleone Bonaparte',
                    wrong_answer_n1: 'Giulio Cesare',
                    wrong_answer_n2: 'Luigi XIV',
                    wrong_answer_n3: 'Alessandro Magno'
            }
        }
    ];

    let risposte = [
        
        <GameButton
        onClick={() => {
            checkTheAnswer('CORRECT');
        }}
        is_disabled={disableButton}
        correct_answer={coloraRispostaCorretta}
        game_button={true}
        buttonText={questions[counter_question_number].question.correct_answer}>
        </GameButton>,

        <GameButton
        onClick={() => {
            checkTheAnswer('WRONG_N1');
        }}
        is_disabled={disableButton}
        wrong_answer={coloraRispostaSbagliata_N1}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n1}>
        </GameButton>,

        <GameButton
        onClick={() => {
            checkTheAnswer('WRONG_N2');
        }}
        is_disabled={disableButton}
        wrong_answer={coloraRispostaSbagliata_N2}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n2}>
        </GameButton>,

        <GameButton
        onClick={() => {
            checkTheAnswer('WRONG_N3');
        }}
        is_disabled={disableButton}
        wrong_answer={coloraRispostaSbagliata_N3}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n3}>
        </GameButton>

    ];

    function checkTheAnswer(answer){
        setDisableButton(true);

        // IMPOSTA IL COLORE DEI BOTTONI IN BASE ALLA RISPOSTA
        switch(answer){
            case 'CORRECT':
                console.log('Risposta CORRETTA!');
                setColoraRispostaCorretta(true);
                counter_correct_answers++;
                break;
            case 'WRONG_N1':
                console.log('Risposta SBAGLIATA!');
                setColoraRispostaSbagliata_N1(true);
                setColoraRispostaCorretta(true);
                break;
            case 'WRONG_N2':
                console.log('Risposta SBAGLIATA!');
                setColoraRispostaSbagliata_N2(true);
                setColoraRispostaCorretta(true);
                break;
            case 'WRONG_N3':
                console.log('Risposta SBAGLIATA!');
                setColoraRispostaSbagliata_N3(true);
                setColoraRispostaCorretta(true);
                break;
            default:
                break;
        }

        // AGGIORNA CONTATORE DELLA DOMANDA ======= GIOCO IN CORSO
        if(counter_question_number < questions.length - 1){
            
            setTimeout(() => {
                counter_question_number++;
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
                setDisableButton(false);
            }, 1500);            
        }

        // GIOCO TERMINATO ======= RESETTA LE COMPONENTI
        else{
            setTimeout(() => {
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
                setDisableButton(false);
                props.giocoTerminato(counter_correct_answers.toString(), questions.length.toString());
                counter_question_number = 0; //--------> GIOCO FINITO RESETTA IL CONTATORE
                counter_correct_answers = 0; //--------> E RESETTO IL NUMERO DI RISPOSTE DELL'UTENTE
            }, 1500);  
            
            console.log('GIOCO TERMINATO, NASCONDI IL GIOCO E MOSTRA I RISULTATI')
        }

    }

    function randomizeAnswers(){
        for(let i = risposte.length-1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = risposte[i];
            risposte[i] = risposte[j];
            risposte[j] = temp;
        }

        return(
            risposte
        );
        // Math.floor(Math.random() * risposte.length)
    }

    return(
        <GameContext.Provider>
            <hr className={styles.horizontal_line}></hr>
            <h1 className={styles.explanation}>Seleziona la risposta che ritieni corretta</h1>
            <hr className={styles.horizontal_line}></hr>
            <h2>Chi è questo personaggio?</h2>
            <img className={styles.resize_image} src={questions[counter_question_number].face_image} alt='Face'></img>
            <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>
            <div className={styles.wrapper_bottoni_risposte}>
                {risposte}
            </div>
        </GameContext.Provider>
    );
}

export default ExerciseGuessTheFace;