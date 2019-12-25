import * as dejs from 'https://deno.land/x/dejs@0.3.3/mod.ts'
import { StringWriter } from 'https://deno.land/std/io/writers.ts'

const { copy } = Deno;
//import { template } from './views/home/dashboard.ts'

export async function renderAsync(view: string, model: any): Promise<object> {
    let comPath = `./views/components/${view}.ts`
    let template = await import(comPath)

    const output = await dejs.render(template.body, model)
    let sw = new StringWriter();
    await copy(sw, output)
    let result = {
        onBeforeRender: template.onBeforeRender,
        onAfterRender: template.onAfterRender,
        body: sw.toString()
    }
    return result;
}