let serverMgr = null;

export function getServerMgr(cb) {
    if(serverMgr === null) {
        initServerMgr(() => {
            serverMgr.init(cb);
            //return serverMgr 
        })
    } else {        
        return serverMgr;
    }
}

function initServerMgr(cb) {
    serverMgr = {};

    serverMgr.init = (cb) => {
        if (cb) cb();
    }

    serverMgr.requestFetchData = async (service, args) => {
        let prova = args
        ?
        JSON.stringify({
            "service": service,
            ...args 
        })
        :
        JSON.stringify({
            "service": service
        })

        try{
            const response = await fetch("https://myks.altervista.org/connection.php", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: prova
            })
            const data = await response.text();
            console.log("requestFetchData: " + data)
            return JSON.parse(data); 
        }
        catch (error) {
            console.log("ERROR requestFetchData: " + error)
        }
    }

    serverMgr.getLogin = async (email, password, cb) => {
        let result = await serverMgr.requestFetchData("getLogin", {email: email, password: password})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.getAccount = async (email, cb) => {
        let result = await serverMgr.requestFetchData("getAccount", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addAccount = async (nome, cognome, titolo, email, password, patientID, cb) => {
        let result = await serverMgr.requestFetchData("addAccount", {nome: nome, cognome: cognome, titolo: titolo, email: email, password: password, patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.updatePatientWithProfileID = async (accountID, patientID, cb) => {
        let result = await serverMgr.requestFetchData("updatePatientWithProfileID", {accountID: accountID, patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatientsList = async (UID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientsList", {doct_UID: UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.infoPatologie = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("infoPatologie", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.infoMedicine = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("infoMedicine", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addPaziente = async (doct_UID, nome, cognome, city, codiceFiscale, dataNascita, informazioniMediche, cb) => {
        let result = await serverMgr.requestFetchData("addPaziente", {
            doct_UID: doct_UID,
            nome: nome,
            cognome: cognome,
            city: city,
            codiceFiscale: codiceFiscale,
            dataNascita: dataNascita,
            informazioniMediche: informazioniMediche
            // statistiche: statistiche
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.insertCredentialsPatient = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("insertCredentialsPatient", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updatePaziente = async (nome, cognome, city, codiceFiscale, dataNascita, informazioniMediche, listaGiochi, ID, cb) => {
        let result = await serverMgr.requestFetchData("updatePaziente", {
            nome: nome,
            cognome: cognome,
            city: city,
            codiceFiscale: codiceFiscale,
            dataNascita: dataNascita,
            informazioniMediche: informazioniMediche,
            listaGiochi: listaGiochi,
            ID: ID
            // statistiche: statistiche
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deletePaziente = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("deletePaziente", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getQuestionsList = async (doctor_UID, cb) => {
        let result = await serverMgr.requestFetchData("getQuestionsList", {doctor_UID: doctor_UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addQuestion = async (doctor_UID, tipoGioco, categoria, domanda, rispCorrettaN1, rispCorrettaN2, rispCorrettaN3, rispCorrettaN4, rispSbagliataN1, rispSbagliataN2, rispSbagliataN3, rispSbagliataN4, immagine, cb) => {
        let result = await serverMgr.requestFetchData("addQuestion", {
            doctor_UID: doctor_UID,
            tipoGioco: tipoGioco,
            categoria: categoria,
            domanda: domanda,
            rispCorrettaN1: rispCorrettaN1,
            rispCorrettaN2: rispCorrettaN2,
            rispCorrettaN3: rispCorrettaN3,
            rispCorrettaN4: rispCorrettaN4,
            rispSbagliataN1: rispSbagliataN1,
            rispSbagliataN2: rispSbagliataN2,
            rispSbagliataN3: rispSbagliataN3,
            rispSbagliataN4: rispSbagliataN4,
            immagine: immagine
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateQuestion = async (domanda, rispCorrettaN1, rispCorrettaN2, rispCorrettaN3, rispCorrettaN4, rispSbagliataN1, rispSbagliataN2, rispSbagliataN3, rispSbagliataN4, immagine, ID, cb) => {
        let result = await serverMgr.requestFetchData("updateQuestion", {
            domanda: domanda,
            rispCorrettaN1: rispCorrettaN1,
            rispCorrettaN2: rispCorrettaN2,
            rispCorrettaN3: rispCorrettaN3,
            rispCorrettaN4: rispCorrettaN4,
            rispSbagliataN1: rispSbagliataN1,
            rispSbagliataN2: rispSbagliataN2,
            rispSbagliataN3: rispSbagliataN3,
            rispSbagliataN4: rispSbagliataN4,
            immagine: immagine,
            ID: ID
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deleteQuestion = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("deleteQuestion", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getGamesList = async (creatorID, cb) => {
        let result = await serverMgr.requestFetchData("getGamesList", {creatorID: creatorID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addGame = async (creatorID, nomeGioco, tipoGioco, livelloGioco, categoriaGioco, domande, nRound, cb) => {
        let result = await serverMgr.requestFetchData("addGame", {
            creatorID: creatorID,
            nomeGioco: nomeGioco,
            tipoGioco: tipoGioco,
            livelloGioco: livelloGioco,
            categoriaGioco: categoriaGioco,
            // domande: domande
            numeroRound: nRound
        })

        await serverMgr.requestFetchData("addBridgeQuestions", {gameID: result, domande: domande});

        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateGame = async (nomeGioco, livelloGioco, categoriaGioco, domande, nRound, gameID, cb) => {
        let result = await serverMgr.requestFetchData("updateGame", {
            nomeGioco: nomeGioco,
            livelloGioco: livelloGioco,
            categoriaGioco: categoriaGioco,
            // domande: domande,
            numeroRound: nRound,
            gameID: gameID
        })

        await serverMgr.requestFetchData("updateBridgeQuestions", {gameID: gameID});

        await serverMgr.requestFetchData("addBridgeQuestions", {gameID: gameID, domande: domande});

        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deleteGame = async (gameID, cb) => {
        let result = await serverMgr.requestFetchData("deleteGame", {gameID: gameID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.listaGiochiPaziente = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("listaGiochiPaziente", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.patientsListForSingleGame = async (gameID, cb) => {
        let result = await serverMgr.requestFetchData("patientsListForSingleGame", {gameID: gameID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.saveGameToPatients = async (gameID, patientsList, cb) => {
        let result = await serverMgr.requestFetchData("saveGameToPatients", {gameID: gameID, patientsList: patientsList})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.pswRecovery_checkEmail = async (email, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_checkEmail", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.pswRecovery_code = async (email, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_code", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.pswRecovery_reset = async (psw, codiceUnico, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_reset", {psw: psw, codiceUnico: codiceUnico})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.insertFirstCode = async (email, cb) => {
        let result = await serverMgr.requestFetchData("insertFirstCode", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateCode = async (email, cb) => {
        let result = await serverMgr.requestFetchData("updateCode", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getQuestionsFromGame = async (email, cb) => {
        let result = await serverMgr.requestFetchData("getQuestionsFromGame", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getBridge = async (cb) => {
        let result = await serverMgr.requestFetchData("getBridge")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.saveGameResults = async (pazienteID, giocoID, rispTotali, rispCorrette, rispSbagliate, dataSvolgimento, cb) => {
        let result = await serverMgr.requestFetchData("saveGameResults", {
            pazienteID: pazienteID,
            giocoID: giocoID,
            rispTotali: rispTotali,
            rispCorrette: rispCorrette,
            rispSbagliate: rispSbagliate,
            dataSvolgimento: dataSvolgimento
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatientStatistics = async (pazienteID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientStatistics", {pazienteID: pazienteID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestResultList = async (doctorID, cb) => {
        let result = await serverMgr.requestFetchData("getTestResultList", {doctorID: doctorID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.getSingleTestMMSE = async (testID, cb) => {
        let result = await serverMgr.requestFetchData("getSingleTestMMSE", {testID: testID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.getSingleTestMoCA = async (testID, cb) => {
        let result = await serverMgr.requestFetchData("getSingleTestMoCA", {testID: testID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.updateTestResultList = async (pazienteID, tipoTest, scoreTest, dataSvolgimento, arrayRisposte, doctorID, cb) => {
        let result = await serverMgr.requestFetchData("updateTestResultList", {pazienteID: pazienteID, tipoTest: tipoTest, scoreTest: scoreTest, dataSvolgimento: dataSvolgimento, arrayRisposte: arrayRisposte, doctorID: doctorID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.saveResultMMSE = async (resultMMSE, ID, cb) => {
        let result = await serverMgr.requestFetchData("saveResultMMSE", {resultMMSE: resultMMSE, ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.saveResultMoCA = async (resultMoCA, ID, cb) => {
        let result = await serverMgr.requestFetchData("saveResultMoCA", {resultMoCA: resultMoCA, ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestsList = async (defaultTest, cb) => {
        let result = await serverMgr.requestFetchData("getTestsList", {defaultTest: defaultTest})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestsQuestionsAreaCog_1 = async (cb) => {
        let result = await serverMgr.requestFetchData("getTestsQuestionsAreaCog_1")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestsQuestionsAreaCog_2 = async (cb) => {
        let result = await serverMgr.requestFetchData("getTestsQuestionsAreaCog_2")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestsQuestionsAreaCog_3 = async (cb) => {
        let result = await serverMgr.requestFetchData("getTestsQuestionsAreaCog_3")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getTestsQuestionsAreaCog_5 = async (cb) => {
        let result = await serverMgr.requestFetchData("getTestsQuestionsAreaCog_5")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatologies = async (cb) => {
        let result = await serverMgr.requestFetchData("getPatologies")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.getTherapies = async (cb) => {
        let result = await serverMgr.requestFetchData("getTherapies")
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }

    serverMgr.saveNewPatologyWithTherapies = async (patologia, terapieAssociate, cb) => {
        let result = await serverMgr.requestFetchData("saveNewPatologyWithTherapies", {patologia: patologia, terapieAssociate: terapieAssociate})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }
    serverMgr.updatePatologyName = async (nomePatologia, patologiaID, cb) => {
        let result = await serverMgr.requestFetchData("updatePatologyName", {nomePatologia: nomePatologia, patologiaID: patologiaID})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }
    serverMgr.deletePatology = async (patologiaID, cb) => {
        let result = await serverMgr.requestFetchData("deletePatology", {patologiaID: patologiaID})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }

    serverMgr.saveNewTherapy = async (patologiaID, terapia, note, cb) => {
        let result = await serverMgr.requestFetchData("saveNewTherapy", {patologiaID: patologiaID, terapia: terapia, note: note})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }

    serverMgr.deleteTherapy = async (terapiaID, cb) => {
        let result = await serverMgr.requestFetchData("deleteTherapy", {terapiaID: terapiaID})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }

    serverMgr.editTherapy = async (terapiaID, terapia, note, cb) => {
        let result = await serverMgr.requestFetchData("editTherapy", {terapiaID: terapiaID, terapia: terapia, note: note})
        if(cb) {
            cb(result)
        }
        else {
            return result
        }
    }

    if (cb) cb();
}