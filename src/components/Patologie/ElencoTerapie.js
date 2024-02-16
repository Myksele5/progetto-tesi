import styles from "./ElencoTerapie.module.css";
import { useContext } from "react";
import GenericButton from "../UI/GenericButton";
import PatologiesContext from "../../context/patologies-context";
import Card from "../UI/Card";

function ElencoTerapie(props){
    const patologies_ctx = useContext(PatologiesContext);

    return(
        <Card
            altroStile
            children={
                <div className={styles.wrapper_vertical}>
                    <label>Nome Patologia</label>
                    <h3>{props.patology.patologia}</h3>
                    <hr style={{width: "100%", border: "2px solid #163172"}}></hr>
                    <>
                        <div className={styles.wrapper_vertical}>
                        
                        {props.patology.terapie.map((therapy) => (
                            <>
                                <div className={styles.wrapper_horizontal}>
                                    <label className={styles.wrap_content}>Terapia</label>
                                    <label className={styles.wrap_content}>Data inizio</label>
                                    <label className={styles.wrap_content}>Data fine</label>
                                    <label className={styles.wrap_content}>Note</label>
                                </div>
                                <div className={styles.wrapper_horizontal}>
                                    <h3 className={styles.info_content}>{therapy}</h3>
                                    <h3 className={styles.info_content}>{props.patology.dataInizio}</h3>
                                    <h3 className={styles.info_content}>{props.patology.dataFine}</h3>   
                                    <h3 className={styles.info_content}>Eventuali note</h3>   
                                </div>
                                <hr style={{width:"100%", border: "1px solid #163172"}}></hr>
                            </>
                        ))}
                        </div>
                    </>
                    <GenericButton
                        onClick={patologies_ctx.hideTherapiesList}
                        red_styling
                        generic_button
                        buttonText={"Torna indietro"}
                    >
                    </GenericButton>
                </div>
            }
        >
        </Card>
    );
}

export default ElencoTerapie;