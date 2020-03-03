## Distributed Installation

* This method is highly recommended, because of its own advantages like high scalability,
high availability, Load Balancing and avoid downtime risk factor.
* Usually in distributed installation, Spinnaker is installed on a remote cloud, which will
have the flexibility of deploying each microservice individually.
### Execute the below steps to enable:
1. Run the below command, using the $ACCOUNT which is created in the provider
(kubernetes)
	```yaml
		hal config deploy edit --type distributed --account-name $ACCOUNT
	```
2. If the provider is not yet enabled, ensure to have it enabled on the environment
where Spinnaker will be installed.
3. As the distributed installation is done on Kubernetes cluster, refer the below
articles to configure provider
	1. Kubernetes (legacy provider)
	2. Kubernetes (Manifest Based)
4. Ensure to have ‘kubectl’ to be installed on the machine where Halyard is installed.
During this process, ensure to shutdown ‘hal’ by executing the below command.
	```yaml
		hal shutdown
	```
5. Upon successful installation of ‘kubectl’, ensure to update the $PATH to ensure
halyard can find the ‘kubectl’ installation.

!!!note
	After completion of all the steps above, ensure to restart Halyard daemon by
	executing any hal command.