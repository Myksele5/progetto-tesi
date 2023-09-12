import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import SchedaPaziente from './SchedaPaziente';
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
        },
        {
            nome: 'Marta',
            cognome: 'Wojcik',
            città: 'Varsavia',
            datanascita: '25-12-1992',
            attività: 2,
            opzioni: '',
            id: 'n_4'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: 'n_3'
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

    const [showTabella, setShowTabella] = useState(true);
    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState();

    let formNewPaziente;
    let tabella;

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
        setShowFormNewPaziente(false);
    }

    function cliccaRiga(idd, nomee, cognomee, cittàà, dataa, attivitàà){
        console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        console.log(typeof(elencoPazienti[2].datanascita));
        setShowSchedaPaziente(
            <Card
            animazione={true}
            children={
                <SchedaPaziente
                id = {idd}
                nome = {nomee}
                cognome = {cognomee}
                città = {cittàà}
                datanascita = {dataa}
                attività = {attivitàà}
                goBackButton = {chiudiSchedaPaziente}>

                </SchedaPaziente>
            }>

            </Card>
        );
        setShowTabella(false);
    }

    function chiudiSchedaPaziente(){
        console.log('CHIUDI SCHEDAAA');
        setShowSchedaPaziente();
        setShowTabella(true);
    }

    function fromArrayToTablePazienti(arrayDummyPazienti){
        return(
            <tr key={arrayDummyPazienti.id} onClick={() => {
                cliccaRiga(arrayDummyPazienti.id, arrayDummyPazienti.nome, arrayDummyPazienti.cognome, arrayDummyPazienti.città, arrayDummyPazienti.datanascita, arrayDummyPazienti.attività);
            }}>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.nome}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.cognome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{arrayDummyPazienti.città}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{arrayDummyPazienti.datanascita}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.attività}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.opzioni}</td>
            </tr>
        );
    }

    if(!showTabella){
        tabella = null;
    }
    else{
        tabella = 
            <TabellaPazienti
            elenco = {elencoPazienti.map(fromArrayToTablePazienti)}>
            </TabellaPazienti>
    }

    return(
        <div className={styles.schermata_pazienti}>

            <h1 className={styles.page_title}>Lista Pazienti</h1>

            <div className={styles.wrap_boxes}>
                <GenericButton
                onClick={formVisibile}
                buttonText={"Aggiungi Paziente"}
                immagine={imageee}>
                </GenericButton>

                <SearchBox></SearchBox>
            </div>

            <div className={styles.wrapper_generico}>
                {formNewPaziente}
            </div>

            <div className={styles.wrapper_generico}>
                {showSchedaPaziente}
            </div>

            <div className={styles.wrapper_generico}>
                {tabella}
            </div>
        </div>
    );
}

export default Pazienti;