<?php
// Check if the message is received through POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the message from POST data
    $message = $_POST['message'];

    // Save the message to a file (you might want to use a database in a real-world application)
    file_put_contents('chatlog.txt', json_encode(['sender' => 'User', 'message' => $message]));

    // Respond with a success message
    echo 'Message sent successfully.';
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the latest message from the file
    $latestMessage = file_get_contents('chatlog.txt');

    // Respond with the latest message (or an empty JSON if there's no message yet)
    echo $latestMessage ?: json_encode(['sender' => '', 'message' => '']);
}
?>
