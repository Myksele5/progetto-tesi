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
    case "getPatientsList":
        $query_result = getPatientsList($conn);
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
    case "getBridge":
        $query_result = getBridge($conn);
        break;
    default:
    	break;
	}
    
    if($query_result){
        echo parseResultToJson($query_result);
    }
    // echo parseResultToJson($query_result);
    // $gigino = parseResultToJson($query_result);
    // if($gigino == null){
    //     echo $query_result;
    // }
    // else{
    //     echo $gigino;
    // }
    
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
    
    	$insertCommentQuery = $i_conn->prepare("SELECT accounts.UID, accounts.titolo FROM `accounts` WHERE email = ? AND password = ?"); 
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
        
        $insertNewAccount = $i_conn->prepare("INSERT INTO `accounts` (`nome`, `cognome`, `titolo`, `email`, `password`) VALUES (?, ?, ?, ?, ?)");
        $insertNewAccount->bind_param("sssss", $nome, $cognome, $titolo, $email, $password);
        $insertNewAccount->execute();
        
        $insertNewAccount->bind_result($result);
        return $result;
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

    function addPaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doct_UID = $dataJson["doct_UID"];
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $patologia = $dataJson["patologia"];
        $medicine = $dataJson["medicine"];
        $terapia = $dataJson["terapia"];
        $note = $dataJson["note"];
        // $statistiche = $dataJson["statistiche"];
        
        $insertNewPatient = $i_conn->prepare(
            "INSERT INTO `patients` (`doct_UID`, `nome`, `cognome`, `city`, `codiceFiscale`, `dataNascita`, `patologia`, `medicine`, `terapia`, `note`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $insertNewPatient->bind_param("isssssssss", $doct_UID, $nome, $cognome, $city, $codiceFiscale, $dataNascita, $patologia, $medicine, $terapia, $note);
        $insertNewPatient->execute();
        
        $insertNewPatient->bind_result($result);
        return $result;
    }

    function updatePaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $patologia = $dataJson["patologia"];
        $medicine = $dataJson["medicine"];
        $terapia = $dataJson["terapia"];
        $note = $dataJson["note"];
        $ID = $dataJson["ID"];
        // $statistiche = $dataJson["statistiche"];
        
        $updatePatient = $i_conn->prepare(
            "UPDATE `patients` SET `nome` = ?, `cognome` = ?, `city` = ?, `codiceFiscale` = ?, `dataNascita` = ?, `patologia` = ?, `medicine` = ?, `terapia` = ?, `note` = ?
            WHERE `patients`.`ID` = ?"
        );
        $updatePatient->bind_param("sssssssssi", $nome, $cognome, $city, $codiceFiscale, $dataNascita, $patologia, $medicine, $terapia, $note, $ID);
        $updatePatient->execute();
        
        $updatePatient->bind_result($result);
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
        
        $insertNewQuestion = $i_conn->prepare(
            "INSERT INTO `gamesQuestions` (`doctor_UID`, `tipoGioco`, `categoria`, `domanda`, `rispCorrettaN1`, `rispCorrettaN2`, `rispCorrettaN3`, `rispCorrettaN4`,
             `rispSbagliataN1`, `rispSbagliataN2`, `rispSbagliataN3`, `rispSbagliataN4`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $insertNewQuestion->bind_param("isssssssssss", $doctor_UID, $tipoGioco, $categoria, $domanda, $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
                                        $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4);
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
        $ID = $dataJson["ID"];
        
        $updateQuestion = $i_conn->prepare(
            "UPDATE `gamesQuestions` SET `domanda` = ?, `rispCorrettaN1` = ?, `rispCorrettaN2` = ?, `rispCorrettaN3` = ?, `rispCorrettaN4` = ?,
             `rispSbagliataN1` = ?, `rispSbagliataN2` = ?, `rispSbagliataN3` = ?, `rispSbagliataN4` = ?
            WHERE `gamesQuestions`.`ID` = ?"
        );
        $updateQuestion->bind_param("sssssssssi", $domanda, $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
                                        $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4, $ID);
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
        $domande = $dataJson["domande"];
        
        $insertNewGame = $i_conn->prepare(
            "INSERT INTO `games` (`creatorID`, `nomeGioco`, `tipoGioco`, `livelloGioco`, `categoriaGioco`, `domande`) VALUES (?, ?, ?, ?, ?, ?)"
        );
        $insertNewGame->bind_param("isssss", $creatorID, $nomeGioco, $tipoGioco, $livelloGioco, $categoriaGioco, $domande);
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
        $gameID = $dataJson["gameID"];
        
        $updateGame = $i_conn->prepare("UPDATE `games` SET `nomeGioco` = ?, `livelloGioco` = ?, `categoriaGioco` = ? WHERE `games`.`gameID` = ?");
        $updateGame->bind_param("sssi", $nomeGioco, $livelloGioco, $categoriaGioco, $gameID);
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
        $message = 'http://localhost:3000/psw_recovery?code='.$variabile;
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
        $message = 'http://localhost:3000/psw_recovery?code='.$variabile;
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
        $message = 'http://localhost:3000/psw_recovery?code='.$variabile;
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
            $bridgeQuestQuery = $i_conn->prepare("INSERT INTO `bridgeToQuestionsGames`(`IDgame`, `IDquestion`) VALUES (?, ?)");
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

    function getBridge($i_conn){

        $result = $i_conn->query("SELECT * FROM `bridgeToQuestionsGames`");

        return $result;
    }
    
?>
