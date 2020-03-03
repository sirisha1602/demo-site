#Setup LDAP Authorization for Spinnaker
## LDAP Authorization Overview
* Groups from an LDAP directory, one can use a manager’s username/password to bind and
search a user’s group.
## User DNs Pattern
* While searching for a user’s groups, can use 'userDnPattern' to construct the user’s full
distinguished name (DN). In the case below, the user <Username> would have a full DN of
'uid=<username>,ou=users,dc=<Domain Name>,dc=<.com/.net>'.
* The search would be rooted at 'ou=groups,dc=<Domain Name>,dc=net', looking for directory
entries that include the attribute
'uniqueMember=uid=<Username>,ou=users,dc=<DomainName>,dc=<.com/.net>', which is the
structure for the 'groupOfUniqueNames' group standard.
* Group/rolename can be extracted by using the 'groupRoleAttribute'. For example, all entries
that pass the filter will then have the cn (common name) attribute returned.
## Configure LDAP Auth using Halyard
* Use Halyard to Fiat, to setup the LDAP manager credentials and search patterns
```yml
hal config security authz ldap edit \
--url ldaps://<ldap.mydomain.net>:636/dc=mydomain,dc=net \
--manager-dn uid=admin,ou=system \
--manager-password \
--user-dn-pattern uid={0},ou=users \
--group-search-base ou=groups \
--group-search-filter "(uniqueMember={0})" \
--group-role-attributes cn
```
* Now edit the security authorization type, using the below command
```yml
hal config security authz edit --type ldap
```
* Enable, LDAP authorization using the below command
```yml
hal config security authz enable
```