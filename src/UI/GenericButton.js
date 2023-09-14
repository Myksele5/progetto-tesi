import styles from "./GenericButton.module.css";

function GenericButton(props){
    var img;

    if(props.immagine != null){
        img = <img className={styles.imgg} src={props.immagine} alt="immagine"></img>;
    }
    else{
        img = null;
    }

    return(
        <div className={styles.wrap_button}>
            <button onClick={props.onClick} className={styles.generic_button}>
                <div className={styles.content_button}>
                    {img}{props.buttonText}
                </div>
            </button>
        </div>
    );
}

export default GenericButton;