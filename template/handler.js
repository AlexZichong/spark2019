'use strict';
const querystring = require('querystring');
const oauth = require('oauth-signature');
var request = require("request");
module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.tokencallback = async (event, context, callback) => {
  let b64 = event.multiValueQueryStringParameters.moodletoken[0].replace('://token=', '');
  let buff = new Buffer(b64, 'base64');
  let tkn = buff.toString('ascii').split(':::')[1];

  var frmattemptsummary = {};
  frmattemptsummary['wsfunction'] = 'mod_assign_get_assignments';
  frmattemptsummary['wstoken'] = tkn;
  let rep = await moodleWS(frmattemptsummary);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: rep,
  };

  callback(null, response);
};


module.exports.ltilogin = (event, context, callback) => {
  var inbound = JSON.parse(JSON.stringify(querystring.parse(event.body)));
  var inboundsignature = inbound.oauth_signature;
  delete inbound.oauth_signature;
  let signature = oauth.generate(event.requestContext['httpMethod'], 'https://' + event.requestContext['domainName'] + '/' + event.requestContext['stage'] + event.requestContext['resourcePath'], inbound, 'testsecret', '',
    { encodeSignature: false });
  if (signature === inboundsignature) {
    console.log('signature is good');
    var response = {
      statusCode: 302,
      headers: {
        'Set-Cookie': 'elsess=1234',
        Location: 'https://eclass.srv.ualberta.ca/admin/tool/mobile/launch.php?service=moodle_mobile_app&passport=111&urlscheme=' + 'https://' + event.requestContext['domainName'] + '/' + event.requestContext['stage'] + '/tokencallback?moodletoken='
        //'Content-Type': 'text/html'
      },

      // body: JSON.stringify({
      //   message: 'Hello ' + inbound.lis_person_name_full + '. Here is the authenticated data from eClass',
      //   input: inbound,
      // })
    };
    callback(null, response);

  } else {
    console.log('signature is no good');
    var response = {
      statusCode: 200,
      headers: {

      },
      body: 'Signature no good'
    };
    callback(null, response);
  }
};


function moodleWS  (wsform) {
  
  return new Promise(resolve => {
      request.post({ url: 'https://eclass.srv.ualberta.ca/webservice/rest/server.php?moodlewsrestformat=json', form: wsform }, function getUserFromMoodle(err, httpResponse, body) {
          resolve(body);
      });
  });
}
