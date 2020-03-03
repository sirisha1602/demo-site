# Steps to Configure GCS Artifacts
* Validated data from artifacts can consume GCS objects as artifacts, in multiple Spinnaker
Stages.
## Prerequisites
* To have GCS enabled on Spinnaker, it’s mandatory to have GCP (Google Cloud
Project) created to host a bucket in.
* To validate and confirm whether GCP is created or not, execute the following
command
	```yaml
		gcloud info
	```
* For Spinnaker to authenticate on GCP, it’s mandatory to have Google
Credentials/JSON key downloaded. In case if the details are unavailable, click
here to generate the same.
## Enable GCS Artifact Settings:
* Ensure to have the following values are enabled
```yaml
	# Same as in Prerequisites section above
	SERVICE_ACCOUNT_DEST=~/.gcp/gcs-artifacts-account.json
	ARTIFACT_ACCOUNT_NAME=my-gcs-artifact-account
```
* Execute the following command to enable Artifact Support
```yaml
	hal config features edit --artifacts true
```
* Execute, the following command to add Artifact account
```yaml
	hal config artifact gcs account add $ARTIFACT_ACCOUNT_NAME \
	--json-path $SERVICE_ACCOUNT_DEST
```
* Finally, execute the following command to enable GCS artifact Support
```yaml
	hal config artifact gcs enable
```

	!!!note
			To Explore more options on this configuration, click here