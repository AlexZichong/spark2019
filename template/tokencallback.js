'use strict';
var request = require("request");

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

function moodleWS(wsform) {

    return new Promise(resolve => {
        request.post({ url: 'https://eclass.srv.ualberta.ca/webservice/rest/server.php?moodlewsrestformat=json', form: wsform }, function getUserFromMoodle(err, httpResponse, body) {
            resolve(body);
        });
    });
}
