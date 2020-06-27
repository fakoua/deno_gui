import * as dejs from 'https://deno.land/x/dejs/mod.ts'
import { ViewData } from './models/ViewData.ts'

import { title as dashboardTitle } from './views/components/dashboard.ts'
import { title as aboutTitle } from './views/components/about.ts'
import { title as consoleTitle } from './views/components/console.ts'
import { title as depscachesTitle } from './views/components/depscaches.ts'

export async function renderAsync(view: string, model: any): Promise<ViewData> {
    try {
        let comPath = `./views/components/${view}.ts`
        let template = await import(comPath)
        const output = await dejs.render(template.body, model)
        let dataArray = await Deno.readAll(output)
        const body = new TextDecoder().decode(dataArray);
        let result: ViewData = {
            title: template.title,
            onBeforeRender: template.onBeforeRender,
            onAfterRender: template.onAfterRender,
            body: body
        }
        return result;        
    } catch (error) {
        let result: ViewData = {
            title: 'Error',
            onBeforeRender: '',
            onAfterRender: '',
            body: 'Not Found Or Internal Error.'
        }
        console.log(error)
        return result
    }
}