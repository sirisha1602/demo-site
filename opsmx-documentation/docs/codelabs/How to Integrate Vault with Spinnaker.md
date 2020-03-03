# How to Integrate Vault with Spinnaker
## About Vault
Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.
## From this document user should be able to do the below
1. Vault Installation
2. Vault Configuration with Kubernetes and Spinnaker
3. Verification of Vault Integration

# Vault Installation
The following steps include the deployment of Vault Server on Linux (Ubuntu) in a standalone mode and it is managed by a daemon (called, ‘vault’):
* Download the latest version of vault binary zip file from vault release page and unzip it.
```yaml 
sudo wget https://releases.hashicorp.com/vault/1.1.3/vault_1.1.3_linux_amd64.zip*
sudo unzip vault_1.1.3_linux_amd64.zip -d .
```
!!!note
	Need to download Available latest packages [(https://releases.hashicorp.com/vault)] here is a direct link for vault.
	
* Copy vault binary into /usr/bin. This will allow us to execute vault binary system wide.
```yaml
sudo cp vault /usr/local/bin/
```
* Create a vault config directory under /etc,  a vault data directory and logs directory.
```yaml
sudo mkdir /etc/vault
sudo mkdir /vault-data
sudo mkdir -p /logs/vault/
```
* Create a config.json file and add the vault configuration.
```yaml
sudo vi /etc/vault/config.json
   {
	"listener": [{
	"tcp": {
	"address" : "0.0.0.0:8200",
	"tls_disable" : 1
	}
	}],
	"api_addr": "http://<Vault-Server-IP>:8200",
	"storage": {
		"file": {
		"path" : "/vault-data"
		}
	 },
	"max_lease_ttl": "100h",
	"default_lease_ttl": "100h",
	"ui":true
	}
```
* To create a vault service file.
```yaml
sudo vi /etc/systemd/system/vault.service
[Unit]
Description=vault service
Requires=network-online.target
After=network-online.target
ConditionFileNotEmpty=/etc/vault/config.json

[Service]
EnvironmentFile=-/etc/sysconfig/vault
Environment=GOMAXPROCS=2
Restart=on-failure
ExecStart=/usr/local/bin/vault server -config=/etc/vault/config.json
StandardOutput=/logs/vault/output.log
StandardError=/logs/vault/error.log
LimitMEMLOCK=infinity
ExecReload=/bin/kill -HUP $MAINPID
KillSignal=SIGTERM

[Install]
WantedBy=multi-user.target
```
* To start the vault service.
```yaml
sudo systemctl start vault
sudo systemctl status vault
```
* Login as root and Export **VAULT_ADDR** environment variable, don’t forget to add this to **~/.bashrc** file. Change the IP to you vault server public/private IP.
```yaml
export VAULT_ADDR=http://<Vault-Server-IP>:8200
echo "export VAULT_ADDR=http://<Vault-Server-IP>:8200" >> ~/.bashrc
   ```
* Execute the below command to Iniate Vault Init file
vault operator init > /etc/vault/init.file

!!!note
	This command should be executed as a root user.
	
* To check the vault status execute the below command. Output looks like below
```yaml
vault status
Key                Value
---                -----
Seal Type          shamir
Initialized        true
Sealed             true
Total Shares       5
Threshold          3
Unseal Progress    0/3
Unseal Nonce       n/a
Version            1.1.3
HA Enabled         false

```
* Now vault is initiated but sealed.
* To unseal the vault, Check the *init.file* for the vault token's to unseal.
```yaml
cat /etc/vault/init.file
```
* Unseal vault using ‘unseal’ command. There are 5 unseal tokens. You need to execute the unseal command with a minimum of three unseal token to unseal vault.
```yaml
vault operator unseal <Vault Non-Root Token>
vault operator unseal <Vault Non-Root Token>
vault operator unseal <Vault Non-Root Token>
```

## Vault Configuration with Kubernetes and Spinnaker
We follow the ‘Kubernetes auth method’ for authenticating with Kubernetes service accounts and storing secrets. Configuration of Vault for the ‘Kubernetes auth method’ requires configuring both ‘Vault’ and ‘Kubernetes’.
Prerequisites:
1. A running Kubernetes cluster
2. A running vault cluster

### Kubernetes auth method setup
* Create a service account called 'spin-vault-token' in a specific namespace (ex: **vaultspinnaker**), that Vault will use it login to Kuberenetes:
```yaml
kubectl create namespace vaultspinnaker
kubectl create serviceaccount spin-vault-token -n <NameSpace>
```
* Create a clusterrolebinding for the 'spin-vault-token' serviceaccount access:
```yaml
vi vault-token-binding.yaml
kubectl create -f vault-token-binding.yaml
```
```yaml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: vault-spin-token-binding
  namespace: vaultspinnaker
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: vault-spin-token
  namespace: vaultspinnaker
```
* Then check the secrets by running the below command:
    ```yaml
    kubectl get secrets
    ```
* Now, get the JWT, Kubernetes API URL and certificate authority cert from the serviceaccount by running below commands.

#### VAULT_ACCOUNT_TOKEN is the final JWT token

```yaml
SECRET_NAME=$(kubectl -n vaultspinnaker get serviceaccount vault-spin-token -o jsonpath='{.secrets[0].name}')
VAULT_ACCOUNT_TOKEN=$(kubectl -n vaultspinnaker get secret ${SECRET_NAME} -o jsonpath='{.data.token}' | base64 -d)
```

```yaml
kubectl cluster-info
```

```yaml
export VAULT_SA_NAME=$(kubectl get sa vault-spin-token -n vaultspinnaker -o jsonpath="{.secrets[*]['name']}")
export SA_CA_CRT=$(kubectl get secret -n vaultspinnaker $VAULT_SA_NAME -o jsonpath="{.data['ca\.crt']}" | base64 -d; echo)
```

* Now, validate the exported environment variables with the below values

```yaml
echo $SECRET_NAME
echo $VAULT_ACCOUNT_TOKEN
kubectl cluster-info
echo $VAULT_SA_NAME
echo $SA_CA_CRT
```

* Enable the 'Kubernetes auth method' in the vault and authenticate by running below command (So that configured Vault can talk to Kubernetes API)

```yaml
vault auth enable -path=spin-k8spath kubernetes
vault write auth/spin-k8spath/config kubernetes_host="https://Kubernetes-Hostname/IP:6443" kubernetes_ca_cert="$SA_CA_CRT" token_reviewer_jwt=$VAULT_ACCOUNT_TOKEN
```

* Now, configure role and policy. The Kubernetes backend authorizes an entity by granting it a role mapped to a serviceaccount. A role is configured with policies which control the entity’s access to paths and operations in Vault.

```yaml
vault secrets enable -path=spin-hal-path kv
```

* Create a new policy spin-policy using an example policy file, **‘policy.hcl’**

```yaml
vi policy.hcl
	path "spin-hal-path/*" {
		capabilities = ["create", "read", "delete"]
	}
```

* Above command simply grants the privileges to create/read/delete the secrets in 'spin-hal-path/' path.

```yaml
vault write sys/policy/spin-policy policy=@policy.hcl
```

* Next, create a role for binding the policy to a service account.

```yaml
vault write auth/spin-k8spath/role/spin-role bound_service_account_names=vault-spin-token bound_service_account_namespaces=vaultspinnaker policies=spin-policy ttl=48h
```

* Now, authenticate with the role we just created. For that, get the service account token by running the below command

```yaml
VAULT_ACCOUNT_TOKEN=$(kubectl get secret -n vaultspinnaker VAULT_SA_NAME -o jsonpath="{.data['token']}" | base64 -d; echo)
echo $VAULT_ACCOUNT_TOKEN
```

* Now, login to the vault with the above token generated from  the below command

```yaml
vault write auth/spin-k8spath/login role=spin-role jwt=${VAULT_ACCOUNT_TOKEN}
```

* Copy the Token value from the above login and execute the below command to export it as a Environment Variable

```yaml
export VAULT_TOKEN="LoginTokenValue"
```

* Now, [install](https://www.spinnaker.io/setup/install/halyard/) spinnaker in the same namespaces as vault is created(vaultspinnaker).

## Vault Setup Verification

* The Vault HTTP API gives you full access to Vault via HTTP. Every aspect of Vault can be controlled via this API. The Vault CLI uses the HTTP API to access Vault.
* Login to the ‘spin-halyard’ pod and perform the below curl HTTP API commands for verifying the secrets access from the pod

```yaml
cat /run/secrets/kubernetes.io/serviceaccount/token*
curl --request POST --data "{\"jwt\": \"`cat /run/secrets/kubernetes.io/serviceaccount/token`\", \"role\": \"spin-role\"}" http://Vault-Server-IP:8200/v1/auth/spin-k8spath/login
export VAULT_TOKEN = $(curl --request POST --data "{\"jwt\": \"`cat /run/secrets/kubernetes.io/serviceaccount/token`\", \"role\": \"spin-role\"}" http://Vault-Server-IP:8200/v1/auth/spin-k8spath/login | jq -r .auth.client_token)
echo $VAULT_TOKEN
```

* The following curl request writes a secret, ‘halconfigPath’ with the value,’/root/.hal/config’

```yaml
	curl -H "X-Vault-Token: $VAULT_TOKEN" -X POST -d '{"halconfigPath":"/root/.hal/config"}' http://Vault-Server-IP:8200/v1/spin-hal-path/halconfigfile
```

* The following curl request deletes the secret from the specified path

```yaml
	curl --header "X-Vault-Token: $VAULT_TOKEN" --request DELETE http://Vault-Server-IP:8200/v1/spin-hal-path/halconfigfile*
```

* Above list of curl commands writes the halyard config file(halconfig) as a secret into vault. By converting it into encoded value and creates a JSON file(config.json) and creates a secret with the JSON file.
* Encode the config file 

```yaml
base64 config > encoded-config.txt
```

* Create a JSON file with the name "config.json" and enter the above encoded values into the same.
* Store this 'config.json' in the vault by running the below command:

```yaml
curl --header "X-Vault-Token: $VAULT_TOKEN" --request POST --data @config.json http://<Vault-Server-IP>:8200/v1/spin-hal-path/spinhalconfig
```

* Execute the below command to read back the encoded values from Vault.

```yaml
curl --header "X-Vault-Token: $VAULT_TOKEN" http://<Vault-Server-IP>:8200/v1/spin-hal-path/spinhalconfig| jq -r .data.spinhalyardconfig > encodedhalconfig.bin
base64 -d encodedhalconfig.bin > config-new
```

* By executing the above step, you should be able to verify the decoded config file with the original file.
    



