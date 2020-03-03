# Steps to Setup Wercker for Spinnaker
* This is a tool that empowers organizations and their development teams to achieve continuous
integration and continuous delivery (CI/CD) goals with micro-services and Docker.
* Using Wercker as a CI system, can enable within Spinnaker as a pipeline trigger and also as a
pipeline stage.
## Prerequisites:
* To enable Wercker integration in Spinnaker, you will need to have:
	1. A login to Wercker, which can be set up [here](https://app.wercker.com/).
	2. A Wercker “personal token” to provide to Spinnaker so that it can access the Wercker	API on your behalf. Personal tokens [can be generated](https://devcenter.wercker.com/development/api/authentication/) on Wercker by logging in andvisiting your “Settings” page.
## Enable Wercker Master to Spinnaker using Halyard:
* Without “master” it’s not possible for connectivity between Wercker and Spinnaker. This also
consists of Wercker URL and credentials

	1.Ensure to have Wercker CI is enabled on Spinnaker, by executing the below command

	```yaml
		hal config ci wercker enable
	```

	2.Execute the below command to enable Stage feature on Wercker

	```yaml
		hal config features edit --wercker true
	```

	3.For connection between Wercker and Spinnaker, add a Wercker master

	```yaml
		hal config ci wercker master add mywercker1
		--address https://app.wercker.com/
		--user myuserid
		--token
	```

	4.To Invoke above changes, re-deploy Spinnaker

	```yaml
		hal deploy apply
	```