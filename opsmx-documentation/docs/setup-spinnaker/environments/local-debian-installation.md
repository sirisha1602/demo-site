## Local Debian Installation

* Local Debian Installation, is otherwise known as Standalone Installation. In this scenario,
Spinnaker will be installed and all other components of Spinnaker will be configured on a
Single Server, where Halyard is installed.
* This type of Installation, is usually intended to be used for smaller deployments of
Spinnaker, where downtime is considered as high risk.
* Usually with Local Debian deployment, during the first run of Halyard it’s by default setup to
Local Debian. However, if its edited one can always make changes to the installation by
executing the below command
	```yaml
		hal config deploy edit –type localdebian
	```