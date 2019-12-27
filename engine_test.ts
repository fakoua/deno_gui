import * as engine from './engine.ts'
import { test, assertEquals } from './test_deps.ts'

test(async function test_engine_render() {
    let result = await engine.renderAsync('generic', {id:1});
    assertEquals(result.title, 'generic_title')
    assertEquals(result.body, 'body_1')
    assertEquals(result.onBeforeRender, 'before_script')
    assertEquals(result.onAfterRender, 'after_script')
})