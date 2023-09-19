import GenericButton from "../UI/GenericButton";
import styles from "./RegistrationForm.module.css";
import Card from "../UI/Card";

function RegistrationForm(props){
    const goToLoginForm = () => {
        // console.log("VAI AL FORM PER LOGGARE");
        props.goToLoginForm();
        // props.onShowMe('FORM-LOG_in');
    }
    return(
        <Card
        children = {
            <form className={styles.center_elements}>
                <h1 className={styles.title}>Registrazione</h1>

                <label className={styles.label_box}>Titolo</label>
                <select className={styles.dropdown_box}>
                    <option>Dottore</option>
                    <option>Dottoressa</option>
                </select>

                <label className={styles.label_box}>Nome</label>
                <input className={styles.input_box}></input>

                <label className={styles.label_box}>Cognome</label>
                <input className={styles.input_box}></input>

                <label className={styles.label_box}>Email</label>
                <input className={styles.input_box} placeholder="Inserisci la tua email"></input>

                <label className={styles.label_box}>Password</label>
                <input className={styles.input_box} placeholder="Inserisci la tua password"></input>
                
                <GenericButton
                buttonText = 'Registrati'>
                </GenericButton>

                <h5 className={styles.log_reg} onClick={goToLoginForm}>Hai già un account? Accedi!</h5>
            </form>
        }>
        </Card>
    );
}

export default RegistrationForm;