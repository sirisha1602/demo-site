## Overview

* This is distributed operating system, based on the Apache Mesos distributed systems
kernel. This enables to manage multiple systems as a single system.

## Prerequisites

* **DC/OS Cluster requirements**
	* To configure DC/OS on Spinnaker, it is mandatory to have an active DC/OS
cluster with version 1.8 or greater.
	* Authentication methods provided below supports only Enterprise version of
DC/OS. In case of open source authentication to be disabled. However, this
haven’t been tested yet on OpenSource.
* **Docker Registries**
	* Assuming that Docker Registry is already enabled, which contains the images
you want to deploy. To verify the same execute the below command.
	
		```yaml
		hal config provider docker-registry account list
		```

## Steps to Setup DC/OS as Cloud Provider

* Ensure to have DC/OS Provider enabled. By executing the below command

	```yaml
		hal config provider dcos enable
	```
	
* Now, add the DC/OS Cluster, by executing the below

	```yaml
		hal config provider dcos cluster add my-dcos-cluster \
		--dcos-url $CLUSTER_URL \
		--skip-tls-verify
		# For simplicity we won't worry about the
		# certificate for the cluster but this would not be recommended
		# for a production deployment
	```
	
* Create an account that has credentials for the cluster, account can be either a
service/user account.
	* In case of Service Account
	
		```yaml
			hal config provider dcos account add my-dcos-account \
			--cluster my-dcos-cluster \
			--docker-registries my-docker-registry \
			--uid $DCOS_SERVICE_ACCOUNT \
			--service-key-file $PATH_TO_PRIVATE_KEY
		```
		
	* In case of User Account
	
		```yaml
			hal config provider dcos account add my-dcos-account \
			--cluster my-dcos-cluster \
			--docker-registries my-docker-registry \
			--uid $DCOS_USER \
			--password $DCOS_PASSWORD
		```
		
		!!! note
			Ensure that the DC/OS user has permissions to deploy applications under a group
			named after the Spinnaker account name (eg. /my-dcos-account)

## Next Steps

* If DC/OS is not the Cloud Provider you’re looking for, try to choose another cloud
provider. Otherwise system is ready to configure the mode of environment to install.