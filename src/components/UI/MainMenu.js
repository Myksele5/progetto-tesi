import styles from "./MainMenu.module.css";
import logo from "../Images/CogniCareLogo.png";
import logo_MOBILE from "../Images/CogniCareLogo_Mobile.png";
import user from "../Images/user.png";
import patient from "../Images/disabled.png";
import activity from "../Images/puzzle_piece.png";
import game from "../Images/chess.png";
import dialogue from "../Images/list.png";
import GenericButton from "./GenericButton";
import ReactDOM from 'react-dom';
import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";
import PatientContext from "../../context/patients-context";
import { Button, Container, Dropdown, Nav, Navbar, OverlayTrigger, Popover } from "react-bootstrap";

function MainMenu(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    const [highlightMenuButton_PAZIENTI, setHighlightMenuButton_PAZIENTI] = useState(true);
    const [highlightMenuButton_TEST, setHighlightMenuButton_TEST] = useState(false);
    const [highlightMenuButton_GIOCHI, setHighlightMenuButton_GIOCHI] = useState(false);
    const [highlightMenuButton_PATOLOGIE, setHighlightMenuButton_PATOLOGIE] = useState(false);

    function goToPazienti(){
        props.showSchermata(0);
        setHighlightMenuButton_PAZIENTI(true);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(false)

        patients_ctx.cercaPaziente("");
    }

    function goToAttività(){
        props.showSchermata(1);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(true);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(false)
    }

    function goToGiochi(){
        props.showSchermata(2);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(true);
        setHighlightMenuButton_PATOLOGIE(false)
    }

    function goToPatologie(){
        props.showSchermata(3);

        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(true)
    }

    return(
        <Navbar className={`${styles.wrap_menu}`}>
            <div className={`${styles.wrap_website_name}`}>
                <img className={styles.menu_image} src={logo} alt="CogniCare"></img>
            </div>
            <div className={`${styles.wrap_website_name_MOBILE}`}>
                <img className={styles.menu_image} src={logo_MOBILE} alt="CogniCare"></img>
            </div>
            {/* <div className={styles.wrap_profilo}>
                <div className={styles.wrapper_generico}>
                    <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                    <p className={styles.utente_loggato_FULLNAME}>{auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}</p>
                    <GenericButton
                    onClick={auth_ctx.onLogoutClick}
                    buttonText={'Log Out'}
                    small_button={true}
                    red_styling
                    >
                    </GenericButton>
                </div>
            </div> */}
            <Nav className={`${styles.wrap_buttons}`}>
            {/* <button>Profilo</button> */}
                {/* <Dropdown className={styles.dropdown_button_centering} data-bs-theme="dark">
                    <Dropdown.Toggle style={{width: "60px"}}>
                        <img className={styles.profile_image} src={user}></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width: "fit-content"}}>
                        <Dropdown.Item style={{padding: "4px"}} disabled>
                            <p className={styles.utente_loggato_FULLNAME}>{auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}</p>
                        </Dropdown.Item>
                        <Dropdown.Item style={{padding: "4px"}} disabled>
                            <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <button
                                className={styles.logout_button}
                                onClick={auth_ctx.onLogoutClick}
                                style={{width: "100%"}}
                                // buttonText={'Log Out'}
                                // small_button={true}
                                // red_styling
                            >Log Out
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <OverlayTrigger rootClose rootCloseEvent="click" trigger="click" placement="bottom" overlay={
                    <Popover>
                        <Popover.Body style={{maxWidth: "250px"}}>
                            <p className={styles.utente_loggato_FULLNAME}>{auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}</p>
                            <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                            <button
                                className={styles.logout_button}
                                onClick={auth_ctx.onLogoutClick}
                                style={{width: "100%"}}
                                // buttonText={'Log Out'}
                                // small_button={true}
                                // red_styling
                            >Log Out
                            </button>
                        </Popover.Body>
                    </Popover>
                }>
                    <div className={styles.wrapper_flex}>
                        <Button className={styles.profile_button}>
                            <img className={styles.profile_image} src={user}></img>
                        </Button>
                    </div>
                </OverlayTrigger>
                <Nav.Item className={`${styles.menu_option} ${highlightMenuButton_PAZIENTI ? styles.menu_option_SELECTED : ''}`} onClick={goToPazienti}>
                    <img className={styles.image_option} src={patient} alt="pazienti"></img>
                    <div className={styles.menu_text_option}>Pazienti</div>
                </Nav.Item>
                <Nav.Item className={`${styles.menu_option} ${highlightMenuButton_PATOLOGIE ? styles.menu_option_SELECTED : ''}`} onClick={goToPatologie}>
                    <img className={styles.image_option} src={dialogue} alt="patologie"></img>
                    <div className={styles.menu_text_option}>Patologie</div>
                </Nav.Item>
                <Nav.Item className={`${styles.menu_option} ${highlightMenuButton_TEST ? styles.menu_option_SELECTED : ''}`} onClick={goToAttività}>
                    <img className={styles.image_option} src={activity} alt="tests"></img>
                    <div className={styles.menu_text_option}>Test</div>
                </Nav.Item>
                <Nav.Item className={`${styles.menu_option} ${highlightMenuButton_GIOCHI ? styles.menu_option_SELECTED : ''}`} onClick={goToGiochi}>
                    <img className={styles.image_option} src={game} alt="giochi"></img>
                    <div className={styles.menu_text_option}>Giochi</div>
                </Nav.Item>
            </Nav>
        </Navbar>
        // <div className={styles.wrap_menu}>

        //     <img className={styles.menu_image} src={brain} alt="blue_brain"></img>

        //     <div className={styles.wrap_profilo}>
        //         <div className={styles.wrapper_generico}>
        //             <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
        //             <GenericButton
        //             onClick={auth_ctx.onLogoutClick}
        //             buttonText={'Log Out'}
        //             small_button={true}
        //             red_styling
        //             >
        //             </GenericButton>
        //         </div>
        //     </div>

        //     {(auth_ctx.tipoAccount === "Dottore" || auth_ctx.tipoAccount === "Dottoressa") && 
        //         <button onClick = {goToPazienti} className={`${styles.menu_option} ${highlightMenuButton_PAZIENTI ? styles.menu_option_SELECTED : ''}`}>
        //             <img className={styles.image_option} src={patient} alt="pazienti"></img>
        //             <p className={`${styles.text_option} ${highlightMenuButton_PAZIENTI ? styles.text_option_SELECTED : ''}`}>Pazienti</p>
        //         </button>
        //     }
            
        //     <button onClick = {goToPatologie} className={`${styles.menu_option} ${highlightMenuButton_PATOLOGIE ? styles.menu_option_SELECTED : ''}`}>
        //         <img className={styles.image_option} src={dialogue} alt="patologie"></img>
        //         <p className={`${styles.text_option} ${highlightMenuButton_PATOLOGIE ? styles.text_option_SELECTED : ''}`}>Patologie</p>
        //     </button>

        //     <button onClick = {goToAttività} className={`${styles.menu_option} ${highlightMenuButton_TEST ? styles.menu_option_SELECTED : ''}`}>
        //         <img className={styles.image_option} src={activity} alt="tests"></img>
        //         <p className={`${styles.text_option} ${highlightMenuButton_TEST ? styles.text_option_SELECTED : ''}`}>MMSE/MOCA</p>
        //     </button>

        //     <button onClick = {goToGiochi} className={`${styles.menu_option} ${highlightMenuButton_GIOCHI ? styles.menu_option_SELECTED : ''}`}>
        //         <img className={styles.image_option} src={game} alt="giochi"></img>
        //         <p className={`${styles.text_option} ${highlightMenuButton_GIOCHI ? styles.text_option_SELECTED : ''}`}>Giochi</p>
        //     </button>


        // </div>
    );
}

export default MainMenu;