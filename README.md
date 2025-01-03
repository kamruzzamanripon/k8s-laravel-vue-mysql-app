## 📝 Introduction About APP:

This application is a robust CRUD (Create, Read, Update, Delete) system designed to efficiently manage and manipulate data. The backend is powered by Laravel, a modern PHP framework that ensures secure and scalable operations. The frontend leverages the dynamic capabilities of Vue.js, offering a responsive and user-friendly interface.

The application includes intuitive features such as filtering and searching, allowing users to quickly locate and interact with specific records. These features are designed to enhance usability and provide a seamless experience for managing data, whether it's for viewing, editing, or deleting entries.

With its clean architecture and integration of advanced tools, this CRUD app is ideal for tasks ranging from basic data handling to more complex management requirements. Whether you're managing customer details, product inventories, or any other type of data, this application simplifies and accelerates the process.


## Detailed Workflow Description:


![image](/asserts/images/Screenshot_9.png)


## 📚 Project Snapshots:

![Settings](/asserts/images/Screenshot_9.jpg)

![chat](/asserts/images/Screenshot_10.jpg)

![logout](/asserts/images/Screenshot_11.jpg)


#
# 🚀 Getting Started For k8s

#
> [!Important]
> Below table helps you to navigate to the particular tool installation section fast.

| Tech stack    | Installation |
| -------- | ------- |
| Docker  | <a href="#docker">Install and configure Docker</a>     |
| Kind & Kubectl | <a href="#kind">Install and configure Kind & Kubectl</a>     |
| Metallb | <a href="#metallb">Install Metallb</a>     |
| Ingress | <a href="#ingress">Install and configure Ingress</a>     |
| Helm | <a href="#helm">Helm Install and configure</a>     |
| SSL Certificate | <a href="#ssl_certificate">Install and configure Cert Manager</a>     |
| Project Deploy | <a href="#project">Project Deploy and Others</a>
| Monitoring | <a href="#monitor">Namespace Create for Groping Prometheus and grafana and Other</a>
| Prometheus | <a href="#prometheus">Install and configure Prometheus</a>     |
| Grafana | <a href="#grafana">Install and configure Grafana</a>     |
#

### 📢 Pre-requisites to implement this project:
#

> [!Note]
> vps minimum need 

- <b>RAM - 4GB</b>
- <b>CPU - 2 Core(s)</b>
- <b>Storage - 30 GB</b>
- <b>One Domain</b>

#
- ## 🐳 <b id="docker">Docker Install and configure </b>
```bash
sudo apt-get update

sudo apt-get install docker.io -y
sudo usermod -aG docker $USER && newgrp docker

```

#
- ## 📦 <b id="kind">Kind & Kubectl Install and configure </b>
Install KIND and kubectl using the provided script. Create kind_kubectl_config.yaml file:
```bash

#!/bin/bash

# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.26.0/kind-linux-amd64
chmod +x ./kind
sudo cp ./kind /usr/local/bin/kind

VERSION="v1.31.0"
URL="https://dl.k8s.io/release/${VERSION}/bin/linux/amd64/kubectl"
INSTALL_DIR="/usr/local/bin"

curl -LO "$URL"
chmod +x kubectl
sudo mv kubectl $INSTALL_DIR/
kubectl version --client

rm -f kubectl
rm -rf kind

echo "kind & kubectl installation complete."
```

```
sudo chmod 777 kind_kubectl_config.yaml
./kind_kubectl_config.yaml
```
> [!Note]
> Run this script and it cerate kubectl and kind environment

### 2. 🛠️ Setting Up the KIND Cluster
#### Create a kind-cluster-config.yaml file:

```
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
- role: control-plane
  image: kindest/node:v1.31.2
- role: worker
  image: kindest/node:v1.31.2
- role: worker
  image: kindest/node:v1.31.2
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
```
Create the cluster using the configuration file:
```
kind create cluster --config kind-cluster-config.yaml --name my-kind-cluster
```
Verify the cluster:
```
kubectl get nodes
kubectl cluster-info
```
> [!Note]
> Here i add extraPortMappings for running Ingress

![image](/asserts/images/Screenshot_12.jpg)


#
- ## 🍏 <b id="metallb">Install Metallb</b>
> [!Note]
> I am using Metallb for use LoadBalance. Suppose you are using Aws/Azure/DigitalOcean ect whose provide kubernates loadBalance facility then doesn't need Metallb. Here I buy VPS from a local company. They give one IP address to access VPS.

```
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.9/config/manifests/metallb-frr.yaml

```
Check Metallb configuration
```
kubectl get all -n metallb-system
```
![image](/asserts/images/Screenshot_13.jpg)

#### 🛠️ Create a metallb_config.yaml file:
```
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: first-pool
  namespace: metallb-system
spec:
  addresses:
  - 160.191.163.33-160.191.163.33
```

apply metallb_config.yaml file
```
kubectl apply -f metallb_config.yaml
```
> [!Note]
> MY VPS IP address is 160.191.163.33. Change this IP as your require



#
- ## ♻️ <b id="ingress">Install and configure Ingress</b>

