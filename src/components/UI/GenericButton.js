import styles from "./GenericButton.module.css";

function GenericButton(props){
    const disabledButton = props.is_disabled ? `${styles.is_disabled}` : '';
    const bottoneStilePiccolo = props.small_button ? `${styles.small_button}` : '';
    const bottoneStileNormale = props.generic_button ? `${styles.generic_button}` : '';
    const bottoneSelezionato = props.is_selected ? `${styles.is_selected}` : '';
    const classiStile = `${bottoneStileNormale} ${bottoneStilePiccolo} ${bottoneSelezionato}`;
    var img;

    if(props.immagine != null){
        img = <img className={styles.imgg} src={props.immagine} alt="immagine"></img>;
    }
    else{
        img = null;
    }

    return(
        <button disabled={disabledButton} onClick={props.onClick} className={classiStile}>
            {img}{props.buttonText}
        </button>
    );
}

export default GenericButton;