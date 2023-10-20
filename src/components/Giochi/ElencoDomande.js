import { useContext } from "react";
import GameContext from "../../context/game-context";
import styles from "./ElencoDomande.module.css";

function ElencoDomande(){
    const game_ctx = useContext(GameContext);
    var listaDomande = game_ctx.domandeDeiQuizConImmagini;

    function verifyIsChecked(event, domanda){
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            console.log(domanda);
          } else {
            console.log('⛔️ Checkbox is NOT checked');
          }
    }

    function recuperaTutteLeDomande(singleQuestion){
        return(
            <div className={styles.flex_list_container}>
                <li className={styles.list_item_content}>
                    <h4>Volto da indovinare</h4>
                    <p>{singleQuestion.question.correct_answer}</p>
                </li>

                <li className={styles.list_item_content}>
                    <h4>Risposta sbagliata 1</h4>
                    <p>{singleQuestion.question.wrong_answer_n1}</p>
                </li>

                <li className={styles.list_item_content}>
                    <h4>Risposta sbagliata 2</h4>
                    <p>{singleQuestion.question.wrong_answer_n2}</p>
                </li>

                <li className={styles.list_item_content}>
                    <h4>Risposta sbagliata 3</h4>
                    <p>{singleQuestion.question.wrong_answer_n3}</p>
                </li>

                <li className={styles.list_item_content}>
                    <h4>Livello Difficoltà</h4>
                    <p>{singleQuestion.livelloDomanda}</p>
                </li>
                
                <li className={styles.list_item_content}>
                    <input onChange={(event)=>{
                        verifyIsChecked(event, singleQuestion)
                    }} type="checkbox"></input>
                    <label>Inserisci nel quiz</label>
                    {/* <button>RIMUOVI</button> */}
                </li>
                
            </div>
        );
    }

    return (
        <>
            {listaDomande.map(recuperaTutteLeDomande)}
        </>
    );
}

export default ElencoDomande;