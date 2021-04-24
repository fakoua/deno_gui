import * as dejs from "https://deno.land/x/dejs/mod.ts"
import type { ViewData } from "./models/ViewData.ts"

import { title as dashboardTitle } from "./views/components/dashboard.ts" // NOSONAR
import { title as aboutTitle } from "./views/components/about.ts" // NOSONAR
import { title as consoleTitle } from "./views/components/console.ts" // NOSONAR
import { title as depscachesTitle } from "./views/components/depscaches.ts" // NOSONAR

export async function renderAsync(view: string, model: any): Promise<ViewData> {
    try {
        const comPath = `./views/components/${view}.ts`
        const template = await import(comPath)
        const output = await dejs.render(template.body, model)
        const dataArray = await Deno.readAll(output)
        const body = new TextDecoder().decode(dataArray);
        return {
            title: template.title,
            onBeforeRender: template.onBeforeRender,
            onAfterRender: template.onAfterRender,
            body: body
        };        
    } catch (error) {
        return {
            title: "Error",
            onBeforeRender: "",
            onAfterRender: "",
            body: "Not Found Or Internal Error."
        }
    }
}
