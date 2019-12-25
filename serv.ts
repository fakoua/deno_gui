import { Application, Router } from "https://deno.land/x/oak/mod.ts";
//import {template} from "./views/home/dashboard.ts"
import * as controllers from './controllers.ts'
import startCase from 'https://deno.land/x/lodash/startCase.js'

import {_layout_template} from './views/_shared/_layout.ts'
import { css } from './views/_shared/_layout.css.ts'

import { renderAsync } from './engine.ts'

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author"
});

const router = new Router();
router
  .get("/", context => {
    context.response.headers.set("Content-Type", "text/html")
    let body = _layout_template.replace('@@CSS@@', css)
    context.response.body = body
  })

  .get("/render/:com", async (context) => {
    let action = startCase(context.params.com)
    let model = controllers['get' + action]()
    let result = await renderAsync(context.params.com, model);
    context.response.headers.set("Content-Type", "application/json")
    context.response.body = result
  })
  

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen("127.0.0.1:8080");