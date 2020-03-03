# Steps to Setup Travis CI for Spinnaker

* Travis CI is a hosted, distributed continuous integration service used to build and test software
projects hosted at GitHub.
* Using this CI system on Spinnaker, lets you trigger pipelines with Travis, or add a Travis stage to
a pipeline.
## Prerequisites:
* You need a Travis user with an [API access token](https://docs.travis-ci.com/api/) so that you get only the repos you
	 should see.
* That user needs adequate access in GitHub to trigger builds.
	
## Enable Travis CI Master for Spinnaker:
* Execute the following command to Enable Travis CI

	```yaml
		hal config ci travis enable
	```

* Turn on Travis Stage feature, by executing the following command

	```yaml
		hal config features edit --travis true
	```

* To add Travis CI master named my-travis-master, to spinnaker execute the below command

	```yaml
		hal config ci travis master add my-travis-master \
		--address https://api.travis-ci.org \
		--base-url https://travis-ci.org \
		--github-token <token> \ # The GitHub token to authenticate to Travis
		--number-of-repositories # How many repos the integration should fetch each
		# time the poller runs, higher than max expected
		# during polling interval
	```