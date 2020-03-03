# Setup Google Kubernetes Engine (GKE)
## Overview
* This page describes how to set up a Kubernetes cluster on GKE to be used as a Spinnaker
Kubernetes v2 provider. The process is very simple, but you need to do some specific
things to allow Spinnaker to authenticate against your cluster.

!!!note
	To manage and create clusters in a given project, you need the
	roles/container.admin role as described here.

## Steps to Create Cluster
* If you don’t already have a cluster for this purpose, you can create a Kubernetes cluster
on GKE using either [Gcloud](https://cloud.google.com/sdk/gcloud/) or [the Cloud Console](https://console.cloud.google.com/home/dashboard?project=ramwedsbharathi) as shown in the [official
documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster). Third party tools like [Terraform](https://www.terraform.io/docs/providers/google/r/container_cluster.html) work too, and can be used to automate
provisioning your clusters.

## Download Credentials
* Click [here](http://docs.opsmx.com/setup-spinnaker/download-gcp/) to Download GCP Credentials.

## Next Steps
[Follow the setup instructions for adding a Kubernetes account in Spinnaker.](http://docs.opsmx.com/setup-spinnaker/cloud-providers/kubernetes(M)/)