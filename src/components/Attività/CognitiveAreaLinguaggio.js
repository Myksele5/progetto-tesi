import styles from "./CognitiveAreaLinguaggio.module.css";
import image1 from "../Images-Giochi/BANANA.jpg";
import image2 from "../Images-Giochi/FRAGOLA.jpg";

function CognitiveAreaLinguaggio(){
    return(
        <>
            <h2>Mostra due immagini di oggetti al posto di questa frase</h2>
            <div className={styles.flex_horizontal}>
                <div className={styles.flex_vertical}>
                    <img className={styles.image_style} src={image1}></img>
                    <label>Oggetto 1</label>
                    <input className={styles.input_style}></input>
                </div>
                
                <div className={styles.flex_vertical}>
                    <img className={styles.image_style} src={image2}></img>
                    <label>Oggetto 2</label>
                    <input className={styles.input_style}></input>
                </div>
                
            </div>
            
        </>
    );
}

export default CognitiveAreaLinguaggio;