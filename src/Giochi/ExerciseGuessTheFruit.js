import styles from './ExerciseGuessTheFace.module.css';
import GenericButton from '../UI/GenericButton';
import { useState } from 'react';

import Albicocca from '../Images-Giochi/ALBICOCCA.jpg';
import Banana from '../Images-Giochi/BANANA.jpg';
import Ciliegia from '../Images-Giochi/CILIEGIA.jpg';
import Fragola from '../Images-Giochi/FRAGOLA.jpg';
import Mela from '../Images-Giochi/MELA.jpg';
import Mirtillo from '../Images-Giochi/MIRTILLO_NERO.jpg';
import Nespola from '../Images-Giochi/NESPOLA.jpeg';

let counter_question_number = 0;
let counter_correct_answers = 0;

function ExerciseGuessTheFruit(props){

    const [coloraRispostaCorretta, setColoraRispostaCorretta] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);

    const questions = [
        {
            face_image: Albicocca,
            question:{
                correct_answer: 'Albicocca',
                wrong_answer_n1: 'Mango',
                wrong_answer_n2: 'Nocciola',
                wrong_answer_n3: 'Arancia'
            }
        },
        {
            face_image: Banana,
            question:{
                correct_answer: 'Banana',
                wrong_answer_n1: 'Carruba',
                wrong_answer_n2: 'Bergamotto',
                wrong_answer_n3: 'Platano'
            }
        },
        {
            face_image: Ciliegia,
            question:{
                correct_answer: 'Ciliegia',
                wrong_answer_n1: 'Lampone',
                wrong_answer_n2: 'Pesca',
                wrong_answer_n3: 'Uva'
            }
        },
        {
            face_image: Fragola,
            question:{
                correct_answer: 'Fragola',
                wrong_answer_n1: 'Arancia',
                wrong_answer_n2: 'Litchi',
                wrong_answer_n3: 'Prugna'
            }
        },
        {
            face_image: Mela,
            question:{
                    correct_answer: 'Mela',
                    wrong_answer_n1: 'Pera',
                    wrong_answer_n2: 'Limone',
                    wrong_answer_n3: 'Papaya'
            }
        },
        {
            face_image: Mirtillo,
            question:{
                    correct_answer: 'Mirtillo',
                    wrong_answer_n1: 'Noce',
                    wrong_answer_n2: 'Lampone',
                    wrong_answer_n3: 'Mora'
            }
        },
        {
            face_image: Nespola,
            question:{
                    correct_answer: 'Nespola',
                    wrong_answer_n1: 'Pesca',
                    wrong_answer_n2: 'Frutto della passione',
                    wrong_answer_n3: 'Kiwi'
            }
        }
    ];

    let risposte = [
        
        <GenericButton
        onClick={() => {
            checkTheAnswer('CORRECT');
        }}
        correct_answer={coloraRispostaCorretta}
        game_button={true}
        buttonText={questions[counter_question_number].question.correct_answer}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N1');
        }}
        wrong_answer={coloraRispostaSbagliata_N1}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n1}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N2');
        }}
        wrong_answer={coloraRispostaSbagliata_N2}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n2}>
        </GenericButton>,

        <GenericButton
        onClick={() => {
            checkTheAnswer('WRONG_N3');
        }}
        wrong_answer={coloraRispostaSbagliata_N3}
        game_button={true}
        buttonText={questions[counter_question_number].question.wrong_answer_n3}>
        </GenericButton>

    ];

    function checkTheAnswer(answer){

        // IMPOSTA IL COLORE DEI BOTTONI IN BASE ALLA RISPOSTA
        if(answer === 'CORRECT'){
            console.log('Risposta CORRETTA!');
            setColoraRispostaCorretta(true);
            counter_correct_answers++;
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

        // AGGIORNA CONTATORE DELLA DOMANDA ======= GIOCO IN CORSO
        if(counter_question_number < questions.length - 1){
            
            setTimeout(() => {
                counter_question_number++;
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
            }, 1500);            
        }

        // GIOCO TERMINATO ======= RESETTA LE COMPONENTI
        else{
            setTimeout(() => {
                setColoraRispostaCorretta(false);
                setColoraRispostaSbagliata_N1(false);
                setColoraRispostaSbagliata_N2(false);
                setColoraRispostaSbagliata_N3(false);
                props.giocoTerminato(counter_correct_answers.toString());
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
        <>
            <hr className={styles.horizontal_line}></hr>
            <h1 className={styles.explanation}>Seleziona la risposta che ritieni corretta</h1>
            <hr className={styles.horizontal_line}></hr>
            <h2>Quale frutto è quello in foto?</h2>
            <img className={styles.resize_image} src={questions[counter_question_number].face_image} alt='Face'></img>
            <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>
            <div className={styles.wrapper_bottoni_risposte}>
                {risposte}
            </div>
        </>
    );
}

export default ExerciseGuessTheFruit;