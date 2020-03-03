
## Overview
* OpsMx now provides a reference deployment guide that provide step-by-step instructions for deploying Spinnaker, which is a continuous deployment tool from Netflix Open Source Software, on the Amazon Web Services (AWS) Cloud.
* In this document we will explore on how to setup EC2 as a cloud provider with Spinnaker.
	* In AWS, an EC2 is used to launch as many VM’s as we need, to configure security and networking, and to manage storage.
	* In Spinnaker, AWS plays almost the same role when user configures AWS as a Cloud Provider.
	* There are two methods to configure AWS as Cloud Driver,
		1. By using AWS Console
		2. By using AWS CLI
	* In this document we will explore the integration process using AWS Console
	
## Steps to Setup EC2 with Spinnaker
### Steps to create Managing Account
* Navigate to Console > CloudFormation and select your preferred region.
* Click <a href="https://d3079gxvs8ayeg.cloudfront.net/templates/managing.yaml">here</a> to Download the template locally.
* Search for ‘SpinnakerInstanceProfileArn’ and comment out the line.
(Optional). Add additional managed account as shown on line 158 in the SpinnakerAssumeRolePolicy section of the downloaded template file.
* Execute the below to create the CloudFormation Stack
	* Create Stack > Upload a template to Amazon S3 > Browse to template you downloaded in Step-2 above > Next
	* Enter Stack Name as ‘spinnaker-managing-infrastructure-setup’ and follow the prompts on screen to create the stack
* Once the stack is select the stack you created in Step-3 > Outputs and note the values(AccessKeyId, Secret, ManagingAccountID & AuthArn). These values are mandatory for subsequent configurations.

### Steps to Create Managed Account
* Navigate to Console > CloudFormation and select your preferred region.
* Click <a href="https://d3079gxvs8ayeg.cloudfront.net/templates/managed.yaml"> here </a> to Download the template locally.
* Creating the CloudFormation Stack
	* Create Stack > Upload a template to Amazon S3 > Browse to template you downloaded in Step-2 above > Next
	* Enter Stack Name as ‘spinnaker-managed-infrastructure-setup’ and follow the prompts on screen to create the stack
	* Enter AuthArn and ManagingAccountId as the value noted above and follow the prompts on screen to create the stack	

### Steps to Create IAM Role for EC2

* Navigate to Console > IAM > Roles
* Click on Create New Role, select EC2 and name it as per requirement(eg. ec2-instance)
*  Search for the below policies
	* AmazonEC2FullAccess
	* spinnakerAssumeRolePolicy
	* baseiampolicy
	* AutoScalingFullAccess
	* PowerUserAccess
* Click on Review and Submit to Create.
* Now Edit the newly created role and click on TrustRelationships and add the below JSON entry
```yaml
	{
   "Version": "2012-10-17",
   "Statement": [
     {
       "Effect": "Allow",
       "Principal": {
         "Service": [
           "ec2.amazonaws.com" 
         ]
       },
       "Action": "sts:AssumeRole"
     }
   ]
 }
```

## Steps to configure AWS EC2 using AWS CLI
* Managing Account creation using
* Execute the below command to use AccessKey and Secret to run Spinnaker
```yaml
	curl https://d3079gxvs8ayeg.cloudfront.net/templates/managing.yaml 
```
```yaml
	echo "Optionally add Managing account to the file downloaded as shown on line 158 in the SpinnakerAssumeRolePolicy section of the downloaded file."
aws cloudformation deploy --stack-name spinnaker-managing-infrastructure-setup --template-file managing.yaml \ --parameter-overrides UseAccessKeyForAuthentication=true --capabilities CAPABILITY_NAMED_IAM --region us-west-2
```
* Execute the below command to use InstanceProfile run Spinnaker
```yaml
	curl https://d3079gxvs8ayeg.cloudfront.net/templates/managing.yaml
```
```yaml
	echo "Optionally add Managing account to the file downloaded as shown on line 158 in the SpinnakerAssumeRolePolicy section of the downloaded file."
 aws cloudformation deploy --stack-name spinnaker-managing-infrastructure-setup --template-file managing.yaml \
 --parameter-overrides UseAccessKeyForAuthentication=false --capabilities CAPABILITY_NAMED_IAM --region us-west-2
```

### Managed Account Creation


!!!note
	These steps need to be carried out for the managing account as well.
	
```yaml
	curl https://d3079gxvs8ayeg.cloudfront.net/templates/managed.yaml
```

```yaml
	aws cloudformation deploy --stack-name spinnaker-managed-infrastructure-setup --template-file managed.yaml \
	--parameter-overrides AuthArn=FROM_ABOVE ManagingAccountId=FROM_ABOVE --capabilities CAPABILITY_NAMED_IAM --region us-west-2
```

## Configure Halyard with AccessKeys
* These steps need to be executed only if you selected UseAccessKeyForAuthentication as true in Option-1 or Option-2 above
```yaml
	hal config provider aws edit --access-key-id ${ACCESS_KEY_ID} \
     --secret-access-key # do not supply the key here, you will be prompted 
```

## Configure Halyard to add AWS account
* Execute the below command to add AWS EC2 Account
```yaml
	$AWS_ACCOUNT_NAME={name for AWS account in Spinnaker, e.g. my-aws-account}
	hal config provider aws account add $AWS_ACCOUNT_NAME \
     --account-id ${ACCOUNT_ID} \
     --assume-role role/spinnakerManaged
```
* Execute the below command to Enable AWS
```yaml
	hal config provider aws enable
```