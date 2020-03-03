# Getting Started
**Run OpsMx as a Container**

Detailed below are the steps to turn on continuous verification for a dockerized deployment setup.

**1. Download OpsMx from DockerHub**

Download the latest OpsMx docker image from the dockerhub (hub.docker.com)
 The ID of the image is: `docker.io/opsmx11/autopilot:v0.9.1`
 
 To pull the image, run 
 <pre><code>docker pull docker.io/opsmx11/autopilot:v0.9.1</code></pre>

**2. Allocate a Volume for Persistent Storage**

Allocate a volume on the VM to store data beyond the lifecycle of the container. 

<pre><code>docker volume create opsmxdata</code></pre>

**3. Download Database image from DockerHub**

Download the latest Database docker image from the dockerhub (hub.docker.com)
 The ID of the image is: `docker.io/opsmx11/autopilot:db-0.9`

 To pull the image, run
 <pre><code>docker pull docker.io/opsmx11/autopilot:db-0.9</code></pre>

**4. Run Database on a pre-specified local IP**

To ensure data lives as a separate module, the database is bound to a local IP - 172.17.0.1 and our application connects to this container via this IP. 
 To run this DB: <pre><code> docker run -itd -p 5432:5432 --add-host=database:172.17.0.1 -v opsmxdata:/var/lib/postgresql docker.io/opsmx11/autopilot:db-0.9 </code></pre>

**5. Run OpsMx on Docker linked to Database**

Run the OpsMx image on a machine on which docker is installed
OpsMx requires ports 8090, 9090 and 8161 to be open. Ensure these are opened in the VM and in docker

Also, point the volume created to the Database of OpsMx to ensure the durability of the data. 

 _Command:_ <pre><code> docker run -itd -p 8090:8090 -p 9090:9090 -p 8161:8161 --add-host=database:172.17.0.1 docker.io/opsmx11/autopilot:v0.9.1 </code></pre>

**6. Verify the Container**

Check whether this docker image is running as a container, via: `docker ps`
This should show up a running container with a container id

_To start the container:_ <pre><code> docker exec -it docker.io/opsmx11/autopilot:v0.9.1 /bin/bash </code></pre>


**7. Access the Login Page**

To access the UI for login and registration - 

 <pre><code> http://{ip}:8161/opsmx-analysis/public/login.html </code></pre>

This completes the setup and configuration of OpsMx container.

# Configuring Credentials
**Signup & Login**

To access the UI for login and registration -

 <pre><code> http://{ip}:8161/opsmx-analysis/public/login.html </code></pre>

**1. Signup a new User**

![Screenshot](img/Login-1.png)


**2. Login with this new User**

![Screenshot](img/Login-2.png)


**Configuring Cloud Credentials**

**Note: This is only required if data is being pulled directly from the container/VM. Not mandatory.**

If you are deploying your applications to  Kubernetes, AWS or GCP, enable read access to the OpsMx Analysis platform

To enable read access, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Deployment Credentials” tab

**Step 3:**  Click on “ADD” Button. Currently, OpsMx supports  “Kubernetes” and “AWS” or “GCP” providers.

**Step 4:**  For “Kubernetes” ,enter account name in textbox then upload the appropriate  kubernetes credentials file by clicking on Browse and Upload Buttons.

![Screenshot](img/deployment.png)

**Step 5:**   Configure the Cloud Read credentials

For enabling AWS cloud, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).  Check out how to generate AWS access credentials section for help with creating keys with needed permissions.

For enabling Google Cloud Platform, upload the appropriate credentials file.

**Step 6:** Save the credentials.

For Saving the Cloud Credentials, when it Uploads it automatically saved.

To delete a saved credential, click on the Delete link under Action box.

**Configuring Monitoring Credentials**

OpsMx Analysis Platform needs to be configured to access the monitoring metric store for the deployments to be able to analyze the services.  Currently, the supported monitoring metric store include AWS CloudWatch,  GCP StackDriver, Newrelic, Prometheus and Datadog

To enable read access to the monitoring metric store, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Monitoring Credentials” tab

**Step 3:**  Click on the “ADD”.  Currently, OpsMx support AWS CloudWatch, GCP StackDriver, Newrelic, Prometheus, Elasticsearch and Datadog monitoring tools.


Configuring Monitoring Credentials

**Step 4:**   Configure the Monitoring Credentials

For enabling Newrelic, specify the Account Name, Application Name, Application key.

For enabling Prometheus, specify the Account Name, End Point, Username and Password.

