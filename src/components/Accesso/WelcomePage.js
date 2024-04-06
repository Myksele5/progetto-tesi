import logo from "../Images/NEW_COGNICARE_LOGO.png";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import styles from "./WelcomePage.module.css";

function WelcomePage(props){
    return(
        <div className={styles.wrapper_welcome}>
            <Card>
                <img className={styles.img_size} src={logo}></img>
                <div style={{fontSize: "20px", fontWeight: "bold", textAlign: "center"}}>
                    Benvenuto su CogniCare!
                </div>
                <div style={{textAlign: "center"}}>
                    Il portale che ti aiuta a gestire e monitorare i tuoi pazienti
                </div>
                <div className={styles.wrapper_button}>
                    <GenericButton
                        onClick={props.goToLogin}
                        buttonText={"Accedi"}
                        generic_button
                    ></GenericButton>
                </div>
                
            </Card>
        </div>
    );
}

export default WelcomePage;