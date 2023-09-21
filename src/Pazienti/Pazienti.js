import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../Images/add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import SchedaPaziente from './SchedaPaziente';
import { useState } from 'react';
import styles from './Pazienti.module.css';
import someStyles from './TabellaPazienti.module.css';
import DeleteButton from "../UI/DeleteButton";
import EditButton from "../UI/EditButton";
import DetailsButton from "../UI/DetailsButton";

function Pazienti(props){
    const arrayDummyPazienti = [
        {
            nome: 'Michele',
            cognome: 'Sardone',
            città: 'Bari',
            datanascita: '05-07-1995',
            attività: 0,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Vito',
            cognome: 'Sardone',
            città: 'Varsavia',
            datanascita: '31-01-1989',
            attività: 5,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Marta',
            cognome: 'Wojcik',
            città: 'Varsavia',
            datanascita: '25-12-1992',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Giuseppe',
            cognome: 'Sardone',
            città: 'Puerto de la Cruz',
            datanascita: '31-12-1966',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Maria Antonietta',
            cognome: 'Locuratolo',
            città: 'Bari',
            datanascita: '14-10-1983',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Carlo',
            cognome: 'Casaburi',
            città: 'Genova',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Giulia',
            cognome: 'Antonacci',
            città: 'Bari',
            datanascita: '01-01-1995',
            attività: 10,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Ermenegildo',
            cognome: 'Giangiovanni',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 4,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Marco',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casadibari',
            città: 'Bari',
            datanascita: '02-08-1985',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            id: Math.random().toString()
        }
    ]

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showTabella, setShowTabella] = useState(true);
    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState();

    let show_boxes;
    let formNewPaziente;
    let tabella;

    //FUNZIONE PER VISUALIZZARE FORM AGGIUNTA PAZIENTE
    function formVisibile(){
        setShowSearchBoxAndButton(false);
        setShowFormNewPaziente(true);
        setShowTabella(false);
        setShowSchedaPaziente();
    }

    //FUNZIONE PER NASCONDERE FORM AGGIUNTA PAZIENTE
    function formNonVisibile(){
        setShowFormNewPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
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
        setShowTabella(true);
    }

    function eliminaPaziente(pazienteID){
        // const indexPaziente = arrayDummyPazienti.indexOf(pazienteID);
        console.log('ELIMINA QUESTA RIGA');
        setElencoPazienti(
            elencoPrecedente => {
                return elencoPrecedente.filter(elencoPrecedente => elencoPrecedente.id !== pazienteID);
            }
        );
    }

    //FUNZIONE CHE RESTITUISCE LA SINGOLA RIGA DELLA TABELLA POPOLATA CON I DATI DEL PAZIENTE PRESI DALL'ARRAY
    function fromArrayToTablePazienti(arrayDummyPazienti){
        return(
            <tr key={arrayDummyPazienti.id}>
                <td className={`${someStyles['dati_tabella']} ${someStyles['nome']}`}>{arrayDummyPazienti.nome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['cognome']}`}>{arrayDummyPazienti.cognome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{arrayDummyPazienti.città}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{arrayDummyPazienti.datanascita}</td>
                <td className={someStyles.dati_tabella}>{arrayDummyPazienti.attività}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['opzioni']}`}>
                    <DetailsButton
                    onClick={() => {
                        cliccaRiga(arrayDummyPazienti.id, arrayDummyPazienti.nome, arrayDummyPazienti.cognome, arrayDummyPazienti.città, arrayDummyPazienti.datanascita, arrayDummyPazienti.attività);
                    }}>
                    </DetailsButton>

                    <EditButton>

                    </EditButton>
                    
                    <DeleteButton
                    onClick={() => {
                        eliminaPaziente(arrayDummyPazienti.id);
                    }}>
                    </DeleteButton>
                </td>
            </tr>
        );
    }

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    function cliccaRiga(idd, nomee, cognomee, cittàà, dataa, attivitàà){
        console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        console.log(typeof(elencoPazienti[2].datanascita));
        setShowSchedaPaziente(
            <SchedaPaziente
            id = {idd}
            nome = {nomee.toUpperCase()}
            cognome = {cognomee.toUpperCase()}
            città = {cittàà.toUpperCase()}
            datanascita = {dataa}
            attività = {attivitàà}
            goBackButton = {chiudiSchedaPaziente}>
            </SchedaPaziente>
        );
        setShowTabella(false);
        setShowFormNewPaziente(false);
    }

    //CHIUDE LA SCHEDA DEL PAZIENTE APERTA
    function chiudiSchedaPaziente(){
        console.log('CHIUDI SCHEDAAA');
        setShowSchedaPaziente();
        setShowTabella(true);
    }

    if(!showSearchBoxAndButton){
        show_boxes = null;
    }
    else{
        show_boxes =
            <div className={styles.wrap_boxes}>
                <SearchBox></SearchBox>

                <GenericButton
                onClick={formVisibile}
                buttonText={"Aggiungi Paziente"}
                generic_button={true}
                immagine={imageee}>
                </GenericButton>
            </div>
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
                hideFormNewPaziente = {formNonVisibile}
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

            {show_boxes}

            <div className={styles.wrapper_generico}>
                {formNewPaziente}

                {showSchedaPaziente}

                {tabella}
            </div>
        </div>
    );
}

export default Pazienti;