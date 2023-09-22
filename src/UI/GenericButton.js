import styles from "./GenericButton.module.css";

function GenericButton(props){
    const rispostaCORRETTA = props.correct_answer ? `${styles.correct_answer}` : '';
    const rispostaSBAGLIATA = props.wrong_answer ? `${styles.wrong_answer}` : '';
    const bottoneStileGioco = props.game_button ? `${styles.game_button}` : '';
    const bottoneStileAlternativo = props.alternative_button ? `${styles.alternative_button}` : '';
    const bottoneStilePiccolo = props.small_button ? `${styles.small_button}` : '';
    const bottoneStileNormale = props.generic_button ? `${styles.generic_button}` : '';
    const classiStile = `${bottoneStileNormale} ${bottoneStilePiccolo} ${bottoneStileAlternativo} ${bottoneStileGioco} ${rispostaCORRETTA} ${rispostaSBAGLIATA}`;
    var img;

    if(props.immagine != null){
        img = <img className={styles.imgg} src={props.immagine} alt="immagine"></img>;
    }
    else{
        img = null;
    }

    return(
        <button onClick={props.onClick} className={classiStile}>
            {img}{props.buttonText}
        </button>
    );
}

export default GenericButton;