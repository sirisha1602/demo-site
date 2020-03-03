	
## Amazon ECS as a Cloud Provider

* Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast, container management
service that makes it easy to run, stop, and manage Docker containers on a cluster.
* In this and Account which is mapping to Spinnaker AWS account, will be able to authenticate all
by itself against a given AWS account.

	### Prerequisites:
	* For information on how to set up the role Clouddriver assumes it is mandatory to have [AWS EC2](https://docs.opsmx.com/setup-spinnaker/cloud-providers/amazon/EC2/) Integration setup on Spinnaker.
	* Availability of an ECS Cluster is Mandatory and enough space is also mandatory to deploy
	the containers created.
	* By default the Clusters Network will be passed from Clusters to Containers. As the ENIs are
	not yet supported in Spinnaker.

	
	### Define Spinnaker Cloud driver role
	
	* Any role that cloud driver assumes to have for ECS account needs to have a Spinnaker IAM assumed role.
	
	```yaml
		{
		 "Version": "2012-10-17",
		 "Statement": [
		  {
			"Effect": "Allow",
			"Principal": {
				"Service": [
					"ecs.amazonaws.com",
					"application-autoscaling.amazonaws.com"
				]
			 },
			 "Action": "sts:AssumeRole"
			}
		 ]
	}
	``` 
	
	### Optional: IAM Roles for Tasks
	* You can create IAM roles that have the [ecs-tasks.amazonaws.com](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_modify.html) trust relationship so that your containers have an IAM role associated to them.
	```yaml
		{
		  "Version": "2012-10-17",
		  "Statement": [
			{
			  "Sid": "",
			  "Effect": "Allow",
			  "Principal": {
				"Service": "ecs-tasks.amazonaws.com"
			  },
			  "Action": "sts:AssumeRole"
			}
		} ]
	```
	
	### Configure Halyard to Add ECS Accounts
	
	* Execute the below command to add ECS accounts to the Halyard
	
	```yaml
	hal config provider ecs account add ecs-account-name --aws-account aws-account-name
	```
	
	!!! note
			From the above command ensure to modify the ecs-account name as per the requirement. Also,
			modify the aws-account name of a valid AWS account(EC2 Account Name).
		
		
	* Execute the below command to deploy the changes
	```yaml
		hal deploy apply
	```
	
	### Clouddriver yaml properties
	* If you are not using Halyard, then you must declare Amazon ECS accounts and map them to a given AWS account by its name. Below is an example snippet you can put in ‘clouddriver.yml’ or ‘clouddriver-local.yml’:
	```yaml
		aws:
		  enabled: true

		  accounts:
			- name: aws-account-name
			  accountId: "123456789012"
			  regions:
				- name: us-east-1
		  defaultAssumeRole: role/SpinnakerManaged

		ecs:
		  enabled: true
		  accounts:
			- name: ecs-account-name
      awsAccount: aws-account-name
	```