const nodemailer = require('nodemailer');

const config = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: 'sendmail-test@ukr.net',
        pass: process.env.MAIL_PASSWORD,
    },
};

const transport = nodemailer.createTransport(config);

const sendMail = async (mail) => {
    await transport.sendMail({ ...mail, from: 'sendmail-test@ukr.net' })
    return true;
};

module.exports = sendMail;