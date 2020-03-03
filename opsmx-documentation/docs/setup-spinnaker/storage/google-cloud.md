## Overview

* This is a RESTful online file storage web service for storing and accessing data on
Google Cloud Platform infrastructure. The service combines the performance and
scalability of Google's cloud with advanced security and sharing capabilities.
* GCS as a storage source, will enable Spinnaker to store all of its Persistent data in a
Bucket.

## Prerequisites

* Ensure to have a Project Created and gcloud installed. To verify the gcloud installation
execute the below command
		```yaml
			gcloud info
		```

* Ensure to have JSON with all the GCS credentials. If not available, click here to
create the same.

## Edit to Enable GCS as Storage Source

* Halyard can initiate to create a bucket, in case if the bucket details provided doesn’t
exist.
* Following values provided below are defaults.
	```yaml
		Google Cloud Storage PROJECT=$(gcloud info --format='value(config.project)')
		# see https://cloud.google.com/storage/docs/bucket-locations
		BUCKET_LOCATION=us
		SERVICE_ACCOUNT_DEST=# see Prerequisites section above
	```
* Edit the Storage source, by executing the below commands
	```yaml
		hal config storage gcs edit --project $PROJECT \
		--bucket-location $BUCKET_LOCATION \
		--json-path $SERVICE_ACCOUNT_DEST
	```
* By executing the below command, storage source will be set to GCS
	```yaml
		hal config storage edit --type gcs
	```