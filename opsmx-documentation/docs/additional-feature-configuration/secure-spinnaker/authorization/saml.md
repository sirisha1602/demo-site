# SAML Authorization for Spinnaker
## SAML Auth Overview
* SAML use case is a special one - it’s the only one where a user’s roles cannot be dynamically
updated. This is because the user’s roles are sent in the initial authentication handshake
between Gate and the SAML Identity Provider (IdP).
## Setup IdP on Spinnaker
* To enable SAML roles, configure IdP to include group membership in the assertion (not covered
- some providers may not offer this option). By default, Gate looks for the &#39;memberOf&#39; attribute
statement, but this can be reconfigured in Gate’s settings.
* When Fiat is enabled, SAML groups are automatically pushed to Fiat upon user login and cannot
be updated until the user needs to reauthenticate.
## SAML Auth Configuration
* The Advantage of using SAML roles, is that the user roles are pushed to fiat automatically.
Hence, no further configurational changes are required.