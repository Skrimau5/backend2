require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = async (to, body) => {
    try {
        const message = await client.messages.create({
            body,
            from: '+12168209941',
            to
        });
        console.log('Mensaje enviado:', message.sid);
        return 'Mensaje enviado correctamente.';
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
};

module.exports = sendSMS;
