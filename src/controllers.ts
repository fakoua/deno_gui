import * as utils from "./utils.ts"
import startCase from "https://deno.land/x/lodash/startCase.js"

export function getModel(action: string): any {
    try {
        action = startCase(action)
        // @ts-ignore
        return this["get" + action]()
    } catch (error) {
       return error 
    }
}

export function getDashboard(): any {
    return {
        osInfo: utils.getOsInfo(),
        envs: utils.getEnv()
    }
}

export function getConsole(): any {
    return {}
}

export function getDepscaches(): any {
    const folders = utils.listDepsFolders()
    return {
        root: utils.getDepsCacheDir(),
        folders: folders
    }
}

export function getAbout(): any {
    return {
        
    }
}



