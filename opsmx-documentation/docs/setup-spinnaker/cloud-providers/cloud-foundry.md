# Setup Cloud Foundry on Spinnaker
## Overview

* Cloud Foundry makes it faster and easier to build, test, deploy and scale
applications, providing a choice of clouds, developer frameworks, and application
services. It is an open source project and is available through a variety of private
cloud distributions and public cloud instances.
* Cloud Foundry is used in companies where micro services are going cloud-native, to
innovate and deliver a product with quality and elegance.

## Prerequisites
* Your CF foundations’ [API endpoints](https://docs.cloudfoundry.org/running/cf-api-endpoint.html) must be reachable from your installation of
Spinnaker.

## Add an Account
* While the Cloud Foundry provider is in alpha, the hal CLI does not have support for
adding a CF account (this support will be added soon). Instead, you can use
Halyard’s custom configuration to add a CF account to an existing installation of
Spinnaker.
* On the machine running Halyard, Halyard creates a .hal directory.
* It contains a subdirectory for your Spinnaker deployment; by default, this
subdirectory is called default.
* The deployment subdirectory itself contains a profiles subdirectory.
* Change to this subdirectory (an example path might be something like
~/.hal/default/profiles/) and within it, create the two files shown below.
* Create a file called settings-local.js, with the following contents:
	```yaml
		window.spinnakerSettings.providers.cloudfoundry = {
			defaults: {account:'my-cloudfoundry-account'}
		};
	```
* This file tells Spinnaker’s Deck microservice to load functionality supporting CF.
* Create another file called clouddriver-local.yml, modifying the contents to include
the relevant CF credentials:
	```yaml
		cloudfoundry:
			enabled: true
			accounts:
			- name: account-name
			user: 'account-user'
			password: 'account-password'
			api: api.foundation.path
			- name: optional-second-account
			api: api.optional.second.foundation.path
			user: 'second-account-user'
			password: 'second-account-password'
	```
* This file gives Spinnaker account information with which to reach your CF instance.
* If you are setting up a new installation of Spinnaker, proceed to “Next steps” below.
* If you are working with an existing installation of Spinnaker, apply your changes:
	```yaml
		$ hal deploy apply
	```
* Within a few minutes after applying your changes, you should be able to view the CF
instance’s existing applications from your installation of Spinnaker.

## Next steps

* Optionally, you can [set up another cloud provider](http://docs.opsmx.com/setup-spinnaker/cloud-providers/overview/), but otherwise you’re ready to
[choose an environment](http://docs.opsmx.com/setup-spinnaker/environments/overview/) in which to install Spinnaker.