```
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
```
```
kubectl get all -n ingress-nginx
```
![image](/asserts/images/Screenshot_14.jpg)

> [!Note]
> Here service/ingress-nginx-controller show  EXTERNAL-IP is your VPS IP. My VPS IP is 160.191.163.33. It ensure that Our Metallb LoadBalance wroking.




#
- ## 🧊 <b id="helm">Helm Install and configure</b>
```
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh

./get_helm.sh
```
Check Helm Version
```
helm version
```
![image](/asserts/images/Screenshot_15.jpg)




#
- ## 🔒🌐 <b id="ssl_certificate">Install and configure Cert Manager || SSL Certificate</b>
```
helm repo add jetstack https://charts.jetstack.io --force-update
helm repo update
```
Installing cert-manager CRDs
```
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.16.2 \
  --set crds.enabled=true
```
https://artifacthub.io/packages/helm/cert-manager/cert-manager

```
kubectl get all -n cert-manager
```
![image](/asserts/images/Screenshot_16.jpg)





#
- ## 📚 <b id="project">Project Deploy and Others</b>

### Step One 
Clone below Project in your VPS
```
git clone https://github.com/kamruzzamanripon/k8s-laravel-vue-mysql-app.git
```
### Step Two

Go to k8s folder and you can see this file \
![image](/asserts/images/Screenshot_17.jpg)

### Step Three
Create Nampe Space
```
kubectl apply -f namespace.yaml
```

### Step Four
Apply Nginx ConfigMap file
```
kubectl apply -f nginx-config.yaml
```

### Step Five
Declear Mysql Volumes and Others
```
kubectl apply -f mysql.yaml
```
### Step Six
Apply Backend App for Secret, ConfigMap and Others

```
kubectl apply -f backend.yaml
```

### Step Seven
Apply Frontend App for Secret, ConfigMap and Others

```
kubectl apply -f frontend.yaml
```

### Step Eight
Configure SSL Certificate Domain. Open ssl_certificate.yaml and edit your desired domain name \
![image](/asserts/images/Screenshot_18.jpg)

Apply ssl_certificate.yaml file
```
kubectl apply -f ssl_certificate.yaml
```
### Step Nine
Configure  Ingress file.  Open ingress.yaml and add your desired domain name. \
![image](/asserts/images/Screenshot_19.jpg)

Apply ingress.yaml file
```
kubectl apply -f ingress.yaml
```
### Check Certificate 
```
kubectl get ClusterIssuer -n unicorn
kubectl get Certificate -n unicorn
```
![image](/asserts/images/Screenshot_20.jpg)

### Check NameSpace
```
kubectl get all -n unicorn
```
![image](/asserts/images/Screenshot_21.jpg)

## 🌐 Browser View [Frontend]
![image](/asserts/images/Screenshot_1.jpg)
![image](/asserts/images/Screenshot_2.jpg)
![image](/asserts/images/Screenshot_3.jpg)

## 🌐 Browser View [Backend]
![image](/asserts/images/Screenshot_4.jpg)

## 🌐 Browser SSL Certificate
![image](/asserts/images/Screenshot_22.jpg)
![image](/asserts/images/Screenshot_23.jpg)

## 🎉 Conclusion

Congratulations! You’ve successfully deployed the **Full-Stack Chat Application** . You can now access your Chat App. 







#
- ## 💻 <b id="monitor">Monitoring and Others [Optional]</b>
Now we are doing Extra features like Monitoring. It helps to know about servers and Apps.

### Create Namespace
```
kubectl create namespace monitoring
```
Check Namespace
```
kubectl get ns
```
![image](/asserts/images/Screenshot_24.jpg)
> [!Note]
> This Namespace helping to control all monitoring app like- Prometheus, Grafana, Loki ect






#
- ## <b id="prometheus">Prometheus and Grafana Install and Configure</b>
 #### Install
 ```
 helm install prometheus-stack prometheus-community/kube-prometheus-stack --namespace monitoring --set prometheus.service.nodePort=30000 --set grafana.service.nodePort=31000 --set grafana.service.type=NodePort --set prometheus.service.type=NodePort
 ```
#### Run Prometheus Via Port
```
 kubectl port-forward svc/prometheus-stack-kube-prom-prometheus 9090:9090 -n monitoring --address=0.0.0.0 &
```
now you can access Prometheus using this port. Like
```
http://160.191.163.33:9090
```
> [!Note]
> Change IP Address

![image](/asserts/images/Screenshot_25.jpg)





#
- ## <b id="grafana">Grafana Install and Configure</b>
 #### Run Grafana Via Port
```
kubectl port-forward svc/prometheus-stack-grafana 3000:80 -n monitoring --address=0.0.0.0  &
```
#### Get Grafana Username and Password
UserName 
```
admin
```
password
```
kubectl get secret prometheus-stack-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode
```
![image](/asserts/images/Screenshot_26.jpg)

> [!Note]
> You can change password
![image](/asserts/images/Screenshot_27.jpg)

#### Grafana Dashboard.
Here you can choose different type Algorithm Dashboard 
![image](/asserts/images/Screenshot_28.jpg)





## 📜 License


This project is licensed under the MIT License. See the LICENSE file for more details.