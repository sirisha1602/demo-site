# OAuth 2.0 Overview
## OAuth 2.0 Overview
* OAuth 2.0 is an authorization framework that allows applications to obtain restricted access to
user accounts on an HTTP Service.
* This method works by delegating user authentication to the service that hosts the user account,
and authorizing third-party applications to access the user account.
* Roles play a major role in OAuth, there are four types of OAuth roles
	### OAuth Roles
	* Details of all OAuth roles are below
		1. Resource Owner – This is the ‘user’ who authorizes an application to access their
		account. The application's access to the user's account is limited to the "scope"
		of the authorization granted (e.g. read or write access).
		2. Client – This is the application that wants the access to user accounts. To gain
		user account access, first it must be authorized by the user, and the
		authorization must be validated by the API.
		3. Resource Server – Resource Server is that place which hosts safety for all the
		user account information.
		4. Authorization Server – Authorization server, ensures to verify the user identify
		and then assigns a token to the user to access the application as per the roles
		defined for that user.
## OAuth Providers
### Pre-Configured Providers
* For user’s convenience, OAuth has several providers that are already pre-configured.
* To give the client ID and secret, one must activate at least one of the Provider from the
below table, follow the provider specific documentation to obtain Client ID and Secret.


	| Provider 							|      Halyard value 		| Provider-Specific Docs 																							|
	|---------- 						|:-------------:			| ------:				 																							|
	| Google Apps for  Work / Gsuite	| google					| [Google Apps for Work / Gsuite](https://www.spinnaker.io/setup/security/authentication/oauth/providers/google/) 	|    			
	|  		GitHub    					|  gitHub   				| [GitHub Teams](https://help.github.com/articles/authorizing-oauth-apps/)											|
	| Azure								|    azure   				| [Azure](https://docs.microsoft.com/en-gb/azure/active-directory/develop/v1-protocols-oauth-code)	 				|
	
* Now, activate one of the provider by following the below
	```yaml
	CLIENT_ID=myClientId
	CLIENT_SECRET=myClientSecret
	PROVIDER=google|github|azure
	hal config security authn oauth2 edit \
	--client-id $CLIENT_ID \
	--client-secret $CLIENT_SECRET \
	--provider $PROVIDER
	hal config security authn oauth2 enable
	```
### Configure Own Provider
* Follow the below steps to configure Own Provider.
* Edit the gate-local.yaml and append the below configuration changes
	```yaml
	security:
	oauth2:
	client:
	clientId:
	clientSecret:
	userAuthorizationUri: # Used to get an authorization code
	accessTokenUri: # Used to get an access token
	scope:
	resource:
	userInfoUri: # Used to get the current user's email address/profile
	userInfoMapping: # Used to map the userInfo response to our User
	email:
	firstName:
	lastName:
	username:
	```
### UserInfoMapping
* UserInfoMapping is the section that allows to map the names of fields from the
‘userInfouri’ request to Spinnaker-specific fields. UserInfoMapping configuration
should like below
	```yaml
	userInfoMapping:
	email: <EmailID@mail.com>
	firstName: <FirstName>
	lastName: <LastName>
	username: <UserName>
	```
## Setup Network Architecture and SSL Termination
* It’s mandatory to configure ‘redirect-uri’ for OAuth on Spinnaker. So that, during the
OAuth authentication and authorization process, Gate will be able to call the URI and
access the Spinnaker UI as per the user roles.

* To setup ‘redirect-uri’ manually execute the below command

	```yaml
		hal config security authn oauth2 edit --pre-established-redirect-uri https://my-
		real-gate-address.com:8084/login
	```
	!!! note
		Ensure to include the /login suffix at the end of the --pre-established-
			redirect-uri flag!

* In Addition to the above, below configurations make it necessary to ‘unwind’ external
proxy instances. This makes the request to Gate look like the original request to the
outer-most proxy.
	```yaml
		server:
		tomcat:
		protocolHeader: X-Forwarded-Proto
		remoteIpHeader: X-Forwarded-For
		internalProxies: .*
	```
	
	!!!note
		Edit the gate-local.yml and add the above in the Halyard custom profile.
		
## Restrict Access for User based authentication

* On Spinnaker user access can be further restricted, based on the user info from the
OAuth ID Token.
* This is set by using the following parameter ‘--user-info-requirements’.
* This enables one to restrict user access to specific domains or attributes. Execute the
below command to achieve the same
	```yaml
		hal config security authn oauth2 edit \
		--user-info-requirements hd=your-org.net \
		--user-info-requirements batz=/^Sample.*Regex/ \
		--user-info-requirements foo=bar
	```
	
				
	!!! note
		All the values in the above example command, needs to be updated
		as per the organization requirement.

## Next Steps
* Now that OAuth Setup is completed, proceed further to setup the authorization for the same.