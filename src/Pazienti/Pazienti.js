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

    //FUNZIONE PER VISUALIZZARE/NASCONDERE FORM AGGIUNTA PAZIENTE
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

    //AGGIORNA ARRAY CON IL NUOVO PAZIENTE ---> VIENE ESEGUITA IN AddPaziente.js TRAMITE PROPS
    function newPazienteHandler(datiPaziente){
        console.log(datiPaziente);
        setElencoPazienti(
            elencoPrecedente => {
                return [datiPaziente, ...elencoPrecedente]
            }
        );
        setShowFormNewPaziente(false);
    }

    //FUNZIONE CHE RESTITUISCE LA SINGOLA RIGA DELLA TABELLA POPOLATA CON I DATI DEL PAZIENTE PRESI DALL'ARRAY
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

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    function cliccaRiga(idd, nomee, cognomee, cittàà, dataa, attivitàà){
        console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        console.log(typeof(elencoPazienti[2].datanascita));
        setShowSchedaPaziente(
            <Card
            altroStile={true}
            animazione={true}
            children={
                <SchedaPaziente
                id = {idd}
                nome = {nomee.toUpperCase()}
                cognome = {cognomee.toUpperCase()}
                città = {cittàà.toUpperCase()}
                datanascita = {dataa}
                attività = {attivitàà}
                goBackButton = {chiudiSchedaPaziente}>

                </SchedaPaziente>
            }>

            </Card>
        );
        setShowTabella(false);
    }

    //CHIUDE LA SCHEDA DEL PAZIENTE APERTA
    function chiudiSchedaPaziente(){
        console.log('CHIUDI SCHEDAAA');
        setShowSchedaPaziente();
        setShowTabella(true);
    }

    //BLOCCO IF-ELSE PER MOSTRARE/NASCONDERE IL FORM DI AGGIUNTA PAZIENTE
    if(!showFormNewPaziente){
        formNewPaziente = null;
    }
    else{
        formNewPaziente = 
            <Card
            altroStile={true}
            animazione={true}
            children={
                <AddPaziente
                onCreateNewPaziente = {newPazienteHandler}>
                </AddPaziente>
            }>
            </Card>
    }

    //BLOCCO IF-ELSE PER MOSTRARE/NASCONDERE LA TABELLA QUANDO SI STA VISUALIZZANDO LA SCHEDA DI UN SINGOLO PAZIENTE
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