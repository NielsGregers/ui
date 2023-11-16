

param (
    [Parameter(Mandatory = $true)]
    [string]$SiteURL,
    [Parameter(Mandatory = $true)]
    [string]$tenantDomain
)
. $PSScriptRoot/connect-pnp.ps1 -SiteUrl $SiteURL -tenantDomain $tenantDomain

$site = Get-PnPSite -Includes RootWeb,ServerRelativeUrl,GroupId,HubSiteId,IsHubSite,SensitivityLabelInfo,SecondaryContact,Owner
$info  = @{
    isHubSite = $site.IsHubSite
    hubSiteId = $site.HubSiteId
    GroupId = $site.GroupId 
    SensitivityLabelInfo = $site.SensitivityLabelInfo.DisplayName
    SecondaryContact = $site.SecondaryContact.Email
    Owner = $site.Owner.Email
    Title = $site.RootWeb.Title
    
}

convertto-json $info
