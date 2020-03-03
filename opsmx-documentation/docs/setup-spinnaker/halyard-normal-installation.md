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