For enabling AWS CloudWatch, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).

For enabling Google Cloud Platform StackDriver, upload the appropriate credentials file.

For enabling Datadog, specify the API key and Application key.


**Step 5:** Save the monitoring credentials.

For Saving the Monitoring Credentials continue by clicking on “SAVE AND GO TO NEXT PAGE” Button.

To delete a saved credential, click on the Delete link under Action box.

![Screenshot](img/1.2-generic-credentials.png)

Add Auth-Token, Username and Passwords wherever applicable.
**Note: Scope refers to the key used to retrive a unique entity from the monitoring provider. **
An example for Elastic-Search is provided below. 

![Screenshot](img/1.1-elastic-credentials.png) 

# Canary Analysis

**Triggering a Canary Analysis**

OpsMx enables performing Canary Analysis on two separate deployments and provides a comprehensive report on the analysis after. This is typically triggered right after the deployment of the new build. 

To start the analysis, trigger the follow API

** API for Registering a Canary Analysis **

Pameters to be Specified:

<pre><code>
application:                   Name of the Application
beginCanaryAnalysisAfterMins:  Time to enable warming up of the container
canaryAnalysisIntervalMins:    Intervals in which metric-data is fetched and analysed
**name:** (Important)          Specify the Metric-Template name and the Log-Template name
minimumCanaryResultScore:      The score under which the Canary Analysis should fail
canaryResultScore:             The score above which the Canary Analysis should be a pass
lifetimeHours:                 The time in hours for which the Canary Analysis should be run

canaryDeployments:             Specifies the deployments' information of the Analysis
baseline:                      The container-id of the base container being compared against
baselineStartTimeMs:           The timestamp in Epoch Milliseconds when to start the analysis of baseline container
canary:                        The container-id of the new container being compared
canaryStartTimeMs:             The timestamp in Epoch Milliseconds when to start the analysis of canary container
</code></pre>


<pre><code> POST http://{opsmx-server-ip}:8090/registerCanary </code></pre>

<pre><code>

	{
	  "application" : "appName",
	  "canaryConfig" : {
	    "canaryAnalysisConfig" : {
	      "beginCanaryAnalysisAfterMins" : "0",
	      "canaryAnalysisIntervalMins" : "30",
	      "lookbackMins" : 0,
	      "name" : "metric-template:swarm-template;log-template:madhu",
	      "notificationHours" : [ ],
	      "useLookback" : false
	    },
	    "canaryHealthCheckHandler" : {
	      "@class" : "com.netflix.spinnaker.mine.CanaryResultHealthCheckHandler",
	      "minimumCanaryResultScore" : "50"
	    },
	    "canarySuccessCriteria" : {
	      "canaryResultScore" : "60"
	    },
	    "combinedCanaryResultStrategy" : "AGGREGATE",
	    "lifetimeHours" : "0.5",
	    "name" : "swarm",
	    "application" : "appName"
	  },
	  "canaryDeployments" : [ {
	    "@class" : ".CanaryTaskDeployment",
	    "accountName" : "my-k8s-account",
	    "baseline" : "2906d8455658",
	    "baselineStartTimeMs": 1527942007000,
	    "canary" : "fbad4ff8685c",
	    "canaryStartTimeMs": 1527942007000
	    "type" : "cluster"
	  } ],
	  "watchers" : [ ]
	}

</code></pre>


This returns the Canary-Id associated with this canary analysis run. 
`{canary-id}`

** Triggering a Canary Analysis via Script **

Alternatively, a canary can be triggered via the shell script `StartCanary.sh`. All the mandatory parameters of the above API trigger have to given as arguments in this particular order. 

These parameters are (in order): 

`servername`  IP or domain name of the OpsMx container

`username`  The username used to register/login to OpsMx

`canaryAnalysisIntervalMins`  The time gap between two successive analysis in the lifetime period. Recommended - 30 minutes

`metrictemplate`  The name of the metric-template registered on OpsMx. Can be ommitted if no metric-template

`logtemplate`  The name of the log-template registered on OpsMx. Can be ommitted if no log-template

`minimumCanaryScore`  The score below which the result should be treated as a failure

`canaryResultScore`  The score above which the result is considered as a success. If score between minimum & resultScore is treated as a warning

`baseline`  The unique marker to represent a baseline deployment

`canary`  The unique marker to represent a canary deployment

`baselineStartTimeMs`  The timestamp in Epoch Milliseconds when to start the analysis of baseline deployment

