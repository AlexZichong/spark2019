# Spark Conference 2019

# Windows Setup
1. Download and Install node.js if you dont have it: https://nodejs.org/en/download/
2. Download https://s3-us-west-2.amazonaws.com/sparkdemosite/init-windows-stack.bat
3. on command line run: init-windows-stack.bat yourccid
4. Last line should read "S3 Sync: Synced."
5. Leave this window open for later use

# OSX Setup
1. Download and Install node.js if you dont have it: https://nodejs.org/en/download/
2. Download https://s3-us-west-2.amazonaws.com/sparkdemosite/osx.sh
3. On command line run: bash osx.sh yourccid
4. Last line should read "S3 Sync: Synced."
5. Leave this window open for later use

# Workshop links (follow along)
1. AWS console login: https://301842890444.signin.aws.amazon.com/console
2. Test website: https://s3-us-west-2.amazonaws.com/sparkdemosite/index.html
3. Moodle Course: https://eclass.srv.ualberta.ca/course/view.php?id=52665

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
21. Action Menu -> "Enable CORS"
22. For "Access-Control-Allow-Origin* type: " 'https://s3-us-west-2.amazonaws.com' "
23. Click "Enable CORS and replace existing CORS headers"
24. On "Confirm method changes" dialogue Click "Yes, replace existing values"
25. Action Menu -> "Deploy API"
26. Select "New Stage" from "Deployment stage" selection box
27. Stage name: "test"
28. Click "Deploy"
29. Under Stages, expand and select "mylambda" and select "GET"
30. Click Invoke URL

## Test it out in a webpage
1. Go to https://s3-us-west-2.amazonaws.com/sparkdemosite/index.html
2. In text field paste the invoke URL from previous step and click "Send it".

## Make a change to hello-world end point
1. Open helloworld.js in an editor
2. Comment out body: 'Hello World!',
3. Uncomment lines below it and save
4. run "serverless deploy --aws-profile spark" in the command line where you ran the init script
5. Last line should read "S3 Sync: Synced."
6. Refresh the hello world end point


## View Cloudwatch logs
1. Go to "https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logs:"
2. Click /aws/lambda/spark2019-yourccid
3. Click on Log Stream
