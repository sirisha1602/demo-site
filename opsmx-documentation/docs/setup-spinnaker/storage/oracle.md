# Setup Oracle Object Storage

## Overview

* Oracle Cloud Infrastructure offers two distinct storage class tiers to address the need for
both performant, frequently accessed &quot;hot&quot; storage, and less frequently accessed &quot;cold&quot;
storage. Storage tiers help you maximize performance where appropriate and minimize
costs where possible.
	* Use Object Storage for data to which you need fast, immediate, and frequent
	access. Data accessibility and performance justifies a higher price point to store data
	in the Object Storage tier.
	* Use Archive Storage for data to which you seldom or rarely access, but that must be
	retained and preserved for long periods of time. The cost efficiency of the Archive
	Storage tier offsets the long lead time required to access the data.
	
## Prerequisites

* Ensure to have Oracle Cloud provider enabled in Spinnaker, can use the same region, Tenancy’s OCID, user’s OCID, Compartment’s OCID, private key file, and fingerprint to enable Oracle Object Storage.

## Add Oracle Object Storage

* Run the following hal command to edit your storage settings. See command reference.

	```yaml
		hal config storage oracle edit \
		--bucket-name $BUCKET_NAME \
		--compartment-id $COMPARTMENT_OCID \
		--fingerprint $API_KEY_FINGERPRINT \
		--namespace $TENANCY_NAME \
		--region $REGION \
		--ssh-private-key-file-path $PRIVATE_KEY_FILE \
		--tenancy-id $TENANCY_OCID \
		--user-id $USER_OCID
	```
* Set the storage source to Oracle Object Storage:

	```yaml
		hal config storage edit --type oracle
	```

## Next Steps

* Deploy Spinnaker, after setting up Oracle Object Storage as External Storage Service.