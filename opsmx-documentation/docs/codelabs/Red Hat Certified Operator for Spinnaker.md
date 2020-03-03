# Red Hat Certified Operator for Spinnaker
## Spinnaker Lifecycle Management
- In this document we are going to explore the Red Hat Certified Spinnaker Operator to install Red Hat Certified Spinnaker. 
- There are several ways of using the Spinnaker Operator
    - OpenShift 4 Certified Operators Marketplace
    - Quay, as a Custom Operator
    - As a CRD, which omits Operator Lifecycle management

- The simplest approach by far is by using the OpenShift 4 Certified Operator Marketplace. When customization or other changes are desired, using the CRD or Quay might be a better fit.

## Using the OpenShift 4 Marketplace
- The marketplace requires a running OpenShift 4 installation, either use the openshift-installer, the disconnected install guide, or code ready containers. CRC is excellent for testing purposes and is thel most accessible option to work with for small test installs.

### Instructions to use Marketplace Operator
- Log into OpenShift with an account that has privileges to install Operators, we’re using kubeadmin on our CRC install because it’s convenient, but would by no means advice anyone to do that on a production system.

![RHEL-ScreenShot-1](/img/redhat-spinnaker-operator/RHEL-ScreenShot-1.jpg)

- Go to Operators, OperatoHub, and filter for spinnaker. *The community operator as well as the Open Enterprise Spinnaker Operator will show. The Open Enterprise Spinnaker Operator is the only Red Hat Certified Spinnaker, with all containers Red Hat Certified. Click on the Open Enterprise Spinnaker Operator.*

![RHEL-ScreenShot-2](/img/redhat-spinnaker-operator/RHEL-ScreenShot-2.jpg)

- The brings up the Operator Overview, with its documentation and the install button. Clicking the *install* button will bring up the *create subscription* page.

![RHEL-ScreenShot-3](/img/redhat-spinnaker-operator/RHEL-ScreenShot-3.jpg)

