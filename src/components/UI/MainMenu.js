import styles from "./MainMenu.module.css";
import brain from "../Images/dementia-hub.jpg";
import patient from "../Images/disabled.png";
import activity from "../Images/puzzle_piece.png";
import game from "../Images/chess.png";
import dialogue from "../Images/chat.png";
import GenericButton from "./GenericButton";
import ReactDOM from 'react-dom';
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

function MainMenu(props){
    const auth_ctx = useContext(AuthContext);

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
            <div className={styles.menu_button_logout}>
                <GenericButton
                onClick={auth_ctx.onLogoutClick}
                buttonText={'Log Out'}
                small_button={true}
                >
                </GenericButton>
            </div>
            

            <button onClick = {goToPazienti} className={styles.menu_option}>
                <img className={styles.image_option} src={patient} alt="pazienti"></img>
                <p className={styles.text_option}>Pazienti</p>
            </button>

            <button onClick = {goToAttività} className={styles.menu_option}>
                <img className={styles.image_option} src={activity} alt="tests"></img>
                <p className={styles.text_option}>MMSE/MOCA</p>
            </button>

            <button onClick = {goToGiochi} className={styles.menu_option}>
                <img className={styles.image_option} src={game} alt="giochi"></img>
                <p className={styles.text_option}>Giochi</p>
            </button>

            <button onClick = {goToDialoghi} className={styles.menu_option}>
                <img className={styles.image_option} src={dialogue} alt="dialoghi"></img>
                <p className={styles.text_option}>Dialoghi</p>
            </button>

        </div>
    );
}

// function MainMenu(props){

//     return(
//         ReactDOM.createPortal(<MainMenuToPort showSchermata={props.showSchermata} makeUserLogout={props.makeUserLogout}></MainMenuToPort>, document.getElementById('main_menu'))
//     );
// }

export default MainMenu;