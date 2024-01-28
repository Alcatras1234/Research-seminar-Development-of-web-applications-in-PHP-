<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
$input = json_decode(file_get_contents("php://input"), true);
echo json_encode(array_slice(json_decode(file_get_contents("items.json"), true), $input["nth"] * 4, 4));

?>