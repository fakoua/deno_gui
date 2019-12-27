import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as utils from './utils.ts'
import * as controllers from './controllers.ts'

import {_layout_template} from './views/_shared/_layout.ts'
import { css } from './views/_shared/_layout.css.ts'

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

  

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log('open  http://localhost:8080')
await app.listen("localhost:8080")

