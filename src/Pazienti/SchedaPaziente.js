import styles from './SchedaPaziente.module.css';

function SchedaPaziente(props){
    return(
        <form className={styles.lista}>
            <label className={styles.label_style}>ID</label>
            <h3>{props.id}</h3>
            <label className={styles.label_style}>Nome completo</label>
            <h3>{props.nome} {props.cognome}</h3>
            <label className={styles.label_style}>Città di nascita</label>
            <h3>{props.città}</h3>
            <label className={styles.label_style}>Data di nascita</label>
            <h3>{props.datanascita}</h3>
            <label className={styles.label_style}>Attività associate</label>
            <h3>{props.attività}</h3>
            <label className={styles.label_style}>Note opzionali</label>
            <h3>Da decidere</h3>
            <button onClick={props.goBackButton}>GO BACK</button>
        </form>
    );
}

export default SchedaPaziente;