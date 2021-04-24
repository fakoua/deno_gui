import * as utils from "./utils.ts"
import { assert } from "./test_deps.ts"

Deno.test("test_utils_getOs", function () {
    assert(utils.getOsInfo().os.length > 2)
})

Deno.test("test_utils_getDirInfo", function () {
    assert(utils.getDenoDir().includes("deno"))
})

Deno.test("test_utils_getTypeScriptCacheDirLocal", function () {
    assert(utils.getTypeScriptCacheDirLocal().includes("gen"))
})
