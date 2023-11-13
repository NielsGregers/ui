param (

    [Parameter(Mandatory = $true)]
    [string]$applicationname,
    [Parameter(Mandatory = $true)]
    [string]$tenantname
)
$location = Get-Location
Write-Error  "Location $location" 
$result = Register-PnPAzureADApp -DeviceLogin -ApplicationName "$applicationname" -Tenant "$tenantname.onmicrosoft.com" 
$filename = "$tenantname-connect-pnp.json"
ConvertTo-Json -InputObject $result | Out-File -FilePath $filename -Encoding:utf8NoBOM 
Write-Host  "Done, data written to  $location/$filename" 

# -CertificatePath  "$location\certificate.pfx" # -CertificatePassword (ConvertTo-SecureString -String "password" -AsPlainText -Force) 

# return 
# Write-Error "Step 1 ..." 
# Start-Sleep -Seconds 2
# Write-Error  "Step 2 ..."
# Start-Sleep -Seconds 2
# Write-Error  "Step 3 ..."
# Start-Sleep -Seconds 2

# Write-Error  "Connected"

# $result = "Hello World!"



