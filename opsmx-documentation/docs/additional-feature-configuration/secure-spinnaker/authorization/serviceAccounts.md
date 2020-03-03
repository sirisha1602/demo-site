#Steps to Create Service Accounts for Spinnaker

## Overview
* To automatically trigger pipelines and to modify the resources in accounts or applications, Fiat
Service Accounts are used. This means that a GIT commit could trigger a Jenkins build that could
kick off a pipeline to deploy the newly built image in your access-controlled QA environment.
## Steps to Create Service Accounts
* Service accounts are persistent and configuration merely consists of giving it a name and a set of
roles. Therefore, Front50 is the most logical place to configure a service account. There is no UI
for creating service accounts at the moment.
* The roles you give this service account determine who has access to use it. In order to prevent a
privilege escalation vulnerability, only users with every role the service account has may use it.
* Ensure to Update when Halyard Support Service Accounts. Till then, execute the below
```yml
FRONT50=http://front50.url:8080

curl -X POST \
-H "Content-type: application/json" \
-d '{ "name": "sekret-service-account@spinnaker-test.net", "memberOf": ["myApp-
prod","myApp-qa"] }' \
$FRONT50/serviceAccounts
```
* Newly created Service account can be seen,
```yml
curl $FRONT50/serviceAccounts
```
* To pick up the changes made, its mandate to sync Fiat
```yml
FIAT=http://fiat.url:7003

curl -X POST $FIAT/roles/sync
```

* Ensure to provide all the necessary permissions for the newly created service account
```yml
curl $FIAT/authorize/myApp-svc-account
```

## How to use Service Accounts
* Now that Fiat is enabled, user should be able to see “Run As User” option in the Trigger
configuration. This list contains all the service accounts currently can be accessed
* Upon saving the pipeline, two authorization checks will occur:
     1. Does the user have access to this service account?
     2. Does the service account have access to this application?
* At pipeline runtime, standard authorization checks against the account and application occur
just as if it were a human user.