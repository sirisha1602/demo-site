## Local GIT Installation

* Local GIT Installation, is usually used for development/customization of Spinnaker
functionalities as per the requirement.
* This will be ran on the same machine, where Halyard is running. User can clone Spinnaker
for all the development purpose.
* Following are the prerequisites to Setup a Local GIT environment
	* 18gb RAM
	* 4core CPU
	* OS – Ubuntu 14.04, 16.04 or 18.04
	* Install Halyard
	* Setup a Storage device
	* Setup Cloud Provider
	* Configure LocalGit deployment
	* Run ‘hal deploy apply’
* Steps to Setup Local GIT:
	* Make sure to have the following installed on the system
		* GIT: sudo apt-get install git
		* CURL: sudo apt-get install curl
		* NETCAT: sudo apt-get install netcat
		* Redis-Server: sudo apt-get install redis-server
		* Open JDK8- JDK	
			```yaml
				sudo add-apt-repository ppa:openjdk-r/ppa
				sudo apt-get update
				sudo apt-get install openjdk-8-jdk
			```
* Node Installation (version>=8.9.0 to be installed)
			```yaml
				curl -o-
				https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh |
				bash
				# Follow instructions at end of script to add nvm to ~/.bash_rc
				nvm install v8.9.0
			```

	* Install YARN
	
		1.npm install –g yarn or [Guide](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
			
	* Fork all the Spinnaker Repos, which has all the microservices listed [here](https://www.spinnaker.io/reference/architecture/).
		
	* Add SSH keys to the GitHub account, where all the Microservices are forked.
		By following steps from the below articles
		* [Create New SSH Key and add to SSH Agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
		* [Add SSH key to GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
	* By default a Local Git Installation is setup to Local Debian environment
		during the first run. Hence, execute the below command to change the
		deployment type to Local Git Installation
		
		```yaml
			hal config deploy edit --type localgit --git-origin-
			user=<YOUR_GITHUB_USERNAME>
		
			hal config version edit --version branch:upstream/master
		```
			
	!!!note
		Make sure the provided user credentials are the same where
		Spinnaker microservices are cloned to.			
		
## Next Steps

* Now that the Spinnaker Environment is Selected, proceed further to choose persistent
storage.