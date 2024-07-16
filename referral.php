<?php
include 'db.php';

$referralCode = $_GET['code'];

$query = "SELECT id FROM users WHERE referral_code = '$referralCode'";
$result = mysqli_query($conn, $query);
$referrer = mysqli_fetch_assoc($result);

if ($referrer) {
    $referrerId = $referrer['id'];

    // کد اضافه کردن کاربر جدید
    $newUsername = "newUser"; // باید با نام کاربری جدید جایگزین شود
    $insertQuery = "INSERT INTO users (username, referred_by) VALUES ('$newUsername', $referrerId)";
    mysqli_query($conn, $insertQuery);

    $newUserId = mysqli_insert_id($conn);

    // ذخیره ارجاع
    $referralQuery = "INSERT INTO referrals (user_id, referred_user_id) VALUES ($referrerId, $newUserId)";
    mysqli_query($conn, $referralQuery);

    // دادن پاداش به کاربر ارجاع دهنده
    $rewardQuery = "UPDATE users SET coins = coins + 10 WHERE id = $referrerId";
    mysqli_query($conn, $rewardQuery);

    echo "Referral successful. Welcome to the game!";
} else {
    echo "Invalid referral link.";
}
?>
