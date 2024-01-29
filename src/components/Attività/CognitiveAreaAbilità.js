import styles from "./CognitiveAreaAbilità.module.css";
import Pentagoni from "../Images-Giochi/Pentagoni_Intrecciati.png";
import GenericButton from "../UI/GenericButton";

function CognitiveAreaAbilità(props){
    function salvaRisposte(){
        let oggettoDomandeRisposte = "Copia il seguente disegno: (Pentagoni intrecciati)";
        props.risposteAreaCog6(oggettoDomandeRisposte);
    }

    return(
        <>
            <h2>Copia il seguente disegno</h2>
            <img src={Pentagoni} className={styles.image_style}></img>
            <GenericButton
                onClick={salvaRisposte}
                buttonText={"Concludi Test"}
                generic_button={true}
            >
            </GenericButton>
        </>
    );
}

export default CognitiveAreaAbilità;