import AddGioco from "../Giochi/AddGioco";
import ImpostazioniGioco from "../Giochi/ImpostazioniGioco";
import styles from "./Attività.module.css";

function Attività(){
    return(
        <div className={styles.schermata_attività}>

            <h1 className={styles.page_title}>TESTING</h1>

            <ImpostazioniGioco></ImpostazioniGioco>

            <AddGioco></AddGioco>

        </div>
    );
}

export default Attività;