`canaryStartTimeMs`  The timestamp in Epoch Milliseconds when to start the analysis of canary deployment

Example: 
<pre><code>
sh StartCanary.sh servername='54.213.224.163' username='phani13'  canaryAnalysisIntervalMins='30' metrictemplate='opstemp' logtemplate='swarm' minimumCanaryScore='50' canary='1e8ecb994cbb' baselineStartMs='1528139701000' lifetimeHours='0.5' canaryResultScore='60' baseline='1e8ecb994cbb' 
</code></pre>

** Status of the Analysis **

Typically, one would need to wait for the time-period of `lifetimeHours` to wait for the analysis to be completed. To retrieve the status of the analysis.

But if analysis is being done on historic data, where endTime of the analysis has already elapsed and all the data is already available, analysis is readily available.
<pre><code> GET http://{opsmx-server-ip}:8090/canaries/{canary-id} </code></pre>

This would also retrieve the URL of the canary report.


** Canary Report URL **

To see the associated report for the canary run. 

<pre><code> http://{opsmx-server-ip}:8161/opsmx-analysis/public/canaryAnalysis.html?canaryId={canary-id} </code></pre>

This would provide the report of the analysis of the both the metrics and logs.


**Canary Report - An Overview**

Understanding the Canary Report
OpsMx Risk Analysis platform creates the Canary report for every pipeline run.  The analysis is performed by comparing the service metrics between the new canary version and the current baseline (production) version of the service. If the Canary report indicates a Canary score greater than an acceptable threshold, then the new version is ready to be promoted to the production deployment. Otherwise, OpsMx Canary report will identify the failing metrics for further investigation and troubleshooting.

**Canary Result Summary**

The OpsMx Canary report displays the Canary analysis summary of the service’s pipeline run.

![Screenshot](img/score-new.png)

Risk Scoring Summary


Overall Score – Score computed for canary comparison based on individual metrics differences and weights assigned to the metrics based on service characteristics. Score threshold will determine the failure or success of canary comparison.

Confidence Level – Represents the projected accuracy of the score based on the available data for analysis. The confidence level will increase with the increased amount of data available for analysis.

Critical Metrics – User-defined metrics that represent KPI of service behavior. Canary test will fail if any of the metrics tagged as critical fail in the canary test. If critical metrics are not tagged by the user, the system will treat all metrics equally and will assign rank based on algorithms.

Watchlist Metrics – User-defined metrics that represent intuitive performance measures. These metrics are used for filtering when presenting results with large number of analyzed metrics

Canary Result Details

In this example, the canary run is comparing a new version deployment with memory leak introduced and slightly higher throughput than the baseline version.

Score details present each of the metrics and their behavior over the period of the canary run. The default view of the details presents the user with the metrics that are tagged as critical or on the watch list that has failed the canary comparison.

Log Aanalysis

As configured Canary and Baseline versions, Based on configured versions opsmx compares and analysis both log data, displays the score and any differnce between version1 and version2 , it displays the version2 only.

![Screenshot](img/Screen-Shot-Log-1.png)

Metrics Summary

![Screenshot](img/score-new-2.png)

As shown in the following diagram, the canary run has a score of 0, and the default view presents system.mem.used metric as high ranking as well as tagged as critical that failed the canary test.

Metrics Groups


Metrics are grouped based on the service as well as system level metrics based on network, compute, disk and memory. This grouping allows users to identify high ranking groups and low scoring groups to diagnose the issues.

Metric Details

Selecting individual metric in the list shows details of the metric with its statistics, box plots and behavior over the period of canary. Each of the metrics rows has additional details on bucket scores. Each bucket is a timeslice that is used in comparison that allows users to identify trends or a subset of load that could be causing a problem with the new build.

![Screenshot](img/score-new-3.png)

Every metric is ranked based on their particular effect on the service behavior as well as the difference between canary and baseline versions.

The following shows the plot of the metric over the duration of the canary for baseline and canary versions of the service.

![Screenshot](img/score-new-4.png)

The following plot shows the box plot that allows easy detection of trends in the behavior of the metric over the duration of the canary run.


Canary Run Selection

During a canary run, a score can be computed at various intervals as configured by the user. For example in a canary run of 30 mins, the score can be configured to be computed every 10 mins causing the score to be generated 3 times during the canary run. The score details of the canary run at each of the intervals can be analyzed by selected the specific run from the drop-down menu as shown below.

![Screenshot](img/score-new-6.png)


For any further assistance, please email at info@opsmx.com.

#  Spinnaker Integration 

