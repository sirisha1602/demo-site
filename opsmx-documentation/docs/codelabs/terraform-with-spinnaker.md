# Terraform with Spinnaker CodeLab

* OpsMx is delighted to announce open sourcing OpsMx Terraform service to integrate with Spinnaker for planning and applying Terraform plans. Spinnaker is a Continuous Delivery platform for releasing software changes at high velocity and confidence. Spinnaker natively supports multiple cloud environments for software deployment. Enterprises may want to extend Spinnaker to take advantage of investments already made in infrastructure creation or legacy application deployments.

* Terraform is a tool for building, changing and versioning infrastructure safely. Enterprises may have made investments in Terraform scripts for building infrastructure or would like to automate infrastructure management using Terraform. Spinnaker platform supports extensions to include third party tools as part of pipeline workflow. In this code labs we demonstrate how to use Spinnaker pipelines to include Terraform stages as part of the pipeline workflow for continuous delivery of application services including infrastructure management using Terraform.

## What you’ll learn?
* Setting up a Terraspin Service - Debian Mode, Docker & Kubernetes.
* Allows to create a Custom Webhook stage compatible with TerraSpin Service.
* Allows users to manage infrastructure using OpsMx TerraSpin MicroService.

## Prerequisites
* Spinnaker should be up and running.
* TerraSpin should be up and running.
* Create custom webhook setup in spinnaker to call TerraSpin micro-service.

## OpsMx Terraform Service

OpsMx Terraform service (OTS) is a REST service that is deployed along with Spinnaker services and uses the accounts configured in Halyard for plan access and applying to cloud environments. OTS allows seemless integration of Terraform stage in the pipeline. Automation for two way interaction i.e. passing variables from Spinnaker pipeline stage to Terraform plan and execution and using the output of Terraform execution in Spinnaker pipeline stages is simple to use.

![Screenshot](/img/terraform/terraform-service.png)
Fig 1. Terraform service interaction with Spinnaker

To make the extension simple affair for self-service pipeline creation, we recommend creating a custom stage for integrating Terraform service in the pipeline stages. 

![Screenshot](/img/terraform/custom-stageplan.png)
Fig 2. Custom stage for plan, apply and delete for Terraform service


## What you’ll need? 
### Chose a way to run TerraSpin service

* **Debian**

	* Install Terraform binary on same Debian spinnaker
		```yaml
			wget https://releases.hashicorp.com/terraform/0.11.11/terraform_0.11.11_linux_amd64.zip
		```
		```yaml
			unzip -a terraform_0.11.11_linux_amd64.zip
		```
		```yaml
			chmod +x terraform
		```
		```yaml
			sudo mv terraform /usr/local/bin/terraform
		```
	
	* Run TerraSpin binary clone this repo on machine https://github.com/OpsMx/Terraform-spinnaker

	* Go inside TerraSpin directory run this command to build jar ( mvn clean install )
	After successful building service maven will create a jar inside target folder
	Now to run TerraSpin microservice dial this command 
		```yaml
			java -Dspring.config.location=application.properties -jar TerraSpin.jar
		```
	You can find application.properties file in TerraSpin directory itself

