import styles from "./AbilitàMOCA.module.css";
import { useState } from "react";
import CUBO from "../../Images-Giochi/Necker_cube.png";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";

function AbilitàMOCA(props){
    const [numeroDomanda, setNumeroDomanda] = useState(1);

    function prossimaDomanda(){
        setNumeroDomanda((numeroPreced) => (numeroPreced + 1));
    }

    function salvaRisposteAreaCognitiva8(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Disegna un orologio che segna le 11:10"
            },
            {
                domanda: "Copia questo cubo"
            },
            {
                domanda: "Collega lettere e numeri"
            }
        ]

        props.risposteAreaCog8(oggettoDomandeRisposte)
    }

    return(
        <>
            {numeroDomanda === 1 &&
            <>
                <h2>Disegna un orologio che segna le 11:10</h2>
                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimaDomanda}
                >
                </GenericAlternativeButton>
            </>
            }
            {numeroDomanda === 2 &&
            <>
                <h2>Copia questo cubo</h2>
                <img className={styles.image_size} src={CUBO}></img>
                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimaDomanda}
                >
                </GenericAlternativeButton>
            </>
            }
            {numeroDomanda === 3 &&
            <>
                <h2>Collega lettere e numeri</h2>
                <GenericAlternativeButton
                    buttonText={"Concludi Test"}
                    onClick={salvaRisposteAreaCognitiva8}
                >
                </GenericAlternativeButton>
            </>
            }
        </>
    );
}

export default AbilitàMOCA;