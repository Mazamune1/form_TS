<?php
header("Content-Type: application/json");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

// ตรวจสอบและดึงค่าจาก $data['date'], $data['start_time'], ...
// เช่น:
$date = $data['date'];
$startTime = $data['start_time'];
$plate = $data['plate'];
// และอื่น ๆ...

// สมมุติบันทึกลง DB ได้สำเร็จ:
echo json_encode(["status" => "success"]);
?>
