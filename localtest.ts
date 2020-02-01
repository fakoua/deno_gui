import * as dejs from 'https://deno.land/x/dejs/mod.ts'
import { StringWriter } from 'https://deno.land/std/io/writers.ts'
import * as controllers from './controllers.ts'
import { walkSync } from '../../Users/sameh/AppData/Local/deno/deps/https/deno.land/std/fs/mod.ts';


const { copy, stdout } = Deno;

let view = "dashboard";
let model = controllers.getModel("dashboard")

let comPath = `./views/components/${view}.ts`
let template = await import(comPath)
const output = await dejs.render(template.body, model)
let r = await Deno.readAll(output)

const text = new TextDecoder().decode(r);
console.log(text)