* **Docker**

	* To run TerraSpin service as a container, it is required to run the image with volume so first will create a directory structure in a local system.
	* Execute the below commands to create a directory by name opsmx and create sub directories as below
			```yaml
				mkdir -p opsmx/app/config/
				mkdir -p opsmx/hal/
				mkdir -p opsmx/kubeaccount/
			```

	* Now create respective configuration files under each respective directory
		* Execute the below command to create a file by name ‘application.properties’. 
		
			```yaml
				vi ~/opsmx/app/config/application.properties
			```
			 Fill the file with the following content properties.
			```yaml
				spring.banner.location=classpath:/templates/banner.txt
				server.port=8090
				application.iscontainer.env=true
			```

	* Execute the below command to create a file by name ‘halconfig’ in the directory(/opsmx/hal/) place the halconfig file. 
	
	```yaml
		vi ~/opsmx/hal/halconfig
	```
	
	* Fill halconfig file with halyard configuration in JSON format. 
	* By Executing the below command hal config in JSON format can be created.
		```yaml
			hal config -c false -o json
		```
	* Copy the newly generated JSON from starting of  braces to end ({ }) and place it in halconfig file.
		```yaml
			{"name":"default","version":"1.14.6","providers":{"appengine":{"enabled":false,"accounts":[]},"aws":{"enabled":false,"accounts":[],"bakeryDefaults":{"baseImages":[]},"defaultKeyPairTemplate":"{{name}}-keypair","defaultRegions":[{"name":"us-west-2"}],"defaults":{"iamRole":"BaseIAMRole"}},"ecs":{"enabled":false,"accounts":[]},"azure":{"enabled":false,"accounts":[],"bakeryDefaults":{"templateFile":"azure-linux.json","baseImages":[]}},"dcos":{"enabled":false,"accounts":[],"clusters":[]},"dockerRegistry":{"enabled":false,"accounts":[]},"templates":[]},"pubsub":"webhook":{"trust":{"enabled":false}}}
		```
		
	* Execute the below command to edit the halconfig file on Halyard instance. Capture the kubernetes account name which you are planning to use for the Terraspin Service.
		```yaml
			vi ~/.hal/config
		```
		
	* If, your account name is ‘my-k8s-v2-account’. Execute the below command to create a new file with the account name used in spinnaker(my-k8s-v2-account) then copy the file content from the location in ‘kubeconfigFile’ and paste is to the newly created file. For details refer to the below screenshot
	![Screenshot](/img/terraform/spinnaker-with-terraform.png)
	```yaml
		vi ~/opsmx/kubeaccount/my-k8s-v2-account
	```
	* Similarly, if the user wants to use more than one k8s account to provision infrastructure through Terraform follow the same procedure and create a file name by account name used by spinnaker in ‘/opsmx/kubeaccount/’ directory. 
	* Execute the below command to run docker image with volume 
	```yaml
		sudo docker run -p 8899:8899 -d -v /home/opsmxgcetest/opsmx/:/home/terraspin/opsmx opsmx11/terraspin:v0.9
	```
	
	!!!note
		Port Number can be updated as per your requirement.
		
		
