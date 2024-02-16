import { useContext, useState } from "react";
import CardSmall from "../UI/CardSmall";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./Patologie.module.css";
import PatologiesContext from "../../context/patologies-context";
import Card from "../UI/Card";
import ElencoTerapie from "./ElencoTerapie";

function Patologie(){
    const patologies_ctx = useContext(PatologiesContext);

    const listaPatologie = patologies_ctx.listaPatologie;

    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState();

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

            

            <div className={styles.wrapper_generico_vertical}>
                {patologies_ctx.visibleFormAddPatology &&
                    <Card
                        animazione
                        children={
                            <>
                                <GenericButton
                                    onClick={patologies_ctx.hideFormAddPatology}
                                    buttonText={"Chiudi form"}
                                    generic_button
                                    red_styling
                                >
                                </GenericButton>
                            </>
                        }
                    >
                    </Card>
                }

                {patologies_ctx.visibleTherapiesList &&
                    <ElencoTerapie
                        patology={patologiaVisualizzata}
                    >
                    </ElencoTerapie>
                }

                {patologies_ctx.visibleLista &&
                <>
                    {listaPatologie.map((pat) => (
                        <div className={styles.wrapper_generico_horizontal}>
                            <CardSmall
                                children={
                                    <>
                                        <div className={styles.wrapper_generico_horizontal}>
                                            <div className={styles.wrap_content}>
                                                <label className={styles.label_style}>Patologia</label>
                                            </div>
                                            <div className={styles.wrap_content_TERAPIA}>
                                                <label className={styles.label_style}>Terapie</label>
                                            </div>
                                        </div>
                                        <hr style={{borderColor: "#163172", margin: "0"}}></hr>
                                        <div className={styles.wrapper_generico_horizontal}>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.patologia}</h3>
                                            </div>
                                            <div className={styles.wrap_content_TERAPIA}>
                                                {/* <select className={styles.select_style}>
                                                {pat.terapie.map((terapia) => (
                                                    <option>{terapia}</option>
                                                ))}
                                                </select> */}
                                                <div className={styles.wrapper_generico_horizontal}>
                                                    <GenericAlternativeButton
                                                        onClick={() => {
                                                            patologies_ctx.showTherapiesList();
                                                            setPatologiaVisualizzata(pat)
                                                        }}
                                                        buttonText={"Mostra elenco terapie"}
                                                    >
                                                    </GenericAlternativeButton>
                                                </div>
                                                
                                            </div>
                                            {/* <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.dataInizio}</h3>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>{pat.dataFine}</h3>
                                            </div>
                                            <div className={styles.wrap_content}>
                                                <h3 className={styles.info_content}>Nota generica</h3>
                                            </div> */}
                                        </div>
                                        {/* <hr style={{borderColor: "#163172", margin: "0"}}></hr>
                                        <div className={styles.wrapper_generico_horizontal}>
                                            <GenericButton
                                                buttonText={"Aggiungi Terapia"}
                                                generic_button
                                            >
                                            </GenericButton>
                                        </div>
                                     */}
                                    </>
                                }
                            >
                            </CardSmall>
                            
                        </div>
                    ))}
                </>
                }
            </div>
        </>
    );
}

export default Patologie;