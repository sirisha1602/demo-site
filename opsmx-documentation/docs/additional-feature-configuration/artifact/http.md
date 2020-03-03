# Steps to Configure HTTP Artifact Credentials
* Here, Spinnaker stages that read data from the artifacts will be allowed to read
HTTP files directly.
* If the files are hidden behind basic auth, you can configure an artifact account with
the needed credentials to read your artifact. If not, no further configuration is
needed, Spinnaker will automatically add a no-auth-http-account for this purpose.
## Prerequisites:
* Ensure to have the basic auth details, $USERNAME &amp; $PASSWORD, then
pick a “$USERNAME-PASSWORD-FILE” location on the server.
* Execute the below command to update the settings:
echo ${USERNAME}:${PASSWORD} &gt; $USERNAME_PASSWORD_FILE
## Enable HTTP Artifacts Settings
* Ensure, to have the above collected $USERNAME-PASSORD-FILE Handy.
* Execute the below commands to enable Artifact Support
```yaml
	hal config features edit --artifacts true
	hal config artifact http enable
```
* To Add an Artifact Account, execute the below command
```yaml
	hal config artifact http account add my-http-account \
	--username-password-file $USERNAME_PASSWORD_FILE
```