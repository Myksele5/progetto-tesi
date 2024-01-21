import { useState } from "react";
import GenericButton from "../UI/GenericButton";

function TestMMSE(){
    const [testIniziato, setTestIniziato] = useState(false);

    function iniziaTest(){
        setTestIniziato(true);
    }

    return(
        <div>
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

            {testIniziato &&
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
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <label>MESE</label>
                <select>
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
        </div>
    );
}

export default TestMMSE;