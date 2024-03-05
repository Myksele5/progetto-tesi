import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddPatologia.module.css";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import { Tab, Tabs } from "react-bootstrap";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function AddPatologia(){
    const patologies_ctx = useContext(PatologiesContext);

    const [nomePatologia, setNomePatologia] = useState("");
    const [counterTerapie, setCounterTerapie] = useState(1);
    const [tabSelezionata, setTabSelezionata] = useState(1);
    const [terapieAssociate, setTerapieAssociate] = useState([{newTerapID: counterTerapie, terapia: "", note: ""}]);

    useEffect(() => {
        console.log(terapieAssociate)
    }, [terapieAssociate])

    function aggiungiNuovaTerapia(){
        let prossimoIDterapia = counterTerapie + 1;
        setTerapieAssociate((prevList) => ([...prevList, {newTerapID: prossimoIDterapia, terapia: "", note: ""}]));
        setCounterTerapie(prossimoIDterapia);
        setTabSelezionata(prossimoIDterapia)
    }

    function eliminaTerapia(id){
        if(terapieAssociate.length > 1){
            let arrayTemporaneo = [];
            terapieAssociate.map((terapia) => {
                if(terapia.newTerapID !== id){
                    console.log(terapia)
                    arrayTemporaneo.push(terapia)
                }
            })
            setTerapieAssociate(arrayTemporaneo);
            setTabSelezionata(arrayTemporaneo[0].newTerapID);
        }
        else{
            alert("Devi inserire almeno una terapia!")
        }
        
    }

    function patologiaChangeHandler(event){
        setNomePatologia(event.target.value);
    }

    function terapiaChangeHandler(event, id){
        terapieAssociate.map((terapia) => {
            if(terapia.newTerapID === id){
                terapia.terapia = event.target.value
            }
        })
    }
    function noteDellaTerapiaChangeHandler(event, id){
        terapieAssociate.map((terapia) => {
            if(terapia.newTerapID === id){
                terapia.note = event.target.value
            }
        })
    }

    async function salvaPatologiaConTerapie(){
        let terapieFiltrate = [];

        terapieAssociate.map((singleTerap) => {
            if(singleTerap.terapia.length > 0){
                terapieFiltrate.push(singleTerap)
            }
        })
        
        await getServerMgr().saveNewPatologyWithTherapies(nomePatologia, terapieFiltrate)
        .catch((err) => {
            console.error(err);
        });
        patologies_ctx.saveNewPatologyWithTherapies();
    }

    return(
        <div className={styles.wrapper_vertical}>
            <h2 className={styles.title_form}>Inserisci nuova Patologia</h2>
            
            <div className={styles.wrapper_form}>
                <label className={styles.label_style_PATOLOGIA}>Nome Patologia:</label>
                <input className={styles.input_style} onChange={patologiaChangeHandler} value={nomePatologia}></input>

                <div style={{width: "100%"}}>
                    <Tabs id="controlled-tab-example" activeKey={tabSelezionata} onSelect={(key) => {setTabSelezionata(key)}}>
                        {terapieAssociate.map((singleTerap) => (
                            <Tab eventKey={singleTerap.newTerapID} title={"TERAPIA " + singleTerap.newTerapID}>

                                <div className={styles.wrapper_terapia_form}>
                                    <label className={styles.label_style_TERAPIA}>Inserisci terapia:</label>
                                    <textarea className={styles.textarea_style_TERAPIA} onChange={(event) => {
                                        terapiaChangeHandler(event, singleTerap.newTerapID)
                                    }}
                                    >
                                    </textarea>

                                    <label className={styles.label_style_TERAPIA}>Note:</label>
                                    <textarea className={styles.textarea_style_TERAPIA} onChange={(event) => {
                                        noteDellaTerapiaChangeHandler(event, singleTerap.newTerapID)
                                    }}
                                    >
                                    </textarea>

                                    {/* <div style={{marginLeft: "10px"}}> */}
                                        <DeleteButton
                                            onClick={() => {
                                                eliminaTerapia(singleTerap.newTerapID)
                                            }}
                                            // stile_alternativo
                                        ></DeleteButton>
                                    {/* </div> */}
                                </div>
                            </Tab>
                            
                        ))}
                        <Tab title={<button className={styles.bottone_add_terapia} onClick={aggiungiNuovaTerapia}>Aggiungi</button>}></Tab>
                    </Tabs>
                </div>
            </div>
            {/* <GenericButton
                onClick={aggiungiNuovaTerapia}
                buttonText={"Aggiungi una terapia"}
                generic_button
            ></GenericButton> */}

            <hr style={{width: "80%"}}></hr>

            <div className={styles.wrapper_horizontal}>
                <GenericButton
                    onClick={salvaPatologiaConTerapie}
                    buttonText={"Salva"}
                    generic_button
                ></GenericButton>
                <GenericButton
                    onClick={patologies_ctx.hideFormAddPatology}
                    buttonText={"Chiudi form"}
                    generic_button
                    red_styling
                >
                </GenericButton>
            </div>
            
        </div>
    );
}

export default AddPatologia;