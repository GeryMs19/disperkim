<?php

$host = "localhost";
$user = "postgres";
$password = "asmoro14";
$dbname = "gis_bapenda_pesawaran";

$con = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if(!$con){
    die("Connection failed.");
}

?>