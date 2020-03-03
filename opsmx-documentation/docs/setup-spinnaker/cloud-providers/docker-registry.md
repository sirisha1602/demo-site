## Overview

* Docker, is a tool designed to make it easier for a developer, to create, deploy, and run
applications by including all the dependencies of the application, as a one single package
in the form of a container.
* To configure Docker Registry on Spinnaker, an account is mandatory. This account
should be able to authenticate the docker repositories of the Application.

## Prerequisites

* Should have one active Docker Registry which will be mapped to Spinnaker, which
should also support v2 registry API’s.
* It’s good to have at least 1 tag among the registries defined in the account, if not
Halyard throws a warning.

## Available Registry Providers

* All the below listed repositories can be used as a provider to setup a Docker Registry for
Spinnaker. However, each of them supports the same API, with slight differences to get
it worked with Spinnaker
	* Docker Hub
	* Google Container Registry
	* AWS Elastic Container Registry
	* Others
	
1. Docker Hub:

	* Following is the registry address for Docker Hub

		```yaml
			ADDRESS=index.docker.io
		```
		
	* This hosts a mix of public and private repositories, but can expose those repositories
		which will be used by the deployment by explicitly listing them

		```yaml
			REPOSITORIES=library/<reponame> <username>/<appname>
		```
		
	* This hosts a mix of public and private repositories, but can expose those repositories
		which will be used by the deployment by explicitly listing them
	
	```yaml
		REPOSITORIES=library/<reponame> <username>/<appname>
	```
	
	* In case, if the images are not publicly available, ensure to have the DockerHub
		credentials provided to hal

	```yaml
		USERNAME=<DOCKERHUB UserName>
		Password=<DOCKERHUB Password>
	```
	
2. Google Container Registry:

	* There are different registry addresses for GCR, Setup the registry address depending on
the where the images need to stored.
		
		ADDRESS=gcr.io
		
	* Setup authentication
	
		* Best practice to authenticate GCR is to create a Service Account. Execute the
below commands to create and download a service account to be used as your
password with the required roles/storage.admin role, assuming the registry
exists in your current gcloud project.

		```yaml
			SERVICE_ACCOUNT_NAME=spinnaker-gcr-account
			SERVICE_ACCOUNT_DEST=~/.gcp/gcr-account.json
			
			gcloud iam service-accounts create \
			$SERVICE_ACCOUNT_NAME \
			--display-name $SERVICE_ACCOUNT_NAME
			
			SA_EMAIL=$(gcloud iam service-accounts list \
			--filter="displayName:$SERVICE_ACCOUNT_NAME" \
			--format='value(email)')
			
			PROJECT=$(gcloud info --format='value(config.project)')
			
			gcloud projects add-iam-policy-binding $PROJECT \
			--member serviceAccount:$SA_EMAIL \
			--role roles/browser
			
			gcloud projects add-iam-policy-binding $PROJECT \
			--member serviceAccount:$SA_EMAIL \
			--role roles/storage.admin
			
			mkdir -p $(dirname $SERVICE_ACCOUNT_DEST)
			gcloud iam service-accounts keys create $SERVICE_ACCOUNT_DEST \
			--iam-account $SA_EMAIL
		```
	
	* GCR Password is now saved in a file called $SERVICE_ACCOUNT_DEST. Ensure to have all
these details handy to pass them while executing hal
		
		```yaml
			PASSWORD_FILE=$SERVICE_ACCOUNT_DEST
		```
		
3. **AWS Elastic Container Registry:**

	* Set the ECR registry address, these registry addresses are account specific, one can
retrieve the address from console, or with ‘aws ecr describe-repositories’.

		| Registry  			|      FQDN     			| Catalog|
		|---------- 			|:-------------:			| ------:|
		| Quay	    			|  		quay.io	    		|  Yes   |
		| Jfrog Artifactory		|    server-repo.jfrog.io   |   ?	 |
		
4. Other Registries :

## Steps to Add Docker Registry as Cloud Provider

* Ensure to have the docker provider enabled, by executing the below command
	```yaml
		hal config provider docker-registry enable
	```
		
* Execute the below command to add account by providing the generic info
	
	```yaml
			hal config provider docker-registry account add my-docker-registry \
			--address $ADDRESS \
			--repositories $REPOSITORIES \
			--username $USERNAME \
			--password # Do not supply your password as a flag, you will be prompted for
				your
					   # password on STDIN
	```
	
* To add account using Google Container Registry, execute the below command
	
	```yaml
			hal config provider docker-registry account add my-docker-registry \
			--address $ADDRESS \
			--username _json_key \
			--password-file $PASSWORD_FILE
	```
		
* To add account using AWS Elastic Container Registry, execute the below command
	
	```yaml
			hal config provider docker-registry account $PROVIDER_COMMAND my-ecr-
			registry \
			--address $ADDRESS \
			--username AWS \
			--password-command \"aws --region $REGION ecr get-authorization-token --
			output text --query 'authorizationData[].authorizationToken' | base64 -d | sed
			's/^AWS://'\"
	```
		
## Next Steps

* If Docker Registry is not the Cloud Provider you’re looking for, try to choose another
cloud provider. Otherwise system is ready to configure the mode of environment to
install.