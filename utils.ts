import * as path from "https://deno.land/std/path/mod.ts";
import { walkSync } from "https://deno.land/std/fs/mod.ts";
import {OperatingSystem} from './models/OperatingSystem.ts';
import { CacheFolder } from './models/CacheFolder.ts'

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


enum OS {
    win, linux, mac
}

function getOS(): OS {
    return OS[Deno.build.os];
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
    let relativeDir="";

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

export function getTypeScriptCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen')
}

export function getLocalCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/file')
}

export function getRemoteCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/https')
}

export function listDepsFolders(): Array<CacheFolder> {
    let rtnVal = new Array<CacheFolder>()
    let rootFolder = getDepsCacheDir()
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

function containsFiles(path: string): boolean {
    try {
        let items = Deno.readDirSync(path)

        for (let i=0; i<items.length; i++) {
            if (items[i].isFile()) {
                return true;
            }
        }
        return false;

    } catch (error) {
        return false
    }
}

export function listGenFolders(): Array<CacheFolder> {
    let rtnVal = new Array<CacheFolder>()
    let rootFolder = getTypeScriptCacheDir()

    for (const fileInfo of walkSync(rootFolder, {includeFiles: false, includeDirs: true})) {
        if (containsFiles(fileInfo.filename)) {
            let f: CacheFolder = {
                created: new Date(),
                name: fileInfo.filename,
                path: fileInfo.filename,
                id: btoa(fileInfo.filename)
            }
            rtnVal.push(f)
        }
    }
    return rtnVal.slice(0, 20)
}

export async function deleteFolder(folder: string): Promise<any> {
    try {
        folder = atob(folder)
        await Deno.remove(folder, {recursive: true})
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