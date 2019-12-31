import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as utils from './utils.ts'
import * as controllers from './controllers.ts'
import * as cow from 'https://raw.githubusercontent.com/fakoua/cowsay/master/mod.ts'
import {_layout_template} from './views/_shared/_layout.ts'
import { css } from './views/_shared/_layout.css.ts'
import dargs from 'https://raw.githubusercontent.com/fakoua/dargs/master/mod.ts'

import { renderAsync } from './engine.ts'

const router = new Router();
router
  .get("/", context => {
    context.response.headers.set("Content-Type", "text/html")
    let body = _layout_template.replace('/*@@CSS@@*/', css)
    context.response.body = body
  })

  .get("/render/:com", async (context) => {
    let model = controllers.getModel(context.params.com)
    let result = await renderAsync(context.params.com, model);
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })

  .get("/api/deletefolder/:folder", async (context) => {
    let result = await utils.deleteFolder(context.params.folder)
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })

  .get("/api/run/:command", async (context) => {
    let result = await utils.runDeno(context.params.command)
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })

  .get("/api/folders/:folder", async (context) => {
    let folder = context.params.folder
    context.response.headers.set("Content-Type", "application/json")

    if (folder == '_root_') {
      context.response.body = utils.getCacheTree()
    } else {
      context.response.body = utils.getFiles(folder)
    }
  })

  .get("/api/denolatest/", async (context) => {
    const version = await utils.fetchDenoVersion()
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = version
  })

  

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

let opts = {
  default: {
    port: 8080
  },
  alias: {
    port: 'p'
  }
}
let argsv = dargs(Deno.args.slice(1), opts)

let text = cow.say({
  text: `Open  http://localhost:${argsv.port}`,
  cow: 'kitten'
})
console.log(text)
await app.listen(`localhost:${argsv.port}`)

