import styles from "./GenericAlternativeButton.module.css";

function GenericAlternativeButton(props){
    const disabledButton = props.is_disabled ? `${styles.is_disabled}` : '';
    const bottoneRosso = props.colore_rosso ? `${styles.colore_rosso}` : '';
    const classiStile = `${styles.alternative_button} ${bottoneRosso}`;

    return(
        <button disabled={disabledButton} onClick={props.onClick} className={classiStile}>
            {props.buttonText}
        </button>
    );
}

export default GenericAlternativeButton;