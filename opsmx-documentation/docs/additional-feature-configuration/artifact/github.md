# GitHub Artifacts Account
* Spinnaker can be configured to listen to changes to a repository in GitHub. These
steps show you how to configure a GitHub artifact account so that Spinnaker can
download files from GitHub.
## Prerequisites
* It’s mandatory to have a valid GitHub Account.
## Downloading GitHub Credentials:
* Follow the below steps to generate an Access Token for GitHub. Ensure to
provide repo scope for the newly created Token.
* Place the token in a file $TOKEN_File readable by Halyard:
```yaml
	echo $TOKEN &gt; $TOKEN_FILE
```
## Enable GitHub Artifact Settings
* Ensure to have the following values enabled
```yaml
	# See the prerequisites section above
	TOKEN_FILE=
	
	ARTIFACT_ACCOUNT_NAME=my-github-artifact-account
```
* Ensure to have the GitHub Artifacts Support is enabled on Spinnaker
```yaml
	hal config features edit --artifacts true
	hal config artifact github enable
```
* Execute the following command to add an Artifact Account
```yaml
	hal config artifact github account add $ARTIFACT_ACCOUNT_NAME \
	--token-file $TOKEN_FILE
```

!!!note
		To Explore more options on this configuration, click [here](https://www.spinnaker.io/reference/halyard/commands/)