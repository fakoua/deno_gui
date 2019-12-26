import * as dejs from 'https://deno.land/x/dejs@0.3.3/mod.ts'
import { StringWriter } from 'https://deno.land/std/io/writers.ts'
import { ViewData } from './models/ViewData.ts'

const { copy } = Deno;
//import { template } from './views/home/dashboard.ts'

export async function renderAsync(view: string, model: any): Promise<ViewData> {
    try {
        let comPath = `./views/components/${view}.ts`
        let template = await import(comPath)
        const output = await dejs.render(template.body, model)
        let sw = new StringWriter();
        await copy(sw, output)
        let result: ViewData = {
            title: view,
            onBeforeRender: template.onBeforeRender,
            onAfterRender: template.onAfterRender,
            body: sw.toString()
        }
        return result;        
    } catch (error) {
        let result: ViewData = {
            title: 'Error',
            onBeforeRender: '',
            onAfterRender: '',
            body: 'Not Found Or Internal Error.'
        }
        return result
    }
}