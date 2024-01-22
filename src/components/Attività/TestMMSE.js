import styles from "./TestMMSE.module.css";
import { useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function TestMMSE(){
    const [testIniziato, setTestIniziato] = useState(false);
    const [sezioneCognitiva, setSezioneCognitiva] = useState(1);

    function iniziaTest(){
        setTestIniziato(true);
    }

    function prossimaSezioneCognitiva(){
        setSezioneCognitiva((prevSezione) => (prevSezione + 1));
    }
    function precedenteSezioneCognitiva(){
        setSezioneCognitiva((prevSezione) => (prevSezione - 1));
    }

    return(
        <div className={styles.test_container}>
            {!testIniziato && 
            <>
                <label>Ciao sono il test<br/></label>
                <label>INFO PRIMA DI INIZIARE IL TEST</label>
                <GenericButton
                    onClick={iniziaTest}
                    generic_button={true}
                    buttonText={"INIZIA TEST"}
                >
                </GenericButton>
            </>
            }

            {testIniziato && sezioneCognitiva === 1 &&
            <>
                <h1>AREA COGNITIVA N.1</h1>
                <h2>Come ti chiami?</h2>
                <label>Nome</label>
                <input placeholder="..."></input>
                <label>Cognome</label>
                <input placeholder="..."></input>
                <h2>Che giorno è oggi?</h2>
                <label>GIORNO</label>
                <select>
                    <option hidden>--</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <label>MESE</label>
                <select>
                    <option hidden>--</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
                <label>ANNO</label>
                <select>
                    <option hidden>--</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                </select>
                <h2>In quale città ci troviamo?</h2>
                <input placeholder="inserisci luogo.."></input>
                
            </>
            }

            {testIniziato && sezioneCognitiva === 2 &&
            <>
                <h1>AREA COGNITIVA N.2</h1>
                <h2>In questo esericizio ti verranno mostrate tre parole che dovrai ricordare.</h2>
                <h2>Avrai a disposizione 15 secondi per leggerle e memorizzarle, dopo di che scrivi le parole che ricordi come risposte</h2>

                <h5>PAROLA 1</h5>
                <h5>PAROLA 2</h5>
                <h5>PAROLA 3</h5>
            </>
            }

            {testIniziato && sezioneCognitiva === 3 &&
            <>
                <h1>AREA COGNITIVA N.3</h1>
                <h1 style={{color: "red"}}>!!!!! In alternativa qui si possono mettere esercizi matematici semplici !!!!!</h1>
                <h2>Adesso ti verrà mostrata una parola ed il tuo obiettivo è scriverla al contrario</h2>

                <h5>PAROLAALCONTRARIO</h5>

                <label>Riscrivi la parola al contrario</label>
                <input></input>
            </>
            }
            {testIniziato && sezioneCognitiva === 4 &&
            <>
                <h1>AREA COGNITIVA N.4</h1>
                <h2>Mostra due immagini di oggetti al posto di questa frase</h2>
                <label>Oggetto 1</label>
                <input></input>
                <label>Oggetto 2</label>
                <input></input>
            </>
            }
            {testIniziato &&
            <>
                <GenericAlternativeButton
                    onClick={prossimaSezioneCognitiva}
                    buttonText={"Prossima domanda"}
                >
                </GenericAlternativeButton>
                <GenericAlternativeButton
                    onClick={precedenteSezioneCognitiva}
                    buttonText={"Domanda precedente"}
                >
                </GenericAlternativeButton>
            </>
            }
        </div>
    );
}

export default TestMMSE;