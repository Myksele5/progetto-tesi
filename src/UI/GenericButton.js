import styles from "./GenericButton.module.css";

function GenericButton(props){
    const bottoneStilePiccolo = props.small_button ? `${styles.small_button}` : '';
    const classiStile = `${styles.generic_button} ${bottoneStilePiccolo}`;
    var img;

    if(props.immagine != null){
        img = <img className={styles.imgg} src={props.immagine} alt="immagine"></img>;
    }
    else{
        img = null;
    }

    return(

            <button onClick={props.onClick} className={classiStile}>
                {/* <div className={styles.content_button}> */}
                    {img}{props.buttonText}
                {/* </div> */}
            </button>

    );
}

export default GenericButton;