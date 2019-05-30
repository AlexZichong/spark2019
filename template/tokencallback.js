'use strict';
var request = require("request");

module.exports.tokencallback = async (event, context, callback) => {
    let b64 = event.multiValueQueryStringParameters.moodletoken[0].replace('://token=', '');
    let buff = new Buffer(b64, 'base64');
    let tkn = buff.toString('ascii').split(':::')[1];

    //create a webservice request with the token we get
    var wsform = {};
    wsform['wsfunction'] = 'mod_assign_get_assignments';
    wsform['wstoken'] = tkn;
    //execute web service against eClass
    let rep = await moodleWS(wsform);

    //return results as json
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Set-Cookie': "eclasstoken=" + tkn
        },
        body: rep,
    };

    // // lets set the token as a cookie on the user's session and redirect to an html page
    // // this page could be your app and can make async requests against eClass now
    // let response = {
    //     statusCode: 302,
    //     headers: {
    //         'Set-Cookie': "eclasstoken=" + tkn,
    //         'Location': 'public/coursesandassignments.html'
    //     },
    //     body: '',
    // };

    callback(null, response);
};

function moodleWS(wsform) {

    return new Promise(resolve => {
        request.post({ url: 'https://eclass-future-uat.lmc.ualberta.ca/webservice/rest/server.php?moodlewsrestformat=json', form: wsform }, function getUserFromMoodle(err, httpResponse, body) {
            resolve(body);
        });
    });
}
