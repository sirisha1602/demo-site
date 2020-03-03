## Overview

* Google Compute Engine (GCE) is an Infrastructure as a Service (IaaS) offering that allows
clients to run workloads on Google's physical hardware.

## Prerequisites

* To configure Google App Engine against Spinnaker it’s Mandatory to have a Google
Cloud Platform.
* Ensure to have a Project Created and gcloud installed. To verify the gcloud installation
execute the below command
	
	```yaml
		gcloud info
	```
	
* JSON with the Service Account Dest, Credentials to Authenticate the Project is must to
add Google App Engine as Service Account.

## Download GCP Credentials

* In case if GCP credentials are not created, click here to create the same.

## Add GCE as Cloud Provider

* Ensure to enable the Google Cloud provider, by executing the below

	```yaml
		hal config provider google enable
	```
	
* Provide the below values,

	```yaml
		PROJECT=$(gcloud info --format='value(config.project)')
		SERVICE_ACCOUNT_DEST=# see Prerequisites section above
	```
	
* Now add the Service account, by executing the below

	```yaml
		hal config provider google account add my-gce-account --project $PROJECT \
		--json-path $SERVICE_ACCOUNT_DEST
	```
	
## Next Steps

* If Google Compute Engine is not the Cloud Provider you’re looking for, try to choose
another cloud provider. Otherwise system is ready to configure the mode of
environment to install.