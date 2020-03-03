## Overview

* In this document we explore the features of Manifest Based Kubernetes as a Cloud Provider.
* In this deployment Spinnaker Kubernetes Support V2, whereas V1 provider is yet to
compatible here.
* Unlike V1 provider, in V2 the Account doesn’t require any Docker Registry Accounts.
	
## Prerequisites

* Mandatory to have kubeconfig and kubectl for the Spinnaker.
* As Spinnaker relies on kubeconfig for Authentication to the kubernetes cluster to gain
read/write access to all the resources.
* Relies on kubectl to manage all the API access.
* Also, as V1 providers are not supported here, all the V1 related Pipelines to be migrated
from V1 to V2. Refer to this Article for the V1-V2 migration steps

## Adding Kubernetes V2 Account

* Ensure to have kubernetes provider is enabled.
	```yaml
	hal config provider kubernetes enable
	```
* Execute the below command to add V2 account to Spinnaker
	```yaml
	hal config provider kubernetes account add my-k8s-v2-account \
	--provider-version v2 \
	--context $(kubectl config current-context)
	```
	
* Also, execute the below command to gain access for all additional features

	```yaml
	hal config features edit --artifacts true
	```