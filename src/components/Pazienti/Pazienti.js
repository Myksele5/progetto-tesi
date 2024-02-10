import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../Images/add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import { useContext, useEffect, useState } from 'react';
import styles from './Pazienti.module.css';
import PatientContext from "../../context/patients-context";

function Pazienti(){
    const patients_ctx = useContext(PatientContext);
    const [stringaDaCercare, setStringaDaCercare] = useState("");

    let tabella = 
        <TabellaPazienti
            elenco = {patients_ctx.listaPazienti.map(patients_ctx.arrayToTable)}>
        </TabellaPazienti>;

    useEffect(() => {
        console.log("Lista dei pazienti");
        console.log(patients_ctx.listaPazienti);
    }, [])

    useEffect(() => {
        
    }, [stringaDaCercare])

    function cercaInfoPaziente(event){
        patients_ctx.cercaPaziente(event.target.value);
        setStringaDaCercare(event.target.value);
    }

    return(
        <>

            <h1 className={styles.page_title}>Lista Pazienti</h1>

            {patients_ctx.showBarraRicercaBottone && 
                <div className={styles.wrap_boxes}>
                <SearchBox
                    onChange={cercaInfoPaziente}
                >
                </SearchBox>

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
                    tabella
                }
                
            </div>
        </>
    );
}

export default Pazienti;