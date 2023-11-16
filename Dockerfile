FROM node:lts

###################################
# Prerequisites
# Install pre-requisite packages.

RUN apt update  &&  apt install -y curl gnupg apt-transport-https

# Import the public repository GPG keys
RUN curl https://packages.microsoft.com/keys/microsoft.asc |  apt-key add -

# Register the Microsoft Product feed
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list'

# Install PowerShell
RUN apt update && apt install -y powershell

# Install Azure CLI
# RUN apt-get update
# RUN apt-get install azure-cli

# Install ExchangeOnlineManagement and PnP.PowerShell
RUN pwsh -c "Install-Module -Name ExchangeOnlineManagement -force"
RUN pwsh -c "Install-Module -Name PnP.PowerShell -Force -AllowPrerelease -Scope AllUsers;" 

WORKDIR /usr/src/app
COPY . .
RUN npm install -g pnpm turbo ts-node
WORKDIR /usr/src/app/apps/www
RUN curl -sSLf https://centrifugal.dev/install.sh | sh
RUN pnpm install
# RUN mkdir -p /tmp/root/365admin-nodejs
RUN turbo run build 

EXPOSE 3001
# CMD ["npm", "run","start"]
