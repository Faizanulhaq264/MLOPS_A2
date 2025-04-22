# Full‑Stack Micro‑Services Demo on Minikube

A tiny production‑style stack that demonstrates containerisation,
Kubernetes deployments, service discovery, JWT‑based authentication,
and database persistence.

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React + Vite (build)<br>NGINX (runtime) | SPA with **login / signup** and a protected **counter** page. |
| **Auth‑Service** | Node + Express + Mongoose | Manages users, hashes passwords (bcrypt), issues JWTs, handles `/signup`, `/login`, `/forgot`. |
| **Counter‑Service** | Node + Express + Mongoose | Stores one persistent counter per user in **MongoDB** (`counters` collection). |
| **Database** | MongoDB 7 | Single‑pod deployment; exposed to the two Node services. |
| **Ingress** | NGINX Ingress Controller | Routes external traffic by **Host** header: `frontend.local`, `auth-service.local`, `counter-service.local`. 


### Key Features

* **Micro‑services architecture** – independent images, Deployments, and
  Services.
* **JWT authentication** – issued by Auth‑service, verified by
  Counter‑service.
* **Kubernetes native** – 3‑replica Deployments, ConfigMap / Secret for env,
  NodePort + Ingress exposure, live roll‑outs with `kubectl rollout`.
* **Immediate persistence** – every “+1” click increments the user’s counter
  document (`$inc` and `upsert:true`).

### Quick Start (developer shorthand)

```bash
# 1) Start cluster + ingress controller
minikube start --driver=docker
minikube addons enable ingress

# 2) Build images inside Minikube’s Docker daemon
eval "$(minikube -p minikube docker-env)"     # Linux / WSL
docker build -t auth-service:latest    ./auth-service
docker build -t counter-service:latest ./counter-service
docker build -t frontend:latest        ./frontend

# 3) Deploy all manifests
kubectl apply -f k8s/ -n mlops-a2

# 4) Expose Ingress on host port 80
minikube tunnel          # run in separate admin shell

# 5) Map DNS names (hosts file)
127.0.0.1  frontend.local auth-service.local counter-service.local

# 6) Browse
open http://frontend.local
