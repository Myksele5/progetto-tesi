import styles from "./CardSmall.module.css";

function CardSmall(props){
    // const cardAnimata = props.animazione ? `${styles.animazione}` : '';
    // const stileAggiuntivo = props.altroStile ? `${styles.altroStile}` : '';
    // const stileHover = props.stileHover ? `${styles.stileHover}` : '';
    // const classiStile = `${styles.generic_wrapper} ${cardAnimata} ${stileAggiuntivo} ${stileHover}`;

    return(
        <div className={styles.generic_wrapper}>
            {props.children}
        </div>
    );
}

export default CardSmall;