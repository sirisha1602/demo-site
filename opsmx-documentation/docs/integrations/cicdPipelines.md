# Integrate with CI/CD

## Triggering a Canary Analysis

OpsMx enables performing Canary Analysis on two separate deployments and provides a comprehensive report on the analysis after. This is typically triggered right after the deployment of the new build. 

To start the analysis, trigger the follow API

## API for Registering a Canary Analysis 

### Pameters to be Specified:

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
useLookBack & lookbackMins:    The parameter, useLookBack makes the call to indicate either to use lookbackMins or not to calculate the accurate start and end time of the canary analysis.
</code></pre>


<pre><code> POST http://{opsmx-server-ip}:8090/registerCanary </code></pre>

<pre><code>

	{
	  "application" : "appName",
	  "isJsonResponse": true,
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

To get the Json response as the following, `{ "canaryId" : {canary-id} }`. Ensure to add the below after the application parameters
"isJsonResponse": true. In case if basic canary-id response is sufficient, ensure to use the json without isJsonResponse. Which eventually returns the Canary-Id associated with this canary analysis run as the following `{canary-id}`.

