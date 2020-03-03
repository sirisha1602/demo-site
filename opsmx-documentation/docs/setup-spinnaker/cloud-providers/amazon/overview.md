# Overview of AWS Cloud Provider

* In this chapter, you can explore the process to setup Spinnaker by selecting AWS (Amazon Web Services) as a cloud provider.
* Here we discuss the types of Spinnaker AWS provider accounts configured with Halyard. There are two types of accounts in the Spinnaker AWS provider;
	1. Managing Accounts: By default there one managing account always exists. This serves spinnaker to achieve a large variety of features like authentication, role assumption for the managed accounts, etc.
	2. Managed Accounts: This is more of an admin account. Where a user can perform
activities like, modifying resources in a managed account, grant assume role for a
managed account which also includes the managing account.
		* Following are the best practices to configure AWS Cloud Provide. We can
choose one or more options as per the requirement
			* Amazon Elastic Compute Cloud (EC2) – Choose this method, to use
Spinnaker via EC2 Instances.
			* Amazon Elastic Container Service (ECS) – Choose this method, to
manage containers in ECS.
			* Amazon Elastic Kubernetes Service (EKS) – Choose this method, to
manage containers in Amazon EKS. This method uses Kubernetes V2
(manifest based) Cloud driver.