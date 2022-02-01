const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

//configuración de mensaje  
function getMessage(emailUser='', nameUser='') {
  const body = `Hello ${nameUser}, 
                welcome to disney world`;
  return {
    to: emailUser,
    from: 'omaro_oal@hotmail.com', 
    subject: 'welcome to disney world',
    text: body,
    html: `<p>${body}</p>`,
  };
}

//enviar el correo para un nuevo usuario
async function sendEmail(emailUser='', nameUser='') {
  try {
    await sendGridMail.send(getMessage(emailUser, nameUser));
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

(async () => {
  console.log('Sending test email');
  await sendEmail();
})();

module.exports = {
    sendEmail
};