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
    default:
    	break;
	}
    
    //echo $query_result;
    echo parseResultToJson($query_result);
    
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
    
?>
