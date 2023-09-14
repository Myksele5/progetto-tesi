import styles from './EditButton.module.css';
import editPencil from '../edit.png';

function EditButton(props){
    return(
        <button onClick={props.onClick} className={styles.edit_button}>
            <img src={editPencil} alt='editPencil' className={styles.edit_image}></img>
        </button>
    );
}

export default EditButton;