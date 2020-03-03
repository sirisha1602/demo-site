## SAML Overview
* SAML (Security Assertion Markup Language) is an open standard source that allows to pass
authentication and authorization credentials within SAML providers.
* SAML has two types of providers
	1. Service Provider
	2. Identity Provider
* In Spinnaker, we explore the methods to setup Identity provider. During the authentication
process, a cryptographically signed XML will be sent to the API gateway (Gate) with user identity
information to confirm authentication and authorization.

## Identity Provider Setup
* Download the metadata.xml file from SAML Identity Provider (IdP). Content in the metadata,
looks something similar to the content available in the below attached text file
	SAML-IdP-metadata.txt
* Create a Spinnaker SAML Application.
* Specify the login URL as https://localhost:8084/saml/SSO. Replace “localhost” with Gate’s
address, if available.
* Provide a unique entity ID.
* Enable all the users who will be accessing the Spinnaker Instance.
* Execute the below command, to generate a keystore and key in a new Java Keystore with
password
	```yaml
		keytool -genkey -v -keystore saml.jks -alias saml -keyalg RSA -keysize 2048 -
		validity 10000
	```

* To re-deploy halyard, execute the following command
	```yaml
	$KEYSTORE_PATH= # /path/to/keystore.jks
	$KEYSTORE_PASSWORD=hunter2
	$METADATA_PATH= # /path/to/metadata.xml
	$SERVICE_ADDR_URL=https://localhost:8084
	$ISSUER_ID=spinnaker.test
	hal config security authn saml edit \
	--keystore $KEYSTORE_PATH
	--keystore-alias saml

	--keystore-password $KEYSTORE_PASSWORD
	--metadata $METADATA_PATH
	--issuer-id $ISSUER_ID \
	--service-address-url $SERVICE_ADDR_URL
	hal config security authn saml enable
	```
	
## Network Architecture and SSL Termination
* During the SAML authentication, Gate allows all the requests to connect to the SAML’s Assertion
Consumer Service URL by default.
* To override the values to the URL, execute the below command
	```yaml
		hal config security authn saml edit --service-address-url https://my-real-gate-
		address.com:8084
	```
!!!note
	Append /gate to the ‘service-address-url’ while trying to access quickstart images.
	
## Next Steps
* Now that the SAML setup for Spinnaker authentication is completed, proceed further to setup
authorization.