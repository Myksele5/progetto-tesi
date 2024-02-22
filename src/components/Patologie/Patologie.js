import { useContext, useEffect, useState } from "react";
import CardSmall from "../UI/CardSmall";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./Patologie.module.css";
import PatologiesContext from "../../context/patologies-context";
import Card from "../UI/Card";
import ElencoTerapie from "./ElencoTerapie";
import AddPatologia from "./AddPatologia";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function Patologie(){
    const patologies_ctx = useContext(PatologiesContext);

    const [IDperModificaNome, setIDperModificaNome] = useState();
    const [nomeDaModificare, setNomeDaModificare] = useState("");
    const [patologiaVisualizzata, setPatologiaVisualizzata] = useState([]);

    useEffect(() => {
        console.log(patologies_ctx.uniqueList)
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

    function modificaNomePatologia(ID, nome){
        setIDperModificaNome(ID);
        setNomeDaModificare(nome);
    }

    function nomePatologiaChangeHandler(event){
        setNomeDaModificare(event.target.value);
    }

    async function aggiornaNomePatologia(){
        await getServerMgr().updatePatologyName(nomeDaModificare, IDperModificaNome)
        .catch((err) => {console.error(err)})

        setIDperModificaNome();
        setNomeDaModificare("");

        patologies_ctx.createUniqueObject();
    }

    function eliminaPatologia(patologiaID, nomePatologia){
        patologies_ctx.confirmDeletePatology(patologiaID, nomePatologia)
        // await getServerMgr().deletePatology(patologiaID)
        // .catch((err) => {
        //     console.error(err);
        // });
    }

    return(
        <>
            {patologies_ctx.showModale && patologies_ctx.modale}

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
                                <AddPatologia></AddPatologia>
                                
                            </>
                        }
                    >
                    </Card>
                }

                {patologies_ctx.visibleLista &&
                <>
                    {patologies_ctx.uniqueList.map((pat) => (
                        <div className={`${styles.wrapper_generico_horizontal}`}>
                            <CardSmall
                                children={
                                    <>
                                        <div key={pat.patologiaID} className={`${styles.wrapper_generico_horizontal} ${styles.width_for_wrapper}`}>
                                            <div className={styles.wrapper_generico_vertical}>
                                                <label className={styles.label_style}>Patologia:</label>
                                                {IDperModificaNome !== pat.patologiaID &&
                                                <>
                                                    <h3 className={styles.info_content}>{pat.nomePatologia}</h3>
                                                        <GenericAlternativeButton
                                                            onClick={() => {
                                                                modificaNomePatologia(pat.patologiaID, pat.nomePatologia)
                                                            }}
                                                            buttonText={"Modifica Nome"}
                                                        ></GenericAlternativeButton>
                                                </>
                                                }
                                                {IDperModificaNome === pat.patologiaID &&
                                                <>
                                                    <input onChange={nomePatologiaChangeHandler} value={nomeDaModificare} className={styles.input_style}></input>
                                                        <div className={styles.wrapper_generico_horizontal}>
                                                        <GenericAlternativeButton
                                                            bottone_piccolo
                                                            onClick={() => {
                                                                aggiornaNomePatologia();
                                                            }}
                                                            buttonText={"Salva"}
                                                        ></GenericAlternativeButton>
                                                        <GenericAlternativeButton
                                                            bottone_piccolo
                                                            onClick={() => {
                                                                setIDperModificaNome()
                                                                setNomeDaModificare("")
                                                            }}
                                                            buttonText={"Annulla"}
                                                            colore_rosso
                                                        ></GenericAlternativeButton>
                                                    </div>
                                                </>
                                                }
                                                    
                                            </div>
                                            <div className={styles.wrapper_generico_vertical}>
                                                <label className={styles.label_style}>Opzioni:</label>
                                                {!patologiaVisualizzata.includes(pat) &&
                                                <>
                                                    <GenericAlternativeButton
                                                        onClick={() => {
                                                            // patologies_ctx.showTherapiesList();
                                                            // patologies_ctx.showPatologia(pat)
                                                            visualizzaPatologia(pat)
                                                        }}
                                                        buttonText={"Mostra terapie"}
                                                    >
                                                    </GenericAlternativeButton>
                                                    <GenericAlternativeButton
                                                        onClick={() => {
                                                            eliminaPatologia(pat.patologiaID, pat.nomePatologia)
                                                        }}
                                                        buttonText={"Elimina Patologia"}
                                                        colore_rosso
                                                    ></GenericAlternativeButton>
                                                </>
                                                }
                                                {patologiaVisualizzata.includes(pat) &&
                                                    <GenericAlternativeButton
                                                        onClick={() => {
                                                            // patologies_ctx.showTherapiesList();
                                                            // patologies_ctx.showPatologia(pat)
                                                            nonMostrarePatologia(pat)
                                                        }}
                                                        // colore_rosso
                                                        buttonText={"Nascondi terapie"}
                                                    >
                                                    </GenericAlternativeButton>
                                                }
                                                
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