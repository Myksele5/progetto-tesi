import styles from "./MainMenu.module.css";
import logo from "../Images/NEW_COGNICARE_LOGO.png";
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
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

function MainMenu(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    const [highlightMenuButton_PAZIENTI, setHighlightMenuButton_PAZIENTI] = useState(true);
    const [highlightMenuButton_TEST, setHighlightMenuButton_TEST] = useState(false);
    const [highlightMenuButton_GIOCHI, setHighlightMenuButton_GIOCHI] = useState(false);
    const [highlightMenuButton_PATOLOGIE, setHighlightMenuButton_PATOLOGIE] = useState(false);

    const navigate = useNavigate();

    function goToPazienti(){
        // props.showSchermata(0);
        setHighlightMenuButton_PAZIENTI(true);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(false)

        patients_ctx.cercaPaziente("");
    }

    function goToAttività(){
        // props.showSchermata(1);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(true);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(false)
    }

    function goToGiochi(){
        // props.showSchermata(2);
        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(true);
        setHighlightMenuButton_PATOLOGIE(false)
    }

    function goToPatologie(){
        // props.showSchermata(3);

        setHighlightMenuButton_PAZIENTI(false);
        setHighlightMenuButton_TEST(false);
        setHighlightMenuButton_GIOCHI(false);
        setHighlightMenuButton_PATOLOGIE(true)
    }

    return(
        <>
            <Navbar className={`${styles.wrap_menu}`}>
                <div className={`${styles.wrap_website_name}`}>
                    <img className={styles.menu_image} src={logo} alt="CogniCare"></img>
                </div>
                <div className={`${styles.wrap_website_name_MOBILE}`}>
                    <img className={styles.menu_image} src={logo_MOBILE} alt="CogniCare"></img>
                </div>
                <Nav className={`${styles.wrap_buttons}`}>
                    <OverlayTrigger rootClose rootCloseEvent="click" trigger="click" placement="bottom" overlay={
                        <Popover>
                            <Popover.Body style={{maxWidth: "250px"}}>
                                <p className={styles.utente_loggato_FULLNAME}>{auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}</p>
                                <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                                <button
                                    className={styles.logout_button}
                                    onClick={auth_ctx.onLogoutClick}
                                    style={{width: "100%"}}
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
                    {auth_ctx.tipoAccount !== "Paziente" &&
                        <Link style={{textDecoration: "none"}} to={`/pazienti/${auth_ctx.utenteLoggatoUID}`}>
                            <Nav.Item className={`${styles.menu_option} ${props.selected === "PAZIENTI" ? styles.menu_option_SELECTED : ''}`}>
                                <img className={styles.image_option} src={patient} alt="pazienti"></img>
                                <div className={styles.menu_text_option}>Pazienti</div>
                            </Nav.Item>
                        </Link>
                    }
                    {auth_ctx.tipoAccount !== "Paziente" &&
                        <Link style={{textDecoration: "none"}} to={`/patologie/${auth_ctx.utenteLoggatoUID}`}>
                            <Nav.Item className={`${styles.menu_option} ${props.selected === "PATOLOGIE" ? styles.menu_option_SELECTED : ''}`}>
                                <img className={styles.image_option} src={dialogue} alt="patologie"></img>
                                <div className={styles.menu_text_option}>Patologie</div>
                            </Nav.Item>
                        </Link>
                    }
                    
                    <Link style={{textDecoration: "none"}} to={`/test/${auth_ctx.utenteLoggatoUID}`}>
                        <Nav.Item className={`${styles.menu_option} ${props.selected === "TEST" ? styles.menu_option_SELECTED : ''}`}>
                            <img className={styles.image_option} src={activity} alt="tests"></img>
                            <div className={styles.menu_text_option}>Test</div>
                        </Nav.Item>
                    </Link>
                    <Link style={{textDecoration: "none"}} to={`/giochi/${auth_ctx.utenteLoggatoUID}`}>
                        <Nav.Item className={`${styles.menu_option} ${props.selected === "GIOCHI" ? styles.menu_option_SELECTED : ''}`}>
                            <img className={styles.image_option} src={game} alt="giochi"></img>
                            <div className={styles.menu_text_option}>Giochi</div>
                        </Nav.Item>
                    </Link>
                </Nav>
            </Navbar>
            {auth_ctx.utenteLoggato !== null && auth_ctx.logoutModal &&
                <Modal
                    testoModale={"Sei sicuro di voler effettuare il logout?"}
                    CONFERMA = {() => {
                        auth_ctx.onLogout();
                        localStorage.clear();
                        navigate("/");
                    }}
                    ANNULLA = {() => {
                        auth_ctx.cancelLogout();
                    }}
                >
                </Modal>
                
            }
        </>
    );
}

export default MainMenu;