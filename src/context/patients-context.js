import React, { useEffect, useState } from "react";
import SchedaPaziente from "../components/Pazienti/SchedaPaziente";
import someStyles from '../components/Pazienti/TabellaPazienti.module.css';
import DeleteButton from "../components/UI/DeleteButton";
import EditButton from "../components/UI/EditButton";
import DetailsButton from "../components/UI/DetailsButton";
import Modal from "../components/UI/Modal";
import EditPaziente from "../components/Pazienti/EditPaziente";
import Card from "../components/UI/Card";

import { db } from "../config/firebase-config";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

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
    const [elencoPazienti, setElencoPazienti] = useState([]);

    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState(false);
    const [showModificaPaziente, setShowModificaPaziente] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const listaPazientiReference = collection(db, "pazienti")
    
    // --------- FUNZIONE PER RECUPERARE I PAZIENTI DAL DATABASE
    const prendiListaPazienti = async () => {
        try{
            const data = await getDocs(listaPazientiReference);
            const filteredData = data.docs.map((docPazien) => ({
                ...docPazien.data(),
                id: docPazien.id
            }))
            setElencoPazienti(filteredData);
        } catch(err){
            console.error(err);
        }
        
    };

    //ESEGUO LA FUNZIONE PER AVERE SEMPRE LA LISTA AGGIORNATA DEI PAZIENTI
    useEffect(() => {
        prendiListaPazienti();
    }, []);
    

    //------------- AGGIORNA db CON IL NUOVO PAZIENTE ---> VIENE ESEGUITA IN AddPaziente.js TRAMITE PROPS
    async function aggiungiPaziente(datiPaziente){
        try{
            await addDoc(listaPazientiReference, {
                nome: datiPaziente.nome,
                cognome: datiPaziente.cognome,
                città: datiPaziente.città,
                dataNascita: datiPaziente.dataNascita,
                codiceFiscale: datiPaziente.codiceFiscale,
                statistiche: datiPaziente.statistiche
            });
        } catch(err){
            console.error(err);
        }
        setShowFormNewPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
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

    //---------------- FUNZIONE PER ELIMINARE UN PAZIENTE
    async function eliminaPaziente(pazienteID){
        const pazienteDoc = doc(db, "pazienti", pazienteID);
        await deleteDoc(pazienteDoc);
    }

    //FUNZIONE PER VISUALIZZARE IL MODALE DI ELIMINAZIONE
    function confermaEliminazionePaziente(paziente_ID, paziente_Nome, paziente_Cognome){
        console.log("ELIMINO PAZIENTE");
        
        modal_eliminazione = 
            <Modal
            testoModale={"Sei sicuro di voler eliminare il seguente paziente?"}
            pazienteNome={paziente_Nome}
            pazienteCognome={paziente_Cognome}
            CONFERMA={() =>{
                eliminaPaziente(paziente_ID);
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

    //---------------- FUNZIONE PER MODIFICARE I DATI DI UN PAZIENTE
    async function modificaPaziente(pazienteOGGETTO){
        const pazienteDoc = doc(db, "pazienti", pazienteOGGETTO.id);
        await updateDoc(pazienteDoc, pazienteOGGETTO);
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    //FUNZIONE PER MOSTRARE LA SCHEDA DI MODIFICA DEI DATI DEL PAZIENTE
    function modificaDatiPaziente(pazienteee){
        modifica_paziente = 
            <Card
            children={
                <EditPaziente
                    iddd={pazienteee.id}
                    nomeee={pazienteee.nome}
                    cognomeee={pazienteee.cognome}
                    cittààà={pazienteee.città}
                    dataaa={pazienteee.dataNascita}
                    attivitààà={pazienteee.attività}
                    statisticheee={pazienteee.statistiche}
                    cfff={pazienteee.codiceFiscale}
                >
                </EditPaziente>
            }>
            </Card>

        setShowModificaPaziente(true);
        setShowSearchBoxAndButton(false);
        setShowTabella(false);
    }

    //FUNZIONE PER CHIUDERE LA SCHEDA DI MODIFICA DEI DATI DEL PAZIENTE
    function chiudiFormModificaPaziente(event){
        event.preventDefault();
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    //------------- FUNZIONE CHE RESTITUISCE LA SINGOLA RIGA DELLA TABELLA POPOLATA CON I DATI DEL PAZIENTE PRESI DAL db
    function fromArrayToTablePazienti(elencoPazienti){
        return(
            <tr key={elencoPazienti.id}>
                <td className={`${someStyles['dati_tabella']} ${someStyles['nome']}`}>{elencoPazienti.nome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['cognome']}`}>{elencoPazienti.cognome}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{elencoPazienti.città}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{elencoPazienti.dataNascita}</td>
                <td className={`${someStyles['dati_tabella']} ${someStyles['codicefiscale']}`}>{elencoPazienti.codiceFiscale}</td>
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

    //-------------- FUNZIONE CHE RESTITUISCE LE OPZIONI PER I MENU A DROPDOWN
    function fromArrayToListaPazienti(elencoPazienti){
        return(
           <option key={elencoPazienti.id} value={elencoPazienti.id} >
                {elencoPazienti.nome} {elencoPazienti.cognome} {'-- (ID: '}{elencoPazienti.id + ')'}
           </option>
        );
    }

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    function cliccaRiga(pazientee){
        // console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        // console.log(typeof(elencoPazienti[1].dataNascita));
        scheda_paziente = 
            <SchedaPaziente
                id = {pazientee.id}
                nome = {pazientee.nome.toUpperCase()}
                cognome = {pazientee.cognome.toUpperCase()}
                città = {pazientee.città.toUpperCase()}
                datanascita = {pazientee.dataNascita}
                codicefiscale = {pazientee.codiceFiscale}
                // attività = {pazientee.attività}
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
            modificaLista: modificaPaziente,
            chiudiFormModifica: chiudiFormModificaPaziente,
            showModale: showModal,
            modale: modal_eliminazione,
            formVisibile: formVisibile,
            formNonVisibile: formNonVisibile,
            nuovoPazienteHandler: aggiungiPaziente,
            showFormNuovoPaziente: showFormNewPaziente,
            showBarraRicercaBottone: showSearchBoxAndButton
        }}>
            {props.children}
        </PatientContext.Provider>
    );
}

export default PatientContext;