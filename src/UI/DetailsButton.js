import styles from './DetailsButton.module.css';
import detailsForm from '../details.png';

function EditButton(props){
    return(
        <button onClick={props.onClick} className={styles.details_button}>
            <img src={detailsForm} alt='editPencil' className={styles.details_image}></img>
        </button>
    );
}

export default EditButton;