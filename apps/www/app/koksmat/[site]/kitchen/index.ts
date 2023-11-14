export interface CookingStation {
    key: string;
    displayName: string;
    cwd: string;
    kitchenUrl: string;
    image: string;
    repoUrl: string;
    } 

export interface Kitchen {
    key: string;
    displayName: string;
    cwd: string;
    kitchenUrl: string;
    image: string;
    stations: CookingStation[];
    } 

export const Kitchens : Kitchen[] = [{
    "key": "intra-prod",
    "displayName": "Langosteria",
    "kitchenUrl" : "https://www.langosteria.com",
    "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
    "cwd": "/Users/nielsgregersjohansen/code/koksmat/branches/ui",
    "stations": [
        ]
},
{
    "key": "noma",
    "displayName": "NOMA",
    "kitchenUrl" : "https://noma.dk/projects/",
    "image": "https://magicbox.blob.core.windows.net/icons/Noma_Projects_102021-26-large-1.webp",
    "cwd": "/Users/nielsgregersjohansen/kitchens/noma",
    "stations": [
        {
            "key": "ui",
            "displayName": "UI",
            "cwd": "/Users/nielsgregersjohansen/kitchens/noma/ui",
            "kitchenUrl" : "https://www.langosteria.com",
            "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
            "repoUrl": ""
        },
        {
            "key": "cli",
            "displayName": "CLI",
            "cwd": "/Users/nielsgregersjohansen/kitchens/noma/cli",
            "kitchenUrl" : "https://www.langosteria.com",
            "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
            "repoUrl": ""
        
        }]
}]

export function findKitchen(workspaceName: string) : Kitchen | undefined {
    return Kitchens.find(x => x.key == workspaceName)
}

export function findCookingStation(kitchen:string,stationName: string) : CookingStation | undefined {
    return findKitchen(kitchen)?.stations.find(x => x.key == stationName)
}