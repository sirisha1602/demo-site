# Steps to Setup GCE Bakery
This configuration allows for setting the default network and zone and whether to use the public
IP address of the VM used for baking the image.

* To Setup default zone, execute the below command
```yaml
	hal config provider google bakery edit --network $<NETWORK DETAILS>
```
* Custom based images can be defined by executing the below command
```yaml
	hal config provider google bakery base-image add $BASE_IMAGE \
	--source-image $GCE_VM_IMAGE_NAME \
	--short-description this-is-image \
	--detailed-description "<Provide Description of the Image>" \
	--package-type deb
```

!!!note
		These images can be seen in the UI during the Baking stage
		To explore more Options click [here](https://www.spinnaker.io/reference/halyard/commands/).