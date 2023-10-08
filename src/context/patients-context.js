import React, { useState } from "react";
import SchedaPaziente from "../components/Pazienti/SchedaPaziente";
import someStyles from '../components/Pazienti/TabellaPazienti.module.css';
import DeleteButton from "../components/UI/DeleteButton";
import EditButton from "../components/UI/EditButton";
import DetailsButton from "../components/UI/DetailsButton";
import Modal from "../components/UI/Modal";
import EditPaziente from "../components/Pazienti/EditPaziente";
import Card from "../components/UI/Card";

let scheda_paziente;
let modifica_paziente;
let modal_eliminazione;

const PatientContext = React.createContext({
    listaPazienti: [],
    showTabella: null,
    arrayToTable: () => {},
    arrayToLista: () => {},
    mostraRiga: () => {},
    showScheda: null,
    schedaPaziente: null,
    showModifica: null,
    modificaPaziente: null,
    modificaLista: () => {},
    chiudiFormModifica: () => {},
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
            nome: 'ProvaNomeSuperMegaLunghissimo',
            cognome: 'EconUnCognomepurealtrettanto',
            città: 'San Valentino in Abruzzo Citeriore e a e e e e eae e aea ee adwad dwadwaddwd',
            datanascita: '1995-07-05',
            attività: 12,
            opzioni: '',
            statistiche: {
                risposte_totali: 10,
                risposte_corrette: 5,
                risposte_sbagliate: 5
            },
            codicefiscale: "ABCYRO41H24L077E",
            id: "012345apollo"
        },
        {
            nome: 'Michele',
            cognome: 'Sardone',
            città: 'Bari',
            datanascita: '1995-07-05',
            attività: 0,
            opzioni: '',
            statistiche: {
                risposte_totali: 10,
                risposte_corrette: 5,
                risposte_sbagliate: 5
            },
            codicefiscale: "RTVYRO41H24L088E",
            id: Math.random().toString()
        },
        {
            nome: 'Vito',
            cognome: 'Sardone',
            città: 'Varsavia',
            datanascita: '1989-01-31',
            attività: 5,
            opzioni: '',
            statistiche: {
                risposte_totali: 7,
                risposte_corrette: 7,
                risposte_sbagliate: 0
            },
            codicefiscale: "VZXGGH85E71F498O",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 20,
                risposte_corrette: 5,
                risposte_sbagliate: 15
            },
            codicefiscale: "RJSNTY84H10D637E",
            id: Math.random().toString()
        },
        {
            nome: 'Marta',
            cognome: 'Wojcik',
            città: 'Varsavia',
            datanascita: '1992-12-25',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 14,
                risposte_corrette: 5,
                risposte_sbagliate: 9
            },
            codicefiscale: "CSCCWH34M59A732J",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 10,
                risposte_corrette: 0,
                risposte_sbagliate: 10
            },
            codicefiscale: "FHTFMP86E11G669Z",
            id: Math.random().toString()
        },
        {
            nome: 'Giuseppe',
            cognome: 'Sardone',
            città: 'Puerto de la Cruz',
            datanascita: '1966-12-10',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "PLLNRB95E02C398N",
            id: Math.random().toString()
        },
        {
            nome: 'Maria Antonietta',
            cognome: 'Locuratolo',
            città: 'Bari',
            datanascita: '1984-05-21',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "CPBHRX62R58F417J",
            id: Math.random().toString()
        },
        {
            nome: 'Carlo',
            cognome: 'Casaburi',
            città: 'Genova',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "XSHCXY39P68G329J",
            id: Math.random().toString()
        },
        {
            nome: 'Giulia',
            cognome: 'Antonacci',
            città: 'Bari',
            datanascita: '1995-01-01',
            attività: 10,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "NYFQDQ74H19A108T",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "TZRMFN33C57H739O",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "SRPWRS31T42A444D",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "LVFKMJ65L12B956R",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "GXLRBK42P46L063X",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "RHDMHV37D54B265C",
            id: Math.random().toString()
        },
        {
            nome: 'Ermenegildo',
            cognome: 'Giangiovanni',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "KFPPGD64D29E441F",
            id: Math.random().toString()
        },
        {
            nome: 'Domenico',
            cognome: 'Casaburi',
            città: 'Bari',
            datanascita: '1995-08-02',
            attività: 2,
            opzioni: '',
            statistiche: {
                risposte_totali: 0,
                risposte_corrette: 0,
                risposte_sbagliate: 0
            },
            codicefiscale: "CRHNHV72E26H300U",
            id: Math.random().toString()
        }
    ]

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showTabella, setShowTabella] = useState(true);
    const [elencoPazienti, setElencoPazienti] = useState(arrayDummyPazienti);

    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState(false);
    const [showModificaPaziente, setShowModificaPaziente] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //FUNZIONE CHE RESTITUISCE LA SINGOLA RIGA DELLA TABELLA POPOLATA CON I DATI DEL PAZIENTE PRESI DALL'ARRAY
    function fromArrayToTablePazienti(elencoPazienti){
        return(
            <tr key={elencoPazienti.id}>
                <td className={`${someStyles['dati_tabella']} ${someStyles['nome']}`}>{elencoPazienti.nome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['cognome']}`}>{elencoPazienti.cognome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{elencoPazienti.città}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{elencoPazienti.datanascita}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['codicefiscale']}`}>{elencoPazienti.codicefiscale}</td>
                {/* <td className={someStyles.dati_tabella}>{arrayDummyPazienti.attività}</td> */}
                <td className={`${someStyles['dati_tabella']} ${someStyles['opzioni']}`}>
                    <DetailsButton
                    onClick={() => {
                        // console.log(arrayDummyPazienti); //-----> Log per verificare che passa i dati del paziente corretto
                        cliccaRiga(elencoPazienti);
                    }}>
                    </DetailsButton>

                    <EditButton
                    onClick={() =>{
                        modificaDatiPaziente(elencoPazienti);
                    }}>
                    </EditButton>
                    
                    <DeleteButton
                    onClick={() => {
                        confermaEliminazionePaziente(elencoPazienti.id, elencoPazienti.nome, elencoPazienti.cognome);
                    }}>
                    </DeleteButton>
                </td>
            </tr>
        );
    }

    function fromArrayToListaPazienti(elencoPazienti){
        return(
           <option key={elencoPazienti.id} value={elencoPazienti.id} >
                {elencoPazienti.nome} {elencoPazienti.cognome} {'-- (ID: '}{elencoPazienti.id + ')'}
           </option>
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
                codicefiscale = {pazientee.codicefiscale}
                attività = {pazientee.attività}
                stats_paziente = {pazientee.statistiche}
                goBackButton = {chiudiSchedaPaziente}
            >
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

    function modificaDatiPaziente(pazienteee){
        modifica_paziente = 
            <Card
            children={
                <EditPaziente
                    iddd={pazienteee.id}
                    nomeee={pazienteee.nome}
                    cognomeee={pazienteee.cognome}
                    cittààà={pazienteee.città}
                    dataaa={pazienteee.datanascita}
                    attivitààà={pazienteee.attività}
                    statisticheee={pazienteee.statistiche}
                    cfff={pazienteee.codicefiscale}
                >
                </EditPaziente>
            }>
            </Card>

        setShowModificaPaziente(true);
        setShowSearchBoxAndButton(false);
        setShowTabella(false);
    }

    function modificaPazienteLista(datiModificatiPaziente){
        console.log(arrayDummyPazienti[0].id);
        console.log(datiModificatiPaziente.id);
        for(let i = 0; i < arrayDummyPazienti.length; i++){
            if(arrayDummyPazienti[i].id === datiModificatiPaziente.id){
                console.log("TROVATO ID CORRISPONDENTE");
                arrayDummyPazienti[i] = datiModificatiPaziente
                setElencoPazienti(arrayDummyPazienti);
            }
        }
        console.log("TROVATO ID CORRISPONDENTE");
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    function chiudiFormModificaPaziente(event){
        event.preventDefault();
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    return(
        <PatientContext.Provider
        value={{
            listaPazienti: elencoPazienti,
            showTabella: showTabella,
            arrayToTable: fromArrayToTablePazienti,
            arrayToLista: fromArrayToListaPazienti,
            mostraRiga: cliccaRiga,
            showScheda: showSchedaPaziente,
            schedaPaziente: scheda_paziente,
            showModifica: showModificaPaziente,
            modificaPaziente: modifica_paziente,
            modificaLista: modificaPazienteLista,
            chiudiFormModifica: chiudiFormModificaPaziente,
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