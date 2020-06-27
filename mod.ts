import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as utils from "./src/utils.ts"
import * as controllers from "./src/controllers.ts"
import * as cow from "https://deno.land/x/cowsay/mod.ts"
import {_layout_template} from "./src/views/_shared/_layout.ts"
import { css } from "./src/views/_shared/_layout.css.ts"
import { parse } from "https://deno.land/std/flags/mod.ts";
import * as ink from "https://deno.land/x/ink/mod.ts"

import { renderAsync } from "./src/engine.ts"

const router = new Router();
router
// @ts-ignore
  .get("/", context => {
    context.response.headers.set("Content-Type", "text/html")
    const body = _layout_template.replace("/*@@CSS@@*/", css)
    context.response.body = body
  })

  // @ts-ignore
  .get("/render/:com", async (context) => {
    // @ts-ignore
    const model = controllers.getModel(context.params.com)
    // @ts-ignore
    const result = await renderAsync(context.params.com, model);
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })

  // @ts-ignore
  .get("/api/deletefolder/:folder", async (context) => {
    // @ts-ignore
    const result = await utils.deleteFolder(context.params.folder)
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })
  // @ts-ignore
  .get("/api/run/:command", async (context) => {
    // @ts-ignore
    const result = await utils.runDeno(context.params.command)
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })

  // @ts-ignore
  .get("/api/folders/:folder", async (context) => {
    const folder = context.params.folder
    context.response.headers.set("Content-Type", "application/json")

    if (folder === "_root_") {
      context.response.body = utils.getCacheTree()
    } else {
      // @ts-ignore
      context.response.body = utils.getFiles(folder)
    }
  })

  // @ts-ignore
  .get("/api/stop", async (context) => {
    const folder = context.params.folder
    context.response.headers.set("Content-Type", "application/json")
    Deno.exit(0)
  })

  // @ts-ignore
  .get("/api/denolatest/", async (context) => {
    const version = await utils.fetchDenoVersion()
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = version
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const opts = {
  default: {
    port: 8080
  },
  alias: {
    port: "p"
  }
}
const argsv = parse(Deno.args, opts)

const urlText = ink.colorize(`<b>Open: <red>http://localhost:${argsv.port}</red></b>`)

const text = cow.say({
  text: urlText,
  cow: "kitten"
})

export async function run() {
  console.log(text)
  await app.listen(`localhost:${argsv.port}`)
}

await run();
