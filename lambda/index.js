var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';

exports.handler = async (event, context, callback) => {

    console.log("Source IP: " + event.context["source-ip"]);
    
    callback(null, event);
    
}