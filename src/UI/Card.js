import styles from "./Card.module.css";

function Card(props){
    const cardAnimata = props.animazione ? `${styles.animazione}` : '';
    const stileAggiuntivo = props.altroStile ? `${styles.altroStile}` : '';
    const classiStile = `${styles.generic_wrapper} ${cardAnimata} ${stileAggiuntivo}`;

    return(
        <div className={classiStile}>
            {props.children}
        </div>
    );
}

export default Card;