import { useContext } from "react";
import CardSmall from "../UI/CardSmall";
import GenericButton from "../UI/GenericButton";
import styles from "./Patologie.module.css";
import PatologiesContext from "../../context/patologies-context";

function Patologie(){
    const patologies_ctx = useContext(PatologiesContext);

    const listaPatologie = patologies_ctx.listaPatologie;

    return(
        <>
            <h1 className={styles.page_title}>Patologie</h1>
            {patologies_ctx.topBar && 
                <div className={styles.wrap_boxes}>
                    <GenericButton
                        onClick={patologies_ctx.showFormAddPatology}
                        buttonText={"Aggiungi Patologia"}
                        generic_button={true}
                        text_hideable={true}
                        // immagine={imageee}
                    >
                    </GenericButton>
                </div>
            }

            {patologies_ctx.visibleLista &&
                <div className={styles.wrapper_generico_vertical}>
                    {listaPatologie.map((pat) => (
                        <div className={styles.wrapper_generico_horizontal}>
                            <CardSmall
                                children={
                                    <>
                                        <div className={styles.wrapper_generico_horizontal}>
                                            <div className={styles.wrap_content}>
                                                <label className={styles.label_style}>Nome Patologia</label>
                                            </div>
                                            <div className={styles.wrap_content_TERAPIA}>
                                                <label className={styles.label_style}>Terapia</label>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <label className={styles.label_style}>Data inizio</label>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <label className={styles.label_style}>Data fine</label>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <label className={styles.label_style}>Note</label>
                                            </div>
                                        </div>
                                        <hr style={{borderColor: "#163172", margin: "0"}}></hr>
                                        <div className={styles.wrapper_generico_horizontal}>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.patologia}</h3>
                                            </div>
                                            <div className={styles.wrap_content_TERAPIA}>
                                                <h3 className={styles.info_content_TERAPIA}>{pat.terapia}</h3>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.dataInizio}</h3>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.dataFine}</h3>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>Nota generica</h3>
                                            </div>
                                        </div>
                                    
                                    </>
                                }
                            >
                            </CardSmall>
                            
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default Patologie;