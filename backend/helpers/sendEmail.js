const app = require('../server/server');

async function sendEmail(email, subject, text) {


  const serviceEmail = app.get('serviceEmail');


  await app.models.Email.send({
    to: email,
    from: serviceEmail,
    subject,
    text
  });

}

module.exports = sendEmail;
