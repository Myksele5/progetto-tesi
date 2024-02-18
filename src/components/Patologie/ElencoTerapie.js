import styles from "./ElencoTerapie.module.css";
import { useContext, useEffect } from "react";
import GenericButton from "../UI/GenericButton";
import PatologiesContext from "../../context/patologies-context";
import Card from "../UI/Card";

function ElencoTerapie(props){
    const patologies_ctx = useContext(PatologiesContext);
    const listaTerapie = patologies_ctx.listaTerapie;

    const patologia = props.patologiaSelezionata;

    return(
        <div key={patologia.patologiaID} className={styles.wrapper_vertical}>
            <hr style={{width: "100%", border: "2px solid #163172"}}></hr>
            {patologia.terapie.length > 0 && 
                <div className={styles.wrapper_vertical}>  
                {patologia.terapie.map((therapy) => (
                    <>
                        <div className={styles.wrapper_horizontal}>
                            <label className={styles.wrap_content}>Terapia consigliata</label>
                            {/* <label className={styles.wrap_content}>Data inizio</label>
                            <label className={styles.wrap_content}>Data fine</label> */}
                            <label className={styles.wrap_content}>Note</label>
                        </div>
                        <div className={styles.wrapper_horizontal}>
                            <h3 className={styles.info_content}>{therapy.terapia}</h3>
                            {/* <h3 className={styles.info_content}>{therapy.dataInizio}</h3>
                            <h3 className={styles.info_content}>{therapy.dataFine}</h3>    */}
                            <h3 className={styles.info_content}>{therapy.note}</h3>   
                        </div>
                        <hr style={{width:"100%", border: "1px solid #163172"}}></hr>
                    </>
                ))}
                </div>
            }
            {patologia.terapie.length === 0 && 
                <h4>Non ci sono terapie salvate per questa patologia</h4>
            }
            <div className={styles.wrapper_horizontal}>
                <GenericButton
                    generic_button
                    buttonText={"Aggiungi Terapia"}
                >
                </GenericButton>
            </div>
        </div>
    );
}

export default ElencoTerapie;