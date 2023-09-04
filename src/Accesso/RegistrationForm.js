import GenericButton from "../UI/GenericButton";
import styles from "./RegistrationForm.module.css";

function RegistrationForm(props){
    const goToLoginForm = () => {
        console.log("VAI AL FORM PER LOGGARE");
        const booleano = true;
        props.onShowMe(booleano);
    }
    return(
        <form className={styles.center_elements}>
            <h1>Registrazione</h1>

            <div>
                <label>Titolo<br/></label>
                <select className={styles.dropdown_box}>
                    <option>Dottore</option>
                    <option>Dottoressa</option>
                </select>
            </div>

            <div>
                <label>Nome<br/></label>
                <input className={styles.input_box}></input>
            </div>

            <div>
                <label>Cognome<br/></label>
                <input className={styles.input_box}></input>
            </div>

            <div>
                <label>Email<br/></label>
                <input className={styles.input_box} placeholder="Inserisci la tua email"></input>
            </div>
            
            <div>
                <label>Password<br/></label>
                <input className={styles.input_box} placeholder="Inserisci la tua password"></input>
            </div>
            
            <GenericButton>
                Registrati
            </GenericButton>

            <h5 onClick={goToLoginForm}>Hai già un account? Accedi!</h5>
            <h5 className={styles.psw_dimenticata}>Password dimenticata?</h5>
        </form>
    );
}

export default RegistrationForm;