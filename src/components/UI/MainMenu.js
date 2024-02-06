import styles from "./MainMenu.module.css";
import brain from "../Images/dementia-hub.jpg";
import patient from "../Images/disabled.png";
import activity from "../Images/puzzle_piece.png";
import game from "../Images/chess.png";
import dialogue from "../Images/chat.png";
import GenericButton from "./GenericButton";
import ReactDOM from 'react-dom';
import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";

function MainMenu(props){
    const auth_ctx = useContext(AuthContext);

    const [highlightMenuButton_PAZIENTI, setHighlightMenuButton_PAZIENTI] = useState(true);
    const [highlightMenuButton_TEST, setHighlightMenuButton_TEST] = useState(false);
    const [highlightMenuButton_GIOCHI, setHighlightMenuButton_GIOCHI] = useState(false);

    function goToPazienti(){
        props.showSchermata(0);
        setHighlightMenuButton_PAZIENTI(true);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(false);
    }

    function goToAttività(){
        props.showSchermata(1);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(true);
        setHighlightMenuButton_GIOCHI(false);
    }

    function goToGiochi(){
        props.showSchermata(2);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(true);
    }

    function goToDialoghi(){
        props.showSchermata(3);
    }

    return(
        <div className={styles.wrap_menu}>

            <img className={styles.menu_image} src={brain} alt="blue_brain"></img>

            <div className={styles.wrap_profilo}>
                <div className={styles.wrapper_generico}>
                    {/* <p className={styles.utente_loggato}>{auth_ctx.tipoAccount} {auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}</p> */}
                    <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                    <GenericButton
                    onClick={auth_ctx.onLogoutClick}
                    buttonText={'Log Out'}
                    small_button={true}
                    >
                    </GenericButton>
                </div>
            </div>

            {(auth_ctx.tipoAccount === "Dottore" || auth_ctx.tipoAccount === "Dottoressa") && 
                <button onClick = {goToPazienti} className={`${styles.menu_option} ${highlightMenuButton_PAZIENTI ? styles.menu_option_SELECTED : ''}`}>
                    <img className={styles.image_option} src={patient} alt="pazienti"></img>
                    <p className={`${styles.text_option} ${highlightMenuButton_PAZIENTI ? styles.text_option_SELECTED : ''}`}>Pazienti</p>
                </button>
            }
            

            <button onClick = {goToAttività} className={`${styles.menu_option} ${highlightMenuButton_TEST ? styles.menu_option_SELECTED : ''}`}>
                <img className={styles.image_option} src={activity} alt="tests"></img>
                <p className={`${styles.text_option} ${highlightMenuButton_TEST ? styles.text_option_SELECTED : ''}`}>MMSE/MOCA</p>
            </button>

            <button onClick = {goToGiochi} className={`${styles.menu_option} ${highlightMenuButton_GIOCHI ? styles.menu_option_SELECTED : ''}`}>
                <img className={styles.image_option} src={game} alt="giochi"></img>
                <p className={`${styles.text_option} ${highlightMenuButton_GIOCHI ? styles.text_option_SELECTED : ''}`}>Giochi</p>
            </button>

            {/* <button onClick = {goToDialoghi} className={styles.menu_option}>
                <img className={styles.image_option} src={dialogue} alt="dialoghi"></img>
                <p className={styles.text_option}>Dialoghi</p>
            </button> */}

        </div>
    );
}

// function MainMenu(props){

//     return(
//         ReactDOM.createPortal(<MainMenuToPort showSchermata={props.showSchermata} makeUserLogout={props.makeUserLogout}></MainMenuToPort>, document.getElementById('main_menu'))
//     );
// }

export default MainMenu;