# How to Create Terraform Custom Job in Spinnaker
### What you’ll learn:
1. How to do Terraform operations as a spinnaker native stage through a spinnaker custom job.
### Prerequisites:
1. Understanding of spinnaker, spinnaker custom profile build and spinnaker custom job
2. A running spinnaker with Kubernetes cluster account configured in it.

Now! Let’s begin with ‘How to do Terraform operations as spinnaker native stage through spinnaker custom job’ 

In case you want to understand more about what a spinnaker custom job [https://www.spinnaker.io/guides/operator/custom-job-stages](https://www.spinnaker.io/guides/operator/custom-job-stages ).
We develop open-source TerraSpin micro-service which seamlessly integrates with spinnaker through spinnaker custom job. Which Ideally creates three stages in spinnaker ( TSPlanJob, TSApplyJob, and TSDestroyJob ). Each stage has its own input fields and output.


How to get the above stages in spinnaker! Navigate to the following location ~/.hal/default/profile in halyard machine and then create/edit the orca-local.yml, Copy the below content in the same file.

## custom job config for Terraspin stages 

```yaml

job: 
  preconfigured: 
    kubernetes: 
      - 
        account: defaultAccount
        application: terraformdemo
        cloudProvider: kubernetes
        credentials: defaultAccount
        description: "Stage for terraspin plan operation"
        label: TSPlanJob
        manifest: 
          apiVersion: batch/v1
          kind: Job
          metadata: 
            name: terraspinplanjob
            namespace: spinnaker
          spec: 
            backoffLimit: 0
            template: 
              spec: 
                containers: 
                  - 
                    command: 
                      - PlanRun.sh
                    env: 
                      - 
                        name: artifactAccount
                        value: ~
                      - 
                        name: plan
                        value: ~
                      - 
                        name: variableOverrideFileRepo
                        value: ~
                      - 
                        name: stateRepo
                        value: ~
                      - 
                        name: uuId
                        value: ~
                      - 
                        name: component
                        value: plan
                    image: "docker.io/opsmx11/terraspin:2.0"
                    imagePullPolicy: Always
                    name: terraspinplan
                    volumeMounts: 
                      - 
                        mountPath: /home/terraspin/opsmx/app/config/
                        name: opsmx-terraspin-backend-config
                restartPolicy: Never
                volumes: 
                  - 
                    configMap: 
                      name: terraspinbackendconfig
                    name: opsmx-terraspin-backend-config
        parameters: 
          - 
            defaultValue: "< artifact account name on which your terrafrom infracode present >"
            description: "pass your artifact account name."
            label: "Artifact account"
            mapping: "manifest.spec.template.spec.containers[0].env[0].value"
            name: "Artifact account"
          - 
            defaultValue: "< artifact path where terrafrom infracode present >"
            description: "pass terraform module repo where your tf infra code present."
            label: "Terraform plan"
            mapping: "manifest.spec.template.spec.containers[0].env[1].value"
            name: "Terraform plan"
          - 
            defaultValue: "< artifact override file path for overriding default values >"
            description: "pass overrideVariableFile path if you want to override variables."
            label: "Override file"
            mapping: "manifest.spec.template.spec.containers[0].env[2].value"
            name: "Override file"
          - 
            defaultValue: "< specify repo name on which you want to store states of terraform plan, apply and destroy >"
            description: "pass repo name where you want to save intermediate state of terraform state."
            label: "State repo"
            mapping: "manifest.spec.template.spec.containers[0].env[3].value"
            name: "State repo"
          - 
            defaultValue: "< Unique string, give the same string in the plan, apply and destroy stages >"
            description: "pass unique user id."
            label: UUId
            mapping: "manifest.spec.template.spec.containers[0].env[4].value"
            name: UUId
        type: customTSPlanJobStage
        waitForCompletion: true
      - 
        account: my-k8s-v2-account
        application: terraspin
        cloudProvider: kubernetes
        credentials: my-k8s-v2-account
        description: "Stage for terraspin plan operation"
        label: TSApplyJob
        manifest: 
          apiVersion: batch/v1
          kind: Job
          metadata: 
            name: terraspinapplyjob
            namespace: spinnaker
          spec: 
            backoffLimit: 0
            template: 
              spec: 
                containers: 
                  - 
                    command: 
                      - ApplyRun.sh
                    env: 
                      - 
                        name: artifactAccount
                        value: ~
                      - 
                        name: plan
                        value: ~
                      - 
                        name: variableOverrideFileRepo
                        value: ~
                      - 
                        name: stateRepo
                        value: ~
                      - 
                        name: uuId
                        value: ~
                      - 
                        name: component
                        value: apply
                    image: "docker.io/opsmx11/terraspin:2.0"
                    imagePullPolicy: Always
                    name: terraspinapply
                    volumeMounts: 
                      - 
                        mountPath: /home/terraspin/opsmx/app/config/
                        name: opsmx-terraspin-backend-config
                restartPolicy: Never
                volumes: 
                  - 
                    configMap: 
                      name: terraspinbackendconfig
                    name: opsmx-terraspin-backend-config
        parameters: 
          - 
            defaultValue: "< artifact account name on which your terrafrom infracode present >"
            description: "pass git account name."
            label: "Artifact account"
            mapping: "manifest.spec.template.spec.containers[0].env[0].value"
            name: "Artifact account"
          - 
            defaultValue: "< artifact path where terrafrom infracode present >"
            description: "pass terraform module repo where your tf infra code present."
            label: "Terraform plan"
            mapping: "manifest.spec.template.spec.containers[0].env[1].value"
            name: "Terraform plan"
          - 
            defaultValue: "< artifact override file path for overriding default values >"
            description: "pass overrideVariableFile path if you want to override variables."
            label: "Override file"
            mapping: "manifest.spec.template.spec.containers[0].env[2].value"
            name: "Override file"
          - 
            defaultValue: "< specify repo name on which you want to store states of terraform plan, apply and destroy >"
            description: "pass repo name where you want to save intermediate state of terraform state."
            label: "State repo"
            mapping: "manifest.spec.template.spec.containers[0].env[3].value"
            name: "State repo"
          - 
            defaultValue: "< Unique string, give the same string in the plan, apply and destroy stages >"
            description: "pass unique user id."
            label: UUId
            mapping: "manifest.spec.template.spec.containers[0].env[4].value"
            name: UUId
        propertyFile: terraspinapply
        type: customTSApplyJobStage
        waitForCompletion: true
      - 
        account: my-k8s-v2-account
        application: terraspin
        cloudProvider: kubernetes
        credentials: my-k8s-v2-account
        description: "Stage for terraspin plan operation"
        label: TSDestroyJob
        manifest: 
          apiVersion: batch/v1
          kind: Job
          metadata: 
            name: terraspindestroyjob
            namespace: spinnaker
          spec: 
            backoffLimit: 0
            template: 
              spec: 
                containers: 
                  - 
                    command: 
                      - DestroyRun.sh
                    env: 
                      - 
                        name: artifactAccount
                        value: ~
                      - 
                        name: stateRepo
                        value: ~
                      - 
                        name: uuId
                        value: ~
                      - 
                        name: component
                        value: destroy
                    image: "docker.io/opsmx11/terraspin:2.0"
                    imagePullPolicy: Always
                    name: terraspindestroy
                    volumeMounts: 
                      - 
                        mountPath: /home/terraspin/opsmx/app/config/
                        name: opsmx-terraspin-backend-config
                restartPolicy: Never
                volumes: 
                  - 
                    configMap: 
                      name: terraspinbackendconfig
                    name: opsmx-terraspin-backend-config
        parameters: 
          - 
            defaultValue: "< artifact account name on which your terrafrom infracode present >"
            description: "pass git account name."
            label: "Artifact account"
            mapping: "manifest.spec.template.spec.containers[0].env[0].value"
            name: "Artifact account"
          - 
            defaultValue: "< specify repo name on which you want to store states of terraform plan, apply and destroy >"
            description: "pass repo name where you want to save intermidiated state of terraform state."
            label: "State repo"
            mapping: "manifest.spec.template.spec.containers[0].env[1].value"
            name: "State repo"
          - 
            defaultValue: "< Unique string, give the same string in the plan, apply and destroy stages >"
            description: "pass unique user id."
            label: UUID
            mapping: "manifest.spec.template.spec.containers[0].env[2].value"
            name: UUID
        type: customTSDestroyJobStage
        waitForCompletion: true


```

After doing config setting in orca-local.yml do hal deploy apply. Once spinnaker re-deploy again successfully custom job config setting will get three custom native stages in spinnaker.


1. TSPlanJob

2. TSApplyJob

3. TSDestroyJob

![Screenshot](../../img/terraform-customjob/testPipe.png)

### TSPlanJob: 
Like its name, this stage does Terraform infra-code initial formal run basically (terraform init and terraform plan) this stage has five input.

1. Artifact account.

2. Terraform plan.

3. Override file.

4. State repo.

5. UUId.

![Screenshot](../../img/terraform-customjob/tsPlan.png)

Output: This stage will show terraform init and plan command output.

### TSApplyJob: 
Functionality of this stage to create terraform infra-code basically ( terraform apply ). Here stage output will have properties file with terraform infra-code out-values in a key-value format so that user can use those values in next subsequent stage of pipeline this stage has four inputs.

1.Artifact account.

2.Override file.

3.State repo.

4.UUId.

![Screenshot](../../img/terraform-customjob/tsApplyJob.png)

Output: This stage will show terraform apply command output.


### TSDestroyJob: 
Functionality of this stage to destroy terraform infra-code basically ( terraform destroy ) this stage has four inputs.

1.Artifact account.

2.State repo.

3.UUId.

![Screenshot](../../img/terraform-customjob/tsdestroyjob.png)

Output: This stage will show terraform destroy command output

If you see a manifest part of each custom job configuration I am expecting from the user to create a config map in the same k8 namespace and in the same k8 account. In order to do that create a file called artifactaccounts.json  file the file with below content and replace values according to your artifact account.

What artifactaccounts.json contains it contains artifact account details from where we pull terraform infra-code and same artifact account we are expecting from user to pass as an input in Artifact account column of each stage ( TSPlanJob, TSApplyJob, and TSDestroyJob )

artifactaccounts.json file content ( replace value according to your account details. )

```yaml
{
  "artifactaccounts": [
    {
      "accountname": "my-artifact1",
      "artifacttype": "github",
      "username": "opsmx",
      "password": "pwd"
    },
    {
      "accountname": "my-artifact2",
      "artifacttype": "github",
      "username": "user",
      "password": "pwd"
    }
  ]
}


```

Command to create configmap by using artifactaccounts.json file

Kubectl create cm terraspinbackendconfig --from-file=artifactaccounts.json -n default


Screenshot with filled input values

![Screenshot](../../img/terraform-customjob/articraft.png)

1.Artifact account- an artifact account name where terraform infra-code present.

2.Terraform plan- an actual path of artifact where your terraform infra-code present.

3.Override file- an actual path of artifact where override file present. 

4.State repo- an artifact repo name where Terraspin service will push terraform individual stage state (like terraform plan, apply and destroy state).

5.UUId- unique id for each individual user who is going to use these stages. 





