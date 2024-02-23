import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddPatologia.module.css";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function AddPatologia(){
    const patologies_ctx = useContext(PatologiesContext);

    const [nomePatologia, setNomePatologia] = useState("");
    const [counterTerapie, setCounterTerapie] = useState(1);
    const [terapieAssociate, setTerapieAssociate] = useState([{newTerapID: counterTerapie, terapia: "", note: ""}]);

    useEffect(() => {
        console.log(terapieAssociate)
    }, [terapieAssociate])

    function aggiungiNuovaTerapia(){
        let prossimoIDterapia = counterTerapie + 1;
        setTerapieAssociate((prevList) => ([...prevList, {newTerapID: prossimoIDterapia, terapia: "", note: ""}]));
        setCounterTerapie(prossimoIDterapia);
    }

    function eliminaTerapia(id){
        let arrayTemporaneo = [];
        terapieAssociate.map((terapia) => {
            if(terapia.newTerapID !== id){
                arrayTemporaneo.push(terapia)
            }
        })
        setTerapieAssociate(arrayTemporaneo);
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
            <h2 className={styles.title_form}>Nuova Patologia</h2>
            
            <label>Nome Patologia:</label>
            <input className={styles.input_style} onChange={patologiaChangeHandler} value={nomePatologia}></input>

            {terapieAssociate.map((singleTerap) => (
                <div key={singleTerap.newTerapID} className={styles.wrapper_horizontal}>
                    <fieldset className={`${styles.wrapper_vertical} ${styles.fieldset_style}`}>
                        <legend className={styles.legend_style}>{"TERAPIA " + singleTerap.newTerapID}</legend>
                        <label>Inserisci terapia:</label>
                        <textarea className={styles.textarea_style_TERAPIA} onChange={(event) => {
                            terapiaChangeHandler(event, singleTerap.newTerapID)
                        }}
                        >
                        </textarea>

                        <label>Note:</label>
                        <textarea className={styles.textarea_style_NOTE} onChange={(event) => {
                            noteDellaTerapiaChangeHandler(event, singleTerap.newTerapID)
                        }}
                        >
                        </textarea>

                    </fieldset>
                    <div style={{marginLeft: "10px"}}>
                        <DeleteButton
                            onClick={() => {
                                eliminaTerapia(singleTerap.newTerapID)
                            }}
                            stile_alternativo
                        ></DeleteButton>
                    </div>
                </div>
            ))}
            
            <GenericButton
                onClick={aggiungiNuovaTerapia}
                buttonText={"Aggiungi una terapia"}
                generic_button
            ></GenericButton>


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