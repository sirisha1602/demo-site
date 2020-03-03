# Integrate with Jenkins

AutoPilot CV is a REST service that can be used from a Jenkins pipeline stage as part of the deployment verification. To add continuous verification to the pipeline, add the following stage to the Jenkins pipeline:

<pre><code>
    stage "OpsMx CV Stage"
        echo "Comparing service ${serviceName} version ${comparisonId} with baseline version ${baselineId} ...";
        sh TriggerCanary.sh servername=< server_ip > username=< user >  metrictemplate=< configuredMetricTemplate >  logtemplate=< configuredLogTemplate >  lifetimeHours=< durationOfAnalysis >  canaryAnalysisIntervalMins=< timeDurationForEachRun >  baseline=< baselineId >  canary=< comparisonId >  baselineStartTimeMs=< baselineStartTimeInMillis >  canaryStartTimeMs=< canaryStartTimeInMillis >  minimumCanaryScore=< canaryFailureThreshold >  canaryResultScore=< canarySuccessThreshold > 
        echo "Checking score ...";
        sh CheckScore.sh username=< user >   metrictemplate=< configuredTemplate >  logtemplate=< configuredTemplate >  comparison=< comparisonId >  baselineStartMs=< baselineStart >  baseline=< baselineId >  outputfile=< comparison_output_file_buildid > 

        def comparison_output_str = readFile('comparison_output_file_buildid').trim();
        comparisonOutput = new groovy.json.JsonSlurper().parseText(comparison_output_str);
        echo "Opsmx comparison score: ${comparisonOutput.score}";
        echo "Please refer this report for more details: ${comparisonOutput.reportUrl}";

</code></pre>

The above snippet is given as an example on integrating with Jenkins stage and does not reflect error checks required on failure. Arguments passed to the scripts in the stage are mandatory arguments, complete argument list is described in the next section. 

## Triggering a Verification via Script

Please save the TriggerCanary.sh script on the jenkins server using the below command 

```yaml
	wget https://raw.githubusercontent.com/OpsMx/general_downloads/master/TriggerCanary.sh
```

## Parameters :

`application`  name of the application which you created in the GUI.

`servername`  IP or domain name of the AutoPilot endpoint

`username`  The username used to register/login to AutoPilot

`lifetimeHours` The entire duration for which the analysis runs. Recommended - 1 hour

`canaryAnalysisIntervalMins`  The time gap between two successive analysis in the lifetime period. Recommended - 30 minutes

`metrictemplate`  The name of the metric-template registered on AutoPilot (http://docs.opsmx.com/customizeTemplateForService/). Can be ommitted if no metric-template

`logtemplate`  The name of the log-template registered on AutoPilot (http://docs.opsmx.com/customizeTemplateForService/#configure-log-templates). Can be ommitted if no log-template

`baseline`  The unique marker to represent a baseline deployment

`canary`  The unique marker to represent a canary deployment

`baselineStartTimeMs`  The timestamp in Epoch Milliseconds when to start the analysis of baseline deployment

`canaryStartTimeMs`  The timestamp in Epoch Milliseconds when to start the analysis of canary deployment

`minimumCanaryScore`  The score below which the result should be treated as a failure

`canaryResultScore`  The score above which the result is considered as a success. If score between minimum & resultScore is treated as a warning

  If any of the above parameters are not specified,  the script will exit by showing the list of missing parameters to be passed
  
!!! note
		Either of metrictemplate or logtemplate need to be specified. If both are not there, then program will exit  with appropriate echo message
  
Integration with Jenkins pipeline is based on a wrapper script for the AutoPilot REST api. The script interface can be invoked as in following example.

Example:
<pre><code>
sh TriggerCanary.sh servername=<autopilotEndpoint> username=<user> metrictemplate=<metricMetadata> logtemplate=<logMetadata> baseline=<baselineDeploymentId> comparison=<newDeploymentId> baselineStartMs=<timestamp> lifetimeHours=<duration> canaryAnalysisIntervalMins=<periodicAnalysisInterval> minimumCanaryScore=<canaryFailureThreshold>  canaryResultScore=<canarySuccessThreshold>
</code></pre>

## Status of the Analysis

Typically, one would need to wait for the time-period of `lifetimeHours` to wait for the analysis to be completed. To retrieve the status of the analysis.

But if analysis is being done on historic data, where endTime of the analysis has already elapsed and all the data is already available, analysis is readily available.
<pre><code> GET http://{opsmx-server-ip}:8090/canaries/{canary-id} </code></pre>

Response :

<pre><code>
{
"owner": "opsmxuser@opsmx.com",
"application": "multicloud",
"endDate": "Fri May 03 19:41:42 GMT 2019",
"canaryResult": {
"lastUpdated": "2018-12-12 12:14:48.138",
"overallScore": 86.57,
"overallResult": "FAILURE",
"message": "Canary score is below threshold",
"manual": false,
"errors": [
"no errors"
],
"lastCanaryAnalysisResults": [{
"result": "FAILURE",
"score": 86.57,
"lastUpdated": "2018-12-12 12:14:48.138",
"canaryDeploymentId": "2",
"id": "370",
"DEFAULT_SCORE": 86.57,
"timeDuration": {
"durationString": "204962 MIN"
},
"additionalAttributes": {}
}]
},
"launchedDate": "12 Dec 2018 11:39:10 GMT",
"health": {
"health": "UNHEALTHY",
"message": "Canary score is below threshold"
},
"canaryConfig": {
"combinedCanaryResultStrategy": "AGGREGATE",
"canaryAnalysisConfig": {
"name": "newtemp",
"canaryAnalysisIntervalMins": 30
},
"name": "OpsMxUser",
"lifetimeMinutes": 30,
"canaryHealthCheckHandler": {
"@class": "com.netflix.spinnaker.mine.CanaryResultHealthCheckHandler",
"minimumCanaryResultScore": "80"
},
"canarySuccessCriteria": {
"canaryResultScore": "90"
}
},
"watchers": [],
"id": "370",
"canaryDeployments": [{
"canaryAnalysisResult": {
"result": "SUCCESS",
"lastUpdated": 1544616888138,
"score": 86.57,
"canaryReportURL": "http://IP-Address:8161/opsmx-analysis/public/canaryAnalysis.html#/analysis/370",
"timeDuration": {
"durationString": "204962 MIN"
}
},
"canaryResult": {
"lastUpdated": "2018-12-12 04:14:48 PST"
},
"health": {
"health": "UNHEALTHY",
"message": "Canary score is below threshold"
}
}],
"status": {
"complete": true,
"status": "COMPLETED"
}
}
// response end
</pre></code>

<b>Description of the Parameters:</b>

overallScore:  This defines the Canary analysis score

overallResult: This gives the status(FAILURE/SUCCESS) based on canaryResultScore parameter

lifetimeMinutes: This parameters defines the Time duration of the canary analysis

minimumCanaryResultScore: The score under which the Canary Analysis should fail

canaryResultScore: The score above which the Canary Analysis should be a pass

canaryReportURL: Which takes you to the canary analysis report page in the OpsMx UI

health: {
health: Gives health status(HEALTHY/UNHEALTHY) of the canary analysis.
message: Describe the reason.
}

status: {
complete: Status of the canary analysis either completed or still running 
status: (COMPLETED/RUNNING)
}


This would also retrieve the URL of the canary report.


## Canary Report URL

To see the associated report for the canary run. 

<pre><code> http://{opsmx-server-ip}:8161/opsmx-analysis/public/canaryAnalysis.html?canaryId={canary-id} </code></pre>

This would provide the report of the analysis of the both the metrics and logs.

