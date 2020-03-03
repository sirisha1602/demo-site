## Overview

* In this document we explore the Steps to add OpenStack as Cloud Provider for Spinnaker.
* OpenStack lets users deploy virtual machines and other instances that handle different tasks
for managing a cloud environment on the fly.
* OpenStack makes horizontal scaling easy, which means that tasks that benefit from running
concurrently can easily serve more or fewer users on the fly by just spinning up more
instances.

## Prerequisites

* OpenStack Driver for Spinnaker is Tested and Developed on the OpenStack Mitaka release.
* Following list of OpenStack Services are Mandatory to have OpenStack features function as
expected
	i. KeyStone (Identity) V3
	ii. Compute V2
	iii. LBaaS V2
	iv. Networking V2
	v. Heat
	vi. Ceilometer
	vii. Aodh
	viii. Glance V1

* To Execute OpenStack Commands on the Spinnaker Server account admin permissions are
mandatory. Hence, download the [bashrc](https://docs.openstack.org/rocky/user/) from OpenStack Console and add the same in the
Environment variables of the Spinnaker Server.
* To Test the Setup, use the [OpenStack command-line client](https://docs.openstack.org/python-openstackclient/latest/)

## Adding OpenStack as Cloud Provider

* Ensure to have OpenStack Provider Enabled on Spinnaker
	```yaml
	hal config provider openstack enable
	```
* Execute the below command to add OpenStack Account on Spinnaker
	```yaml
	hal config provider openstack account add my-openstack-account \
	--auth-url http://authurl:5000/v3 --username service-account \
	--domain-name default --regions RegionOne --project-name the-project \
	--password service-password --environment exampleenv
	```
	
	!!! note
			All the necessary OpenStack Account parameters can be found in openrc.sh
			
## Troubleshooting

* When creating/managing load balancers in OpenStack environment Spinnaker fails, ensure
to increase the timeout and polling Interval values.

## Next Steps

* If OpenStack is not the Cloud Provider you’re looking for, try to choose another cloud
provider. Otherwise system is ready to configure the mode of environment to install.