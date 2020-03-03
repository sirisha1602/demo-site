# Azure

* In this document we are going to explore the methods to setup Azure as Cloud Provider for
Spinnaker.

## Prerequisites
 

1. It’s mandatory to have a Service Principal to authenticate with Azure and a Key Vault to
store a default username/password for deployed VM Scale Sets.
2. Verify if Azure CLI 2.0 is installed or not, by executing ‘az’

	```yaml
		az –version
	```
	
## Create Service Principal & Key Vault

* Login to azure and setup subscription

	Az login > az account list > SUBSCRIPTION_ID=<Insert Subscription ID>
		```yaml
		az account set --subscription $SUBSCRIPTION_ID
		```
		
* Now Create Subsciption (Ensure to have a unique name in your subscription), and set an
environment variable based on the output
		```yaml
			az ad sp create-for-rbac --name "Spinnaker"
			APP_ID=<Insert App Id>
			TENANT_ID=<Insert Tenant Id>
		```
		
	!!! note
		
		Will have to have the App Key (also called provider) when creating an account, but you will be prompter for a password. Since its automated

* Now let’s learn on how to create a resource group for your Key Vault. Make sure to
  specify a location (e.g. westus) available in your account:
  
	```yaml
		az account list-locations --query [].name
		RESOURCE_GROUP="Spinnaker"
		az group create --name $RESOURCE_GROUP --location <Insert Location>
	```
* Create a Vault Key (where the vault name is globally unique) and add a default
  username/password
  
	```yaml
		VAULT_NAME=<Insert Vault Name>
		az keyvault create --enabled-for-template-deployment true --resource-group
		$RESOURCE_GROUP --name $VAULT_NAME
		az keyvault set-policy --secret-permissions get --name $VAULT_NAME --spn
		$APP_ID
		az keyvault secret set --name VMUsername --vault-name $VAULT_NAME --value
		<Insert default username>
		az keyvault secret set --name VMPassword --vault-name $VAULT_NAME --value
		<Insert default password>
	```
		
# Adding an Account
* Ensure to have Azure cloud provider enabled, by executing the below command

	```yaml
		hal config provider azure enable
	```
* Now, run the below ‘hal’ command to add an account named ‘my-azure-account’

	```yaml
		hal config provider azure account add my-azure-account \
			--client-id $APP_ID \
			--tenant-id $TENANT_ID \
			--subscription-id $SUBSCRIPTION_ID \
			--default-key-vault $VAULT_NAME \
			--default-resource-group $RESOURCE_GROUP \
			--app-key
	```
	
	!!! note
		
		You will be prompted for the App Key on standard input. If necessary,
		you can generate a new key: az ad sp credential reset --name $APP_ID