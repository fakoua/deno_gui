import * as path from "https://deno.land/std/path/mod.ts";
import { walkSync } from "https://deno.land/std/fs/mod.ts";
import { OperatingSystem } from './models/OperatingSystem.ts';
import { CacheFolder } from './models/CacheFolder.ts'
import { KeyValuePair } from './models/KeyValuePair.ts'
import { Folder, FileExplorer } from './models/Folder.ts'
import "https://deno.land/x/humanizer.ts/byteSize.ts"

function listFolders(rootFolder: string): Array<CacheFolder> {
    let rtnVal = new Array<CacheFolder>()
    let folders = Deno.readDirSync(rootFolder)
    folders.forEach(folder => {
        let f: CacheFolder = {
            created: new Date(folder.created),
            name: folder.name,
            path: rootFolder,
            id: btoa(path.join(rootFolder, folder.name))
        }
        rtnVal.push(f)
    })
    return rtnVal.slice(0, 20)
}

function getFoldersTree(p: string): Array<Folder> {
    
    let folders: Array<Folder> = new Array<Folder>()
    let fileInfo = Deno.readDirSync(p)
    fileInfo.forEach(element => {
        if (element.isDirectory()) {
            let folder: Folder = {
                id: btoa(path.join(p, element.name)),
                text: element.name,
                children: []
            }
            folders.push(folder)
            folder.children = getFoldersTree(path.join(p, element.name))
        }
    });
    return folders;
}

function containsFiles(path: string): boolean {
    try {
        let items = Deno.readDirSync(path)

        for (let i = 0; i < items.length; i++) {
            if (items[i].isFile()) {
                return true;
            }
        }
        return false;

    } catch (error) {
        return false
    }
}

enum OS {
    win, linux, mac
}

function getOS(): OS {
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

//Exports
export function getOsInfo(): OperatingSystem {
    let rtnVal: OperatingSystem = {
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
    let rtnVal: Array<KeyValuePair<string>> = new Array<KeyValuePair<string>>()
    let env = Deno.env();
    Object.keys(env).forEach((k) => {
        let item: KeyValuePair<string> = {
            key: k, 
            value: env[k]
        }
        rtnVal.push(item)
    })
    return rtnVal
}

export function getSystemFolders(): Array<KeyValuePair<string>> {
    let rtnVal: Array<KeyValuePair<string>> = new Array<KeyValuePair<string>>()
    rtnVal.push({
        key: 'Audio',
        value: Deno.dir("audio")
    })
    rtnVal.push({
        key: 'Cache',
        value: Deno.dir("cache")
    })
    rtnVal.push({
        key: 'Config',
        value: Deno.dir("config")
    })
    rtnVal.push({
        key: 'Data',
        value: Deno.dir("data")
    })
    rtnVal.push({
        key: 'Local Data',
        value: Deno.dir("data_local")
    })
    rtnVal.push({
        key: 'Desktop',
     value: Deno.dir("desktop")
    })
    rtnVal.push({
        key: 'Document',
        value: Deno.dir("document")
    })
    rtnVal.push({
        key: 'Download',
        value: Deno.dir("download")
    })
    rtnVal.push({
        key: 'Executable',
        value: Deno.dir("executable")
    })
    rtnVal.push({
        key: 'Font',
        value: Deno.dir("font")
    })
    rtnVal.push({
        key: 'Home',
        value: Deno.dir("home")
    })
    rtnVal.push({
        key: 'Picture',
        value: Deno.dir("picture")
    })
    rtnVal.push({
        key: 'Public',
        value: Deno.dir("public")
    })
    rtnVal.push({
        key: 'Template',
        value: Deno.dir("template")
    })
    rtnVal.push({
        key: 'Video',
        value: Deno.dir("video")
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
    let os = getOS();
    let homeKey: string = os == OS.win ? 'USERPROFILE' : 'HOME'
    let homeDir = Deno.env(homeKey)
    let relativeDir = "";

    switch (os) {
        case OS.win:
            relativeDir = "AppData/Local/deno"
            break;
        case OS.linux:
            relativeDir = ".cache/deno"
            break;
        case OS.mac:
            relativeDir = "Library/Caches/deno"
            break;
    }

    return path.join(homeDir, relativeDir)
}

export function getDepsCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'deps/https/')
}

export function getTypeScriptCacheDirLocal(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/file')
}

export function getTypeScriptCacheDirRemote(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/https')
}

export function listDepsFolders(): Array<CacheFolder> {
    let rootFolder = getDepsCacheDir()
    return listFolders(rootFolder)
}

export async function deleteFolder(folder: string): Promise<any> {
    try {
        folder = atob(folder)
        await Deno.remove(folder, { recursive: true })
        return {
            success: true,
            error: ''
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
        command = atob(command)
        let p = Deno.run({
            args: ["deno", "eval", command],
            stdout: "piped",
            stderr: "piped"
        })

        const { code } = await p.status();

        let res = ''
        if (code === 0) {
            const rawOutput = await p.output();
            res = new TextDecoder("utf-8").decode(rawOutput)
        } else {
            const rawError = await p.stderrOutput();
            res = new TextDecoder().decode(rawError);
        }

        return res;
    } catch (error) {
        return error.toString();
    }
}

export async function fetchDenoVersion(): Promise<string> {
    try {
        let response = await fetch('https://github.com/denoland/deno/releases/latest')
        let body = await response.text()
        const regVer = new RegExp(/title\=\"v(.*)?\"/)
        let res = regVer.exec(body)
        return res[1]
    } catch (error) {
        return 'Error fetching'
    }

}

export function getCacheTree(): Array<Folder> {
    const p = getDenoDir()
    return getFoldersTree(p);
}

export function getFiles(root: string): Array<FileExplorer> {
    root = atob(root)
    let folders: Array<FileExplorer> = new Array<FileExplorer>()
    let fileInfos = Deno.readDirSync(root)
    fileInfos.forEach(element => {
        let folder: FileExplorer = {
            id: btoa(path.join(root, element.name)),
            isFile: element.isFile(),
            name: element.name,
            size: element.isFile() ? element.len.bytes().toString() : ''
        }
        folders.push(folder)
    });
    folders = sortByName(folders)
    folders = sortByType(folders)
    return folders
}