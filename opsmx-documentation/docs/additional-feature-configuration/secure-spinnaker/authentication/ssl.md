

## SSL Overview
* SSL (Secure Socket Layer) is a security protocol which encrypts the connections established
between Webserver and the client (browser).
* In this chapter, we learn how Spinnaker communicates from external parties to Spinnaker
	Instance, which might be any requests between
	1. Browser & Spinnaker UI (Deck)
	2. Deck and Gateway (API gateway)
	3. Client and Gate
	
## Steps to Generate Self Signed Cert
* A self-signed certificate is an identity certificate that is signed by the same entity whose identity
it certifies. In technical terms a self-signed certificate is one signed with its own private key.
* Instructions in this chapter allows user to generate a Self-signed certificate key and server
certificate, openssl will be used.
* Follow the below instruction to create self-signed certificate
	1. Execute the below commands to create CA key
		```yaml
		openssl genrsa -des3 -out ca.key 4096
		```

	2. 	Execute the below commands to Self-sign the Certificate
		```yaml
		openssl req -new -x509 -days 365 -key ca.key -out ca.crt
		```

	!!!note
		Incase if External CA Certificate is being used, skip to the next section to enable the
		same on Spinnaker.
	
## Steps to Create Server Certificate
* From this Section, let’s learn how to create Certificate Authority and import the same to a
Server Certificate.
	1. Execute the below command, to create a Server key and save it safe.
	```yaml
	openssl genrsa -des3 -out server.key 4096
	```
	2. Execute the below command, to generate a certificate signing request for the
	server. Ensure to specify localhost or Fully Qualified Domain Name of Gate as the
	Common Name.
	```yaml
		openssl req -new -key server.key -out server.csr
	```
	3. Execute the below command, to use CA sign the server’s request. If, external CA
	is being used, vendor will take care of this step.
	```yaml
		openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -
		CAcreateserial -out server.crt
	```
	4. To make the server certificate to importable format convert it to JKS.

	```yaml
		YOUR_KEY_PASSWORD=hunter2
		openssl pkcs12 -export -clcerts -in server.crt -inkey server.key -out
		server.p12 -name spinnaker -password pass:$YOUR_KEY_PASSWORD
	```
	!!!note 
		This creates a p12 keystore file with your certificate imported under
		the alias “spinnaker” with the key password $YOUR_KEY_PASSWORD.
	5. Execute the below command, to create a JKS file by importing CA Certificate
	```yaml
	keytool -keystore keystore.jks -import -trustcacerts -alias ca -file ca.crt
	```
	6. To import the server certificate, execute the below

	```yaml
	$ keytool -importkeystore \
	-srckeystore server.p12 \
	-srcstoretype pkcs12 \
	-srcalias spinnaker \
	-srcstorepass $YOUR_KEY_PASSWORD \
	-destkeystore keystore.jks \
	-deststoretype jks \
	-destalias spinnaker \
	-deststorepass $YOUR_KEY_PASSWORD \
	-destkeypass $YOUR_KEY_PASSWORD
	```

*	Now Spinnaker is all set to use the Java Keystore, which has all the certificate authority
and server certificate.

## Steps to Configure SSL for Gate and Deck
* Execute the below commands, separate to enable SSL for Gate and Deck. We can use ‘Halyard’
to do the same.
1. For Gate:

	```yaml
	KEYSTORE_PATH= # /path/to/keystore.jks
	hal config security api ssl edit \
	--key-alias spinnaker \
	--keystore $KEYSTORE_PATH \
	--keystore-password \
	--keystore-type jks \
	--truststore $KEYSTORE_PATH \
	--truststore-password \
	--truststore-type jks
	hal config security api ssl enable
	```



2. For Deck:

	```yaml
	SERVER_CERT= # /path/to/server.crt
	SERVER_KEY= # /path/to/server.key
	
	hal config security ui ssl edit \
	--ssl-certificate-file $SERVER_CERT \
	--ssl-certificate-key-file $SERVER_KEY \
	--ssl-certificate-passphrase
	
	hal config security ui ssl enable
	```
	
## Steps to Deploy Spinnaker with SSL
* Execute the below command to deploy Spinnaker with all the SSL settings
	```yaml
	hal deploy apply
	```
## Verify SSL Setup
* To Verify SSL setup, ensure to access all the Spinnaker Endpoints like Gate or Deck over SSL.

## Next Steps
* To Proceed further one much choose an authentication method
1. OAuth 2.0
2. SAML
3. LDAP
4. X.509