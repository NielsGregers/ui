
param (
    [Parameter(Mandatory = $true)]
    [string]$SiteURL,
    [Parameter(Mandatory = $true)]
    [string]$tenantDomain
)
$ErrorActionPreference = "Stop"

$location = get-location ## Should be set to the correct kitchen by caller
. $location/.sharepoint/tenants/$tenantDomain/env.ps1
Connect-PnPOnline -Url $SiteURL  -ClientId $PNPAPPID -Tenant $PNPTENANTID -CertificatePath "$PNPCERTIFICATEPATH"

