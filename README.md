# Fop
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Bot Pairing</title>
</head>
<body>
    <h1>WhatsApp Bot Pairing</h1>
    <form id="whatsappBotForm">
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required><br><br>
        <label for="apikey">API Key:</label>
        <input type="text" id="apikey" name="apikey" placeholder="Enter your API key" required><br><br>
        <button type="submit">Pair Bot</button>
    </form>

    <script>
        document.getElementById('whatsappBotForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const phone = document.getElementById('phone').value;
            const apikey = document.getElementById('apikey').value;

            const response = await fetch('/pair-bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone, apikey })
            });

            const result = await response.json();
            if (result.success) {
                alert('Bot paired successfully!');
            } else {
                alert('Failed to pair bot. Please check your details.');
            }
        });
    </script>
</body>
</html>
