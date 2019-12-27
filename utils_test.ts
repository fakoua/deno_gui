import * as utils from './utils.ts'
import { test, assert } from './test_deps.ts'

test(function test_utils_getOs() {
    assert(utils.getOsInfo().os.length>2)
})

test(function test_utils_getDirInfo() {
    assert(utils.getDenoDir().indexOf('deno')>0)
})

test(function test_utils_getTypeScriptCacheDirLocal() {
    assert(utils.getTypeScriptCacheDirLocal().indexOf('gen')>0)
})