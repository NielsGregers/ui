export interface Workspace {
    key: string;
    displayName: string;
    cwd: string;
    kitchenUrl: string;
    image: string;
    } 

export const Workspaces : Workspace[] = [{
    "key": "intra-prod",
    "displayName": "Langosteria",
    "kitchenUrl" : "https://www.langosteria.com",
    "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
    "cwd": "/Users/nielsgregersjohansen/code/koksmat/branches/ui"
},
{
    "key": "noma",
    "displayName": "NOMA",
    "kitchenUrl" : "https://noma.dk/projects/",
    "image": "https://magicbox.blob.core.windows.net/icons/Noma_Projects_102021-26-large-1.webp",
    "cwd": "/Users/nielsgregersjohansen/kitchens/noma"
}]

export function findWorkspace(workspaceName: string) : Workspace | undefined {
    return Workspaces.find(x => x.key == workspaceName)
}