# Steps to Setup Google Cloud Build
* This (Cloud Build) is a service that executes builds on GCP infrastructure. Cloud Build can import
source code from GCS, Cloud Storage Repo’s, GitHub or BitBucket and execute a build as per the
configurations and provide artifacts such as Java archives or docker containers.
* Using this CI system on Spinnaker, enables Spinnaker to trigger pipelines upon completion on
builds.
* **Prerequisites**:
     1. Ensure to have a valid GCP with a Cloud Build API. API can be enabled with the gcloud
        command as below
		    ```yml
            gcloud services enable cloudbuild.googleapis.com
			```
* **Configure Spinnaker for Google Cloud Build Pub/Sub Notifications:**
* Google Cloud Build sends [Build Notifications](https://cloud.google.com/cloud-build/docs/send-build-notifications) when the state of your build changes. Create a
  pipeline trigger to invoke a pipeline based on the status of your build.
     1. Create a Subscription Object for the cloud-builds topics in your project
          ```yml
          PROJECT_ID=
          SUBSCRIPTION_NAME=googleCloudBuilds

          gcloud pubsub subscriptions create $SUBSCRIPTION_NAME \
          --topic projects/$PROJECT_ID/topics/cloud-builds \
          --project $PROJECT_ID
          ```
     2. Configure Google Cloud Build for Spinnaker, using Halyard by executing the following
        command
		   ```yml
           hal config pubsub google subscription add $SUBSCRIPTION_NAME \
           --project $PROJECT_ID \
           --subscription-name $SUBSCRIPTION_NAME \
           --message-format GCB
		   
           hal config pubsub google enable
		   ```
     3. Deploy Spinnaker post execute Steps #1 & #2
          ```yml
          hal deploy apply
          ```
     4. Steps to Configure Google Cloud Build Pipeline
          * In your Pipeline configuration, click the Configuration stage on the far left of the
          pipeline.
          * Click Automated Triggers.
          * In the Type field, select Pub/Sub.
          * In the Pub/Sub System Type field, select google.
          * In the Subscription Name field, select your $SUBSCRIPTION_NAME value.
          * In the Attribute Constraints field, enter status in the Key, and SUCCESS (all upper
             case) in the Value field.
          * In the Payload Constraints field, you can enter any of the top-level fields from
            the Build object documentation as the key, and a Java regular expression as the
            value.
          * In the Expected Artifacts field, you can add any build artifacts as expected
            artifacts. For example, if the build produces a Docker image, you can add an
            expected artifact of type Docker with a value of gcr.io/my-project-id/my-
            application:tag (replacing my-project-id, my-application, and tag with
            appropriate values). You can then use the produced image in downstream
            stages.

