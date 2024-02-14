import { useEffect, useState } from "react";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";

var secondi;
var interval;

function LinguaggioMOCA(props){
    const [timer, setTimer] = useState(undefined);
    const [tempoScaduto, setTempoScaduto] = useState(false);

    const [numeroDomanda, setNumeroDomanda] = useState(1);

    const [counterParole, setCounterParole] = useState(1);
    const [listaParoleLetteraF, setListaParoleLetteraF] = useState([{counterID: counterParole, parola: ""}]);

    useEffect(() => {
        if(numeroDomanda === 3){
            secondi = 10;
            setTimer(secondi);
        }
        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);

        // console.log("INTERVAL in useEffect--->" + interval);

        return () => clearInterval(interval);
    }, [numeroDomanda]);

    useEffect(() => {
        if(timer <=0){
            clearInterval(interval);
            setTempoScaduto(true)
        }
    }, [timer]);

    const parolaChangeHandler = (event, id) => {
        console.log(event.target.value);
        // setEnteredPatologia_1(event.target.value);
        if(event.target.value.length > 0 && id === listaParoleLetteraF.length && !tempoScaduto){
            let prossimoIDparola = counterParole + 1;
            setListaParoleLetteraF((prevList) => ([...prevList, {counterID: prossimoIDparola, parola: ""}]));
            setCounterParole(prossimoIDparola);
        }

        console.log(id);
        listaParoleLetteraF.map((parola) => {
            if(parola.counterID === id){
                parola.parola = event.target.value
            }
        })
    }

    function prossimaDomanda(){
        setNumeroDomanda((numeroPreced) => (numeroPreced + 1));
    }

    function salvaRisposteAreaCognitiva6(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Leggi e ripeti la seguente frase",
                frase: "So solo che Giovanni è l'unico da aiutare oggi"
            },
            {
                domanda: "Leggi e ripeti la seguente frase",
                azione: "Il gatto si nascondeva sempre sotto la poltrona quando i cani erano nella stanza"
            },
            {
                domanda: "Scrivi il massimo numero di parole che iniziano con la lettera F",
                parole: listaParoleLetteraF
            },
        ]

        props.risposteAreaCog6(oggettoDomandeRisposte);
    }

    return (
        <>
        {numeroDomanda === 1 &&
            <>
                <h2>Leggi la seguente frase, poi chiudi gli occhi e ripeti ad alta voce:</h2>
                <h2>So solo che Giovanni è l'unico da aiutare oggi</h2>
                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimaDomanda}
                >
                </GenericAlternativeButton>
            </>
        }

        {numeroDomanda === 2 &&
            <>
                <h2>Leggi la seguente frase, poi chiudi gli occhi e ripeti ad alta voce:</h2>
                <h2>Il gatto si nascondeva sempre sotto la poltrona quando i cani erano nella stanza</h2>
                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimaDomanda}
                >
                </GenericAlternativeButton>
            </>
        }
        {numeroDomanda === 3 &&
            <>
                <h2>Scrivi il massimo numero di parole che iniziano con la lettera F in un minuto:</h2>
                <p>TIMER {timer}</p>
                {listaParoleLetteraF.map((parolaF) => (
                    <input disabled={tempoScaduto} key={parolaF.counterID} onChange={(event) => {
                        parolaChangeHandler(event, parolaF.counterID)
                    }}></input>
                ))}
                {tempoScaduto &&
                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={salvaRisposteAreaCognitiva6}
                >
                </GenericAlternativeButton>
                }
            </>
        }
        </>
    );
}

export default LinguaggioMOCA;