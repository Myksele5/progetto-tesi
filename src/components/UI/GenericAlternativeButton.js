import styles from "./GenericAlternativeButton.module.css";

function GenericAlternativeButton(props){
    const bottoneRosso = props.colore_rosso ? `${styles.colore_rosso}` : '';
    const classiStile = `${styles.alternative_button} ${bottoneRosso}`;

    return(
        <button onClick={props.onClick} className={classiStile}>
            {props.buttonText}
        </button>
    );
}

export default GenericAlternativeButton;