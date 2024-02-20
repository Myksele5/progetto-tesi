import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddPatologia.module.css";
import PatologiesContext from "../../context/patologies-context";
import DeleteButton from "../UI/DeleteButton";

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

    function salvaPatologiaConTerapie(){
        patologies_ctx.saveNewPatologyWithTherapies(nomePatologia, terapieAssociate);
    }

    return(
        <div className={styles.wrapper_vertical}>
            <h2>Nuova Patologia</h2>
            
            <label>Nome Patologia:</label>
            <input onChange={patologiaChangeHandler} value={nomePatologia}></input>

            {terapieAssociate.map((singleTerap) => (
                <div key={singleTerap.newTerapID} className={styles.wrapper_horizontal}>
                    <fieldset className={styles.wrapper_vertical}>
                        <legend>{"TERAPIA N." + singleTerap.newTerapID}</legend>
                        <label>Inserisci una terapia:</label>
                        <textarea onChange={(event) => {
                            terapiaChangeHandler(event, singleTerap.newTerapID)
                        }}
                        >
                        </textarea>

                        <label>Note:</label>
                        <textarea onChange={(event) => {
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