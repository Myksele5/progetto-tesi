import styles from "./Dialoghi.module.css";
import Card from "../UI/Card";
import chat from "../Images/chat_blue.png";
import robot from "../Images/chatbot_blue.png";

function Dialoghi(){
    let dialoghi_normali;
    let dialoghi_con_mini;

    dialoghi_normali = 
    <>
    <h2>Inizia dialogo</h2>
    <img className={styles.immagine} src={chat}></img>
    </>
    
    dialoghi_con_mini = 
    <>
    <h2>Inizia dialogo con Mini</h2>
    <img className={styles.immagine} src={robot}></img>
    </>

    return(
        <>
            <h1 className={styles.page_title}>Dialoghi</h1>
            <h3 className={styles.page_subtitle}>Seleziona tipo di dialogo</h3>

            <div className={styles.wrap_cards}>
                <Card
                stileHover = {true}
                altroStile = {true}
                children = {dialoghi_normali}>
                </Card>

                <Card
                stileHover = {true}
                altroStile = {true}
                children = {dialoghi_con_mini}>
                </Card>
            </div>
        </>
    );
}

export default Dialoghi;