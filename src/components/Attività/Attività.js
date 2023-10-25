import AddDomanda from "../Giochi/AddDomanda";
import AddGioco from "../Giochi/AddGioco";
import ImpostazioniGioco from "../Giochi/ImpostazioniGioco";
import styles from "./Attività.module.css";

function Attività(){
    return(
        <>

            <h1 className={styles.page_title}>TESTING</h1>

            <AddDomanda></AddDomanda>

        </>
    );
}

export default Attività;