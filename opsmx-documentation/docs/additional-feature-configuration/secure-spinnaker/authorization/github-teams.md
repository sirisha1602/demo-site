# Setup GitHub Team for Spinnaker

## Overview of GitHub Teams
* GitHub Teams, this is a group of organization members that reflects company or groups
structure with cascading access and permissions to the repositories.
* Roles from GitHub are mapped to the members under a specific organization.
## Personal Access Token
* Login to the GitHub console, as an admin user of the organization.
* Navigate to ‘Developer Settings’, under Settings and click on ‘Personal Access Tokens’
* To generate a new token Click on ‘Generate New Token’
* Provide a name for the Token. (E.g. Spinnaker-Team)
* Select a Scope of access for the users ‘read:org’
* To finalize the token creation, click on ‘Generate Token’.
## Configure GitHub Teams with Spinnaker
* From the above steps, ensure to have admin personal token in hand.
* Execute the below Halyard commands, to Configure GitHub Teams to Spinnaker
```yml
TOKEN=<Admin-Token Name> # Personal access token under admin account
ORG=<Admin Org Details> # GitHub Organization

hal config security authz github edit \
--accessToken $TOKEN \
--organization $ORG \
--baseUrl https://api.github.com

hal config security authz edit --type github

hal config security authz enable
```