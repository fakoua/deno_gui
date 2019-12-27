import * as engine from './engine.ts'


let result = await engine.renderAsync('generic', {id:1});
console.log(result)