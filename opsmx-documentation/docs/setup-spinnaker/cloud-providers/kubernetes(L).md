## Kubernetes Overview

* From this document we explore the best practiced approach to setup Kubernetes as a Spinnaker
Cloud Provider.
* Always while setting up Kubernetes provider, Spinnaker tries to communicate and authenticate
with the Kubernetes Cluster. This also included one or more Docker Registries which is used as a
source of images during the deployment.
* For Spinnaker-Kubernetes integration, there are two best approaches suggested.
	1. Kubernetes (legacy provider)
	2. Kubernetes (Manifest Based)
	
## Prerequisites to Add Kubernetes

* Latest Stable version of Docker and Kubernetes to be installed.
* Should have a Kubernetes Cluster created along with credentials handy.
* Should have a valid/active Docker Registry.
* Configure kubernetes roles (RBAC) – Optional

## Steps to Add a Kubernetes (legacy provider) Account as Cloud Provider

* Ensure to have kubernetes provider is enabled.
	```yaml
	hal config provider kubernetes enable
	```
* Since, Docker Registry Account Name “my-docker-registry” is already created as part of Docker
Registry documentation, proceeding further by adding kubernetes account as cloud provider for
Spinnaker:
	```yaml
	hal config provider kubernetes account add my-k8s-account \
	--docker-registries my-docker-registry
	```
## Next Steps

* If Kubernetes is not the Cloud Provider you’re looking for, try to choose another cloud provider.
Otherwise system is ready to configure the mode of environment to install.