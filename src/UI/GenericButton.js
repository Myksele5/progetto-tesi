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
        <div onClick={props.onClick} className={styles.wrap_button}>
            <button className={styles.generic_button}>
                <div className={styles.content_button}>
                    {img}{props.children}
                </div>
            </button>
        </div>
    );
}

export default GenericButton;