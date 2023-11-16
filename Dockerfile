FROM ubuntu:22.04

# Packages required to run the Azure CLI installation
RUN	apt-get update && apt-get -y install curl

# Azure installation command
RUN	curl -sL https://aka.ms/InstallAzureCLIDeb | bash
RUN apt update
RUN apt-get -y install nodejs


# Install PowerShell
RUN apt update && apt install -y powershell

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
