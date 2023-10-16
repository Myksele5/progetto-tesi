import ImpostazioniGioco from "../Giochi/ImpostazioniGioco";
import styles from "./Attività.module.css";

function Attività(){
    return(
        <div className={styles.schermata_attività}>

            <h1 className={styles.page_title}>TESTING</h1>

            <ImpostazioniGioco></ImpostazioniGioco>

        </div>
    );
}

export default Attività;