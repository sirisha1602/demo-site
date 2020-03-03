# Terraform with Spinnaker CodeLab

OpsMx is delighted to announce open sourcing OpsMx Terraform service to integrate with Spinnaker for planning and applying Terraform plans. Spinnaker is a Continuous Delivery platform for releasing software changes at high velocity and confidence. Spinnaker natively supports multiple cloud environments for software deployment. Enterprises may want to extend Spinnaker to take advantage of investments already made in infrastructure creation or legacy application deployments.

Terraform is a tool for building, changing and versioning infrastructure safely. Enterprises may have made investments in Terraform scripts for building infrastructure or would like to automate infrastructure management using Terraform. Spinnaker platform supports extensions to include third party tools as part of pipeline workflow. In this code labs we demonstrate how to use Spinnaker pipelines to include Terraform stages as part of the pipeline workflow for continuous delivery of application services including infrastructure management using Terraform. 

## In this code lab you will learn?
* How to install OpsMx Terraform service add-on to Spinnaker
* How to create a Custom Webhook stage compatible with TerraSpin Service.
* How to Create a MultiStage workflow pipeline in Spinnaker 
* Plan and execute Terraform plans from artifact account.

You will also find details on access to Terraform service code to explore and extend. 

## OpsMx Terraform Service

OpsMx Terraform service (OTS) is a REST service that is deployed along with Spinnaker services and uses the accounts configured in Halyard for plan access and applying to cloud environments. OTS allows seemless integration of Terraform stage in the pipeline. Automation for two way interaction i.e. passing variables from Spinnaker pipeline stage to Terraform plan and execution and using the output of Terraform execution in Spinnaker pipeline stages is simple to use.

![Screenshot](/img/terraform/terraform-service.png)
Fig 1. Terraform service interaction with Spinnaker

To make the extension simple affair for self-service pipeline creation, we recommend creating a custom stage for integrating Terraform service in the pipeline stages. 

![Screenshot](/img/terraform/custom-stageplan.png)
Fig 2. Custom stage for plan, apply and delete for Terraform service



## What you’ll need?
* Installing OpsMx Terraform Service
Source code for service can downloaded from https://github.com/OpsMx/Terraform-spinnaker and build the binary. Or you can download pre-built binary and install with Spinnaker services as follows:
```yaml
	wget https://releases.hashicorp.com/terraform/0.11.11/terraform_0.11.11_linux_amd64.zip
    unzip -a terraform_0.11.11_linux_amd64.zip
    chmod +x terraform
    sudo mv terraform /usr/local/bin/terraform
```
* Execute the below to have OpsMx TerraSpin service active on the Debian spinnaker.
```yaml
	wget https://raw.githubusercontent.com/OpsMx/Terraform-spinnaker/master/TerraSpin/artifacts/TerraSpinInstall.sh
```
* Make executable script
	```yaml
		chmod +x TerraSpinInstall.sh
	```
* Now you can run TerraSpin service in two  ways either on the default port(8090) or else on user-specific port
	```yaml
		./TerraSpinInstall.sh #will run TerraSpin service  on 8090 port
		./TerraSpinInstall.sh 8639 #will run TerraSpin service  on 8639 port
	```

OTS uses clouddriver accounts and Git artifact accounts credentials configured in Spinnaker halyard config for execution. It's mandatory to have Cloud provider & SCM Account configured with Spinnaker for applying Terraform plans.


* It's mandatory to have Cloud provider &amp; SCM Account configured with Spinnaker.

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
        
          "applicationName": "${execution['application']}",
          "pipelineName": "${execution['name']}",
          "pipelineId": "${execution['pipelineConfigId']}"   
        

  - label: Terraform-apply
    description: "To apply terraform plan"
    enabled: true
    type: terraformCWApplyStage
    url: "http://<IP Adress>:<PorNumbert>/api/v1/terraformApply"
    method: POST
    payload: |-
        
          "applicationName": "${execution['application']}",
          "pipelineName": "${execution['name']}",
          "pipelineId": "${execution['pipelineConfigId']}"
        
  


  - label: Terraform-plan
    description: "To create terraform plan"
    enabled: true
    type: terraformCWPlanStage
    url: "http://<IP Adress>:<PorNumbert>/api/v1/terraformPlan"
    method: POST
    payload: |-
      
        "gitAccount": "${parameterValues['gitAccount']}",
        "cloudAccount": "${parameterValues['cloudAccount']}",
        "applicationName": "${execution['application']}",
        "pipelineName": "${execution['name']}",
        "pipelineId": "${execution['pipelineConfigId']}",   
        "plan": "${parameterValues['plan']}"
      
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
