function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;

    if (message.trim() !== '') {
        appendMessage('You', message);
        messageInput.value = '';

        // Send message to the server (using a simple AJAX request)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('message=' + encodeURIComponent(message));
    }
}

function appendMessage(sender, message) {
    var chatOutput = document.getElementById('chat-output');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    chatOutput.appendChild(messageElement);

    // Scroll to the bottom of the chat container
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Polling to check for new messages every 2 seconds (you might want to use WebSockets for real-time updates)
setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'server.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            if (response.trim() !== '') {
                var data = JSON.parse(response);
                appendMessage(data.sender, data.message);
            }
        }
    };
    xhr.send();
}, 2000);
