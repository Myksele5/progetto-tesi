import styles from './GameObject.module.css';
import ExerciseGuessTheFace from './ExerciseGuessTheFace';

function GameObject(){
    let game_var = <ExerciseGuessTheFace></ExerciseGuessTheFace>;

    return(
        <div className={styles.wrapper_gioco}>
            {game_var}
        </div>
    );
}

export default GameObject;