**Initial setup of Canary and ACA in Spinnaker**

 **Enable** Canary/ACA  **for Halyard based Spinnaker installation**
 **Step 1:** Enable Canary Feature
To enable Canary feature **starting Spinnaker 1.5 version**, use the following HAL command
<pre><code>ubuntu$ hal config features edit --mine-canary=true</code></pre>

To enable the canary feature <b>before 1.5</b>, you need to edit the profile in Halyard

HAL configuration files for default profile are placed in the folder – $SPINNAKER_HOME/.hal/default/config/profiles

**Note:**  If HAL is using a different profile then the changes must be made in that profile

<pre><code>ubuntu$ cd $SPINNAKER_HOME/.hal/default/config/profiles

ubuntu$  cp ../staging/settings.js .
</code></pre>

Edit the  settings.js file,  to add the canary feature like below.

<pre><code>feature: {

    canary: true,

    entityTags: entityTagsEnabled,

…

}
</code></pre>
**Step 2:**  Configure provider of automated Canary analysis service

To enable automated Canary analysis, you need to configure a provider of the Canary analysis.

Create  orca-local.yml in the $SPINNAKER_HOME/.hal/default/config/profiles

Add the line below and save the file.

<pre><code>mine:

    baseUrl: <a href="https://analyzer.opsmx.com/">https://<ACA service end-point  address>ACA service end-point  address></a>
</code></pre>

Example:

<pre><code>mine:

    baseUrl: https://analyzer.opsmx.com:8090
</code></pre>

In the above example,  OpsMx is serving as the provider of automated Canary analysis service. OpsMx performs in-depth analysis of new releases and provides the score and a detailed Canary report for diagnostics.

**Step 3:** Restart Spinnaker

Restart spinnaker using

<pre><code>sudo hal deploy apply</code></pre>



**Enable** Canary/ACA **for .Deb Filed based Spinnaker installation**

**Step 1:** Enable Canary Feature

To enable the canary feature, you need to edit /opt/deck/html/settings.js

Add the canary feature like below.

<pre><code>{

    canary: true,

    entityTags: entityTagsEnabled,

…


}
</code></pre>

**Step 2:**  Configure provider of automated Canary analysis service

To enable automated Canary analysis, you need to configure a provider of the Canary analysis.

Create  orca-local.yml in the /opt/spinnaker/config directory.

Add the line below and save the file.

<pre><code>mine:

    baseUrl: <a href="https://analyzer.opsmx.com/">https://<<ACA service end-point  address>ACA service end-point  address></a>
</code></pre>
Example:

<pre><code>mine:

    baseUrl: https://analyzer.opsmx.com
</code></pre>
In the above example,  OpsMx is serving as the provider of automated Canary analysis service. OpsMx performs in-depth analysis of new releases and provides the score and a detailed Canary report for diagnostics.

Step 3:

Restart spinnaker using

<pre><code>sudo stop spinnaker

sudo start spinnaker
</code></pre>



**Configuring Cloud and Monitoring Metrics Credentials**

Configuring Cloud Credentials:



If you are deploying your applications to  Kubernetes, AWS or GCP, enable read access to the OpsMx Analysis platform

To enable read access, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Deployment Credentials” tab

**Step 3:**  Click on “ADD” Button. Currently, OpsMx supports  “Kubernetes” and “AWS” or “GCP” providers.

**Step 4:**  For “Kubernetes” ,enter account name in textbox then upload the appropriate  kubernetes credentials file by clicking on Browse and Upload Buttons.

![Screenshot](img/Screen-Shot-DC-1.png)

Configuring Cloud Credentials



**Step 5:**   Configure the Cloud read credentials

For enabling AWS cloud, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).  Check out how to generate AWS access credentials section for help with creating keys with needed permissions.

For enabling Google Cloud Platform, upload the appropriate credentials file.

**Step 6:** Save the credentials.

For Saving the Cloud Credentials, when it Uploads it automatically saved.

To delete a saved credential, click on the Delete link under Action box.

**Configuring Monitoring Credentials**

OpsMx Analysis Platform needs to be configured to access the monitoring metric store for the deployments to be able to analyze the services.  Currently, the supported monitoring metric store include AWS CloudWatch,  GCP StackDriver, Newrelic, Prometheus and Datadog

To enable read access to the monitoring metric store, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Monitoring Credentials” tab

**Step 3:**  Click on the “ADD”.  Currently, OpsMx support AWS CloudWatch, GCP StackDriver, Newrelic, Prometheus, Elasticsearch and Datadog monitoring tools.


