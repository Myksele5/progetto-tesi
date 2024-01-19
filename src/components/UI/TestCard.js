import GenericAlternativeButton from "./GenericAlternativeButton";
import styles from "./TestCard.module.css";

function TestCard(props){
    return(
        <div className={styles.test_card}>
            <div className={styles.test_card_content}>
                <h1>{props.cardText}</h1>
                <GenericAlternativeButton
                    buttonText={"Avvia Test"}
                >
                </GenericAlternativeButton>
                <GenericAlternativeButton
                    buttonText={"Modifica Test"}
                >
                </GenericAlternativeButton>
                {props.testEliminabile &&
                    <GenericAlternativeButton
                        colore_rosso={true}
                        buttonText={"Elimina Test"}
                    >
                    </GenericAlternativeButton>
                }
                {/* <button>Avvia Test</button>
                <button>Modifica Test</button> */}
            </div>
        </div>
    );
}

export default TestCard;