import styles from './EditButton.module.css';
import editPencil from '../Images/edit.png';

function EditButton(props){
    const classiStile = props.stile_alternativo ? `${styles.edit_button_alternative}` : `${styles.edit_button}`;

    return(
        <button onClick={props.onClick} className={classiStile}>
            <img src={editPencil} alt='editPencil' className={styles.edit_image}></img>
        </button>
    );
}

export default EditButton;