var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';

exports.handler = async (event, context, callback) => {

    console.log("It worked!");
    
    callback(null, event);
    
}
