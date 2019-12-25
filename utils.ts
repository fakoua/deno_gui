import * as path from "https://deno.land/std/path/mod.ts";
import {OperatingSystem} from './models/OperatingSystem.ts';

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
    let homeKey = os == OS.win ? 'USERPROFILE' : 'HOME'
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
    return path.join(homeDir, 'deps/https')
}

export function getLocalCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/file')
}

export function getRemoteCacheDir(): string {
    let homeDir = getDenoDir()
    return path.join(homeDir, 'gen/https')
}