import AddDomanda from "../Giochi/AddDomanda";
import AddGioco from "../Giochi/AddGioco";
import ExerciseReflexes from "../Giochi/ExerciseReflexes";
import GuessTheWord from "../Giochi/GuessTheWord";
import styles from "./Attività.module.css";

function Attività(){
    return(
        <>

            <h1 className={styles.page_title}>TESTING</h1>

            <div className={styles.wrap_generico}>
                {/* <ExerciseReflexes></ExerciseReflexes> */}
            </div>

        </>
    );
}

export default Attività;