import React, { useState } from "react";
import SchedaPaziente from "../components/Pazienti/SchedaPaziente";
import someStyles from '../components/Pazienti/TabellaPazienti.module.css';
import DeleteButton from "../components/UI/DeleteButton";
import EditButton from "../components/UI/EditButton";
import DetailsButton from "../components/UI/DetailsButton";
import Modal from "../components/UI/Modal";

let scheda_paziente;
let modal_eliminazione;

const PatientContext = React.createContext({
    listaPazienti: [],
    showTabella: null,
    arrayToLista: () => {},
    mostraRiga: () => {},
    showScheda: null,
    schedaPaziente: null,
    showModale: null,
    modale: null,
    formVisibile: () => {},
    formNonVisibile: () => {},
    nuovoPazienteHandler: () => {},
    showFormNuovoPaziente: null,
    showBarraRicercaBottone: () => {}
});

export function PatientContextProvider(props){

    const arrayDummyPazienti = [
        {
            nome: 'Michele',
            cognome: 'Sardone',
            città: 'Bari',
            datanascita: '05-07-1995',
            attività: 0,
            opzioni: '',
            statistiche: {
                risposte_totali: 10,
                risposte_corrette: 5,
                risposte_sbagliate: 5
            },
            id: Math.random().toString()
        },
        {
            nome: 'Vito',
            cognome: 'Sardone',
            città: 'Varsavia',
            datanascita: '31-01-1989',
            attività: 5,
            opzioni: '',
            statistiche: {
                risposte_totali: 7,
                risposte_corrette: 7,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 20,
                risposte_corrette: 5,
                risposte_sbagliate: 15
            },
            id: Math.random().toString()
        },
        {
            nome: 'Marta',
            cognome: 'Wojcik',
            città: 'Varsavia',
            datanascita: '25-12-1992',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 14,
                risposte_corrette: 5,
                risposte_sbagliate: 9
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 10,
                risposte_corrette: 0,
                risposte_sbagliate: 10
            },
            id: Math.random().toString()
        },
        {
            nome: 'Giuseppe',
            cognome: 'Sardone',
            città: 'Puerto de la Cruz',
            datanascita: '31-12-1966',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Maria Antonietta',
            cognome: 'Locuratolo',
            città: 'Bari',
            datanascita: '14-10-1983',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Carlo',
            cognome: 'Casaburi',
            città: 'Genova',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Giulia',
            cognome: 'Antonacci',
            città: 'Bari',
            datanascita: '01-01-1995',
            attività: 10,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Ermenegildo',
            cognome: 'Giangiovanni',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '02-08-1995',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            id: Math.random().toString()
        }
    ]

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showTabella, setShowTabella] = useState(true);
    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
                        // console.log(arrayDummyPazienti); //-----> Log per verificare che passa i dati del paziente corretto
                        cliccaRiga(arrayDummyPazienti);
                    }}>
                    </DetailsButton>

                    <EditButton>

                    </EditButton>
                    
                    <DeleteButton
                    onClick={() => {
                        confermaEliminazionePaziente(arrayDummyPazienti.id, arrayDummyPazienti.nome, arrayDummyPazienti.cognome);
                    }}>
                    </DeleteButton>
                </td>
            </tr>
        );
    }

    //FUNZIONE PER VISUALIZZARE FORM AGGIUNTA PAZIENTE
    function formVisibile(){
        setShowSearchBoxAndButton(false);
        setShowFormNewPaziente(true);
        setShowTabella(false);
        setShowSchedaPaziente(false);
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
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    function confermaEliminazionePaziente(paziente_ID, paziente_Nome, paziente_Cognome){
        // const indexPaziente = arrayDummyPazienti.indexOf(pazienteID);
        console.log('ELIMINA QUESTA RIGA');
        // setShowTabella(false);
        
        modal_eliminazione = 
            <Modal
            pazienteNome={paziente_Nome}
            pazienteCognome={paziente_Cognome}
            CONFERMA={() =>{
                setElencoPazienti(
                    elencoPrecedente => {
                        return elencoPrecedente.filter(elencoPrecedente => elencoPrecedente.id !== paziente_ID);
                    }
                );
                setShowModal(false);
                // setShowTabella(true);
            }}
            ANNULLA={() => {
                setShowModal(false);
                // setShowTabella(true);
            }}>
            </Modal>;
        setShowModal(true);
    }

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    function cliccaRiga(pazientee){
        // console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        console.log(typeof(elencoPazienti[2].datanascita));
        scheda_paziente = 
            <SchedaPaziente
            id = {pazientee.id}
            nome = {pazientee.nome.toUpperCase()}
            cognome = {pazientee.cognome.toUpperCase()}
            città = {pazientee.città.toUpperCase()}
            datanascita = {pazientee.datanascita}
            attività = {pazientee.attività}
            stats_paziente = {pazientee.statistiche}
            goBackButton = {chiudiSchedaPaziente}>
            </SchedaPaziente>
        setShowSchedaPaziente(true);
        setShowTabella(false);
        setShowSearchBoxAndButton(false);
        setShowFormNewPaziente(false);
    }

    //CHIUDE LA SCHEDA DEL PAZIENTE APERTA
    function chiudiSchedaPaziente(){
        console.log('CHIUDI SCHEDAAA');
        setShowSchedaPaziente(false);
        setShowTabella(true);
        setShowSearchBoxAndButton(true);
    }

    return(
        <PatientContext.Provider
        value={{
            listaPazienti: elencoPazienti,
            showTabella: showTabella,
            arrayToLista: fromArrayToTablePazienti,
            mostraRiga: cliccaRiga,
            showScheda: showSchedaPaziente,
            schedaPaziente: scheda_paziente,
            showModale: showModal,
            modale: modal_eliminazione,
            formVisibile: formVisibile,
            formNonVisibile: formNonVisibile,
            nuovoPazienteHandler: newPazienteHandler,
            showFormNuovoPaziente: showFormNewPaziente,
            showBarraRicercaBottone: showSearchBoxAndButton
        }}>
            {props.children}
        </PatientContext.Provider>
    );
}

export default PatientContext;