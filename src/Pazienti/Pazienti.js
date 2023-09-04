import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import { useState } from 'react';
import styles from './Pazienti.module.css';
import someStyles from './TabellaPazienti.module.css';

function Pazienti(){
    const arrayDummyPazienti = [
        {
            nome: 'Michele',
            cognome: 'Sardone',
            città: 'Bari',
            datanascita: '05-07-1995',
            attività: 0,
            opzioni: '',
            id: 'n_1'
        },
        {
            nome: 'Vito',
            cognome: 'Sardone',
            città: 'Bari',
            datanascita: '31-01-1989',
            attività: 5,
            opzioni: '',
            id: 'n_2'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        }
    ]

    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);

    let formNewPaziente;

    function formVisibile(){
        if(formNewPaziente == null){
            setShowFormNewPaziente(true);
            return;
        }
        else{
            setShowFormNewPaziente(false);
            return;
        }
    }

    if(!showFormNewPaziente){
        formNewPaziente = null;
    }
    else{
        formNewPaziente = 
            <Card
            animazione={true}
            children={
                <AddPaziente
                onCreateNewPaziente = {newPazienteHandler}>
                </AddPaziente>
            }>
            </Card>
    }

    function newPazienteHandler(datiPaziente){
        console.log(datiPaziente);
        setElencoPazienti(
            elencoPrecedente => {
                return [datiPaziente, ...elencoPrecedente]
            }
        );
    }

    function fromArrayToTablePazienti(arrayDummyPazienti){
        return(
            <tr key={arrayDummyPazienti.id}>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.nome}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.cognome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{arrayDummyPazienti.città}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{arrayDummyPazienti.datanascita}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.attività}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.opzioni}</td>
            </tr>
        );
    }

    return(
        <div className={styles.schermata_pazienti}>

            <h1 className={styles.page_title}>Lista Pazienti</h1>

            <div className={styles.wrap_boxes}>
                
                <GenericButton
                onClick={formVisibile}
                children={"Aggiungi Paziente"}
                immagine={imageee}>
                </GenericButton>

                <SearchBox></SearchBox>
            </div>

            <div className={styles.wrap_add_paziente}>
                {formNewPaziente}
            </div>

            <TabellaPazienti
            elenco = {elencoPazienti.map(fromArrayToTablePazienti)}>
            </TabellaPazienti>
            
        </div>
    );
}

export default Pazienti;