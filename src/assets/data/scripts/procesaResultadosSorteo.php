<?php
error_reporting(E_ALL);
set_time_limit(0);
//include the file that loads the PhpSpreadsheet classes
// require 'spreadsheet/vendor/autoload.php';
require_once './spreadsheet/src/Bootstrap.php';

$arrRespuesta['codigoRespuesta'] = '-1';
//Revisar si existe un archivo usort.json actualmente.
if( file_exists('../usort.json')){
  $dataExistente = file_get_contents('../usort.json');
  $arrDataExistente = json_decode( $dataExistente, true );
  // print_r($arrDataExistente);
  $numsort = $arrDataExistente['sorteo'][0]['num'];
  $fecsort = $arrDataExistente['sorteo'][0]['fec'];
  $dirAno = date("Y");
  $ruta = "../sorteos/$dirAno/$numsort.$fecsort.json";
  // echo $ruta;
  $archivoHist = fopen ($ruta,'w');
  $resEscrituraHist = fwrite ($archivoHist, $dataExistente);
	if($resEscrituraHist){
		$arrRespuesta['codigoRespuesta'] = "0";
	}else{
    $arrRespuesta['codigoRespuesta'] = "-1";
  }

	fclose ($archivoHist);
}


$inputFileType = 'Xlsx';
$inputFileName = './sampleData/example1.xls';

//create directly an object instance of the IOFactory class, and load the xlsx file
$fxls ='../plantillas/ultimoSorteo.xlsx';
$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
$reader->setReadDataOnly(false);
$spreadsheet = $reader->load($fxls);






$spreadsheet->setActiveSheetIndex(0);
//read excel data and store it into an array
$arrSorteo = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
/* $xls_data contains this array:
[1=>['A'=>'Domain', 'B'=>'Category', 'C'=>'Nr. Pages'], 2=>['A'=>'CoursesWeb.net', 'B'=>'Web Development', 'C'=>4000], 3=>['A'=>'MarPlo.net', 'B'=>'Courses & Games', 'C'=>15000]]
*/
$spreadsheet->setActiveSheetIndex(1);
$arrResultados = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
// print_r($arrSorteo);
$arrRespuesta = [];
$arrRespuesta['sorteo'] = [];
$arrRespuesta['resultados'] = [];

$columnasSorteo = count($arrSorteo[1]);

$registrosSorteo = count($arrSorteo)-1;

$arrMapaColumnas = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O');


for($s=2; $s<$registrosSorteo + 2; $s++){
  $arrTmp = [];
  for($c=0; $c<$columnasSorteo; $c++){
    // print_r($arrSorteo[1]);
    $tmpInd = $arrMapaColumnas[$c];
    $encabezado = $arrSorteo[1][$tmpInd];
    $contenido = $arrSorteo[$s][$tmpInd];

    $arrTmp[$encabezado] = $contenido;
    
    // 
    // echo $encabezado . ' - ' . $contenido . '<br>';
    
  }
  array_push($arrRespuesta['sorteo'], $arrTmp);
}

$columnasResultados = count($arrResultados[1]);
$registrosResultados = count($arrResultados)-1;


for($s=2; $s<$registrosResultados + 2; $s++){
  $arrTmp = [];
  for($c=0; $c<$columnasResultados; $c++){
    // print_r($arrSorteo[1]);
    $tmpInd = $arrMapaColumnas[$c];
    $encabezado = $arrResultados[1][$tmpInd];
    $contenido = $arrResultados[$s][$tmpInd];
    if($c == 2){
      $contenido = fixDigitos( $contenido, 4);
    }
    if($c == 3){
      $contenido = fixDigitos( $contenido, 3);
    }
    // echo "Cont: $contenido $c <br>";
    $arrTmp[$encabezado] = $contenido;
    
    // print_r($arrSorteo[2][$encabezado]);
    // echo $encabezado . ' ' . $contenido . '<br>';
    
  }
  array_push($arrRespuesta['resultados'], $arrTmp);
}

$contJson = json_encode($arrRespuesta, true);
$archivo = fopen ('../usort.json','w');
$resEscritura = fwrite ($archivo, $contJson);
	if($resEscritura){
		$arrRespuesta['codigoRespuesta'] = "0";
	}else{
    $arrRespuesta['codigoRespuesta'] = "-1";
  }

	fclose ($archivo);


  
// print_r($arrRespuesta);
echo json_encode($arrRespuesta, true);

//now it is created a html table with the excel file data
// $html_tb ='<table border="1"><tr><th>'. implode('</th><th>', $xls_data[1]) .'</th></tr>';
// $nr = count($xls_data); //number of rows
// for($i=2; $i<=$nr; $i++){
//   $html_tb .='<tr><td>'. implode('</td><td>', $xls_data[$i]) .'</td></tr>';
// }
// $html_tb .='</table>';

// echo $html_tb; 

function fixDigitos( $numero, $fixNumero){
  $str_numero = strval($numero);
  $longitud = strlen($str_numero);
  if( $longitud < $fixNumero){
    $dif = $fixNumero - $longitud;
    $fix = "";
    for($i = 0; $i < $dif; $i++){
      $fix .= "0";
    }
    $str_numero = $fix . $str_numero;
  }
  return $str_numero;
}