# Steps to Configure Jenkins for Spinnaker
* Jenkins is a self-contained, open source automation server which can be used to automate all
sorts of tasks related to building, testing, and delivering or deploying software.
* Using this CI system on Spinnaker, lets you trigger pipelines with Jenkins, add a Jenkins stage to
your pipeline, or add a Script stage to your pipeline.
* **Prerequisites**:
      1. Below are the requirements to Connect Jenkins to Spinnaker
           * An active & stable Jenkins Master, should be reachable at a URL from the
             provider that Spinnaker will be deployed in.
           * User Credentials, able to authenticate against Jenkins using HTTP Basic Auth, if
             Jenkins is secured.

* **Steps to Add Jenkins Master to Spinnaker**:
      1. Ensure, to have Jenkins master to be enabled on Spinnaker
             ```yml
              hal config ci jenkins enable
             ```
      2. Now, add Jenkins master named my-jenkins-master to Spinnaker
              ```yml
              echo $PASSWORD | hal config ci jenkins master add my-jenkins-master \
              --address $BASEURL \
              --username $USERNAME \
              --password # password will be read from STDIN to avoid appearing
                  # in your .bash_history
			  ```
			  
		!!!note
				In case of using GitHub OAuth plugin for authentication into Jenkins, you
				can use the GitHub $USERNAME, and use the OAuth token as the $PASSWORD.

      3. Upon, successful execution of the above commands re-deploy spinnaker
               ```yml
               hal deploy apply
               ```
			   
			   
* **Configure Jenkins and Spinnaker for CSRF protection:**

	!!!note
			CSRF is compatible only for Jenkins 2.x
			
* To enable CSRF against Jenkins and Spinnaker, follow the below steps
	  1. Enable CSRF flag using Halyard
             ```yml
             hal config ci jenkins master edit MASTER --csrf true
			 ```
             (MASTER is the name of the Jenkins master you’ve previously configured. If you
             haven’t yet added your master, use hal config ci jenkins master add instead of
             edit. )

      2. Ensure to re-deploy Spinnaker to invoke changes
             ```yml
             hal deploy apply
			 ```
      * Enable CSRF protection on Jenkins
		* Login to Jenkins Console -> Manage Jenkins -> Configure Global Security, select	Prevent Cross Site Request Forgery exploits.
		* Under Crumb Algorithm, select Default Crumb Algorithm

			
* **Next Steps**
* Upon Completion of above, Jenkins can be used in your pipelines in one of three ways:
	1. As a [pipeline trigger](https://www.spinnaker.io/guides/user/pipeline/triggers/jenkins/)
			 
    2. Using the built-in [Jenkins stage](https://www.spinnaker.io/reference/pipeline/stages/)
			 
    3. Using the [Script stage](https://www.spinnaker.io/reference/pipeline/stages/)
             
