import styles from './DeleteButton.module.css';
import trashCan from '../trash-can.png';

function DeleteButton(props){
    return(
        <button onClick={props.onClick} className={styles.delete_button}>
            <img src={trashCan} alt='trash-can' className={styles.trash_image}></img>
        </button>
    );
}

export default DeleteButton;