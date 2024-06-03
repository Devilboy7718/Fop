const { WAConnection, MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const pino = require('pino');
const logger = pino();

const conn = new WAConnection();

conn.logger.level = 'warn'; // Set log level to warn
conn.version = [2, 2143, 3]; // Set the WhatsApp Web version

// Load previously saved session
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json');

conn.on('open', () => {
    console.log('Connection opened');
    const authInfo = conn.base64EncodedAuthInfo();
    fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')); // Save session
    console.log('Session saved');
});

conn.on('chat-update', async (chatUpdate) => {
    if (!chatUpdate.hasNewMessage) return;

    const message = chatUpdate.messages.all()[0];
    if (!message.message) return;

    const from = message.key.remoteJid;
    const type = Object.keys(message.message)[0];
    const sender = message.key.participant || from;

    // Log received message
    console.log(`Message from ${sender}: ${message.message.conversation || message.message[type].caption || ''}`);

    if (type === MessageType.text) {
        const text = message.message.conversation;

        if (text === '!ping') {
            const response = 'Pong!';
            await conn.sendMessage(from, response, MessageType.text);
            logger.info(`Sent reply to ${from}`);
        }
    }
});

conn.on('close', ({ reason, isReconnecting }) => {
    console.log(`Disconnected: ${reason}. Reconnecting: ${isReconnecting}`);
});

// Connect to WhatsApp
(async () => {
    await conn.connect();
})();

