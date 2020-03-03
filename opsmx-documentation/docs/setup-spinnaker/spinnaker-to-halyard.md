* Now that we have completed selecting Cloud Providers, Environment and Storage Solution, lets
proceed further by selecting a version of Spinnaker and deploy/connect all the selected
features.

## Select Version

* Execute the below commands, to list all the available versions of Spinnaker to deploy

	```yaml
		hal version list
	```
	
* Execute the below command, to finalize the version as per the requirement

	```yaml
		hal config version edit --version $VERSION
	```
	
## Deploy Spinnaker

* Execute the below command to deploy all the changes

	```yaml
		hal deploy apply [parameters]
	```
	
	!!!note
		If you’re deploying to your local machine, you might need 
		```yaml
			‘sudo hal deploy apply’.
		```
	* **parameters**
		
		* --auto-run: This command will generate a script to be run on your behalf. By default,
		the script will run without intervention - if you want to override this, provide “true”
		or “false” to this flag.
		* --delete-orphaned-services: (Default: false) Deletes unused Spinnaker services after
		the deploy succeeds. This flag is not allowed when using the –service-names or
		–exclude-service-names arg.
		* --deployment: If supplied, use this Halyard deployment. This will not create a new
		deployment.
		* --exclude-service-names: (Default: []) When supplied, do not install or update the
		specified Spinnaker services.
		* --flush-infrastructure-caches: (Default: false) WARNING: This is considered an
		advanced command, and may break your deployment if used incorrectly.
		* This flushes infrastructure caches (clouddriver) after the deploy succeeds.
		* --no-validate: (Default: false) Skip validation.
		* --omit-config: (Default: false) WARNING: This is considered an advanced command,
		and may break your deployment if used incorrectly.
		* This guarantees that no configuration will be generated for this deployment. This
		is useful for staging artifacts for later manual configuration.	
		* --prep-only: (Default: false) This does just the prep work, and not the actual
		deployment. Only useful at the moment if you want to just clone the repositories for
		a localgit setup.
		* --service-names: (Default: []) When supplied, only install or update the specified
		Spinnaker services.
		
## Connect to Spinnaker UI

* Execute the below command to connect Spinnaket to the UI.

	```yaml
		hal deploy connect
	```

* If required, set up an SSH tunnel to the host running Halyard. This command automatically
forwards ports 9000 (Deck UI) and 8084 (Gate API service).
* Access the Spinnaker Console for validation of the enabled features.
		
		
