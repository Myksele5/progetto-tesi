import React, { useContext, useEffect, useState } from "react";
import SchedaPaziente from "../components/Pazienti/SchedaPaziente";
import someStyles from '../components/Pazienti/TabellaPazienti.module.css';
import DeleteButton from "../components/UI/DeleteButton";
import EditButton from "../components/UI/EditButton";
import DetailsButton from "../components/UI/DetailsButton";
import Modal from "../components/UI/Modal";
import EditPaziente from "../components/Pazienti/EditPaziente";
import Card from "../components/UI/Card";

import { auth, db } from "../config/firebase-config";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import AuthContext from "./auth-context";
import { getServerMgr } from "../backend_conn/ServerMgr";

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
    showBarraRicercaBottone: null
});

export function PatientContextProvider(props){
    const auth_ctx = useContext(AuthContext);
    
    //QUESTO STATO SERVE PER DARE IL TEMPO A FIREBASE DI FETCHARE E A REACT DI AGGIORNARE L'ELENCO DEI PAZIENTI
    const [isLoading, setIsLoading] = useState(true);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showTabella, setShowTabella] = useState(true);
    const [elencoPazienti, setElencoPazienti] = useState([]);

    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState(false);
    const [showModificaPaziente, setShowModificaPaziente] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const prendiListaPazienti = async () => {
        if(auth_ctx.utenteLoggato !== null){
            console.log(auth_ctx.utenteLoggato)
            console.log(auth_ctx.utenteLoggatoUID)
            let result;
            result = await getServerMgr().getPatientsList(auth_ctx.utenteLoggatoUID)
            .catch((err) => {
                console.error(err)
            });
    
            if(result !== null){
                setElencoPazienti(result);
            }
            else{
                setElencoPazienti([]);
            }
            // console.log(result[0]);
        }
    }

    //ESEGUO LA FUNZIONE PER AVERE SEMPRE LA LISTA AGGIORNATA DEI PAZIENTI
    useEffect(() => {
        console.log("CARICO LISTA PAZIENTI....");
        prendiListaPazienti();
    }, [isLoading, auth_ctx.utenteLoggato]);
    

    //------------- AGGIORNA db CON IL NUOVO PAZIENTE ---> VIENE ESEGUITA IN AddPaziente.js TRAMITE PROPS
    async function aggiungiPaziente(datiPaziente){
        let result;
        
        result = await getServerMgr().addPaziente(
            datiPaziente.doct_UID, datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.patologia,
            datiPaziente.medicine, datiPaziente.terapia, datiPaziente.note
        )
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });
        
        setShowFormNewPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);

        prendiListaPazienti();
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
        let result;

        result = await getServerMgr().deletePaziente(pazienteID)
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });

        prendiListaPazienti();
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
        let result;
        
        result = await getServerMgr().updatePaziente(
            pazienteOGGETTO.nome, pazienteOGGETTO.cognome, pazienteOGGETTO.city, pazienteOGGETTO.codiceFiscale, pazienteOGGETTO.dataNascita, pazienteOGGETTO.patologia,
            pazienteOGGETTO.medicine, pazienteOGGETTO.terapia, pazienteOGGETTO.note, pazienteOGGETTO.ID
        )
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);

        prendiListaPazienti();
    }

    //FUNZIONE PER MOSTRARE LA SCHEDA DI MODIFICA DEI DATI DEL PAZIENTE
    function modificaDatiPaziente(pazienteee){
        modifica_paziente = 
            <Card
            children={
                <EditPaziente
                    iddd={pazienteee.ID}
                    nomeee={pazienteee.nome}
                    cognomeee={pazienteee.cognome}
                    cittààà={pazienteee.city}
                    dataaa={pazienteee.dataNascita}
                    attivitààà={pazienteee.attività}
                    statisticheee={pazienteee.statistiche}
                    cfff={pazienteee.codiceFiscale}
                    patologiaaa={pazienteee.patologia}
                    noteee={pazienteee.note}
                    medicineee={pazienteee.medicine}
                    terapiaaa={pazienteee.terapia}
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
        if(Object.keys(elencoPazienti).length > 0){
            // console.log(elencoPazienti);
            return(
                <tr key={elencoPazienti.ID}>
                    <td className={`${someStyles['dati_tabella']} ${someStyles['nome']}`}>{elencoPazienti.nome}</td>
                    <td className={`${someStyles['dati_tabella']} ${someStyles['cognome']}`}>{elencoPazienti.cognome}</td>
                    <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{elencoPazienti.city}</td>
                    <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{elencoPazienti.dataNascita}</td>
                    <td className={`${someStyles['dati_tabella']} ${someStyles['codicefiscale']}`}>{elencoPazienti.codiceFiscale}</td>
                    {/* <td className={someStyles.dati_tabella}>{arrayDummyPazienti.attività}</td> */}
                    <td className={`${someStyles['dati_tabella']} ${someStyles['opzioni']}`}>
                        <DetailsButton
                        onClick={() => {
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
                            confermaEliminazionePaziente(elencoPazienti.ID, elencoPazienti.nome, elencoPazienti.cognome);
                        }}>
                        </DeleteButton>
                    </td>
                </tr>
            );
        }
        else{
            console.log(elencoPazienti);
            return(
                <p>Non ci sono pazienti da mostrare. Creane uno</p>
            );
        }
    }

    //-------------- FUNZIONE CHE RESTITUISCE LE OPZIONI PER I MENU A DROPDOWN
    function fromArrayToListaPazienti(elencoPazienti){
        return(
           <option key={elencoPazienti.ID} value={elencoPazienti.ID} >
                {elencoPazienti.nome} {elencoPazienti.cognome} {'-- (C.F.: '}{elencoPazienti.codiceFiscale + ')'}
           </option>
        );
    }

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    function cliccaRiga(pazientee){
        // console.log(idd, nomee, cognomee, cittàà, dataa, attivitàà);
        // console.log(typeof(elencoPazienti[1].dataNascita));
        scheda_paziente = 
            <SchedaPaziente
                id = {pazientee.ID}
                nome = {pazientee.nome.toUpperCase()}
                cognome = {pazientee.cognome.toUpperCase()}
                città = {pazientee.city.toUpperCase()}
                datanascita = {pazientee.dataNascita}
                codicefiscale = {pazientee.codiceFiscale}
                patologia = {pazientee.patologia}
                medicine = {pazientee.medicine}
                terapia = {pazientee.terapia}
                note = {pazientee.note}
                scoreMMSE = {pazientee.resultMMSE}
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