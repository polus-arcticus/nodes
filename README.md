![DeSci Nodes](./desci-nodes-logo.png)

# DeSci Nodes
### A radically open architecture for verifiable research.

Brought to you by [DeSci Labs](https://desci.com) and the DeSci OSS community.

## What is DeSci Nodes?

Nodes is a tool for creating research objects - a type of verifiable scientific publication that combines manuscripts, code, data and more into a coherent unit of knowledge. 

Nodes are published on a decentralized (“Open State”) repository that provides open content resolution, storage, provenance, data cataloguing, secure PIDs, and compute capabilities.

These resources will help you if you want to learn more (or join us on [Discord](https://discord.gg/BeJ4dxXdaJ)):<br>
[Beta announcement post](https://descilabs.substack.com/p/574f74ae-7c4c-4016-9c50-20093d654698)<br>
[User documentation](https://docs.desci.com/using-nodes/getting-started)<br> 
[Learning materials](https://docs.desci.com/learn/open-state-repository)

## Where to find the community

The best place to find the community is on the DeSci Labs Discord server. There you will find contributors working on various projects, the DeSci Labs team, scientists and researchers, Node Stewards, and other open-science enthusiasts. Come ask questions, test your ideas and projects, and get involved with the events we host every week!

[Discord](https://discord.gg/BeJ4dxXdaJ)<br>
[Community Google Calendar](https://calendar.google.com/calendar/u/2?cid=Y181MWUxMDI2ZTA4Zjg4N2IzNDQ1ZDE0ODk2N2M4ZGE3NWY4OWM2ZmViYTNlZjAxZWZhZTZiZjRhOWEzMGE1MmJkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20)

## Contributing
New contributors are very welcome!

We are actively building out resources for open source contributors. Check back often to see what's new!

[Code of Conduct](https://github.com/desci-labs/nodes/blob/develop/CODE_OF_CONDUCT.md)

The simplest ways to get involved are to:
- Make a PR, issue, or hit us up on [Discord](https://discord.gg/BeJ4dxXdaJ)
- Submit a bug as an issue
- Submit a feature request as an issue
- Write and polish documentation
- Translate

DeSci Nodes is developed, maintained, and supported by DeSci Labs. Contributions and PRs are reviewed and approved by the DeSci Labs team. We are actively looking for contributors and projects to support, so get involved!

We would like to open up our task management software, let us know if interested in early access.

---

# Modules

## **desci-contracts**

Houses all the tooling to build and deploy the ResearchObject contracts locally and for production. Includes a subgraph configuration for The Graph, which is run in a local Docker container and autodeploys your contract locally.
<br><br>

## **nodes-web**

This is the React-based frontend for DeSci Nodes. It implements a web3-enabled PDF Viewer that is actually a Research Object viewer and has support for editing and viewing IPLD-compliant JSON-LD self-describing linked data objects. It implements a frontend resolution of the [DCITE](https://dcite.org) Resolution Scheme. It implements blockchain writes for publishing Nodes.

_Note:_ This repo lives separately at [https://github.com/desci-labs/nodes-web](https://github.com/desci-labs/nodes-web) because it has a different open source license.

_Note:_ It is assumed that `nodes-web` is a sibling to `nodes` in the folder structure. From this root dir `../nodes-web` should exist.
<br><br>

## **nodes-media**

This is a NodeJS backend that helps Nodes with media transcoding videos to HLS using ffmpeg, and also helps run headless browser sessions to download PDFs and other free/fair-use media from the internet. It also implements an experimental LaTeX rendering service.
<br><br>

## **desci-models**

This is a Typescript types library that describes a spec for Research Objects. It has an internal representation used by `nodes-web` and `desci-server` and can marshal/unmarshal to JSON-LD to be self-describing.
<br><br>

## **desci-server**

This is a NodeJS backend that manages draft Nodes. It maintains a user auth, verifies wallet credentials, offers 2FA to users, and is the main system that orchestrates between microservices. It maintains version history for each update to Nodes. It interfaces with a Graph index to implement the [DPID](https://dpid.org) Resolution Scheme.
<br><br>

## **desci-art-viewer**

Nobody knows why this is still here, but it implements a React+Three.js 3d torus that plays [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) on the surface of the torus. We were totally inspired by [this gif on Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:Trefoil_knot_conways_game_of_life.gif) and it only seems to work on Mac/Linux right now, YMMV.
<br><br>

There is more information on each module within each folder's individual README.md.
<br><br>

---

# Running Locally
The following guide is meant to get you running for full-stack dev on your local environment (dapp + server + local EVM test chain + indexer).

## 1) Run Backend + All Services

### Set up desci-models package

1. `cd ./desci-models`
1. Install deps `yarn`
1. build `yarn build`

<br>

**Ensure Docker agent is installed + running (Docker for Mac, etc.)**

<br>

```bash
# Now run all services in Docker containers
./dockerDev.sh
```

This starts:

1. postgres localhost:5433
2. desci-server http://localhost:5420
3. ganache blockchain (autodeploys ResearchObject + dPIDRegistry contract locally) http://localhost:8545 (metamask can connect to it locally)
4. expedition block explorer for local dev (http://localhost:3001)
5. graph index pointing to latest deployed contract (http://localhost:8080)
6. Local IPFS node (private, swarm key enabled) (http://localhost:5001 or http://localhost:8089)
7. nodes-media (responsible for DOI / PDF downloads, and for media transcoding) http://localhost:5454

<br>

_Optional:_ Edit the DB, open http://localhost:5555

1. Go to User table
2. Edit user to have your email (default is sina@desci.com)
   <br><br>

---

<br>

## 2) Run Frontend

<br>

In a separate terminal run

```
cd ..
# clone nodes-web if you haven't yet
git clone git@github.com:desci-labs/nodes-web.git
cd ./nodes-web
yarn
yarn start
```

And visit http://localhost:3000

<br>

_Note:_ If running for the first time, make sure the server started, you may have to wait until it says `desci_nodes_backend | Server running on port 5420`

<br>

Login with your email (or sina@desci.com), view the generated code in the Docker console for desci-server.

```
# this will appear in the console
Simulating email to sina@desci.com token: 123456
```

<br>

---

<br>

## 3) Done

Enjoy your local DeSci Nodes installation. If you have issues, check Troubleshooting below.

<br>

---

<br>

### _Optional_: Run VSCode Server locally

You may want to run VSCode server locally instead of using the default https://desci.dev to test VSCode extension development and other Nodes integrations with VSCode.

The recommended option is to use our [code-server configuration](https://github.com/desci-labs/code-server)

```
# in a separate dir
git clone https://github.com/desci-labs/code-server
# starts server on http://localhost:8085
./start.sh
# make sure you modify REACT_APP_CODE_SERVER in ../nodes-web/.env
```

Another option is to run run openvscode-server:

```
docker run -it --init -p 8085:3000 -v "$(pwd):/home/workspace:cached" gitpod/openvscode-server
```

Note: Modify desci-dapp/.env `REACT_APP_VSCODE_DISABLE=1` to use old custom code viewer
<br><br>

# Troubleshooting

_Problem_ Error: Failed to upload file to IPFS: getaddrinfo ENOTFOUND host.docker.internal

```
# add following line to /etc/hosts
127.0.0.1 localhost host.docker.internal
```

_Problem:_ The services aren't running or the app doesn't let me login (Network error)

ENSURE all `.env.example` files are copied to corresponding `.env` file

```bash
# Frontend
# Edit this (defaults may work)
cp ../nodes-web/.env.example ../nodes-web/.env
vim ../nodes-web/.env

# Server
# Edit this (defaults may work)
cp ./.env.example ./.env
vim ./.env

# only if you're deploying contracts to testnets (not local)
cp desci-contracts/.env.example desci-contracts/.env
vim desci-contracts/.env
```

---

_Problem:_ Network error / server doesn't start or doesn't work

DB should be migrated / seeded on first run (this should happen automatically)
But it can fail due to file system permissions problems. Check the logs for any errors.

If you're running Docker on Windows or WSL, make sure you do

```
docker exec -it -u 0 desci_nodes_backend /bin/chown -R node node_modules
docker exec -it -u 0 desci_nodes_backend /bin/chown -R node /app/node_modules/.prisma
docker exec -it -u 0 db_boilerplate /bin/chown -R postgres /var/lib/postgresql
# or manually with /bin/sh or /bin/bash
# then set permissions for all the volumes for the user
```

If you see all the migrations run on the first startup, you should be good.

---

_Problem:_ Docker complains out of space

```bash
# you can DESTROY ALL IMAGES (Destructive) to reclaim space
docker system prune --all --force
```

---

_Problem:_ Can't add new package via yarn

```
# specify the registry
yarn add mypackage --registry https://registry.npmjs.org
```

---

_Problem:_ error TS2307: Cannot find module 'MYMODULE' or its corresponding type declarations. (desci-server)

```
# this may be happening due to stale docker image, DELETE the desci-server docker image and try again
```

---

_Problem_: Running all the docker containers uses up too much RAM

```
1. Reduce the containers you're running

If you're only working on one component, you may not need to run everything. You can disable services by editing `docker-compose.dev.yml`. Then modify the `.env` files as appropriate to point to cloud resources as necessary.

You can also simply shut down containers you don't need. If you need guidance on this, discuss on [Discord](https://discord.gg/BeJ4dxXdaJ).

2. You can run in [Gitpod](https://gitpod.io) which is a cloud dev environment that works well with docker. We have some initial configs in the `.gitpod.yml` file to help make development smoother on Gitpod.
```

---

_Problem_: Graph Indexing Not Working / Publishing Node not working / Need to reset my contract for local dev

```
1) Delete the desci-contracts/.openzeppelin/unknown-*.json files
2) Connect to local postgres as defined in desci-nodes/.env (database: postgres, not boilerplate) -- delete all schemas, create new schema `public`
3) re-run ./dockerDev.sh -- this should redeploy the contract.

Note: Ensure desci-contracts/subgraph.local.yaml and/or desci-contracts/subgraph.yaml files reflect the new contract address.
```

<br>

## Additional config

---

### NVM version

There is an `.nvmrc` file specifying the recommended node version in each folder. To automatically switch to this version, assuming NVM is installed and assuming ZSH is your shell. Add the following to `.zshrc`

```bash
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

<br>

---

# Deploying

Every Github push to develop will auto build + deploy to nodes-dev server cluster

- nodes-web is deployed to both Amplify and Vercel, depending on the branch
- desci-server is deployed to Kubernetes cluster via Github action

<br>
