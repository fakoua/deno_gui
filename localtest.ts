import { parse } from "https://deno.land/std/flags/mod.ts";

let opts = {
    default: {
      port: 8080
    },
    alias: {
      port: 'p'
    }
  }
  let argsv = parse(Deno.args, opts)

  console.log(argsv)