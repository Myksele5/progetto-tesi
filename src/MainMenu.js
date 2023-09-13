import styles from "./MainMenu.module.css";
import brain from "./dementia-hub.jpg";
import patient from "./disabled.png";
import activity from "./puzzle_piece.png";
import game from "./chess.png";
import dialogue from "./chat.png";

function MainMenu(props){
    function goToPazienti(){
        props.showSchermata(0);
    }

    function goToAttività(){
        props.showSchermata(1);
    }

    function goToGiochi(){
        props.showSchermata(2);
    }

    function goToDialoghi(){
        props.showSchermata(3);
    }

    return(
        <div className={styles.wrap_menu}>

            <img className={styles.menu_image} src={brain} alt="blue_brain"></img>

            <button onClick = {goToPazienti} className={styles.menu_option}>
                <img className={styles.image_option} src={patient} alt="pazienti"></img>
                <div className={styles.wrap_text}>
                    <p className={styles.text_option}>Pazienti</p>
                </div>
            </button>

            <button onClick = {goToAttività} className={styles.menu_option}>
                <img className={styles.image_option} src={activity} alt="attività"></img>
                <div className={styles.wrap_text}>
                    <p className={styles.text_option}>Attività</p>
                </div>
            </button>

            <button onClick = {goToGiochi} className={styles.menu_option}>
                <img className={styles.image_option} src={game} alt="giochi"></img>
                <div className={styles.wrap_text}>
                    <p className={styles.text_option}>Giochi</p>
                </div>
            </button>

            <button onClick = {goToDialoghi} className={styles.menu_option}>
                <img className={styles.image_option} src={dialogue} alt="dialoghi"></img>
                <div className={styles.wrap_text}>
                    <p className={styles.text_option}>Dialoghi</p>
                </div>
            </button>

        </div>
    );
}

export default MainMenu;