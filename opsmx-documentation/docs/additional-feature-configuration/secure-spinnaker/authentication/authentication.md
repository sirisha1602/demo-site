# Authentication

* There are different login sources available, to enable authentication on Spinnaker. In this
chapter we will walk-you-through the authentication flow in Spinnaker.
* Following are the 3 major components for Spinnaker Authentication workflow
	1. Gate
	2. Deck/Browser
	3. Identity Provider

* **Gate**:
	1. This is provider which controls all the Traffic which passes to Spinnaker. Which includes
	the traffic that is being generated from Desk.
	2. Gate is main source which confirms, both user authentication and authorization.
* **Deck/Browser:**
	1. Deck, is the Spinnaker UI. This has all the Static contents for Spinnaker like HTML, CSS &
	Java Script files.
	2. In general, by default deck uses Apache to server all the required requests. However, it’s
	not mandatory to have only Apache to serve all the static request. One can have any
	webserver to support the static requests.
* **Identity Provider:**
	1. This is a provider/service which is Organization based availability.
	2. Identity provider is used to explore the methods that will be used to authenticate
	Spinnaker, like OAuth 2.0, SAML 2.0, LDAP and X.509.