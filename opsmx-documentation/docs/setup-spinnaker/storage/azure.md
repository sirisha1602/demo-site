## Overview

1. This is Microsoft’s Cloud Storage solution for modern data storage solutions.
Azure offers a massively scalable object store for data objects, a file system
service for the cloud.
2. In current scenario, with this Setup it enables Spinnaker to Store all of its data in
Azure Storage Account.

## Prerequisites

1. Ensure to have Azure CLI 2.0 installed, to verify the same execute the below
command
	``` yaml 
		az –version
	```

2. Login to Azure to Set the Subscription, by following the below commands
	``` yaml 
		az login
		az account list
		az account set --subscription <Insert Subscription ID>
	```
3. Below commands will create a resource group for your Storage account, also
make sure to specify a location available in the account
	``` yaml 
		az account list-locations --query [].name
		RESOURCE_GROUP="SpinnakerStorage"
		az group create --name $RESOURCE_GROUP --location <Insert Location>
	```	
4. Provide a unique name to create a Storage Account, by executing the below
commands
	``` yaml 
		STORAGE_ACCOUNT_NAME=<Insert name>
		az storage account create --resource-group $RESOURCE_GROUP --sku
		STANDARD_LRS --name $STORAGE_ACCOUNT_NAME
		STORAGE_ACCOUNT_KEY=$(az storage account keys list --resource-
		group $RESOURCE_GROUP --account-name
		$STORAGE_ACCOUNT_NAME --query [0].value | tr -d '''')
	```
* **Enable Azure Storage Solutions**
	* Execute the below command, to edit storage settings
		```yaml
			hal config storage azs edit \
			--storage-account-name $STORAGE_ACCOUNT_NAME \
			--storage-account-key $STORAGE_ACCOUNT_KEY
		```
	* Set the Storage Source to AZS, by executing the below command
		```yaml
			hal config storage edit --type azs
		```