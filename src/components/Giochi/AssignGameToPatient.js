import { useContext, useEffect, useState } from "react";
import styles from "./AssignGameToPatient.module.css";
import PatientContext from "../../context/patients-context";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import GameContext from "../../context/game-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import { ListGroup } from "react-bootstrap";

function AssignGameToPatient(props){
    const patients_ctx = useContext(PatientContext);
    const game_ctx = useContext(GameContext);

    const [pazientiConGiocoAssegnato, setPazientiConGiocoAssegnato] = useState([]);

    // useEffect(() => {
    //     game_ctx.listaPazientiPerGioco.length > 0
    //     ?
    //     setPazientiConGiocoAssegnato(game_ctx.listaPazientiPerGioco)
    //     :
    //     setPazientiConGiocoAssegnato([]);
    // }, [game_ctx.listaPazientiPerGioco])

    function verifyGameOnPatients(paziente){
        let checkboxInputChecked;

        if(game_ctx.listaPazientiPerGioco.length <= 0){
            checkboxInputChecked = <input onChange={(event) => {
                assegnaGioco(event, paziente.ID)
            }} type="checkbox" className={styles.input_checkbox}></input>
        }
        else{
            for(var i=0; i < game_ctx.listaPazientiPerGioco.length; i++){
                if(paziente.ID === game_ctx.listaPazientiPerGioco[i].patient_ID){
                    checkboxInputChecked = <label>Assegnato!</label>
                    break;
                }
                else{
                    checkboxInputChecked = <input onChange={(event) => {
                        assegnaGioco(event, paziente.ID)
                    }} type="checkbox" className={styles.input_checkbox}></input>
                }
            }
        }
        
        return (
            <ListGroup.Item action className={styles.list_item}>
                <div className={styles.wrapper_content}>
                    <div className={styles.wrapper_flexible}>
                        <p className={styles.card_content_FULLNAME}>{paziente.nome} {paziente.cognome}</p>
                        <p className={styles.card_content_DATA}>{paziente.dataNascita}</p>
                    </div>
                    <div className={styles.checkbox_assigned}>{checkboxInputChecked}</div>
                </div>
            </ListGroup.Item>
            // <div className={styles.wrapper_horizontal}>
            //     <Card
            //         children={
            //             <div key={paziente.ID} className={styles.wrapper_content}>
                            // <p className={styles.card_content_FULLNAME}>{paziente.nome} {paziente.cognome}</p>
                            // <p className={styles.card_content_DATA}>{paziente.dataNascita}</p>
            //             </div>
            //         }
            //         altroStile
            //     ></Card>
                // <div className={styles.checkbox_assigned}>{checkboxInputChecked}</div>

            // </div>
        );
    }

    function assegnaGioco(event, pazID){
        if(event.target.checked){
            pazientiConGiocoAssegnato.unshift({patient_ID: pazID})
        }
        else{
            for(var i=0; i < pazientiConGiocoAssegnato.length; i++){
                if(pazID === pazientiConGiocoAssegnato[i].patient_ID){
                    pazientiConGiocoAssegnato.splice(i, 1)
                    break;
                }
            }
        }

        console.log(pazientiConGiocoAssegnato)
    }

    async function salvaAssegnazioneGiochi(){
        await getServerMgr().saveGameToPatients(props.gameID, pazientiConGiocoAssegnato)

        props.chiudiSchedaAssegnazione();
    }

    return(
        <>
            
            <h2 className={styles.title}>Assegna gioco a...</h2>
            
            <div className={styles.scrollable_list}>
                <ListGroup className={styles.list_group}>
                    {patients_ctx.listaPazienti.map(verifyGameOnPatients)}
                </ListGroup>
            </div>

            <div className={styles.wrap_buttons}>
                <GenericButton
                    onClick={props.chiudiSchedaAssegnazione}
                    buttonText={"Indietro"}
                    red_styling
                    generic_button
                ></GenericButton>
                <GenericButton
                    onClick={salvaAssegnazioneGiochi}
                    buttonText={"Assegna a selezionati"}
                    // red_styling
                    generic_button
                ></GenericButton>
            </div>
        </>
    );
}

export default AssignGameToPatient;