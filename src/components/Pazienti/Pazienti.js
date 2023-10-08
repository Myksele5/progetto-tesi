import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../Images/add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import { useContext } from 'react';
import styles from './Pazienti.module.css';
import PatientContext from "../../context/patients-context";

function Pazienti(){
    const patients_ctx = useContext(PatientContext);

    return(
        <div className={styles.schermata_pazienti}>

            <h1 className={styles.page_title}>Lista Pazienti</h1>

            {patients_ctx.showBarraRicercaBottone && 
                <div className={styles.wrap_boxes}>
                <SearchBox></SearchBox>

                <GenericButton
                onClick={patients_ctx.formVisibile}
                buttonText={"Aggiungi Paziente"}
                generic_button={true}
                immagine={imageee}>
                </GenericButton>
                </div>
            }

            <div className={styles.wrapper_generico}>

                {patients_ctx.showModale && patients_ctx.modale}

                {patients_ctx.showScheda && patients_ctx.schedaPaziente}

                {patients_ctx.showModifica && patients_ctx.modificaPaziente}

                {patients_ctx.showFormNuovoPaziente && 
                    <Card
                    altroStile={true}
                    animazione={true}
                    children={
                        <AddPaziente
                        hideFormNewPaziente = {patients_ctx.formNonVisibile}
                        onCreateNewPaziente = {patients_ctx.nuovoPazienteHandler}>
                        </AddPaziente>
                    }>
                    </Card>
                }

                {patients_ctx.showTabella && 
                    <TabellaPazienti
                    elenco = {patients_ctx.listaPazienti.map(patients_ctx.arrayToTable)}>
                    </TabellaPazienti>
                }
            </div>
        </div>
    );
}

export default Pazienti;