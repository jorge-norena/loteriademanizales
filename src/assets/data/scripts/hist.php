<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Cache-Control, Pragma, Expires");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$arrRespuesta['codigoRespuesta'] = '-1';
$arrRespuesta['respuesta'] = [];
if($handler = opendir('../sorteos/2021')){
    while (($content = readdir($handler)) !== FALSE){
        if ($content != "." && $content != ".." && $content != "Thumb.db" && $content != ".DS_Store"){
            array_unshift($arrRespuesta['respuesta'], $content);
        }
    }
}
if( count($arrRespuesta['respuesta']) > 0){
    $arrRespuesta['codigoRespuesta'] = '0';
}
sort($arrRespuesta['respuesta']);
$arrRespuesta['respuesta'] = array_reverse($arrRespuesta['respuesta']);
echo json_encode($arrRespuesta, true);