* **Kubernetes**

	* In order to run TerraSpin service over kubernetes/openshift cluster, it requires to run the deployment/pod with configmap so first will create configmap.
	
	* Execute the below command to create directory structure for configmap creation.
	```yaml
		mkdir terraspinbackendconfig
		mkdir terraspinhalconfig
		mkdir terraspinkubeaccount1config
	```
	* Follow the below to create configmap
	
		* Execute the below command to create a file by name application.properties. Fill the file with the following content properties.
		
		```yaml
			vi ~/terraspinbackendconfig/application.properties
			spring.banner.location=classpath:/templates/banner.txt
			server.port=8090
			application.iscontainer.env=true
		```
		
		!!!note
			 Port number can be modified as per your requirement
			 
	* Command to create terraspinbackendconfig configmap 
	```yaml
		kubectl create configmap terraspinbackendconfig  --from-file=~/terraspinbackendconfig/application.properties
	```
	* Now, navigate to ‘terraspinhalconfig’ and create a file by name ‘halconfig’.
	* Execute the below command to create the halconfig with halyard configuration in JSON format.
	```yaml
		hal config -c false -o json
	```
	* Cut the JSON part from starting to end of braces ({ }) and place it in halconfig file.
	```yaml
		{"name":"default","version":"1.14.6","providers":{"appengine":{"enabled":false,"accounts":[]},"aws":{"enabled":false,"accounts":[],"bakeryDefaults":{"baseImages":[]},"defaultKeyPairTemplate":"{{name}}-keypair","defaultRegions":[{"name":"us-west-2"}],"defaults":{"iamRole":"BaseIAMRole"}},"ecs":{"enabled":false,"accounts":[]},"azure":{"enabled":false,"accounts":[],"bakeryDefaults":{"templateFile":"azure-linux.json","baseImages":[]}},"dcos":{"enabled":false,"accounts":[],"clusters":[]},"dockerRegistry":{"enabled":false,"accounts":[]},"templates":[]},"pubsub":"webhook":{"trust":{"enabled":false}}}
	```
	* Execute the following command to create terraspinhalconfig configmap
	```yaml
		kubectl create configmap terraspinhalconfig  --from-file=halconfig 
	```
	* Execute the below command to edit the halconfig file on Halyard instance. Capture the kubernetes account name which you are planning to use for the Terraspin Service.
	```yaml
		vi ~/.hal/config
	```
	* Now, navigate to ‘terraspinkubeaccount1config’ and check your k8s account name which is being used by spinnaker(Eg:‘my-k8s-v2-account’). Execute the below command to create a new file with the account name used in spinnaker(my-k8s-v2-account) then copy the file content from the location in ‘kubeconfigFile’ and paste is to the newly created file. For details refer to the below screenshot
	```yaml
		Vi ~/terraspinkubeaccount1config/my-k8s-v2-account
	```
		![Screenshot](/img/terraform/spinnaker-with-terraform.png)
	* Execute the following command to create terraspinkubeaccount1config configmap 
	```yaml
		kubectl create configmap terraspinkubeaccount1config  --from-file=<my-k8s-v2-account>
	```
	
	!!!note
		This should be the kubernetes account used by Spinnaker.
	* Create TerraSpin Deployment mainfest by name terraspin-Deployment.yaml
	```yaml
		apiVersion: extensions/v1beta1
		kind: Deployment
		metadata:
		  name: opsmx-terraspin
		spec:
		  replicas: 1
		  selector:
			matchLabels:
			  app: opsmx-terraspin
		  template:
			metadata:
			  labels:
				app: opsmx-terraspin
			spec:
			  volumes:
				- name: opsmx-terraspin-backend-config
				  configMap:
					name: terraspinbackendconfig
				- name: opsmx-terraspin-hal-config
				  configMap:
					name: terraspinhalconfig
				- name: opsmx-terraspin-kube-config
				  configMap:
					name: terraspinkubeaccount1config
			  containers:
				- image: 'docker.io/opsmx11/terraspin:v0.9'
				  imagePullPolicy: Always
				  name: terraspin
				  ports:
					- containerPort: 8090
					  name: backend
					  protocol: TCP
				  volumeMounts:
				  - name: opsmx-terraspin-backend-config
					mountPath: /home/terraspin/opsmx/app/config/
				  - name: opsmx-terraspin-hal-config
					mountPath: /home/terraspin/opsmx/hal/
				  - name: opsmx-terraspin-kube-config
					mountPath: /home/terraspin/opsmx/kubeaccount/
	```
	* Execute the following command to create terraspin deployment 
	```yaml
		kubectl create -f terraspin-Deployment.yaml
	```
	* Create TerraSpin service mainfest by name terraspin-service.yaml
	```yaml
		apiVersion: v1
		kind: Service
		metadata:
		name: opsmx-terraspin-service
		spec:
		type: LoadBalancer
		ports:
		- port: 8090
		targetPort: 8090
		protocol: TCP
		selector:
		app: opsmx-terraspin
	```
	* Execute the following command to create spinterraspin service 
	```yaml
		kubectl create -f terraspin-service.yaml
	```
	
## What is custom webhook stage?
This stage provides a simple, yet powerful, way of adding custom stages to Spinnaker. These stages are
typically used to make quick API calls to an external system as part of a pipeline. Instead of extending the
various components through code, users can simply add configuration to Orca for these stages. They appear in
the UI as if they were a native stage.

We recommend custom webhook stage to call the TerraSpin API for planning, creating and destroying infrastructure.
		 
## How to Create custom webhook stage?
* Navigate to the following location ~/.hal/default/profile and create/edit the orca-local.yml.
* Copy the below webhook stage content block and save

