const nodemailer = require('nodemailer');

const { MAIL_LOGIN, MAIL_PASSWORD } = process.env;

const config = {
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: MAIL_LOGIN,
        pass: MAIL_PASSWORD
    }
};

const transport = nodemailer.createTransport(config);

const sendMail = async (mail) => {
    await transport.sendMail({ ...mail, from: 'outlook_d8a1e551f0fab309@outlook.com' })
    return true;
};

module.exports = sendMail;