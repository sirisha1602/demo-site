## Overview

* Oracle Cloud redefines how you modernize, innovate, and compete in a digital world,
delivering complete and integrated cloud services that allow business users and
developers to build, deploy, and manage workloads seamlessly—in the cloud or on
premises.

## Prerequisites

* The following components are mandatory to enable Oracle Cloud Provider in Spinnaker

	* A user in IAM for the person or system who will be using Spinnaker, and put that
	user in at least one IAM group with any desired permissions. See [Adding Users](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingusers.htm).
	* The user’s home region. See [Managing Regions](https://docs.cloud.oracle.com/iaas/Content/Identity/Tasks/managingregions.htm). (e.g. --region us-ashburn-1)
	* RSA key pair in PEM format (minimum 2048 bits). See [How to Generate an API
	Signing Key](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm). (e.g. --ssh-private-key-file-path
	/home/ubuntu/.oci/myPrivateKey.pem)
	* Fingerprint of the public key. See [How to Get the Key’s Fingerprint](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm). (e.g. --
	fingerprint 11:22:33:..:aa)
	* Tenancy’s OCID and user’s OCID. See [Where to Get the Tenancy’s OCID and
	User’s OCID](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm). (e.g. --tenancyId ocid1.tenancy.oc1..aa... --user-id
	ocid1.user.oc1..aa...)
	* Compartment OCID: On Oracle Cloud Console, open the navigation menu. Under
	Governance and Administration, go to Identity and click Compartments. See
	[Managing Compartments](https://docs.cloud.oracle.com/iaas/Content/Identity/Tasks/managingcompartments.htm). (e.g. --compartment-id ocid1.compartment.oc1..aa...)
	* Upload the public key from the key pair in the Console. See [How to Upload the
	Public Key](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm).
	
## Add Oracle Cloud as Cloud Provider

* Ensure to enable Oracle Cloud Provider by executing the below command

	```yaml
		hal config provider oracle enable
	```
	
* Run the below command to add the newly created oracle account for Spinnaker

	```yaml
		hal config provider oracle account add my-oci-acct \
		--compartment-id $COMPARTMENT_OCID \
		--fingerprint $API_KEY_FINGERPRINT \
		--region $REGION \
		--ssh-private-key-file-path $PRIVATE_KEY_FILE \
		--tenancyId $TENANCY_OCID \
		--user-id $USER_OCID
	```

## Next Steps

* If Oracle is not the Cloud Provider you’re looking for, try to choose another cloud
provider. Otherwise system is ready to configure the mode of environment to install.