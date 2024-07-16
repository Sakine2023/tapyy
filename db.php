<?php
$servername = "localhost";
$username = "root";
$password = ""; // در صورتی که رمز عبور تعیین کرده‌اید آن را وارد کنید
$dbname = "game_db";

// ایجاد ارتباط
$conn = new mysqli($servername, $username, $password, $dbname);

// بررسی ارتباط
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
