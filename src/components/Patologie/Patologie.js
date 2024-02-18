import { useContext, useEffect, useState } from "react";
import CardSmall from "../UI/CardSmall";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./Patologie.module.css";
import PatologiesContext from "../../context/patologies-context";
import Card from "../UI/Card";
import ElencoTerapie from "./ElencoTerapie";

function Patologie(){
    const patologies_ctx = useContext(PatologiesContext);

    const [listaPatologie, setListaPatologie] = useState([]);

    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState([]);

    useEffect(() => {
        setListaPatologie(patologies_ctx.createUniqueObject());
        console.log(listaPatologie)
    }, [])

    function visualizzaPatologia(patologia){
        console.log(patologia)
        setPatologiaVisualizzata((prevList) => ([...prevList, patologia]))
    }

    function nonMostrarePatologia(patologia){
        let arrayTemporaneo = [...patologiaVisualizzata];
        arrayTemporaneo.splice(patologiaVisualizzata.indexOf(patologia), 1)
        setPatologiaVisualizzata(arrayTemporaneo)
    }


    return(
        <>
            <h1 className={styles.page_title}>Patologie</h1>
            {patologies_ctx.topBar && 
                <div className={styles.wrap_boxes}>
                    <GenericButton
                        onClick={() => {
                            setPatologiaVisualizzata([]);
                            patologies_ctx.showFormAddPatology();
                        }}
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

                {patologies_ctx.visibleLista &&
                <>
                    {listaPatologie.map((pat) => (
                        <div className={styles.wrapper_generico_horizontal}>
                            <CardSmall
                                children={
                                    <div key={pat.id}>
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
                                                <h3 style={{textDecoration: "underline", fontSize: "26px"}} className={styles.info_content}>{pat.nomePatologia}</h3>
                                            </div>
                                            <div className={styles.wrap_content_TERAPIA}>
                                                {/* <select className={styles.select_style}>
                                                {pat.terapie.map((terapia) => (
                                                    <option>{terapia}</option>
                                                ))}
                                                </select> */}
                                                <div className={styles.wrapper_generico_horizontal}>
                                                    {!patologiaVisualizzata.includes(pat) &&
                                                        <GenericAlternativeButton
                                                            onClick={() => {
                                                                // patologies_ctx.showTherapiesList();
                                                                // patologies_ctx.showPatologia(pat)
                                                                visualizzaPatologia(pat)
                                                            }}
                                                            buttonText={"Mostra terapie"}
                                                        >
                                                        </GenericAlternativeButton>
                                                    }
                                                    {patologiaVisualizzata.includes(pat) &&
                                                        <GenericAlternativeButton
                                                            onClick={() => {
                                                                // patologies_ctx.showTherapiesList();
                                                                // patologies_ctx.showPatologia(pat)
                                                                nonMostrarePatologia(pat)
                                                            }}
                                                            colore_rosso
                                                            buttonText={"Nascondi terapie"}
                                                        >
                                                        </GenericAlternativeButton>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {patologiaVisualizzata.map((singlePat) => {
                                            if(singlePat.patologiaID === pat.patologiaID){
                                                return (
                                                    <ElencoTerapie
                                                        patologiaSelezionata={singlePat}
                                                    ></ElencoTerapie>
                                                );
                                            }
                                        })}
                                    </div>
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