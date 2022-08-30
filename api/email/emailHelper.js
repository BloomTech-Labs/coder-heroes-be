const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (data) => {
  sgMail
    .send(data)
    .then((response) => {
      // note: the following 2 console logs are SendGrid out of the box. Keep them if you like them. We found the stringify response to be more descriptive.
      // console.log(response[0].statusCode);
      // console.log(response[0].headers);
      console.log(JSON.stringify(response));
    })
    .catch((error) => {
      console.error(error);
    });
};

const addToList = (data) => {
  let request = require('request');
  let options = {
    method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + process.env.SENDGRID_API_KEY,
    },
    body: {
      list_ids: data.list_ids,
      contacts: [
        {
          email: data.email,
          first_name: data.name,
        },
      ],
    },
    json: true,
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
};

module.exports = { sendEmail, addToList };