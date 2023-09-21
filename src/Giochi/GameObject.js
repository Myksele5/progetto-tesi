import styles from './GameObject.module.css';
import volto_personaggio_famoso from '../Images-Giochi/ALBERT_EINSTEIN.jpeg';

function GameObject(){
    return(
        <div className={styles.wrapper_gioco}>
            <h1>Seleziona la risposta che ritieni corretta</h1>
            <h2>Questo è il volto di .... ?</h2>
            <img className={styles.resize_image} src={volto_personaggio_famoso}></img>
            <div className={styles.wrapper_bottoni_risposte}>
                <button>AAA</button>
                <button>BBB</button>
                <button>CCC</button>
                <button>DDD</button>
            </div>
        </div>
    );
}

export default GameObject;