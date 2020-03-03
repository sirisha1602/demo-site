# Configuring Canary and Red/Black Analysis Stage in Spinnaker Pipeline

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

## Understanding  Canary Report

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

