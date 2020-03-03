# Download and run AutoPilot CV

## Run OpsMx as a Container

Detailed below are the steps to turn on continuous verification for a dockerized deployment setup.

### 1. Download OpsMx from DockerHub

Download the latest OpsMx docker image from the dockerhub (hub.docker.com)
 The ID of the image is: `docker.io/opsmx11/autopilot:v0.9.1`
 
 To pull the image, run 
 <pre><code>docker pull docker.io/opsmx11/autopilot:v0.9.1</code></pre>

### 2. Allocate a Volume for Persistent Storage

Allocate a volume on the VM to store data beyond the lifecycle of the container. 

<pre><code>docker volume create opsmxdata</code></pre>

### 3. Download Database image from DockerHub

Download the latest Database docker image from the dockerhub (hub.docker.com)
 The ID of the image is: `docker.io/opsmx11/autopilot:db-0.9`

 To pull the image, run
 <pre><code>docker pull docker.io/opsmx11/autopilot:db-0.9</code></pre>

### 4. Run Database on a pre-specified local IP

To ensure data lives as a separate module, the database is bound to a local IP - 172.17.0.1 and our application connects to this container via this IP. 
 To run this DB: <pre><code> docker run -itd -p 5432:5432 --add-host=database:172.17.0.1 -v opsmxdata:/var/lib/postgresql docker.io/opsmx11/autopilot:db-0.9 </code></pre>

### 5. Run OpsMx on Docker linked to Database

Run the OpsMx image on a machine on which docker is installed
OpsMx requires ports 8090, 9090 and 8161 to be open. Ensure these are opened in the VM and in docker

Also, point the volume created to the Database of OpsMx to ensure the durability of the data. 

 _Command:_ <pre><code> docker run -itd -p 8090:8090 -p 9090:9090 -p 8161:8161 --add-host=database:172.17.0.1 docker.io/opsmx11/autopilot:v0.9.1 </code></pre>

### 6. Verify the Container

Check whether this docker image is running as a container, via: `docker ps`
This should show up a running container with a container id

_To start the container:_ <pre><code> docker exec -it docker.io/opsmx11/autopilot:v0.9.1 /bin/bash </code></pre>


### 7. Access the Login Page

To access the UI for login and registration - 

 <pre><code> http://{ip}:8161/opsmx-analysis/public/login.html </code></pre>

This completes the setup and configuration of OpsMx container.

## Signup & Login

To access the UI for login and registration -

 <pre><code> http://{ip}:8161/opsmx-analysis/public/login.html </code></pre>

**1. Signup a new User**

![Screenshot](/img/Login-1.png)


**2. Login with this new User**

![Screenshot](/img/Login-2.png)


## Configuring Cloud Credentials

!!! note
	This is only required if data is being pulled directly from the container/VM. Not mandatory.

If you are deploying your applications to  Kubernetes, AWS or GCP, enable read access to the OpsMx Analysis platform

To enable read access, perform the following tasks

**Step 1:**  Click on “SETUP” from the Main menu

**Step 2:**  Click on “Deployment Credentials” tab

**Step 3:**  Click on “ADD” Button. Currently, OpsMx supports  “Kubernetes” and “AWS” or “GCP” providers.

**Step 4:**  For “Kubernetes” ,enter account name in textbox then upload the appropriate  kubernetes credentials file by clicking on Browse and Upload Buttons.

![Screenshot](/img/deployment.png)

**Step 5:**   Configure the Cloud Read credentials

For enabling AWS cloud, specify the Access Key ID, Secret access key ID and the AWS Region (e.g., US-West).  Check out how to generate AWS access credentials section for help with creating keys with needed permissions.

For enabling Google Cloud Platform, upload the appropriate credentials file.

**Step 6:** Save the credentials.

For Saving the Cloud Credentials, when it Uploads it automatically saved.

To delete a saved credential, click on the Delete link under Action box.


## Configuring Monitoring Credentials

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

![Screenshot](/img/1.2-generic-credentials.png)

Add Auth-Token, Username and Passwords wherever applicable.

!!! note

	Scope refers to the key used to retrive a unique entity from the monitoring provider.
	An example for Elastic-Search is provided below. 

![Screenshot](/img/1.1-elastic-credentials.png) 
