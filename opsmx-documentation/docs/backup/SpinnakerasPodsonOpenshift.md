# Setup Minio for Spinnaker as Pods on Openshift

Installation on Openshift can be a bit tedious as one needs to be a non-root user to access the pods or containers unlike on Docker where one can proceed with installation as a root user

The minio pods would be accepting the username/passwords as secrets in the base64 format which would can customized as per the user’s choice. 

##Prerequisites

* Openshift 3.6 or above
* Familiarization with [Minio](https://www.minio.io/)
* Spinnaker Setup with Minio as Storage Service, please visit: [https://www.spinnaker.io/setup/install/storage/minio/](https://www.spinnaker.io/setup/install/storage/minio/)
* Minio server setup as mentioned on the earlier blog

**Step 1: Setting Up Minio servers on Primary Site**

We would be deploying the Secret, Deployment Object with a Persistent Storage on the Filesystem for the Minio for the Primary on Openshift 3.9. 

Ensure that you have a Persistent Volume setup for the Persistence Volume Claim (PVC). 

* Creating a secret for the Deployment Object. Since secrets can be created via many ways, here we converted the username and password into base64 format and then copied the value into the secret yaml

<pre><code># oc create -f minio-secret.yml</code></pre>

 <pre><code>apiVersion: v1
kind: Secret
metadata:
  name: minio-secret
type: Opaque
data:
  username: < base64 converted username >
  password: < base64 converted password >
</code></pre>

*Creating the Deployment Object with the service and PVC for the deployment.

Let’s create the PVC first named as “minio-pv”

<pre><code># oc create -f minio-pvc.yml</code></pre>

<pre><code>apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  # This name uniquely identifies the PVC. Will be used in deployment below.
  name: minio-pv
  labels:
    app: minio-storage-claim
spec:
  # Read more about access modes here: http://kubernetes.io/docs/user-guide/persistent-volumes/#access-modes
  accessModes:
    - ReadWriteMany
  resources:
    # This is the request for storage. Should be available in the cluster.
    requests:
storage: 10Gi</code></pre>

Once, the PVC is created we go ahead with the creation of the Deployment object. The deployment would be pulling an image called minio/minio:latest from the minio default repo

<pre><code># oc create -f minio-deploy.yml</code></pre>


After this the primary site is equipped with the creation of the Minio server and it’s service with a PVC. 

![Screenshot](img/setup-minio-final-pic.png)

Please note if you need to create a external IP/Route  exposed to the world, need to change it service spec to NodePort.

