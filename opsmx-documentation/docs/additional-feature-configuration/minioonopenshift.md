# How to Setup Replication for Minio Storage Service on Openshift

In the previous document, we covered “How to Setup Minio Storage Service for Spinnaker on Openshift” for the primary site.

In this document, we would cover how to setup Minio storage service as pods on two different sites and how to use Minio Client (also as a pod) to replicate the data among the sites.

The Minio servers store the data into buckets. A bucket is an equivalent of a drive or mount point in filesystems and should not be treated as folders. Minio does not place any limits on the number of buckets created per user. On Amazon S3, each account is limited to 100 buckets.

Once, we have the Minio setup on either sites, we can create buckets and then replicate the buckets from site 1 to site 2 using Minio Client .

Minio Client (mc) provides a modern alternative to UNIX commands like ls, cat, cp, mirror, diff etc. It supports filesystems and Amazon S3 compatible cloud storage service (AWS Signature v2 and v4).

Minio Client can be installed locally or as docker containers from this link: [https://docs.minio.io/docs/minio-client-complete-guide](https://docs.minio.io/docs/minio-client-complete-guide)

However we are going to install it in the form of Pods where the bucket names, Minio server endpoints will supplied as secrets thereby can be used to replicate the pods. We have embedded a script which would replicate between site 1 and site 2 with the buckets as specified. The minio-client would be running from Site 1 to Site 2. Site 1 will act as the Primary and Site 2 would act as the Secondary

##Prerequisites

* Openshift 3.6 or above
* Familiarization with [Minio](https://www.minio.io/)
* Spinnaker Setup with Minio as Storage Service, please visit: [https://www.spinnaker.io/setup/install/storage/minio/](https://www.spinnaker.io/setup/install/storage/minio/)
* Minio server setup as mentioned on the earlier blog

**Step 1: Setup the Minio Storage Service on the Primary and Secondary Sites.**

Please follow the steps in the “How to Setup Minio Storage Service for Spinnaker on Openshift” document including setting up the service, deployment, Persistent Volume Claim (PVC) and secrets for both primary and secondary sites

If you have exposed a route/IP for the sites, it needs to be converted into base64  and provided to the minio-client as secret.

**Step 2: Convert data into base64**

We would be assuming that we need to transfer data between Bucket 1 of Primary site and the Bucket 2 of the Secondary site. The Primary site would have Minio server referred as minio1 and Secondary site would be referred to as minio2. The data would be accepted as a secret and would be named as the following


| 			               | Primary Site          | Secondary Site       |
| ------------             | -------------         | ------------         |
| EndPoint		           | minio1endpoint        | minio2endpoint       |
| UserName/AccessKey 	   | minio1accesskey 	   | minio2accesskey      |
| Password/SecretAccessKey | minio1secretaccess    | minio2secretaccess   |
| Bucket Replication	   | Bucket1			   | Bucket2			  |

Once these are converted to base64 we move on the next step of creating the secret, pvc and deployment.

**Step 3: Creating Secret, Deployment and PVC Object.**

*The secret would be named as “mcclient”*

<pre><code>#oc create -f minio-client-secret.yml</code></pre>

[https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client-secret.yml](https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client-secret.yml)

<pre><code>apiVersion: v1
data:
  bucket1: < base64-converted_openshift-spinnaker-bucket_name >
  bucket2: < base64-converted_openshift-spinnaker-bucket_name >
  minio1accesskey: < base64-converted_openshift-password >
  minio1endpoint: < base64-endpoint_http://minio-service >
  minio1secretaccess: < base64-converted_openshift-password >
  minio2accesskey: < base64-converted_openshift-password >
  minio2endpoint: < base64-endpoint_http://minio-service >
  minio2secretaccess: < base64-converted_openshift-password >
kind: Secret
metadata:
  name: mcclient</code></pre>
  
*The PVC would be named as “mc”. Ensure that you have the persistent volume for the PVC*

<pre><code># oc create -f minio-client-pvc.yml</code></pre>

[https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client-pvc.yml](https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client-pvc.yml)

<pre><code>apiVersion: "v1"
kind: "PersistentVolumeClaim"
metadata:
  name: "mc"
spec:
  accessModes:
    - "ReadWriteOnce"
  resources:
    requests:
storage: "10Gi"</code></pre>

*Finally, we will setup the deployment object. The deployment object would be accepting the secret and PVC and start replicating the data. In this setup, we have setup a script running inside the pod /data/replication.sh which is performing the work replication.*

<pre><code># oc create -f minio-client.yml
</code></pre>

[https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client.yml]https://github.com/OpsMx/opsmxblogs/blob/master/minio-client/minio-client.yml

<pre><code>apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  # This name uniquely identifies the Deployment
  name: minio-client-deployment
spec:
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        # Label is used as selector in the service.
        app: minio-client
    spec:
      containers:
        - name: minio-client
          image: docker.io/opsmx11/minio-client:demo
          imagePullPolicy: Always
          env:
            - name: minio1Endpoint
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio1endpoint
            - name: minio1Accesskey
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio1accesskey
            - name: minio1Secretaccess
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio1secretaccess
            - name: minio2Endpoint
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio2endpoint
            - name: minio2Accesskey
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio2accesskey 
            - name: minio2Secretaccess
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: minio2secretaccess
            - name: bucket1
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: bucket1
            - name: bucket2
              valueFrom:
                secretKeyRef:
                  name: mcclient
                  key: bucket2
          command: [ "/bin/sh", "-c"]
          args: [ "sh /data/replication.sh"]
          volumeMounts:
            - mountPath: /backup
              name: mc-data 
      volumes: 
        - name: mc-data
          persistentVolumeClaim: 
            claimName: mc</code></pre>

That’s it. We are done. Once we were have all the objects configured and in once place, our script takes care of  the replication from Site1 Minio storage to the Site2 Minio Storage is started. 
