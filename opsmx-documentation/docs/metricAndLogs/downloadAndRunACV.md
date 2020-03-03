# Download and run AutoPilot CV

## Signup & Login

To access the UI for login and registration -

 <pre><code> http://{ip}:8161/opsmx-analysis/public/login.html </code></pre>

**1. Signup a new User**

![Screenshot](img/Login-1.png)


**2. Login with this new User**

![Screenshot](img/Login-2.png)


## Configuring Cloud Credentials

!!! note
	This is only required if data is being pulled directly from the container/VM. Not mandatory.

If you are deploying your applications to  Kubernetes, AWS or GCP, enable read access to the OpsMx Analysis platform

To enable read access, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Deployment Credentials” tab

**Step 3:**  Click on “ADD” Button. Currently, OpsMx supports  “Kubernetes” and “AWS” or “GCP” providers.

**Step 4:**  For “Kubernetes” ,enter account name in textbox then upload the appropriate  kubernetes credentials file by clicking on Browse and Upload Buttons.

![Screenshot](img/deployment.png)

**Step 5:**   Configure the Cloud Read credentials

For enabling AWS cloud, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).  Check out how to generate AWS access credentials section for help with creating keys with needed permissions.

For enabling Google Cloud Platform, upload the appropriate credentials file.

**Step 6:** Save the credentials.

For Saving the Cloud Credentials, when it Uploads it automatically saved.

To delete a saved credential, click on the Delete link under Action box.


## Configuring Monitoring Credentials

OpsMx Analysis Platform needs to be configured to access the monitoring metric store for the deployments to be able to analyze the services.  Currently, the supported monitoring metric store include AWS CloudWatch,  GCP StackDriver, Newrelic, Prometheus and Datadog

To enable read access to the monitoring metric store, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Monitoring Credentials” tab

**Step 3:**  Click on the “ADD”.  Currently, OpsMx support AWS CloudWatch, GCP StackDriver, Newrelic, Prometheus, Elasticsearch and Datadog monitoring tools.


Configuring Monitoring Credentials

**Step 4:**   Configure the Monitoring Credentials

For enabling Newrelic, specify the Account Name, Application Name, Application key.

For enabling Prometheus, specify the Account Name, End Point, Username and Password.

For enabling AWS CloudWatch, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).

For enabling Google Cloud Platform StackDriver, upload the appropriate credentials file.

For enabling Datadog, specify the API key and Application key.


**Step 5:** Save the monitoring credentials.

For Saving the Monitoring Credentials continue by clicking on “SAVE AND GO TO NEXT PAGE” Button.

To delete a saved credential, click on the Delete link under Action box.

![Screenshot](img/1.2-generic-credentials.png)

Add Auth-Token, Username and Passwords wherever applicable.

!!! note

	Scope refers to the key used to retrive a unique entity from the monitoring provider.
	An example for Elastic-Search is provided below. 

![Screenshot](img/1.1-elastic-credentials.png) 
