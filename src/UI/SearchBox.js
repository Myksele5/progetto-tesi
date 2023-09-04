import styles from "./SearchBox.module.css";
import lente from "../magn_glass.png";

function SearchBox(){
    return(
        <div className={styles.wrap_search_box}>
            <input className={styles.search_box} placeholder="Cerca"></input>
            <img className={styles.lente} src={lente} alt="lente_ingrandimento"></img>
        </div>
    );
}

export default SearchBox;