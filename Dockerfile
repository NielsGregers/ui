FROM node:lts

###################################
# Prerequisites
# Install pre-requisite packages.
RUN apt-get install -y wget

# Download the PowerShell package file
RUN wget https://github.com/PowerShell/PowerShell/releases/download/v7.3.9/powershell_7.3.9-1.deb_amd64.deb

###################################
# Install the PowerShell package
RUN dpkg -i powershell_7.3.9-1.deb_amd64.deb

# Resolve missing dependencies and finish the install (if necessary)
RUN apt-get install -f

# Delete the downloaded package file
RUN rm powershell_7.3.9-1.deb_amd64.deb


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
RUN pnpm install
# RUN mkdir -p /tmp/root/365admin-nodejs
RUN turbo run build 

EXPOSE 3001
CMD ["npm", "run","start"]
