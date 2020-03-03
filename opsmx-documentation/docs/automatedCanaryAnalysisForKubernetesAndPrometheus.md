# How to do Automated Canary Analysis for Kubernetes and Prometheus

Spinnaker automated canary analysis tool [(Kayenta)](https://cloud.google.com/blog/products/gcp/introducing-kayenta-an-open-automated-canary-analysis-tool-from-google-and-netflix) has been available starting with version 1.7. In this blog we will cover how to setup Kayenta for a Kubernetes provider with Prometheus being used for monitoring.

## Background: 
Canary deployments has been one of the best practices in the software delivery for some time now. The reason for doing Canary deployment is to reduce the risk of introducing new update with issues to 100 % of the customers like American Airline did and resulted in [all their airplanes grounded for 6 hours.](https://qz.com/393909/american-airlines-planes-are-grounded-because-their-pilots-ipads-have-crashed/)

Automated canary analysis is way to use automation to detecting issues with the new software using the metrics generated by the new application and comparing to the current production version.  Netflix and Google has teamed up to release an open source version of this analysis tool called Kayenta and make it available as part of the Spinnaker project.   Note that the Kayenta architecture is designed in a modular fashion allowing for use of 3rd party or custom judges created by the users.  For more information about Kayenta architecture, [watch](https://www.youtube.com/watch?v=K22lyoopRxk) the recent meetup from the architect of Kayenta.

## Steps to Enable Kayenta for Kubernetes and Prometheus
Kayenta supports the following monitoring services - Stackdriver, Prometheus and DataDog. You can deploy Kayenta to Kubernetes running on AWS.  In our case, we have Spinnaker instance deploying to Kubernetes running on AWS. Prometheus is the monitoring service used for service level metrics monitoring (Tomcat service).

Let’s begin

### Step 1: Enable Canary.
Ensure that you are running 1.7 or later version of the Spinnaker software. You can use the following command to ve	rify your spinnaker version.  
```yaml
	hal config version
```
If you are running prior version, make sure you upgrade the version to the latest version and try again. You can use the following command.
```yaml
	hal config version edit --version 1.7.6
```
Then use the below command to enable Canary analysis option for all applications. You can turn off canary availability option for individual applications as desired.
```yaml
	hal config canary enable
```

### Step 2: Enable Storage for Canary.
Canary needs a storage account to store the canary data such as canary configurations and time series data retrieved from metric stores. If you need help configuring a storage account, check [documentation.](https://www.spinnaker.io/setup/install/storage/)

Enable the default storage account with the following command.
```yaml
	hal config canary edit --default-storage-account ACCOUNTName --bucket StorageBucketName --root-folder RootFolderlName
```
For example: 
```yaml
	hal config canary edit --default-storage-account aws-s3-kayenta --bucket kayentasetup --root-folder kayenta
```

### Step 3: Enable Prometheus Monitoring Service Integration.
Next, we have to enable for Kayenta to able to read Prometheus metric store.  Authentication for prometheus is not enabled in the given example. However, it can be setup easily if authentication at Prometheus is enabled. 
Use the following command to enable Prometheus metric store
```yaml
	hal config canary prometheus enable
```
```yaml
	hal config canary prometheus account add ACCOUNTName --base-url ENDPointOfPrometheus
```
For example:
	```yaml
		hal config canary prometheus account add prometheus-account --base-url http://a23f9cc3537ee12345678910-655574421.us-east-2.elb.amazonaws.com:9090 
	```
```yaml
	hal config canary edit --default-metric-account ACCOUNTName
```
For example:
```yaml
	hal config canary edit --default-metric-account prometheus-account
```

### Step 4:  Create Canary Config 
Add canary config in the form of metric template of your monitoring data store (Prometheus)

Click on canary config page under delivery tab on application tab.  (image-1) 
![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image5.png)

*image 1*

After that, click on ‘Add Configuration’, ‘Add configuration name and description’.

Click on ‘Add Metric’, which will result in a pop-up as shown in (image-2).
![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image4.png)

*image 2*

Add Name and Metric name. We need to add filter template in case of kubernete cluster because pod names are saved in the format - container_label_{your pod name} in prometheus server.  So for the filter template, be sure to attach the “container_label_” string before your pod name which you will give in canary analysis stage in pipeline and spinnaker will use internally to query metric data from prometheus server.
Label Bindings are another way to filter metrics for aggregation. Internally, if the query to Prometheus results in more than one metric (due to multiple tags/dimensions that match metric name) then they are averaged to form one series of data. Labels allow filtering to support only the required tags to be used in generating metric time series. This is also a simple way to utilize labels assigned to Kubernetes pods to select in metric time series query.
In summary, before adding anything in this pop up template, Add template in filter templates button (image-1) and then come to this pop up, configure metric and attached filter template.
Direction: Customize for change in higher or lower values. For example, measuring throughput, higher is acceptable, however, for latency lower is acceptable
Filter templates allow customization of metrics to use in canary analysis. Some implicit binding variables available in filter templates are scope, project, location, resourceType. Filter templates allow literal bindings along with variable bindings. For example, in Prometheus metrics, if only cpu idle time is of interest then literal filter can be set to filter only idle time and not utilization. Another example is when the canary comparison is using a single pod and not the entire server group then the filter can be specified as shown in image-3.

Click on Add template under filter template section on canary configuration.

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image7.png)

*image 3*

${scope} will fill with baseline and canary version dynamically i.e. pod name of your kubernetes cluster.
Now you are done with the canary configuration. 

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image8.png)

*image 4*

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image3.png)

*image 5*

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image1.png)

*image 6*

### Step 5: Run the pipeline / Get scores and Review the scores.

Over ‘Canary reports’ tab, under the ‘delivery tab’ on application page one can see the reports of metrics which we configured in the canary config.

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image2.png)

*image 7*

![Screenshot](img/Automated Canary Analysis for Kubernetes and Prometheus/image6.png)

*image 6*
