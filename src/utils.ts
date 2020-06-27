import * as path from "https://deno.land/std/path/mod.ts";
import { OperatingSystem } from "./models/OperatingSystem.ts";
import { CacheFolder } from "./models/CacheFolder.ts"
import { KeyValuePair } from "./models/KeyValuePair.ts"
import { Folder, FileExplorer } from "./models/Folder.ts"
import "https://deno.land/x/humanizer.ts/byteSize.ts"

function listFolders(rootFolder: string): Array<CacheFolder> {
    const rtnVal = new Array<CacheFolder>()
    for (const dirEntry of Deno.readDirSync(rootFolder)) {
        const f: CacheFolder = {
            created: new Date(),
            name: dirEntry.name,
            path: rootFolder,
            id: btoa(path.join(rootFolder, dirEntry.name))
        }
        rtnVal.push(f)
    }
    return rtnVal.slice(0, 20)
}

function getFoldersTree(p: string): Array<Folder> {
    const folders: Array<Folder> = new Array<Folder>()

    for (const dirEntry of Deno.readDirSync(p)) {
        if (dirEntry.isDirectory) {
            const folder: Folder = {
                id: btoa(path.join(p, dirEntry.name)),
                text: dirEntry.name,
                children: []
            }
            folders.push(folder)
            folder.children = getFoldersTree(path.join(p, dirEntry.name))
        }
    }
    return folders;
}

enum OS {
    windows, linux, darwin
}

function getOS(): OS {
    // @ts-ignore
    return OS[Deno.build.os];
}

function sortByName(folders: Array<FileExplorer>): Array<FileExplorer> {
    return folders.sort((f1, f2) => {
            if (f1.name > f2.name) {
                return 1
            }
            if (f1.name < f2.name) {
                return -1
            }
            return 0
        })
}

function sortByType(folders: Array<FileExplorer>): Array<FileExplorer> {
    return folders.sort((f1, f2) => {
        if (f1.isFile) {
            return 1
        }
        if (f2.isFile) {
            return -1
        }
        return 0
    })
}

// Exports
export function getOsInfo(): OperatingSystem {
    const rtnVal: OperatingSystem = {
        arch: Deno.build.arch,
        currentPath: Deno.cwd(),
        denoPath: Deno.execPath(),
        denoVersion: Deno.version.deno,
        homeDir: getDenoDir(),
        hostname: Deno.hostname(),
        os: Deno.build.os,
        typescriptVersion: Deno.version.typescript,
        v8Version: Deno.version.v8
    }

    return rtnVal;
}

export function getEnv(): Array<KeyValuePair<string>> {
    const rtnVal: Array<KeyValuePair<string>> = new Array<KeyValuePair<string>>()
    const env = Deno.env.toObject();
    Object.keys(env).forEach((k) => {
        const item: KeyValuePair<string> = {
            key: k, 
            value: env[k]
        }
        rtnVal.push(item)
    })
    return rtnVal
}

/**
 * Returs deno root directory
 * Example:
 * - (C:\Users\USERNAME\AppData\Local\deno) on windows
 * - (/home/USERNAME/.cache/deno) on linux
 */
export function getDenoDir(): string {
    const os = getOS();
    const homeKey: string = os === OS.windows ? "USERPROFILE" : "HOME"
    const homeDir = Deno.env.get(homeKey)
    let relativeDir = "";

    switch (os) {
        case OS.windows:
            relativeDir = "AppData/Local/deno"
            break;
        case OS.linux:
            relativeDir = ".cache/deno"
            break;
        case OS.darwin:
            relativeDir = "Library/Caches/deno"
            break;
    }
    // @ts-ignore
    return path.join(homeDir, relativeDir)
}

export function getDepsCacheDir(): string {
    const homeDir = getDenoDir()
    return path.join(homeDir, "deps/https/")
}

export function getTypeScriptCacheDirLocal(): string {
    const homeDir = getDenoDir()
    return path.join(homeDir, "gen/file")
}

export function getTypeScriptCacheDirRemote(): string {
    const homeDir = getDenoDir()
    return path.join(homeDir, "gen/https")
}

export function listDepsFolders(): Array<CacheFolder> {
    const rootFolder = getDepsCacheDir()
    return listFolders(rootFolder)
}

export async function deleteFolder(folder: string): Promise<any> {
    try {
        folder = atob(folder)
        await Deno.remove(folder, { recursive: true })
        return {
            success: true,
            error: ""
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}

export async function runDeno(command: string): Promise<string> {
    try {
        command = atob(command);
        const p = Deno.run({
            cmd: ["deno", "eval", "--unstable", command],
            stdout: "piped",
            stderr: "piped"
        })

        const { code } = await p.status();

        let res: string;
        if (code === 0) {
            const rawOutput = await p.output();
            res = new TextDecoder("utf-8").decode(rawOutput)
        } else {
            const rawError = await p.stderrOutput();
            res = new TextDecoder().decode(rawError);
        }
        p.close();
        return res;
    } catch (error) {
        return error.toString();
    }
}

export async function fetchDenoVersion(): Promise<string> {
    try {
        const response = await fetch("https://github.com/denoland/deno/releases/latest")
        const body = await response.text()
        const regVer = new RegExp(/title\=\"v(.*)?\"/)
        const res = regVer.exec(body)
        // @ts-ignore
        return res[1]
    } catch (error) {
        return "Error fetching"
    }

}

export function getCacheTree(): Array<Folder> {
    const p = getDenoDir()
    return getFoldersTree(p);
}

export function getFiles(root: string): Array<FileExplorer> {
    root = atob(root)
    let folders: Array<FileExplorer> = new Array<FileExplorer>()

    for (const element of Deno.readDirSync(root)) {
        const folder: FileExplorer = {
            id: btoa(path.join(root, element.name)),
            isFile: element.isFile,
            name: element.name,
            size: element.isFile ? "" : ""
        }
        folders.push(folder)
    }
    
    folders = sortByName(folders)
    folders = sortByType(folders)
    return folders
}
