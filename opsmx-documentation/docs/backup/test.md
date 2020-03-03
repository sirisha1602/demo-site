## Log and APM metric Analysis

Modern applications deployments have increased in complexity due to distributed architectures with microservices. Increased number of microservices with multiple developers involved in development and release makes it difficult to track the root cause of failures. Metrics may not always reflect the underlying issue in the initial test, and root cause analysis requires distributed log analysis. The Autopilot performs automated log and metrics analysis for new releases with built-in unsupervised and supervised machine learning algorithms for risk analysis.

The Autopilot log analyzer provides a quick view of failures and new issues by analyzing multiple logs in parallel for a multiservice deployment helping to deploy a new release of an application into production safely.

* **Volume of Data:** Log output for an application during rollout could be thousands of lines per service and if they are multiple services, one could be overwhelmed with the amount of data to analyze to figure out the health of the new application
	
* **Classification of the Data:** Analyzing the data could be tedious even for the most advanced operations team member as some of the messages need an understanding of the application to classify them as a critical or non-critical message. In general, following are the type of logs classification that one has to perform:
		
	* Same messages as previous production release: Many of the log messages (even errors or warning) could be harmless, and they already exist in prior releases and hence could be ignored in the new version as well.
	* New Errors or Warnings messages:  Any new errors or warnings seen in the latest release is a cause of concern and should be flagged as a risk and need to be analyzed.
	* New unknown or safe messages:  New release can output some new unknown (not seen before) or safe messages that could be ignored.  In some cases, one needs an understanding of the application developer to accurately classify these messages.

* **Learning from New Issues:**  Post-mortem analysis of a failed deployment usually ends up identifying new messages that should be classified as error or warnings to prevent future failures.  Ability to continually update one’s understanding of logs is critical for the continued success of production rollout.

The **Autopilot** will make it easy to understand the risk of the particular release and perform all the tasks of a human ops engineer.  Figure 3 shows a sample analysis where the risk score is calculated for a quick summary of the quality of the release which can be used to automate rollback decisions.

Also, Figure 3 shows all the log message of the new release cleanly categorized into same (seen in prior release), new errors, warning and ignores. All of these are done through Natural Language Processing of the logs and intelligent to cluster log messages and auto-identify the type of clusters - same, new errors, new warnings or new ignores.


![Screenshot](img/autopilot-image1.png)

*Autopilot Log Analysis and Risk Scoring*

![Screenshot](img/Autopilot Supervised Reclassification of Log Messages.png)

*Autopilot Supervised Reclassification of Log Messages*

In addition to log analysis, a typical application production rollout will also include analysis of KPI for any significant deviation.  Autopilot allows for tracking of KPI metrics and the overall risk analysis as shown in the below.

![Screenshot](img/Autopilot Analysis of KPI using APM Data.png)

*Autopilot Analysis of KPI using APM Data*

![Screenshot](img/Autopilot APM Analysis and Risk Scoring.png)

*Autopilot APM Analysis and Risk Scoring*

## Configuring new services for analysis

AutoPilot CV can be invoked for any two deployments of a service, either retrospective analysis on two instances that were in the past or one instance in the past and another currently being deployed or two versions running in parallel in case of blue-green deployments. Configuring a service for analysis also called onboarding is done in two steps:

* [Configure a template to identify metadata for the service like monitoring data store](http://docs.opsmx.com/downloadAndRunACV/)
* [Invoke AutoPilot CV API with baseline and comparison variables along with template identifier]() 