```yaml
#Terraform Custom WebHook Stage
webhook: 
  preconfigured: 
  - label: Terraform-destroy
    description: "To destroy terraform plan"
    enabled: true
    type: terraformCWDestroyStage
    url: "http://<IP Adress>:<PorNumbert>/api/v1/terraformDestroy"
    method: POST
    payload: |-
      {  
          "applicationName": "${execution['application']}",
          "pipelineName": "${execution['name']}",
          "pipelineId": "${execution['pipelineConfigId']}"   
      }  

  - label: Terraform-apply
    description: "To apply terraform plan"
    enabled: true
    type: terraformCWApplyStage
    url: "http://<IP Adress>:<PorNumbert>/api/v1/terraformApply"
    method: POST
    payload: |-
      {  
          "applicationName": "${execution['application']}",
          "pipelineName": "${execution['name']}",
          "pipelineId": "${execution['pipelineConfigId']}"
      } 
  


  - label: Terraform-plan
    description: "To create terraform plan"
    enabled: true
    type: terraformCWPlanStage
    url: "http://<IP Adress>:<PorNumbert>/api/v1/terraformPlan"
    method: POST
    payload: |-
     {
        "gitAccount": "${parameterValues['gitAccount']}",
        "cloudAccount": "${parameterValues['cloudAccount']}",
        "applicationName": "${execution['application']}",
        "pipelineName": "${execution['name']}",
        "pipelineId": "${execution['pipelineConfigId']}",   
        "plan": "${parameterValues['plan']}"
     }
    parameters: 
      - label: "Cloud provider account"
        description: ""
        name: cloudAccount
        type: string
      - label: "Git Account"
        description: ""
        name: gitAccount
        type: string
      - label: "Plan"
        description: ""
        name: plan
        type: string
```

!!!note
	Replace IP Address and Port Number with actual public IP of machine and port on which TerraSpin service is running.
	
after doing setting in orca-local.yml do hal deploy apply after deploying spinnaker successfully our setting will add three custom native stages in spinnaker 

1. Terraform-plan stage having three input block
	* Cloud provider account - Pick cloud provider account name from your spinnaker clouds accounts which we are going to use as a terraform provider in TerraSpin service.
	* Git account - Provide the GIT account name which is configured in your spinnaker and the same account will use as terrafrom remote plan source.
	* Plan - TerraformPlansModule.git//NameSpace (see refrence: https://github.com/lalitv92/TerraformPlansModule)

2. Terraform-apply: stage having no input block it used to perform apply function for terraform plan
3. Terraform-destroy: stage having no input block it used to destroy a created terraform plan

   **Use-case will create a pipeline which has six stages**
### Create an Application to initiate Pipeline creation.
* Click on pipeline configure, add stage from the dropdown select Terraform-plan and add inputs manually as per the screenshot below

![Screenshot](/img/terraform/image1.png)

* Click on Add stage search for Terraform-apply and add the manual entries as per the screenshot below

![Screenshot](/img/terraform/image3.png)

* Click on Add Stage, select Deploy Manifest then select the Text radio button for Manifest Source and copy deployment manifest block given below.

![Screenshot](/img/terraform/image2.png)

deployment manifest block
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: simplerestapp
  namespace: >-
	${#stage('Terraform-apply')['context']['buildInfo']['outputValues']['nameSpace']}
spec:
  replicas: 2
  selector:
	matchLabels:
  	app: simplerestapp
  strategy:
	type: RollingUpdate
  template:
	metadata:
  	labels:
    	app: simplerestapp
	spec:
  	containers:
    	- image: 'docker.io/opsmx11/restapp:boostAppBlue'
      	imagePullPolicy: Always
      	name: restapp
      	ports:
        	- containerPort: 8090
          	name: http
          	protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: restappservice
  namespace: >-
	${#stage('Terraform-apply')['context']['buildInfo']['outputValues']['nameSpace']}
spec:
  ports:
	- name: restappfrontend
  	port: 8090
  	protocol: TCP
  	targetPort: 8090
  selector:
	app: simplerestapp
  type: NodePort
```

* Click on Add stage search for manual judgment and add Approve &amp; Reject as judgment input.

![Screenshot](/img/terraform/image3.png)
		
* Click on Add stage search for Terraform-destroy

![Screenshot](/img/terraform/image4.png)

* Save pipeline and run a pipeline

Link and Refrences
TerraSpin source Code: [https://github.com/OpsMx/Terraform-spinnaker](https://github.com/OpsMx/Terraform-spinnaker) 


	














	

			
			
			