Configuring Monitoring Credentials

**Step 4:**   Configure the Monitoring Credentials

For enabling Newrelic, specify the Account Name, Application Name, Application key.

For enabling Prometheus, specify the Account Name, End Point, Username and Password.

For enabling AWS CloudWatch, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).

For enabling Google Cloud Platform StackDriver, upload the appropriate credentials file.

For enabling Datadog, specify the API key and Application key.


**Step 5:** Save the monitoring credentials.

For Saving the Monitoring Credentials continue by clicking on “SAVE AND GO TO NEXT PAGE” Button.

To delete a saved credential, click on the Delete link under Action box.

![Screenshot](img/Screen-Shot-DC-2.png)

**Generating AWS Access Credentials**

Read permissions to autoscaling group metadata is required to map the server groups to the instance ID of instances running. This allows the mapping of monitoring data for canary and baseline versions of canary deployment.

Following steps can be used to create a user with read-only permissions for EC2 instances.

**Step 1:** Create user in IAM of AWS console

![Screenshot](img/aws1.png)

Create User in IAM of AWS Console

**Step 2:** Create a group to assign limited permissions

![Screenshot](img/aws2.png)

Create a Group to Assign Limited Permissions

**Step 3:** Assign group to user

![Screenshot](img/aws3.png)

Assign Group to User

**Step 4:** Add read permission to the group associated with the user.

![Screenshot](img/aws4.png)

Add Read Permission to the Group Associated with the User

Using security credentials tab in the above screen, programmatic credential information generated can be used to configure the AWS cloud credentials in OpsMx configuration UI.

**Configuring Canary and Red/Black Analysis Stage in Spinnaker Pipeline**

Spinnaker supports two types of stages for analysis of new deployment. The two stages are

* Canary Stage
* ACA Stage (used for Red/Black deployment analysis)

**Canary Stage:**

In a Spinnaker pipeline, a Canary stage is used to verify the new version in production before switching over the production to the new version of service.  The Canary stages deploy a Canary and then compares the current version (referred to as Canary version) with the last successful build to production (referred to as baseline).

**Add Canary Stage with Automated Analysis for AWS Deployments**

Now, you can configure Spinnaker to deploy the new version in the Canary cluster pair.    Add and configure the Canary stage in the pipeline before production deploy stage.

**Note:** The Canary stage is only supported for AWS cloud provider (current as of Spinnaker 1.5 release).  The ACA task stage can be configured for other cloud providers (in addition to AWS) starting in Spinnaker 1.5 release.

![Screenshot](img/Canary-config.jpeg)

Add Canary Stage in Spinnaker Pipeline

To add a Canary stage to the pipeline, select Canary from the stage list as shown below in the “Add Stage” option.

![Screenshot](img/addcanary.png)

Selecting Canary Stage

**Configuring Canary Cluster**

For comparing the versions, select a deployment cluster running the current version of the service as the baseline version. Then deploy Canary cluster using Add Cluster to configure deployment of Canary. Spinnaker allows copying the configuration of the Canary cluster to be copied from the production cluster for deployment parameters.

![Screenshot](img/canarycluster.png)

Configuring Canary Cluster

After adding the baseline and canary cluster pairs, the deployment configuration will look as below.

![Screenshot](img/canarycluster2.png)

Configured Canary Cluster Pair

**Configure Judge Parameters**

OpsMx judge maps a Canary run based on the pipeline service name and the account deploying the pipeline. In the following example,  “opsmxuser” represents the username used to login to OpsMx Judge Service. Configuration “servicename” represents the service id that is configured for template name in the OpsMx Judge customize service interface.

![Screenshot](img/canaryconfig2.png)

Canary Deployment Configuration

![Screenshot](img/canaryconfig.png)

Canary Analysis Configuration

In the above configuration, the Canary analysis will start after 3 mins after completion of deployment, this can be set to 0 to start the analysis immediately. Report frequency represents how often a score is generated during the lifetime of canary. Each of the runs is scored and recorded and the final decision can be aggregate or lowest of the scores during the canary run.

Now, you can run the pipeline to get the automated Canary score.

![Screenshot](img/canary-failed-score-1.jpeg)

Automated Canary Score in Spinnaker Pipeline
Automated Canary Score in Spinnaker Pipeline
If you have configured the automated Canary analysis correctly, you will get the Canary score as part of your every pipeline run.   You can set up the score threshold to automatically deploy the new version or terminate the pipeline.  You can also look at the Canary report for further diagnosing the issues with the new version.

