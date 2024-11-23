const amqp = require('amqplib');
const dotenv = require('dotenv').config();

async function sendMessage(queue = 'hello', message = 'Mensagem de teste atualizada!') {
    const amqpURL = process.env.URL;

    try {
        const connection = await amqp.connect(amqpURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada: ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit();
        }, 500);

    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
    }
}

sendMessage();
