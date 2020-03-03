# Overview of Spinnaker Installation

* Halyard (hal) is the tool used for configuring, installing and updating. Spinnaker can be installed without hal. However, it’s not recommended to use spinnaker without hal due to scalability issues.

* From this document we help you to explore the best practices to install and configure Spinnaker for Production use.

# Halyard Installation
## Prerequisites to Install Halyard

* Compatible Version of OS

	* Ubuntu 14.04 or 16.04(Ubuntu 16.04 requires Spinnaker 1.6.0 or later)
	* Debian (8 or 9)
	* macOS (tested on 10.13 High Sierra only)

## System Requirements

* RAM – Min4gb – Max as per requirement

* CPU – 2cpu Min – Max as per requirement

* HDD – 50gb Min – Max as per requirement

## Steps to Install Halyard

* Download the latest version of Halyard by executing the commands below as per OS 
	* For Debian/Ubuntu:
	
	``` yaml
	curl -O 
	https://raw.githubusercontent.com/spinnaker/halyard/master/install/debian/InstallHalyard.sh
	```
	
	* For macOS 
	
	``` yaml
	curl -O 
	https://raw.githubusercontent.com/spinnaker/halyard/master/install/macos/InstallHalyard.sh
	```
	
* Execute the below command to install and verify halyard installation

	``` yaml
	sudo bash InstallHalyard.sh
	```

	* Verify Halyard Installation

	``` yaml
	hal –v
	```

	!!! note
	
		Ensure to have ‘hal’ added to the environment variables.

	* To get help with any hal command, append -h. Also, see the [Halyard command Reference](https://www.spinnaker.io/reference/halyard/commands/)

## Steps to Update Halyard on Debian/Ubuntu or macOS

* This part of the document helps to update halyard by executing the below command

``` yaml
sudo update-halyard
```

## Steps to uninstall Halyard from Debian/Ubuntu or macOS

* This part of the document helps to uninstall halyard from the system
	* In case if hal is used to deploy spinnaker, run the following command to purge the deployment
	``` yaml
	hal deploy clean
	```
	* To uninstall hal without any issues execute the below command
	``` yaml
	sudo ~/.hal/uninstall.sh
	```

!!! note

	By following this chapter the entire .hal structure will be deleted, along with all the configurations. Ensure to follow this chapter only if uninstallation is preferred

	

# Halyard Installation on Docker:

!!! note

	Manual Permission changes on the .hal is mandatory to ensure halyard reads & write all of its components.

* In this chapter we will learn the steps to Halyard on Docker.

* As a Mandatory, ensure to have Docker CE installed.

* On the machine create a local Halyard config directory

	```yaml
	mkdir ~/.hal
	```

## Steps to start halyard in a new Docker container
* Below steps is to create Halyard docker container
	
	
	```yaml
	docker run -p 8084:8084 -p 9000:9000 \
	  --name halyard --rm \
	  -v ~/.hal:/home/spinnaker/.hal \
	  -it \
	  gcr.io/spinnaker-marketplace/halyard:stable
	```
	* This runs as a foreground process in your current shell. This is useful because it emits all of the Halyard daemon’s logs, which are not persisted.
* Connect to halyard in a shell
	```yaml
	docker exec –it halyard bash
	```
Halyard interaction will be taken care from here

* Execute the following to complete enable
	* source <(hal --print-bash-completion)
	* To get help with any hal command, append -h. Also, see the [Halyard command Reference](https://www.spinnaker.io/reference/halyard/commands/)

## Steps to Update Halyard on Docker
* Execute the below command to fetch the latest version of Halyard
	```yaml
	docker pull gcr.io/spinnaker-marketlace/halyard:stable
	```
* Execute the below command to stop running Halyard Container
	```yaml
	docker stop halyard
	```
* Follow the below to restart the updated container
	```yaml
	docker run -p 8084:8084 -p 9000:9000 \
     		--name halyard --rm \
     		-v ~/.hal:/home/spinnaker/.hal \
     		-it \
     		gcr.io/spinnaker-marketplace/halyard:stable
	```
* Follow the below to connect to the updated container
	```yaml
	docker exec –it halyard bash
	```
## Steps to uninstall Halyard on Docker
* Delete the container to uninstall halyard on Docker

```yaml
docker rm halyard
```

## Next Steps

To continue to deploy Spinnaker on the newly installed halyard, start choosing cloud providers to proceed further.

	
