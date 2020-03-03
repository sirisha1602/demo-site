## Steps to Create and Download GCP Credentials

* For Spinnaker to authenticate against a GCE/Google App Engine, it’s mandatory to have
Service Account. Execute the below commands to create a Service Account

	```yaml
	
		SERVICE_ACCOUNT_NAME=spinnaker-gce-account
		SERVICE_ACCOUNT_DEST=~/.gcp/gce-account.json
		
		gcloud iam service-accounts create \
		$SERVICE_ACCOUNT_NAME \
		--display-name $SERVICE_ACCOUNT_NAME
		
		SA_EMAIL=$(gcloud iam service-accounts list \
		--filter="displayName:$SERVICE_ACCOUNT_NAME"\
		--format='value(email)')
		
		PROJECT=$(gcloud info --format='value(config.project)')
		
		# permission to create/modify instances in your project
		gcloud projects add-iam-policy-binding $PROJECT \
		--member serviceAccount:$SA_EMAIL \
		--role roles/compute.instanceAdmin
		
		# permission to create/modify network settings in your project
		gcloud projects add-iam-policy-binding $PROJECT \
		--member serviceAccount:$SA_EMAIL \
		--role roles/compute.networkAdmin
		
		# permission to create/modify firewall rules in your project
		gcloud projects add-iam-policy-binding $PROJECT \
		--member serviceAccount:$SA_EMAIL \
		--role roles/compute.securityAdmin
		
		# permission to create/modify images & disks in your project
		gcloud projects add-iam-policy-binding $PROJECT \
		--member serviceAccount:$SA_EMAIL \
		--role roles/compute.storageAdmin
		
		# permission to download service account keys in your project
		
		# this is needed by packer to bake GCE images remotely
		gcloud projects add-iam-policy-binding $PROJECT \
		--member serviceAccount:$SA_EMAIL
		--role roles/iam.serviceAccountActor
		
		mkdir -p $(dirname $SERVICE_ACCOUNT_DEST)
		
		gcloud iam service-accounts keys create $SERVICE_ACCOUNT_DEST \
		--iam-account $SA_EMAIL
	```
	
* Upon successful execution of the above listed commands, a JSON file will be placed in
the “$SERVICE_ACCOUNT_DEST’.