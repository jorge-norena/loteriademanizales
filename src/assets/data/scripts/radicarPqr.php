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

$json = file_get_contents('php://input');
$params = json_decode($json, true);

require './spreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$arrRespuesta = [];
$arrRespuesta['codigoRespuesta'] = '-1';
// Leo el archio de de contenido de funcionarios
$arrFuncionarios = json_decode(file_get_contents("../cont.json"), true);
$arrReceptores = [];

if (isset($params['nombre']) && strlen($params['nombre']) > 2 ) {
        foreach ($arrFuncionarios['contactos'] as $key => $value) {
                if ($value['pqr'] == "1") {
                        array_push($arrReceptores, $value['mail']);
                }
        }
        $spreadsheet = new Spreadsheet();
        $spreadsheet->setActiveSheetIndex(0);
        $spreadsheet->getProperties()
                ->setCreator('Jorge Noreña Desarrollador Fullstack')
                ->setLastModifiedBy('Jorge Noreña Desarrollador Fullstack')
                ->setTitle('PQR Lotería de Manizales')
                ->setSubject('Lotería de Manizales')
                ->setDescription('Solución integral de pqr')
                ->setKeywords('loteria de manizales, emsa, pqr')
                ->setCategory('Soporte');

        $spreadsheet->getDefaultStyle()
                ->getFont()
                ->setName('Arial')
                ->setSize(16);


        $sheetPqr = $spreadsheet->getActiveSheet();
        $sheetPqr->setCellValue('A1', 'Ticket')
                ->setCellValue('B1', 'Fecha')
                ->setCellValue('C1', 'Caso')
                ->setCellValue('D1', 'Nombre')
                ->setCellValue('E1', 'Apellido')
                ->setCellValue('F1', 'Identificacion')
                ->setCellValue('G1', 'Email')
                ->setCellValue('H1', 'Direccion')
                ->setCellValue('I1', 'Ciudad')
                ->setCellValue('J1', 'Pais')
                ->setCellValue('K1', 'ip');


        $dateTimeNow = time();
        $ticket = strval(time());
        $arrRespuesta['respuesta'] = $ticket;
        $sheetPqr->setCellValue('A2', $ticket)
                ->setCellValue('B2', \PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel($dateTimeNow))
                ->setCellValue('C2', $params['caso'])
                ->setCellValue('D2', $params['nombre'])
                ->setCellValue('E2', $params['apellido'])
                ->setCellValue('F2', $params['identificacion'])
                ->setCellValue('G2', $params['email'])
                ->setCellValue('H2', $params['direccion'])
                ->setCellValue('I2', $params['ciudad'])
                ->setCellValue('J2', $params['pais'])
                ->setCellValue('K2', $_SERVER['REMOTE_ADDR']);

        $spreadsheet->getActiveSheet()
                ->getStyle('B2')
                ->getNumberFormat()
                ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_DATETIME);

        $spreadsheet->getActiveSheet()
                ->getColumnDimension('A')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('B')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('D')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('E')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('F')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('G')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('H')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('I')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('J')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('K')
                ->setAutoSize(true);

        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(80);
        $spreadsheet->getActiveSheet()->getStyle('C2')->getAlignment()->setWrapText(true);

        $spreadsheet->getActiveSheet()->getProtection()->setSheet(true); // Needs to be set to true in order to enable any worksheet protection!
        $spreadsheet->getActiveSheet()->protectCells('A1:K2', '·$%&/(192837465)--<>');

        $sheetPqr->setTitle('PQR');


        $spreadsheet->createSheet(1);
        $spreadsheet->setActiveSheetIndex(1);
        $sheetResp = $spreadsheet->getActiveSheet();
        $sheetResp->setCellValue('A1', 'Fecha')
                ->setCellValue('B1', 'Funcionario')
                ->setCellValue('C1', 'Cargo')
                ->setCellValue('D1', 'Respuesta')
                ->setCellValue('E1', 'Aprueba');

        $spreadsheet->getActiveSheet()
                ->getColumnDimension('A')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('B')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('C')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('D')
                ->setAutoSize(true);
        $spreadsheet->getActiveSheet()
                ->getColumnDimension('E')
                ->setAutoSize(true);

        $sheetResp->setTitle('RESP');

        $writer = new Xlsx($spreadsheet);
        $nombreArchivo = "../pqr/N_".$ticket.".xlsx";
        $writer->save($nombreArchivo);

        $arrRespuesta['codigoRespuesta'] = '0';
}

echo json_encode($arrRespuesta);