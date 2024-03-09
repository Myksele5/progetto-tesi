<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
	header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

	$request_service = "";
    if(isset($_POST)) {
      $data = file_get_contents("php://input");
      $dataJson = json_decode($data, true);
      $request_service = $dataJson["service"];
    }
    
    $conn = getConnection();
    
    $rows = array();
    $query_result;

    switch ($request_service) {
    case "getLogin":
    	$query_result = getLogin($conn);
        break;
    case "getAccount":
    	$query_result = getAccount($conn);
        break;
    case "addAccount":
        $query_result = addAccount($conn);
        break;
    case "updatePatientWithProfileID":
        $query_result = updatePatientWithProfileID($conn);
        break;
    case "getPatientsList":
        $query_result = getPatientsList($conn);
        break;
    case "infoPatologie":
        $query_result = infoPatologie($conn);
        break;
    case "infoMedicine":
        $query_result = infoMedicine($conn);
        break;
    case "addPaziente":
        $query_result = addPaziente($conn);
        break;
    case "updatePaziente":
        $query_result = updatePaziente($conn);
        break;
    case "deletePaziente":
        $query_result = deletePaziente($conn);
        break;
    case "getQuestionsList":
        $query_result = getQuestionsList($conn);
        break;
    case "addQuestion":
        $query_result = addQuestion($conn);
        break;
    case "updateQuestion":
        $query_result = updateQuestion($conn);
        break;
    case "deleteQuestion":
        $query_result = deleteQuestion($conn);
        break;
    case "getGamesList":
        $query_result = getGamesList($conn);
        break;
    case "addGame":
        addGame($conn);
        break;
    case "updateGame":
        $query_result = updateGame($conn);
        break;
    case "deleteGame":
        $query_result = deleteGame($conn);
        break;
    case "listaGiochiPaziente":
        $query_result = listaGiochiPaziente($conn);
        break;
    case "patientsListForSingleGame":
        $query_result = patientsListForSingleGame($conn);
        break;
    case "saveGameToPatients":
        $query_result = saveGameToPatients($conn);
        break;
    case "pswRecovery_checkEmail":
        $query_result = pswRecovery_checkEmail($conn);
        break;
    case "pswRecovery_code":
        $query_result = pswRecovery_code($conn);
        break;
    case "pswRecovery_reset":
        $query_result = pswRecovery_reset($conn);
        break;
    case "insertFirstCode":
        $query_result = insertFirstCode($conn);
        break;
    case "updateCode":
        $query_result = updateCode($conn);
        break;
    case "getQuestionsFromGame":
        $query_result = getQuestionsFromGame($conn);
        break;
    case "addBridgeQuestions":
        $query_result = addBridgeQuestions($conn);
        break;
    case "updateBridgeQuestions":
        $query_result = updateBridgeQuestions($conn);
        break;
    case "saveGameResults":
        $query_result = saveGameResults($conn);
        break;
    case "getPatientStatistics":
        $query_result = getPatientStatistics($conn);
        break;
    case "getTestResultList":
        $query_result = getTestResultList($conn);
        break;
    case "getSingleTestMMSE":
        $query_result = getSingleTestMMSE($conn);
        break;
    case "getSingleTestMoCA":
        $query_result = getSingleTestMoCA($conn);
        break;
    case "updateTestResultList":
        $query_result = updateTestResultList($conn);
        break;
    case "saveResultMMSE":
        $query_result = saveResultMMSE($conn);
        break;
    case "saveResultMoCA":
        $query_result = saveResultMoCA($conn);
        break;
    case "getTestsList":
        $query_result = getTestsList($conn);
        break;
    case "getTestsQuestionsAreaCog_1":
        $query_result = getTestsQuestionsAreaCog_1($conn);
        break;
    case "getTestsQuestionsAreaCog_2":
        $query_result = getTestsQuestionsAreaCog_2($conn);
        break;
    case "getTestsQuestionsAreaCog_3":
        $query_result = getTestsQuestionsAreaCog_3($conn);
        break;
    case "getTestsQuestionsAreaCog_5":
        $query_result = getTestsQuestionsAreaCog_5($conn);
        break;
    case "getPatologies":
        $query_result = getPatologies($conn);
        break;
    case "getTherapies":
        $query_result = getTherapies($conn);
        break;
    case "saveNewPatologyWithTherapies":
        $query_result = saveNewPatologyWithTherapies($conn);
        break;
    case "updatePatologyName":
        $query_result = updatePatologyName($conn);
        break;
    case "deletePatology":
        $query_result = deletePatology($conn);
        break;
    case "saveNewTherapy":
        $query_result = saveNewTherapy($conn);
        break;
    case "deleteTherapy":
        $query_result = deleteTherapy($conn);
        break;
    case "editTherapy":
        $query_result = editTherapy($conn);
        break;
    default:
    	break;
	}
    
    // if($query_result){
    //     echo parseResultToJson($query_result);
    // }
    if(is_string($query_result) || is_numeric($query_result) || is_null($query_result)){
        echo $query_result;
    } else {
        echo parseResultToJson($query_result);
    }
    
    $conn->close();
    
    function parseResultToJson($result) {
        while($r = mysqli_fetch_assoc($result)) {
        $returnRows[] = $r;
        }
        return json_encode($returnRows);
    }  
    
    function addItem($i_conn) {    
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $commentId = $dataJson["commentId"];
        $commentTxt = $dataJson["commentTxt"];
        $itemId = $dataJson["item"];
        $itemQuantity = $dataJson["quantity"];
        $itemWeight = $dataJson["weight"];
        $locationId = $dataJson["location"];
        $userId = "1"; //TODO: add user
        
        if($commentId == -1) { //the comment is new and must be created
          // Insert a row into the table
          $insertCommentQuery = $i_conn->prepare("INSERT INTO `comments`(`name`, `user`) VALUES (?, ?)"); 
          $insertCommentQuery->bind_param("si", $commentTxt, $userId);
          
          $insertCommentQuery->execute();

          // Get the id of the inserted row
          $commentId = $insertCommentQuery->insert_id;

          $updateItemQuery = $i_conn->prepare("INSERT INTO `inventory`(`user`, `location`, `item`, `quantity`, `weight`, `comment`) VALUES (?, ?, ?, ?, ?, ?)");     
          $updateItemQuery->bind_param("iiiiii", $userId, $locationId, $itemId, $itemQuantity, $itemWeight, $commentId);
          
          $updateItemQuery->execute();
          
          $updateItemQuery->bind_result($result);
        } else { //check if there is a row with the same user, location, item, weight and comment (if the comment is new this is not necessary)

            $updateOrInsertItemQuery = $i_conn->prepare("INSERT INTO `inventory`(`user`, `location`, `item`, `quantity`, `weight`, `comment`) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `quantity` = `quantity` + ?");      
              
            $updateOrInsertItemQuery->bind_param("iiiiiii", $userId, $locationId, $itemId, $itemQuantity, $itemWeight, $commentId, $itemQuantity);
            $updateOrInsertItemQuery->execute();
                
            $updateOrInsertItemQuery->bind_result($result);
        }
        return $result;
    }
    
    function getConnection() {
		$servername = "localhost";
        $username = "myks";
        $password = "X9Udcf7C4xFW";
        $database = "my_myks";
        
        $o_conn = new mysqli($servername, $username, $password, $database);
        if ($o_conn -> connect_errno) {
        	echo "Failed to connect to MySQL: " . $o_conn -> connect_error;
        	exit();
		} 
        return $o_conn;
    }
    
    function getLogin($i_conn) {
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $password = $dataJson["password"];
    
    	$insertCommentQuery = $i_conn->prepare("SELECT accounts.UID, accounts.titolo, accounts.nome, accounts.cognome FROM `accounts` WHERE email = ? AND password = ?"); 
      	$insertCommentQuery->bind_param("ss", $email, $password);

      	$insertCommentQuery->execute();
        $result = $insertCommentQuery->get_result();
        
        return $result;
    }
    
    function getAccount($i_conn) {
    	$result = $i_conn->query("SELECT accounts.UID, accounts.nome, accounts.cognome, accounts.email, accounts.password, types.tipoAccount FROM `accounts` JOIN accountsTypes AS types ON accounts.titolo = types.id;");
        return $result;
    }

    function addAccount($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $password = $dataJson["password"];
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $titolo = $dataJson["titolo"];
        $patientID = $dataJson["patientID"];
        
        $insertNewAccount = $i_conn->prepare("INSERT INTO `accounts` (`nome`, `cognome`, `titolo`, `email`, `password`, `patientID`) VALUES (?, ?, ?, ?, ?, ?)");
        $insertNewAccount->bind_param("sssssi", $nome, $cognome, $titolo, $email, $password, $patientID);
        $insertNewAccount->execute();

        $patientAccountID = $insertNewAccount->insert_id;
        
        // $insertNewAccount->bind_result($result);
        return $patientAccountID;
    }
    function updatePatientWithProfileID($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $accountID = $dataJson["accountID"];
        $patientID = $dataJson["patientID"];
        
        $updatePatientWithProfileID = $i_conn->prepare("UPDATE `patients` SET `accountID` = ? WHERE patients.ID = ?");
        $updatePatientWithProfileID->bind_param("ii", $accountID, $patientID);
        $updatePatientWithProfileID->execute();

        return $patientAccountID;
    }

    function getPatientsList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doct_UID = $dataJson["doct_UID"];
        
        $retrievePatientsList = $i_conn->prepare("SELECT * FROM `patients` WHERE doct_UID = ?");
        $retrievePatientsList->bind_param("i", $doct_UID);
        
        $retrievePatientsList->execute();
        $result = $retrievePatientsList->get_result();
        return $result;
    }

    function infoPatologie($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
        $retrievePatientsList = $i_conn->prepare(
            "SELECT elencoPatologie.patologiaID, elencoTerapie.terapiaID, bridge.dataInizio, bridge.dataFine, bridge.note, elencoTerapie.terapia, elencoPatologie.nomePatologia
            FROM bridgePazientiPatologieTerapie AS bridge JOIN elencoTerapie ON bridge.terapia_ID = elencoTerapie.terapiaID 
            JOIN elencoPatologie ON elencoTerapie.patolog_ID = elencoPatologie.patologiaID
            WHERE paziente_ID = ?");
        $retrievePatientsList->bind_param("i", $ID);
        
        $retrievePatientsList->execute();
        $result = $retrievePatientsList->get_result();
        return $result;
    }

    function infoMedicine($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
        $retrievePatientsList = $i_conn->prepare("SELECT medicina FROM `listaMedicine` WHERE pazienteID = ?");
        $retrievePatientsList->bind_param("i", $ID);
        
        $retrievePatientsList->execute();
        $result = $retrievePatientsList->get_result();
        return $result;
    }

    function addPaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doct_UID = $dataJson["doct_UID"];
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $informazioniMediche = $dataJson["informazioniMediche"];
        
        $insertNewPatient = $i_conn->prepare(
            "INSERT INTO `patients` (`doct_UID`, `nome`, `cognome`, `city`, `codiceFiscale`, `dataNascita`) 
            VALUES (?, ?, ?, ?, ?, ?)"
        );
        $insertNewPatient->bind_param("isssss", $doct_UID, $nome, $cognome, $city, $codiceFiscale, $dataNascita);
        $insertNewPatient->execute();

        $patientID = $insertNewPatient->insert_id;

        foreach($informazioniMediche as $info){
            // echo var_dump($info);
            // echo $info['nomePatologia'];
            $insertNewInfoMediche = $i_conn->prepare(
                "INSERT INTO `bridgePazientiPatologieTerapie` (`paziente_ID`, `patologia_ID`, `terapia_ID`, `dataInizio`, `dataFine`, `note`) 
                VALUES (?, ?, ?, ?, ?, ?)"
            );
            $insertNewInfoMediche->bind_param("iiisss", $patientID, $info['patologiaID'], $info['terapiaID'], $info['dataInizio'], $info['dataFine'], $info['note']);
            $insertNewInfoMediche->execute();
        }
        return $patientID;
    }

    function updatePaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $informazioniMediche = $dataJson["informazioniMediche"];
        $listaGiochi = $dataJson["listaGiochi"];
        $ID = $dataJson["ID"];
        
        $updatePatient = $i_conn->prepare(
            "UPDATE `patients` SET `nome` = ?, `cognome` = ?, `city` = ?, `codiceFiscale` = ?, `dataNascita` = ? WHERE `patients`.`ID` = ?"
        );
        $updatePatient->bind_param("sssssi", $nome, $cognome, $city, $codiceFiscale, $dataNascita, $ID);
        $updatePatient->execute();
        // $updatePatient->bind_result($result);

        $deletePatologiePatient = $i_conn->prepare("DELETE FROM `bridgePazientiPatologieTerapie` WHERE `bridgePazientiPatologieTerapie`.`paziente_ID` = ?");
        $deletePatologiePatient->bind_param("i", $ID);
        $deletePatologiePatient->execute();

        foreach($informazioniMediche as $info){
            $insertNewInfoMediche = $i_conn->prepare(
                "INSERT INTO `bridgePazientiPatologieTerapie` (`paziente_ID`, `patologia_ID`, `terapia_ID`, `dataInizio`, `dataFine`, `note`) 
                VALUES (?, ?, ?, ?, ?, ?)"
            );
            $insertNewInfoMediche->bind_param("iiisss", $ID, $info['patologiaID'], $info['terapiaID'], $info['dataInizio'], $info['dataFine'], $info['note']);
            $insertNewInfoMediche->execute();
        }

        $deleteGamePatient = $i_conn->prepare("DELETE FROM `bridgeGamesPatients` WHERE `bridgeGamesPatients`.`patient_ID` = ?");
        $deleteGamePatient->bind_param("i", $ID);
        $deleteGamePatient->execute();

        foreach($listaGiochi as $gioco){
            $insertNewGame = $i_conn->prepare(
                "INSERT INTO `bridgeGamesPatients` (`game_ID`, `patient_ID`) 
                VALUES (?, ?)"
            );
            $insertNewGame->bind_param("ii", $gioco['gameID'], $ID);
            $insertNewGame->execute();
        }

        return $result;
    }

    function deletePaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
        $deletePatient = $i_conn->prepare("DELETE FROM `patients` WHERE `patients`.`ID` = ?");
        $deletePatient->bind_param("i", $ID);
        $deletePatient->execute();
        
        $deletePatient->bind_result($result);
        return $result;
    }

    function getQuestionsList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doctor_UID = $dataJson["doctor_UID"];
        
        $retrieveQuestionsList = $i_conn->prepare("SELECT * FROM `gamesQuestions` WHERE doctor_UID = ?");
        $retrieveQuestionsList->bind_param("i", $doctor_UID);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function addQuestion($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doctor_UID = $dataJson["doctor_UID"];
        $tipoGioco = $dataJson["tipoGioco"];
        $categoria = $dataJson["categoria"];
        $domanda = $dataJson["domanda"];
        $rispCorrettaN1 = $dataJson["rispCorrettaN1"];
        $rispCorrettaN2 = $dataJson["rispCorrettaN2"];
        $rispCorrettaN3 = $dataJson["rispCorrettaN3"];
        $rispCorrettaN4 = $dataJson["rispCorrettaN4"];
        $rispSbagliataN1 = $dataJson["rispSbagliataN1"];
        $rispSbagliataN2 = $dataJson["rispSbagliataN2"];
        $rispSbagliataN3 = $dataJson["rispSbagliataN3"];
        $rispSbagliataN4 = $dataJson["rispSbagliataN4"];
        $immagine = $dataJson["immagine"];
        
        $insertNewQuestion = $i_conn->prepare(
            "INSERT INTO `gamesQuestions` (`doctor_UID`, `tipoGioco`, `categoria`, `domanda`, `rispCorrettaN1`, `rispCorrettaN2`, `rispCorrettaN3`, `rispCorrettaN4`,
             `rispSbagliataN1`, `rispSbagliataN2`, `rispSbagliataN3`, `rispSbagliataN4`, `immagine`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $insertNewQuestion->bind_param("issssssssssss", $doctor_UID, $tipoGioco, $categoria, $domanda, $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
                                        $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4, $immagine);
        $insertNewQuestion->execute();
        
        $insertNewQuestion->bind_result($result);
        return $result;
    }

    function updateQuestion($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $domanda = $dataJson["domanda"];
        $rispCorrettaN1 = $dataJson["rispCorrettaN1"];
        $rispCorrettaN2 = $dataJson["rispCorrettaN2"];
        $rispCorrettaN3 = $dataJson["rispCorrettaN3"];
        $rispCorrettaN4 = $dataJson["rispCorrettaN4"];
        $rispSbagliataN1 = $dataJson["rispSbagliataN1"];
        $rispSbagliataN2 = $dataJson["rispSbagliataN2"];
        $rispSbagliataN3 = $dataJson["rispSbagliataN3"];
        $rispSbagliataN4 = $dataJson["rispSbagliataN4"];
        $immagine = $dataJson["immagine"];
        $ID = $dataJson["ID"];
        
        $updateQuestion = $i_conn->prepare(
            "UPDATE `gamesQuestions` SET `domanda` = ?, `rispCorrettaN1` = ?, `rispCorrettaN2` = ?, `rispCorrettaN3` = ?, `rispCorrettaN4` = ?,
             `rispSbagliataN1` = ?, `rispSbagliataN2` = ?, `rispSbagliataN3` = ?, `rispSbagliataN4` = ?, `immagine` = ?
            WHERE `gamesQuestions`.`ID` = ?"
        );
        $updateQuestion->bind_param("ssssssssssi", $domanda, $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
                                        $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4, $immagine, $ID);
        $updateQuestion->execute();
        
        $updateQuestion->bind_result($result);
        return $result;
    }

    function deleteQuestion($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
        $deleteQuestion = $i_conn->prepare("DELETE FROM `gamesQuestions` WHERE `gamesQuestions`.`ID` = ?");
        $deleteQuestion->bind_param("i", $ID);
        $deleteQuestion->execute();
        
        $deleteQuestion->bind_result($result);
        return $result;
    }

    function getGamesList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $creatorID = $dataJson["creatorID"];
        
        $retrieveGamesList = $i_conn->prepare("SELECT * FROM `games` LEFT JOIN `bridgeToQuestionsGames` ON `games`.`gameID` = `bridgeToQuestionsGames`.`IDgame` WHERE creatorID = ?");
        $retrieveGamesList->bind_param("i", $creatorID);
        
        $retrieveGamesList->execute();
        $result = $retrieveGamesList->get_result();
        return $result;
    }

    function addGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $creatorID = $dataJson["creatorID"];
        $nomeGioco = $dataJson["nomeGioco"];
        $tipoGioco = $dataJson["tipoGioco"];
        $livelloGioco = $dataJson["livelloGioco"];
        $categoriaGioco = $dataJson["categoriaGioco"];
        // $domande = $dataJson["domande"];
        $numeroRound = $dataJson["numeroRound"];
        
        $insertNewGame = $i_conn->prepare("INSERT INTO `games` (`creatorID`, `nomeGioco`, `tipoGioco`, `livelloGioco`, `categoriaGioco`, `numeroRound`) VALUES (?, ?, ?, ?, ?, ?)");
        $insertNewGame->bind_param("issssi", $creatorID, $nomeGioco, $tipoGioco, $livelloGioco, $categoriaGioco, $numeroRound);
        $insertNewGame->execute();
        
        $result = $insertNewGame->insert_id;
        echo $result;

        return $result;
    }

    function updateGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $nomeGioco = $dataJson["nomeGioco"];
        $livelloGioco = $dataJson["livelloGioco"];
        $categoriaGioco = $dataJson["categoriaGioco"];
        // $domande = $dataJson["domande"];
        $numeroRound = $dataJson["numeroRound"]; 
        $gameID = $dataJson["gameID"];
        
        $updateGame = $i_conn->prepare("UPDATE `games` SET `nomeGioco` = ?, `livelloGioco` = ?, `categoriaGioco` = ?, `numeroRound` = ? WHERE `games`.`gameID` = ?");
        $updateGame->bind_param("sssii", $nomeGioco, $livelloGioco, $categoriaGioco, $numeroRound, $gameID);
        $updateGame->execute();
        
        $updateGame->bind_result($result);
        return $result;
    }

    function deleteGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        
        $deleteGame = $i_conn->prepare("DELETE FROM `games` WHERE `games`.`gameID` = ?");
        $deleteGame->bind_param("i", $gameID);
        $deleteGame->execute();
        
        $deleteGame->bind_result($result);
        return $result;
    }

    function listaGiochiPaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $patientID = $dataJson["patientID"];
        
        $listGamesPatient = $i_conn->prepare(
            "SELECT games.gameID, games.nomeGioco, games.tipoGioco, games.livelloGioco FROM bridgeGamesPatients 
            JOIN games ON bridgeGamesPatients.game_ID = games.gameID 
            JOIN patients ON bridgeGamesPatients.patient_ID = patients.ID 
            WHERE patients.ID = ?"
        );
        $listGamesPatient->bind_param("i", $patientID);
        $listGamesPatient->execute();
        
        $result = $listGamesPatient->get_result();
        return $result;
    }
    function patientsListForSingleGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        
        $gamePatientsList = $i_conn->prepare("SELECT patient_ID FROM `bridgeGamesPatients` WHERE `game_ID` = ?");
        $gamePatientsList->bind_param("i", $gameID);
        $gamePatientsList->execute();
        
        $result = $gamePatientsList->get_result();
        return $result;
    }
    
    function saveGameToPatients($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        $patientsList  = $dataJson["patientsList"];
        
        // $gamePatientsList = $i_conn->prepare("SELECT patient_ID FROM `bridgeGamesPatients` WHERE `game_ID` = ?");
        // $gamePatientsList->bind_param("i", $gameID);
        // $gamePatientsList->execute();

        foreach($patientsList as $pazGame){
            $insertPatientGame = $i_conn->prepare(
                "INSERT INTO `bridgeGamesPatients` (`game_ID`, `patient_ID`) VALUES (?, ?)"
            );
            $insertPatientGame->bind_param("ii", $gameID, $pazGame['patient_ID']);
            $insertPatientGame->execute();
        }
        
        // $result = $gamePatientsList->get_result();
        return $result;
    }

    function generateRandomString() {
        return substr(md5(rand()), 0, 10);
    }

    function pswRecovery_checkEmail($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        
        $emailExist = $i_conn->prepare("SELECT `UID` FROM `accounts` WHERE email = ?");
        $emailExist->bind_param("s", $email);
        $emailExist->execute();

        $result = $emailExist->get_result();

        return $result;
    }

    function pswRecovery_code($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];

        $isFirstCodeToReset = $i_conn->prepare("SELECT `ID` FROM `recuperoPsw` WHERE email = ?");
        $isFirstCodeToReset->bind_param("s", $email);
        $isFirstCodeToReset->execute();

        $result = $isFirstCodeToReset->get_result();

        return $result;
    }

    function pswRecovery_reset($i_conn){
        echo "INIZIO";
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $psw = $dataJson["psw"];
        $codiceUnico = $dataJson["codiceUnico"];

        echo $codiceUnico;
        echo $psw;
        
        $checkEmail = $i_conn->prepare("SELECT `email` FROM `recuperoPsw` WHERE codiceUnico = ?");
        $checkEmail->bind_param("s", $codiceUnico);
        $checkEmail->execute();
        
        // $checkEmail->bind_result($result);
        $result = $checkEmail->get_result();

        $row = $result->fetch_array(MYSQLI_NUM);

        echo $row[0];

        if($result != null){
            
            $resetPsw = $i_conn->prepare("UPDATE `accounts` SET `password` = ? WHERE `email` = ?");
            $resetPsw->bind_param("ss", $psw, $row[0]);
            $resetPsw->execute();
            
            $resetPsw->bind_result($result);
        }
        return $result;
    }
    
    function insertFirstCode($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $variabile = generateRandomString();

        $codeRecovery = $i_conn->prepare("INSERT INTO `recuperoPsw` (`codiceUnico`, `email`) VALUES (?, ?)");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();
        $codeRecovery->bind_result($result);

        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code='.$variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($email, $subject, $message, $headers);

        return $result;
    }

    function updateCode($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];

        $variabile = generateRandomString();

        $codeRecovery = $i_conn->prepare("UPDATE `recuperoPsw` SET `codiceUnico` = ? WHERE email = ?");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();
        $codeRecovery->bind_result($result);

        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code='.$variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($email, $subject, $message, $headers);

        return $result;
    }

    function getQuestionsFromGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];

        $variabile = generateRandomString();

        $codeRecovery = $i_conn->prepare("UPDATE `recuperoPsw` SET `codiceUnico` = ? WHERE email = ?");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();
        $codeRecovery->bind_result($result);

        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code='.$variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($email, $subject, $message, $headers);

        return $result;
    }

    function addBridgeQuestions($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        $domande = $dataJson["domande"];

        foreach($domande as $qstn) {
            echo $qstn;
            // Insert a row into the table
            $bridgeQuestQuery = $i_conn->prepare("INSERT INTO `bridgeToQuestionsGames` (`IDgame`, `IDquestion`) VALUES (?, ?)");
            $bridgeQuestQuery->bind_param("ii", $gameID, $qstn);

            $bridgeQuestQuery->execute();
        }

        return $result;
    }

    function updateBridgeQuestions($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        // $domande = $dataJson["domande"];
        
        // echo $qstn;
        // Insert a row into the table
        $bridgeQuestQuery = $i_conn->prepare("DELETE FROM `bridgeToQuestionsGames` WHERE IDgame = ?");
        $bridgeQuestQuery->bind_param("i", $gameID);

        $bridgeQuestQuery->execute();
        

        return $result;
    }

    function saveGameResults($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $pazienteID = $dataJson["pazienteID"];
        $giocoID = $dataJson["giocoID"];
        $rispTotali = $dataJson["rispTotali"];
        $rispCorrette = $dataJson["rispCorrette"];
        $rispSbagliate = $dataJson["rispSbagliate"];
        $dataSvolgimento = $dataJson["dataSvolgimento"];
        
        // Insert a row into the table
        $insertGameResultQuery = $i_conn->prepare(
            "INSERT INTO `resultsGames` (`pazienteID`, `giocoID`, `rispTotali`, `rispCorrette`, `rispSbagliate`, `dataSvolgimento`)
            VALUES (?, ?, ?, ?, ?, ?)"
        );
        $insertGameResultQuery->bind_param("iiiiis", $pazienteID, $giocoID, $rispTotali, $rispCorrette, $rispSbagliate, $dataSvolgimento);

        $insertGameResultQuery->execute();
        $insertGameResultQuery->bind_result($result);

        return $result;
    }

    function getPatientStatistics($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $pazienteID = $dataJson["pazienteID"];
        
        $retrieveQuestionsList = $i_conn->prepare("SELECT * FROM `resultsGames` WHERE pazienteID = ?");
        $retrieveQuestionsList->bind_param("i", $pazienteID);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function getTestResultList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);

        $doctorID = $dataJson["doctorID"];
        
        $getTestResult = $i_conn->prepare(
            "SELECT storicoTest.ID, storicoTest.tipoTest, storicoTest.punteggioTest, storicoTest.dataSvolgimento, patients.nome, patients.cognome 
            FROM `storicoTest` JOIN `patients` ON storicoTest.pazienteID = patients.ID WHERE storicoTest.doctorID = ?"
        );
        $getTestResult->bind_param("i", $doctorID);
        $getTestResult->execute();
        $result = $getTestResult->get_result();
        return $result;
    }
    function getSingleTestMMSE($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);

        $testID = $dataJson["testID"];
        
        $getSingleTest = $i_conn->prepare(
            "SELECT domandeTestMMSE.ID, domandeTestMMSE.domanda, resultsTestMMSE.risposta FROM domandeTestMMSE JOIN resultsTestMMSE ON resultsTestMMSE.domandaID = domandeTestMMSE.ID WHERE resultsTestMMSE.sessionID = ?"
        );

        $getSingleTest->bind_param("i", $testID);
        $getSingleTest->execute();
        $result = $getSingleTest->get_result();
        return $result;
    }
    function getSingleTestMoCA($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);

        $testID = $dataJson["testID"];
        
        $getSingleTest = $i_conn->prepare(
            "SELECT domandeTestMoCA.ID, domandeTestMoCA.domanda, resultsTestMoCA.risposta FROM domandeTestMoCA JOIN resultsTestMoCA ON resultsTestMoCA.domandaID = domandeTestMoCA.ID WHERE resultsTestMoCA.sessionID = ?"
        );

        $getSingleTest->bind_param("i", $testID);
        $getSingleTest->execute();
        $result = $getSingleTest->get_result();
        return $result;
    }
    function updateTestResultList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $pazienteID = $dataJson["pazienteID"];
        $tipoTest = $dataJson["tipoTest"];
        $scoreTest = $dataJson["scoreTest"];
        $date = $dataJson["dataSvolgimento"];
        $arrayRisposte = $dataJson["arrayRisposte"];
        $doctorID = $dataJson["doctorID"];
        
        $saveTestResult = $i_conn->prepare("INSERT INTO `storicoTest` (`pazienteID`, `doctorID`, `tipoTest`, `punteggioTest`, `dataSvolgimento`) VALUES (?, ?, ?, ?, ?)");
        $saveTestResult->bind_param("iisis", $pazienteID, $doctorID, $tipoTest, $scoreTest, $date);
        
        $saveTestResult->execute();
        $lastInsertedID = $saveTestResult->insert_id;

        if($tipoTest == 'MoCA'){
            foreach($arrayRisposte as $risposta){
                $insertRisposta = $i_conn->prepare(
                    "INSERT INTO `resultsTestMoCA` (`sessionID`, `domandaID`, `risposta`) VALUES (?, ?, ?)"
                );
                $insertRisposta->bind_param("iii", $lastInsertedID, $risposta['domanda'], $risposta['risposta']);
                $insertRisposta->execute();
            }
        }
        else{
            foreach($arrayRisposte as $risposta){
                $insertRisposta = $i_conn->prepare(
                    "INSERT INTO `resultsTestMMSE` (`sessionID`, `domandaID`, `risposta`) VALUES (?, ?, ?)"
                );
                $insertRisposta->bind_param("iii", $lastInsertedID, $risposta['domanda'], $risposta['risposta']);
                $insertRisposta->execute();
            }
        }

        $saveTestResult->bind_result($result);
        return $result;
    }

    function saveResultMMSE($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $resultMMSE = $dataJson["resultMMSE"];
        $ID = $dataJson["ID"];
        
        $saveTestResult = $i_conn->prepare("UPDATE `patients` SET `resultMMSE` = ? WHERE `patients`.`ID` = ?");
        $saveTestResult->bind_param("ii", $resultMMSE, $ID);
        
        $saveTestResult->execute();
        $saveTestResult->bind_result($result);
        return $result;
    }

    function saveResultMoCA($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $resultMoCA = $dataJson["resultMoCA"];
        $ID = $dataJson["ID"];
        
        $saveTestResult = $i_conn->prepare("UPDATE `patients` SET `resultMOCA` = ? WHERE `patients`.`ID` = ?");
        $saveTestResult->bind_param("ii", $resultMoCA, $ID);
        
        $saveTestResult->execute();
        $saveTestResult->bind_result($result);
        return $result;
    }

    function getTestsList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $defaultTest = $dataJson["defaultTest"];
        
        $retrieveTestsList = $i_conn->prepare(
            "SELECT * FROM `tests`");
        $retrieveTestsList->bind_param("i", $defaultTest);
        
        $retrieveTestsList->execute();
        $result = $retrieveTestsList->get_result();
        return $result;
    }
    function getTestsQuestionsAreaCog_1($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        // $defaultTest = $dataJson["defaultTest"];
        
        $retrieveQuestionsList = $i_conn->prepare(
            "SELECT * 
            FROM `testQuestions_AreaCog_1` JOIN `bridgeTestToQuestionsAreaCog_1` ON `testQuestions_AreaCog_1`.`qstnID` = `bridgeTestToQuestionsAreaCog_1`.`IDqstn_AC1`;"
        );
        // $retrieveGamesList->bind_param("i", $defaultTest);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }
    function getTestsQuestionsAreaCog_2($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        // $defaultTest = $dataJson["defaultTest"];
        
        $retrieveQuestionsList = $i_conn->prepare(
            "SELECT * 
            FROM `testQuestions_AreaCog_2` JOIN `bridgeTestToQuestionsAreaCog_2` ON `testQuestions_AreaCog_2`.`qstnID` = `bridgeTestToQuestionsAreaCog_2`.`IDqstn_AC2`;"
        );
        // $retrieveGamesList->bind_param("i", $defaultTest);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function getTestsQuestionsAreaCog_3($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        // $defaultTest = $dataJson["defaultTest"];
        
        $retrieveQuestionsList = $i_conn->prepare(
            "SELECT * 
            FROM `testQuestions_AreaCog_3` JOIN `bridgeTestToQuestionsAreaCog_3` ON `testQuestions_AreaCog_3`.`qstnID` = `bridgeTestToQuestionsAreaCog_3`.`IDqstn_AC3`;"
        );
        // $retrieveGamesList->bind_param("i", $defaultTest);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function getTestsQuestionsAreaCog_5($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        // $defaultTest = $dataJson["defaultTest"];
        
        $retrieveQuestionsList = $i_conn->prepare(
            "SELECT * 
            FROM `testQuestions_AreaCog_5` JOIN `bridgeTestToQuestionsAreaCog_5` ON `testQuestions_AreaCog_5`.`qstnID` = `bridgeTestToQuestionsAreaCog_5`.`IDqstn_AC5`;"
        );
        // $retrieveGamesList->bind_param("i", $defaultTest);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function getPatologies($i_conn) {
    	$result = $i_conn->query("SELECT * FROM elencoPatologie;");
        return $result;
    }

    function getTherapies($i_conn) {
    	$result = $i_conn->query("SELECT * FROM elencoTerapie;");
        return $result;
    }

    function saveNewPatologyWithTherapies($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $patologia = $dataJson["patologia"];
        $terapieAssociate = $dataJson["terapieAssociate"];
        
        // Insert a row into the table
        $insertPatology = $i_conn->prepare(
            "INSERT INTO `elencoPatologie` (`nomePatologia`) VALUES (?)"
        );
        $insertPatology->bind_param("s", $patologia);
        $insertPatology->execute();
        $patologyID = $insertPatology->insert_id;

        foreach($terapieAssociate as $terapia){
            $insertNewTerapie = $i_conn->prepare(
                "INSERT INTO `elencoTerapie` (`terapia`, `note`, `patolog_ID`) VALUES (?, ?, ?)"
            );
            $insertNewTerapie->bind_param("ssi", $terapia['terapia'], $terapia['note'], $patologyID);
            $insertNewTerapie->execute();
        }
        
        return $result;
    }

    function updatePatologyName($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $nomePatologia = $dataJson["nomePatologia"];
        $patologiaID = $dataJson["patologiaID"];
        
        $updatePatology = $i_conn->prepare("UPDATE `elencoPatologie` SET `nomePatologia` = ? WHERE `elencoPatologie`.`patologiaID` = ?");
        $updatePatology->bind_param("si", $nomePatologia, $patologiaID);
        $updatePatology->execute();

        return $result;
    }
    
    function deletePatology($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $patologiaID = $dataJson["patologiaID"];
        
        $deletePatology = $i_conn->prepare(
            "DELETE FROM `elencoPatologie` WHERE patologiaID = ?"
        );
        $deletePatology->bind_param("i", $patologiaID);
        $deletePatology->execute();

        return $result;
    }

    function saveNewTherapy($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $terapia = $dataJson["terapia"];
        $note = $dataJson["note"];
        $patologiaID = $dataJson["patologiaID"];
        
        $saveNewTherapy = $i_conn->prepare(
            "INSERT INTO `elencoTerapie` (`terapia`, `note`, `patolog_ID`) VALUES (?, ?, ?)"
        );
        $saveNewTherapy->bind_param("ssi", $terapia, $note, $patologiaID);
        $saveNewTherapy->execute();

        return $result;
    }

    function deleteTherapy($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $terapiaID = $dataJson["terapiaID"];
        
        $deleteTherapy = $i_conn->prepare(
            "DELETE FROM `elencoTerapie` WHERE terapiaID = ?"
        );
        $deleteTherapy->bind_param("i", $terapiaID);
        $deleteTherapy->execute();

        return $result;
    }

    function editTherapy($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $terapiaID = $dataJson["terapiaID"];
        $terapia = $dataJson["terapia"];
        $note = $dataJson["note"];
        
        $editTherapy = $i_conn->prepare("UPDATE `elencoTerapie` SET `terapia` = ?, `note` = ? WHERE `elencoTerapie`.`terapiaID` = ?");
        $editTherapy->bind_param("ssi", $terapia, $note, $terapiaID);
        $editTherapy->execute();

        return $result;
    }
    
?>
