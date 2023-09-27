import styles from './Modal.module.css';
import GenericButton from "./GenericButton";
import ReactDOM from 'react-dom';

function ModalToPort(props){
    return(
        <div className={styles.background_modal}>
            <div className={styles.wrapper_modal}>
                <h2>Sei sicuro di voler eliminare questo paziente?</h2>

                <GenericButton
                onClick={props.CONFERMA}
                generic_button={true}
                buttonText='SI'>
                </GenericButton>

                <GenericButton
                onClick={props.ANNULLA}
                generic_button={true}
                buttonText='NO'>
                </GenericButton>
            </div>
        </div>
    );
}

function Modal(props){
    return(
        <>
            {ReactDOM.createPortal(<ModalToPort CONFERMA={props.CONFERMA} ANNULLA={props.ANNULLA}></ModalToPort>, document.getElementById('modale'))}
        </>
    );
}

export default Modal;