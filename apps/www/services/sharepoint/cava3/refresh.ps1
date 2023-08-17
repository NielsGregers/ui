koksmat sharepoint export-template "https://christianiabpos.sharepoint.com/sites/cava3" > "$PSScriptRoot/template.xml"
koksmat scaffold "$PSScriptRoot/template.xml" > "$PSScriptRoot/sharepoint.ts"