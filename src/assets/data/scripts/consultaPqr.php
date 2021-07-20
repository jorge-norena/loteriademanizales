<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$arrRespuesta = [];
$arrRespuesta['codigoRespuesta'] = "-1";
$json = file_get_contents('php://input');
$params = json_decode($json, true);
$arrPrefijos = ["N", "A", "R"];
$arrCasos = [];
$dirPqr = "../pqr/";
if ($handler = opendir($dirPqr)) {
    while (($content = readdir($handler)) !== FALSE) {
        $pref = substr($content, 0, 1);
        if (in_array($pref, $arrPrefijos)) {
            array_push($arrCasos, $content);
        }
    }
}

foreach ($arrCasos as $value) {
    $ticket = substr($value, 2, strlen($value)-1);
    // echo "$ticket - ";
    if($ticket == $params['ticketid'].".xlsx"){
        $arrRespuesta['codigoRespuesta'] = "0";
        $arrRespuesta['respuesta'] = substr($value, 0, 1);

    }
}

echo json_encode($arrRespuesta, true);
// print_r($arrCasos);