# LDAP Overview
* Lightweight Directory Access Protocol (LDAP) is a client/server protocol used to access and
manage directory information. This allows user to read/edit directories over IP networks and
runs directly over TCP/IP using simple string formats for data transfer.
* In Spinnaker, a standard ‘bind’ approach is used for LDAP authentication.
# Configure LDAP using Halyard
* Execute the below command to enable LDAP on Spinnaker.

	```yaml
		hal config security authn ldap enable
	```

* Execute the below command to edit and add the all the LDAP related parameters Spinnaker
settings
	```yaml
		hal config security authn ldap edit --user-dn-pattern="uid={0},uid=users" --
		url=ldaps://ldap.my-organization.com:10636/dc=my-organization,dc=com
	```

# Next Steps
* Now that LDAP authentication is configured on Spinnaker, proceed further with the
authorization.