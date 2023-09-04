import styles from "./Dialoghi.module.css";
import Card from "../UI/Card";
import chat from "../chat_blue.png";
import robot from "../chatbot_blue.png";

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
    <h2>Fai una domanda a Mini</h2>
    <img className={styles.immagine} src={robot}></img>
    </>

    return(
        <div className={styles.schermata_dialoghi}>
            <h1 className={styles.page_title}>Dialoghi</h1>
            <h3 className={styles.page_subtitle}>Seleziona una operazione con mini</h3>

            <div className={styles.wrap_cards}>
                <Card
                altroStile = {true}
                children = {dialoghi_normali}>
                </Card>

                <Card
                altroStile = {true}
                children = {dialoghi_con_mini}>
                </Card>
            </div>
        </div>
    );
}

export default Dialoghi;