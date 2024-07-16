<?php
include 'db.php'; // فایل شامل ارتباط با پایگاه داده

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];

$query = "SELECT id, referral_code FROM users WHERE username = '$username'";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);

if ($user) {
    $referralCode = $user['referral_code'];
    if (!$referralCode) {
        $referralCode = bin2hex(random_bytes(5)); // تولید کد منحصر به فرد
        $updateQuery = "UPDATE users SET referral_code = '$referralCode' WHERE id = ".$user['id'];
        mysqli_query($conn, $updateQuery);
    }

    $referralLink = "https://yourgame.com/referral.php?code=$referralCode";
    echo json_encode(['referralLink' => $referralLink]);
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
