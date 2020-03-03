# Image Bake Overview
* Since the concept of Immutable Infrastructure is core to Spinnaker, Spinnaker comes with an
image bakery powered by Hashicorp’s Packer to help produce machine images.
* For getting started, the default configuration (no changes required) provides you with enough
Packer templates &amp; base machine image options to learn how the system works. However, once
you want to start customizing the bake process or use artifacts not supported by the default
configuration, these documentation pages will describe how to further configure the bakery.
* There are two types of configurations for baking images
	1. Packer Templates
	2. Image Provider Configuration
## Packer Templates
1. Every time we trigger a bake using Spinnaker, Spinnaker invokes a [packer template](https://www.packer.io/docs/templates/index.html) with
a mix of [variables](https://www.packer.io/docs/templates/index.html) provided, the Pipeline currently being executed, and Spinnaker itself.
2. All of the default packer templates are versioned alongside Rosco, the image bakery
service [here](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer). If want to override/include a new template, place it into
~/.hal/$DEPLOYMENT/profiles/rosco/packer/ ($DEPLOYMENT is typically default, read
more [here](https://www.spinnaker.io/reference/halyard/)). Any local scripts/artifacts required by that template can also be placed into
that directory, and referenced relative to the configDir Packer variable that will
automatically be set.
## Image Provider Configuration
1. The Following are the providers that currently support image bakery in Spinnaker
	* Google Compute Engine