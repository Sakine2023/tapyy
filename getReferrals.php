<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];

$query = "SELECT id FROM users WHERE username = '$username'";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);

if ($user) {
    $userId = $user['id'];
    $referralQuery = "SELECT username FROM users WHERE referred_by = $userId";
    $referralResult = mysqli_query($conn, $referralQuery);
    $referrals = [];

    while ($row = mysqli_fetch_assoc($referralResult)) {
        $referrals[] = $row['username'];
    }

    echo json_encode(['referrals' => $referrals]);
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
