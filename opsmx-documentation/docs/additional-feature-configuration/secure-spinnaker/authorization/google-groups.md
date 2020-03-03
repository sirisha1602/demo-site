#Steps to Setup Google Groups via G Suite

## Overview
* Google Groups make it easy for your users to communicate with people they contact often. As
the G Suite administrator, you can create and manage groups in the Google Admin console. You
can also use Groups for Business for added features.

## Service Account Setup

* To access user group membership, ensure to use Google Admin Directory API. In this document,
we will setup a Google Cloud Platform (GCP) service account and grant access to the Directory
API.


!!!note
        Before starting up the Service Account Setup, it’s mandatory to have JSON created.
        Incase if JSON is not created, follow the below steps to create the same
		
		
     
   a. Login to GCP Console, navigate to IAM & Admin -> Service Accounts
 
   b. Click on Create Service Account, to create a new account.
 
   c. Give a name for service account as per the requirement. (E.g. spinnaker-account)
 
   d. Click on ‘new private key’ and select the format to be JSON.
 
   e. Ensure to ‘Enable G Suite Domain-wide Delegation’ and click create JSON, which allows
      to download JSON.
	
   f. Transfer the JSON to any known location in Spinnaker deployment.
 
   g. Now, the newly created Service Account will be listed, along with the ‘DwD’. Click on
      ‘View Client ID’ to make a note of all the Client details, which will be useful in the next
      section.
	
	

* Provide service account access to the G Suite Directory API in the G Suite Admin console, by executing the below steps
       1. Login to GCP Console, navigate to ‘Security’ Settings page
       2. Under ‘Advanced Settings’, click on ‘Manage API client access’
       3. Now, provide the ‘Client ID’ noted in the above #7, under ‘Client Name’.
       4. Provide the following as API Scope
        ‘https://www.googleapis.com/auth/admin.directory.group.readonly’
       5. Click on Authorize to complete the process.

## Configure Google Groups with Spinnaker

!!!note 
        Ensure to have all the roles configured to the accounts, as described here.

* Execute the below commands, with all the account details handy. Use halyard to configure Fiat
```yml 
ADMIN=<admin-EMAIL-ID> # An administrator's email address

CREDENTIALS=<JSON Path> # The downloaded service account credentials
DOMAIN=<FQDN> # Your organization's domain.

hal config security authz google edit \
--admin-username $ADMIN \
--credential-path $CREDENTIALS \
--domain $DOMAIN

hal config security authz edit --type google

hal config security authz enable
```