# Spark Conference 2019
# Workshop links (follow along)
1. AWS console login: https://301842890444.signin.aws.amazon.com/console
2. Test website: https://s3-us-west-2.amazonaws.com/sparkdemosite/index.html
3. Download and Install node.js if you dont have it: https://nodejs.org/en/download/
4. Download and run initialization script:
## Windows
1. Download https://s3-us-west-2.amazonaws.com/sparkdemosite/init-windows-stack.bat
2. on command line run: init-windows-stack.bat <your ccid>
* OSX: 

# Go at your own pace: 
## Console Access
* Login to https://301842890444.signin.aws.amazon.com/console
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
2. Click Create API
3. Under "Choose the protocol selet REST
4. Under Create new API, select New API
5. Settings-> API name: "yourccid"
6. Settings -> Endpoint Type: "Regional"
7. Click Create API
8. Action Menu Dropdown select "Create Resource"
9. Resource Name: "mylambda"
10. Click "Create Resource"
11. Action Menu Dropdown select "Create Method"
12. Select "GET" and click checkmark
13. Select "Lambda Function" for Integration type
14. For "Lambda Function" type spark2019-yourccid
15. Leave all other settings default
16. Save
17. When prompted for "Add Permission to Lambda Function", click "Ok"
18. Click "Integration Request"
19. Expand "Mapping Templates"
20. Select "When there are no templates defined"
21. Click "Add mapping template"
22. type "application/json" and click checkmark
23. Select "Generate template" drop-down and select "Method Request passthrough"
24. Click Save
25. Action Menu -> "Enable CORS"
26. For "Access-Control-Allow-Origin* type: " 'https://s3-us-west-2.amazonaws.com' "
27. Click "Enable CORS and replace existing CORS headers"
28. On "Confirm method changes" dialogue Click "Yes, replace existing values"
29. Action Menu -> "Deploy API"
30. Select "New Stage" from "Deployment stage" selection box
31. Stage name: "test"
32. Click "Deploy"
33. Under Stages, expand and select "mylambda" and select "GET"
34. Click Invoke URL

## Test it out in a webpage
1. Go to https://s3-us-west-2.amazonaws.com/sparkdemosite/index.html
2. In text field paste the invoke URL from previous step and click "Send it".

## View Cloudwatch logs
1. Go to "https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logs:"
2. Click /aws/lambda/spark2019-yourccid
3. Click on Log Stream
