import { useState } from "react";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import SearchBox from "../UI/SearchBox";
import AddAttività from "./AddAttività";
import TabellaAttività from "./TabellaAttività";
import addImage from "../plus.png";
import styles from "./Attività.module.css";
import someStyles from "./TabellaAttività.module.css";

function Attività(){
    const activities = [
        {
            nomeActivity: 'nome',
            dataInizio: '20-05-2023',
            dataFine: '01-06-2023',
            giochi: 'gioco_n1',
            id: 'game_01'
        },
        {
            nomeActivity: 'altro nome',
            dataInizio: '11-02-2023',
            dataFine: '31-05-2023',
            giochi: 'gioco_n3',
            id: 'game_03'
        }
    ]

    const [showFormNewAttività, setShowFormNewAttività] = useState(false);
    const [elencoAttività, setElencoAttività] = useState(activities);

    let formNewAttività;

    function formVisibile(){
        if(formNewAttività == null){
            setShowFormNewAttività(true);
            return;
        }
        else{
            setShowFormNewAttività(false);
            return;
        }
    }

    if(!showFormNewAttività){
        formNewAttività = null;
    }

    else{
        formNewAttività = 
            <Card
            animazione={true}
            children={
                <AddAttività
                onCreateNewAttività = {newAttivitàHandler}>
                </AddAttività>
            }>
            </Card>
    }

    function newAttivitàHandler(datiAttività){
        console.log(datiAttività);
        setElencoAttività(
            activities => {
                return [datiAttività, ...activities]
            }
        );
    }

    function fromArrayToTableAttività(activities){
        return(
            <tr key={activities.id}>
                <td className={someStyles.dati_tabella}>{activities.nomeActivity}</td>
                <td className={someStyles.dati_tabella}>{activities.dataInizio}</td>
                <td className={someStyles.dati_tabella}>{activities.dataFine}</td>
                <td className={someStyles.dati_tabella}>{activities.giochi}</td>
                <td className={someStyles.dati_tabella}>{activities.opzioni}</td>
            </tr>
        );
    }


    return(
        <div className={styles.schermata_attività}>

            <h1 className={styles.page_title}>Lista Attività</h1>

            <div className={styles.wrap_boxes}>

                <GenericButton
                onClick={formVisibile}
                children = {'Aggiungi Attività'}
                immagine = {addImage}>
                </GenericButton>

                <SearchBox></SearchBox>
            </div>

            <div className={styles.wrap_add_attività}>
                {formNewAttività}
            </div>

            <TabellaAttività
            elenco = {elencoAttività.map(fromArrayToTableAttività)}>
            </TabellaAttività>
        </div>
    );
}

export default Attività;