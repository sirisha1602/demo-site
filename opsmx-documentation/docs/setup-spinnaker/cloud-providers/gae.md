## Overview

* In this document we explore the steps to add Google App Engine as a cloud provider for
Spinnaker.
* Google App Engine is a web framework and cloud computing platform for developing
and hosting web applications in Google-managed data centers.

## Prerequisites

* To configure Google App Engine against Spinnaker it’s Mandatory to have a Google
Cloud Platform.
* Ensure to have a Project Created and gcloud installed. To verify the gcloud installation
execute the below command
```yaml
	gcloud info
```

* In case if this the first deployment to App Engine in your project, create an App Engine
application. Also, pick the application region wisely, because if once it’s set region
cannot change. Use the below command
```yaml
	gcloud app create --region <e.g., us-central>
```
* It’s also mandatory to enable App Engine Admin API for the project.
```yaml
	gcloud service-management enable appengine.googleapis.com
```
* JSON with the Service Account Dest, Credentials to Authenticate the Project is must to
add Google App Engine as Service Account.

## Adding Google App Engine as Cloud Provider

* Ensure to have the App Engine provider is enabled by executing the below command
```yaml
	hal config provider appengine enable
```
* Execute the following hal command to add account
```yaml
	hal config provider appengine account add my-appengine-account \
	--project $PROJECT \
	--json-path $SERVICE_ACCOUNT_DEST
```

	!!!note
		Omit the –json-path If Spinnaker doesn’t need service account credentials
		
## Steps to Deploy to Google App Engine

* From this part of the document, we get to know the process of deploying source code
app to App Engine.
* There are 3 best practices to execute this without issues
	* **Deploying from GIT** – Spinnaker supports in deploying the source code to App
	Engine by Cloning and Submitting application GIT Repository to App Engine.
	* **Deploying from Storage** – Like we have discussed about GIT deployment.
	Spinnaker also allows Source code application to App Engine from GCS bucket
	(Google Cloud Storage). This method of deployment requires to bundle the code
	into a .tar archive and then store on GCS. When the deploy stage executes,
	Spinnaker will fectch the code and untar it and deploy the code to App Engine.
	* Deploying from Google Container Registry URL - Spinnaker supports deploying
	Docker containers on the App Engine Flex runtime from images built and stored
	in Google Container Registry from just a gcr.io URL. This feature is currently
	flagged because it is still quite new.
	* Execute the below command to enable this feature with Spinnaker

		```yaml
			hal config features edit --appengine-container-image-url-deployments
			true
		```
	* Post this deployment user will find an option in the Create Server Group modal
	in Deck to use a Container Image as a deployment’s Source Type.
	* Selecting the Container Image option reveals a textbox that can then be used to
	specify the gcr.io URL. Alternatively you can use an Artifact as the source of the
	container image URL..
	
## Next Steps

* If Google App Engine is not the Cloud Provider you’re looking for, try to choose another
cloud provider. Otherwise system is ready to configure the mode of environment to install.