- The Create Operator Subscription is part of the *[Operator Lifecycle Manager](https://github.com/operator-framework/operator-lifecycle-manager)*. The OLM framework enables the creator of an *operator* to update the Operator and offer new functionality, features, and versions to users without users having to lift a finger, when users decide to subscribe to the *Automatic Approval Strategy*.

![RHEL-ScreenShot-4](/img/redhat-spinnaker-operator/RHEL-ScreenShot-4.jpg)

- After clicking *Subscribe*, the installation automatically redirects to the *Installed Operators* section, where the status will change with the progress made on installing the Operator. Installation takes a couple of seconds before the status changes to *InstallSucceeded as shown below*.

![RHEL-ScreenShot-5](/img/redhat-spinnaker-operator/RHEL-ScreenShot-5.jpg)

- Behind the scenes, the *Operator Framework* has set up the *OLM Subscription*, and the *Custom Resource Definition* backed by the *OES Operator*. The installation of the *OES Operator pre-creates a Deployment with a Pod* that can be used to trigger helm charts which deploy spinnaker based of a configurable *manifest*.

![RHEL-ScreenShot-6](/img/redhat-spinnaker-operator/RHEL-ScreenShot-6.jpg)

- Going back to the *Installed Operators* and clicking the *Open Enterprise Spinnaker Operator* link will pull up the Operator Details page.

![RHEL-ScreenShot-7](/img/redhat-spinnaker-operator/RHEL-ScreenShot-7.jpg)

- To create a deployment of Spinnaker, select the *Open Enterprise Spinnaker Operator* tab and click the *Create Open Enterprise Spinnaker Operator* button.

![RHEL-ScreenShot-8](/img/redhat-spinnaker-operator/RHEL-ScreenShot-8.jpg)

- The YAML on the screen is the actual configuration that gets fed to the *CRD’s API* endpoint, and gets translated to commands for *halyard*. The helm charts take care of the translation in the *spinnaker-operator pod* — the version of the spinnaker-operator container dictates which features are exposed from an operator perspective.

![RHEL-ScreenShot-9](/img/redhat-spinnaker-operator/RHEL-ScreenShot-9.jpg)

- The default example presented does not expose spinnaker’s UI on a URL. To expose spinnaker’s UI, we can edit the configuration and add an *ingress*. When using OpenShift 4, the ingress class is *LoadBalancer*. It is also essential to set the *hostname* for the *ingress* correctly. In this example, the *host* should end in *apps-crc.testing*, as that is the cluster’s domain name. Below is a sample configuration that leverages the *ingress* for the UI and the API.

	```yaml
		apiVersion: charts.helm.k8s.io/v1alpha1
		kind: OpenEnterpriseSpinnakerOperator
		metadata:
		name: oes
		namespace: openshift-operators
		spec:
		halyard:
		spinnakerVersion: 1.15.1
		image:
		repository: registry.connect.redhat.com/opsmx/ubi8-oes-operator-halyard
		tag: 1.15.1-1
		dockerRegistries:
		- name: dockerhub
		address: index.docker.io
		repositories:
		- library/alpine
		- library/ubuntu
		- library/centos
		- library/nginx
		spinnakerFeatureFlags:
		- artifacts
		- jobs
		minio:
		enabled: true
		imageTag: RELEASE.2019-09-18T21-55-05Z
		serviceType: ClusterIP
		accessKey: spinnakeradmin
		secretKey: spinnakeradmin
		bucket: spinnaker
		nodeSelector: {}
		persistence:
		enabled: false
		rbac:
		create: true
		serviceAccount:
		create: true
		halyardName: open-enterprise-spinnaker
		spinnakerName: null
		ingress:
		enabled: true
		host: spinnaker.apps-crc.testing
		annotations:
		ingress.kubernetes.io/ssl-redirect: 'false'
		kubernetes.io/ingress.class: LoadBalancer
		ingressGate:
		enabled: true
		host: gate.spinnaker.apps-crc.testing
		annotations:
		ingress.kubernetes.io/ssl-redirect: 'false'
		kubernetes.io/ingress.class: LoadBalancer
	```

- After adapting the configuration click the *create* button to deploy spinnaker. For other configuration options the [values.yaml](https://github.com/OpsMx/opsmx-spinnaker-operator/blob/rhel/helm-charts/open-enterprise-spinnaker/values.yaml) in the Github repository is leading.
- Creation of the deployment leads back to the *Operator Details*. Clicking the deployment’s name there brings up the *Operator Overview*, where the *Resources* tab shows the base components for the deployment.

![RHEL-ScreenShot-10](/img/redhat-spinnaker-operator/RHEL-ScreenShot-10.jpg)

- When deploying the Red Hat Certified Minio, and halyard containers they get pulled into OpenShift from the Red Hat registry. To follow halyard’s progress, the *Logs* tab in the *Pod Details* shows the execution flow of the supplied configuration, and subsequently, the creation of the services required for spinnaker. Following the halyard, logs are also possible from the CLI by using either *‘kubectl’* or *‘oc’* with *‘logs -f’* on the halyard Pod.

![RHEL-ScreenShot-11](/img/redhat-spinnaker-operator/RHEL-ScreenShot-11.jpg)

- If the name serving for OpenShift has been set up correctly in the cluster, and externally, the URL provided in the configuration, http://spinnaker.apps-crc.testing, should initially return an error that the application is not available.

![RHEL-ScreenShot-12](/img/redhat-spinnaker-operator/RHEL-ScreenShot-12.jpg)

- As soon as several of the containers have spun up, which can be seen in the *Pods*, *Deployments*, or *Services* overview of the namespace, the frontend of Spinnaker becomes available. The initial “Hello!” screen loads and lands on Spinnaker’s search page.

![RHEL-ScreenShot-13](/img/redhat-spinnaker-operator/RHEL-ScreenShot-13.jpg)

- Generally, Spinnaker Operator deployment process will take couple of minutes time, as some of the services might be configuring depending on the options and the system configuration.
- The search UI will be responsive, as long as the projects and the applications do not load the full stack is not yet done configuring and deploying.

![RHEL-ScreenShot-14](/img/redhat-spinnaker-operator/RHEL-ScreenShot-14.jpg)