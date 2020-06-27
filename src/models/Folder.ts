export interface Folder {
    id: string
    text: string
    children: Array<Folder>
}

export interface FileExplorer {
    id: string
    name: string
    isFile: boolean, 
    size: string
}