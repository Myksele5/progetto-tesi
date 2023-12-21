import { useEffect, useState } from "react";
import AddDomanda from "../Giochi/AddDomanda";
import AddGioco from "../Giochi/AddGioco";
import ExerciseReflexes from "../Giochi/ExerciseReflexes";
import GuessTheWord from "../Giochi/GuessTheWord";
import styles from "./Attività.module.css";
import CambioPsw from "../Accesso/CambioPsw";

// var count = 15;


function Attività(){
    // const [secondi, setSecondi] = useState(15);

    // useEffect(() => {
    //     setInterval(() => {
    //         if(count > 0){
    //             count = count - 1;
    //             setSecondi(count);
    //         }
    //     }, 1000);
    // }, []);
    
    return(
        <>

            <h1 className={styles.page_title}>TESTING</h1>

            <CambioPsw></CambioPsw>
            {/* <div className={styles.wrap_generico}>
                {count}
            </div> */}

        </>
    );
}

export default Attività;