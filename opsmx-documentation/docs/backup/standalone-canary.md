# Triggering a Canary Analysis

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

** Status of the Analysis **

Typically, one would need to wait for the time-period of `lifetimeHours` to wait for the analysis to be completed. To retrieve the status of the analysis.

But if analysis is being done on historic data, where endTime of the analysis has already elapsed and all the data is already available, analysis is readily available.
<pre><code> GET http://{opsmx-server-ip}:8090/canaries/{canary-id} </code></pre>

This would also retrieve the URL of the canary report.


** Canary Report URL **

To see the associated report for the canary run. 

<pre><code> http://{opsmx-server-ip}:8161/opsmx-analysis/public/canaryAnalysis.html?canaryId={canary-id} </code></pre>

This would provide the report of the analysis of the both the metrics and logs.


# Canary Report - An Overview

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

 