**Add Canary Stage with Automated Analysis for Kubernetes Deployments**

Spinnaker currently doesn’t support single stage Canary deployment and Analysis beyond AWS provider (current as of Spinnaker 1.5 release).   But, you can still deploy Canary and do analysis using the ACA task stage using the following steps.

Adding  Canary state to your Kubernetes cluster will have a canary stage creation stage,  canary analysis stage and canary cluster destroy before production deploy stage as follows. Canary state cluster deployment strategy is independent of production stage deployment strategy.

![Screenshot](img/canary-k8s1.png)

Canary for Kubernetes -Pipeline View

The canary stage deployment should deploy to different cluster not replace the production cluster that is running.

The canary stage should deploy as Highlander and not red/black as there is no current canary cluster that is running.

Adding synthetic canary state to this cluster will have a canary stage creation, canary run and canary cluster destroy before production deploy stage as follows. Canary state cluster deployment strategy is independent of Production stage deployment strategy.

![Screenshot](img/canary-k8s-2.png)

Canary for Kubernetes -Deploy Configuration

![Screenshot](img/canary-k8s-3.png)


Canary for Kubernetes -Deploy Configuration

Canary cluster and production cluster share the same load balancer (or service)

![Screenshot](img/canary-k8s-4.png)


Canary for Kubernetes – Load Balancer Configuration

From the following screenshot,

**baseline:** prodapp-stress-prod-current

**canary:** prodapp-stress-canary-current

This will generate metadata to OpsMx server to compare the cluster with name prodapp-stress-prod that has the latest version data (from metric database) with canary cluster with name prodapp-stress-canary that has latest version that are currently active. If any of the clusters are not active then it is considered error condition.

![Screenshot](img/canary-k8s-5.png)

Canary for Kubernetes - Metrics Scope Configuration

On Success of canary, the canary cluster is destroyed. In the case of failure, the canary cluster is left running to support troubleshooting the instance if required. When the next canary runs the leftover canary will be overwritten.

Ideally, the canary cluster must be destroyed irrespective of the status of canary. There is no easy way to perform this action in an automated way in Spinnaker in one pipeline, hence it will be left over on failure.



**Add Automated Red/Black Deployment Analysis:**

If you are like most and using Red/Black deployment, you can ACA task stage to do an automated analysis of that deployment.

This stage can be configured to compare the new version of deployment with any past versions as baseline.

Add and configure ACA task stage in Spinnaker pipeline after your  Red/Black deploy stage.

**Note:**  The ACA task stage can be configured for AWS and other cloud providers (in addition to AWS) starting in Spinnaker 1.5 release.

![Screenshot](img/aca-stage.png)

ACA Stage for Red/Black Deployment

To add ACA stage in the pipeline, select ACA Task from the stage list as shown below in the “Add Stage” option.

![Screenshot](img/add-aca.png)

Adding ACA Stage in the Pipeline

Configuring ACA Stage

OpsMx judge maps a Canary run based on the pipeline service name and the account deploying the pipeline. In the following example,  “opsmxuser” represents the username used to login to OpsMx Judge Service. Configuration “servicename” represents the service id that is configured for template name in the OpsMx Judge customize service interface.

![Screenshot](img/aca-task-1.png)

ACA Stage Configuration

![Screenshot](img/aca-task-2.png)

ACA Analysis Configuration

Metric scope configures baseline version to compare with the current version. The baseline version data is expected to be present in the metric store. The configuration offers three different configuration settings of which only cluster scope is supported for analysis in this release.  Cluster specifies the name of the cluster deployed by Spinnaker in the target environment. The details of the cluster are retrieved from the target environment in the case of active clusters. If the baseline cluster is not active, then the cluster details are extracted from the metric store based on the tags associated with the cluster.

![Screenshot](img/aca-task-3.png)

ACA Metric Scope Configuration

For Kubernetes target environment, default namespace is assumed if the namespace is not specified. If the namespace is specified then the context will be searched in the specified namespace. The namespace specification for the cluster is of the following format:

Canary: app-servicename-test-current, namespace1

When you run the pipeline, the ACA stage is performed on your red/black deployment

![Screenshot](img/Red-Black-Failed-Score.jpeg)

Automated Red/Black Analysis in Spinnaker Pipeline

If you have configured the ACA task stage correctly, you will get the automated Canary score as part of your pipeline run.   You can set up the score threshold to automatically trigger roll-back of the new release if needed.



 




