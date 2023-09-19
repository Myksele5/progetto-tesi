import GenericButton from '../UI/GenericButton';
import styles from './SchedaPaziente.module.css';

function SchedaPaziente(props){
    return(
        <div className={styles.lista}>
            <label className={styles.label_style}>ID</label>
            <h3>{props.id}</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <label className={styles.label_style}>Nome completo</label>
            <h3>{props.nome} {props.cognome}</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <label className={styles.label_style}>Città di nascita</label>
            <h3>{props.città}</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <label className={styles.label_style}>Data di nascita</label>
            <h3>{props.datanascita}</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <label className={styles.label_style}>Attività associate</label>
            <h3>{props.attività}</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <label className={styles.label_style}>Note opzionali</label>
            <h3>Da decidere</h3>
            {/* <hr className={styles.horizontal_line}/> */}

            <GenericButton
            small_button={true}
            onClick={props.goBackButton}
            buttonText='Go Back'>
            </GenericButton>
        </div>
    );
}

export default SchedaPaziente;