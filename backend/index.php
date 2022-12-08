<?php
//Get Heroku ClearDB connection information
// $cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
// $cleardb_server = "eu-cdbr-west-03.cleardb.net";
// $cleardb_username = "b41769f3d78953";
// $cleardb_password = "f3e17143";
// $cleardb_server = $cleardb_url["host"];
// $cleardb_username = $cleardb_url["user"];
// $cleardb_password = $cleardb_url["pass"];
// $cleardb_db = substr($cleardb_url["path"],1);
// $active_group = 'default';
// $query_builder = TRUE;
// // Connect to DB
// $conn = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);
// echo "AEEEEEEEEE";
// Header add Access-Control-Allow-Origin "*"
// // Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header("Content-type: application/json; charset=UTF-8");
define('DOC_ROOT_PATH', $_SERVER['DOCUMENT_ROOT'].'/');
require "./src/config/database.php";
require "./constants.php";
require "./src/Product.php";
require "./src/ProductController.php";
require "./src/HandleError.php";

set_error_handler("HandleError::errorExeptionHandle");
set_exception_handler("HandleError::errorHandle");

$cleardb_server = "eu-cdbr-west-03.cleardb.net";
$cleardb_username = "b41769f3d78953";
$cleardb_password = "f3e17143";
$cleardb_db = "heroku_199dde13dce4229";
$active_group = 'default';
$query_builder = TRUE;

$db = new Connection($cleardb_server, $cleardb_db, $cleardb_username, $cleardb_password);
$db->connect();
$product = new Product($db);
$controller = new ProductController($product);
$controller->processRequest($_SERVER["REQUEST_METHOD"]);