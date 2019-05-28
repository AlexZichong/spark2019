'use strict';
const querystring = require('querystring');
const oauth = require('oauth-signature');






module.exports.ltilogin = (event, context, callback) => {
  //You would look this secret up from a database based on consumer key
  let ltisecret = 'testsecret';
  
  var inbound = JSON.parse(JSON.stringify(querystring.parse(event.body)));
  var inboundsignature = inbound.oauth_signature;
  delete inbound.oauth_signature;
  let signature = oauth.generate(event.requestContext['httpMethod'], 'https://' + event.requestContext['domainName'] + '/' + event.requestContext['stage'] + event.requestContext['resourcePath'], inbound, ltisecret, '',
    { encodeSignature: false });
  if (signature === inboundsignature) {
    console.log('signature is good');

    var response = {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'elsess=1234',
      },
      body: JSON.stringify({
        message: 'Hello ' + inbound.lis_person_name_full + '. Here is the authenticated data from eClass',
        input: inbound,
      })
    };


    // let urlscheme = 'https://' + event.requestContext['domainName'] + '/' + event.requestContext['stage'] + '/tokencallback?moodletoken=';
    // var response = {
    //   statusCode: 302,
    //   headers: {
    //     'Set-Cookie': 'elsess=1234',
    //     Location: 'https://eclass.srv.ualberta.ca/admin/tool/mobile/launch.php?service=moodle_mobile_app&passport=somerandomstringforsecurity&urlscheme=' + urlscheme
    //   },
    // };



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


