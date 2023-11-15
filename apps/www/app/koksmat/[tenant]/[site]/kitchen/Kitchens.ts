

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

// singleton class with Kitchens and other configurational data

export class Koksmat {
    private static _instance: Koksmat;
    private _kitchens: Kitchen[] = [{
        "key": "intra-prod",
        "displayName": "Langosteria",
        "kitchenUrl": "https://www.langosteria.com",
        "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
        "cwd": "/Users/nielsgregersjohansen/code/koksmat/branches/ui",
        "stations": [        {
            "key": "ui",
            "displayName": "UI",
            "cwd": "/Users/nielsgregersjohansen/kitchens/noma/ui",
            "kitchenUrl": "https://www.langosteria.com",
            "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
            "repoUrl": ""
        },]
    },
    {
        "key": "noma",
        "displayName": "NOMA",
        "kitchenUrl": "https://noma.dk/projects/",
        "image": "https://magicbox.blob.core.windows.net/icons/Noma_Projects_102021-26-large-1.webp",
        "cwd": "/Users/nielsgregersjohansen/kitchens/noma",
        "stations": [
            {
                "key": "ui",
                "displayName": "UI",
                "cwd": "/Users/nielsgregersjohansen/kitchens/noma/ui",
                "kitchenUrl": "https://www.langosteria.com",
                "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
                "repoUrl": ""
            },
            {
                "key": "cli",
                "displayName": "CLI",
                "cwd": "/Users/nielsgregersjohansen/kitchens/noma/cli",
                "kitchenUrl": "https://www.langosteria.com",
                "image": "https://magicbox.blob.core.windows.net/icons/langosteria.jpg",
                "repoUrl": ""
            }
        ]
    }];
    public static instance(): Koksmat{
        if (!Koksmat._instance) {
            Koksmat._instance = new Koksmat();
        }
        return Koksmat._instance;
    }
    
    public get kitchens() : Kitchen[] {
        return this._kitchens
    }
    
}