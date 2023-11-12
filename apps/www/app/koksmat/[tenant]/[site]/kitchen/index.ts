interface Workspace {
    key: string;
    displayName: string;
    cwd: string;
    } 

export const Workspaces : Workspace[] = [{
    key: "intra-prod",
    displayName: "Nexi Intranet Production",
    cwd: "/Users/nielsgregersjohansen/code/koksmat/branches/ui",
}]

export function findWorkspace(workspaceName: string) : Workspace | undefined {
    return Workspaces.find(x => x.key == workspaceName)
}