# Authentication

## Overview of Authorization
* Alike authentication, Spinnaker has various mechanisms of authorization. In this page we are
going to explore, on how to setup and configure Fiat, an authorization microservice of
Spinnaker.
* First of all, what is Authorization got to do with Spinnaker?
	* Using Spinnaker’s - Fiat authorization mechanism one can define roles and
	responsibilities for a user. To explain in other words, an admin can define what can user
	see and access while accessing Spinnaker, by restricting access.

## Requirements to Setup Authorization
* Primarily, its mandate to have Authentication setup for Gate.
* To enable persistent Storage (S3 or GCS), ensure to have front 50 configured.
* Enable role any one of the role provider from the below
	* Using Google Groups by accessing G Suite Admin Console
	* GitHub Team
	* LDAP server
	* SAML Identity Provider (IdP) – In SAML user roles are fixed, and cannot be
	changes until the user needs to re-authenticate.