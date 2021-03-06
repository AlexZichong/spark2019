# Spark Conference 2019

# Windows Setup
1. Download and Install node.js if you dont have it: https://nodejs.org/en/download/
2. Download https://s3-us-west-2.amazonaws.com/sparkdemosite/init-windows-stack.bat
3. on command line run: init-windows-stack.bat yourccid
4. Last line should read "ServerlessDeploymentBucketName: ..."
5. Leave this window open for later use

# OSX/Linux Setup
1. Download and Install node.js if you dont have it: https://nodejs.org/en/download/
2. Download https://s3-us-west-2.amazonaws.com/sparkdemosite/setup.sh
3. On command line run: bash osx.sh yourccid
4. Last line should read "ServerlessDeploymentBucketName: ..."
5. Leave this window open for later use

# Workshop links (follow along)
1. AWS console login: https://spark19.signin.aws.amazon.com/console
2. Test website: https://s3-us-west-2.amazonaws.com/sparkdemosite/index.html
3. Moodle Course: https://eclass-future-uat.lmc.ualberta.ca/course/view.php?id=52559
4. Enrol yourself in a curse as a student: https://eclass-future-uat.lmc.ualberta.ca/course/view.php?id=52560

# Go at your own pace: 
## Console Access
* Login to https://spark19.signin.aws.amazon.com/console
* See board for credentials

## Create Lambda function
1. From region drop-down in top right, select "US West (Oregon)"
2. Click Services Drop-down
3. Click Lambda
4. Click Create Function
5. Select Author from scratch
6. Type function name in "myFunctionName" text box: spark2019-yourccid
7. Runtime: select Node.js 10.x
8. Click Permissions drop-down and under Execution role select "Use and existing role"
9. In Existing role drop-down: select "lambda_basic_execution"
10. Copy contents of index.js from 'https://github.com/ualberta-eclass/spark2019/blob/master/lambda/index.js' and paste into inline editor (index.js)
11. Click "Select a test event" drop-down, select "Configure test event"
12. Select create new test event with Event name "test"
13. Paste contents of 'https://github.com/ualberta-eclass/spark2019/blob/master/lambda/testevent.json' into editor pane.
14. Click Create
15. Click Test
16. Click Details expansion arrow under Execution result
17. Save

## Create API Gateway
Click Services Drop-down
1. Click API Gateway
2. Find your precreated API gateway: dev-[[yourccid]]-spark-stack
3. Click that API.
4. Action Menu Dropdown select "Create Resource"
5. Resource Name: "mylambda"
6. Click "Create Resource"
7. Action Menu Dropdown select "Create Method"
8. Select "GET" and click checkmark
9. Select "Lambda Function" for Integration type
10. For "Lambda Function" type spark2019-yourccid
11. Leave all other settings default
12. Save
13. When prompted for "Add Permission to Lambda Function", click "Ok"
14. Click "Integration Request"
15. Expand "Mapping Templates"
16. Select "When there are no templates defined"
17. Click "Add mapping template"
18. type "application/json" and click checkmark
19. Select "Generate template" drop-down and select "Method Request passthrough"
20. Click Save
21. Action Menu -> "Deploy API"
22. Select "dev" from "Deployment stage" selection box
23. Click "Deploy"
24. Under Stages, expand and select "mylambda" and select "GET"
25. Click Invoke URL

## Test it out in a webpage
1. Go to [[YourServiceEndpoint]]/public/demo.html
2. In text field paste the invoke URL from previous step and click "Send it".

## Make a change to hello-world end point via serverless.js
1. Open helloworld.js in an editor
2. Comment out body: 'Hello World!',
3. Uncomment lines below it and save
4. run "serverless deploy function --function helloworld --aws-profile spark" in the command line where you ran the init script
5. Refresh the hello-world end point in your browser

## Single Sign-On from eClass
1. Goto eClass course: https://bit.ly/2VX7hSj
2. Log in with you ccid if prompted
3. Enter "spark" for enrolment key
4. You are now an instructor in a course
5. on top right of the page click "Turn editting on"
6. Click "Add an activity or resource"
7. Click "External Tool" in the popup and Click Add
8. Enter "yourccid tool sso" for Activity name
9. Click "Show more..."
10. For Secure Tool Url enter YOUR api end point for ltilogin (e.g. https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/ltilogin)
11. Enter "testkey" for Consumer key
12. Enter "testsecret" for Shared secret
13. Click "Save and display" at the end of the page
14. If everthing went OK you should see the messge "Hello Your Name. Here is the authenticated data from eClass" plus all the data from eClass
15. This JSON object contains the course you came from, your role etc. Any user in the course can click this link. The page you see is an iframe with your api page embedded.

## Modify ltilogin.js to get an eClass Token

1. Open ltilogin.js in your fav text editor
2. Comment out line 22 to 31
3. Un-comment 33 to 42 and save
4. Deploy updated function with "serverless deploy function --function ltilogin --aws-profile spark"

## Modify callback.js to your app

1. Open tokencallback.js in your fav text editor
2. Comment out line 17 to 24
3. Un-comment 26 to 35 and save
4. Deploy updated function with "serverless deploy function --function tokencallback --aws-profile spark"



## View Cloudwatch logs
1. Go to "https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logs:"
2. Click /aws/lambda/spark2019-yourccid
3. Click on Log Stream
