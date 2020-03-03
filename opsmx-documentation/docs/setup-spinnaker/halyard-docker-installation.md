
# Halyard Installation on Docker:

!!! note

	Manual Permission changes on the .hal is mandatory to ensure halyard reads & write all of its components.

* In this chapter we will learn the steps to Halyard on Docker.

* As a Mandatory, ensure to have Docker CE installed.

* On the machine create a local Halyard config directory

	```yaml
	mkdir ~/.hal
	```

## Steps to start halyard in a new Docker container

	
```yaml
	docker run -p 8084:8084 -p 9000:9000 \
	--name halyard --rm \
	-v ~/.hal:/home/spinnaker/.hal \
	-it \
	gcr.io/spinnaker-marketplace/halyard:stable
```
	
* This runs as a foreground process in your current shell. This is useful because it emits all of the Halyard daemon’s logs, which are not persisted.
* Connect to halyard in a shell
```yaml
	docker exec –it halyard bash
```
Halyard interaction will be taken care from here

* Execute the following to complete enable
	* source <(hal --print-bash-completion)
	* To get help with any hal command, append -h. Also, see the [Halyard command Reference](https://www.spinnaker.io/reference/halyard/commands/)

## Steps to Update Halyard on Docker
	* Execute the below command to fetch the latest version of Halyard
```yaml
	docker pull gcr.io/spinnaker-marketlace/halyard:stable
```

* Execute the below command to stop running Halyard Container
	
```yaml
	docker stop halyard
```
* Follow the below to restart the updated container
```yaml
	docker run -p 8084:8084 -p 9000:9000 \
     		--name halyard --rm \
     		-v ~/.hal:/home/spinnaker/.hal \
     		-it \
     		gcr.io/spinnaker-marketplace/halyard:stable
```
* Follow the below to connect to the updated container
```yaml
	docker exec –it halyard bash
```
## Steps to uninstall Halyard on Docker
* Delete the container to uninstall halyard on Docker

```yaml
docker rm halyard
```

## Next Steps

To continue to deploy Spinnaker on the newly installed halyard, start choosing cloud providers to proceed further.

	
