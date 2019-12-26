//import * as utils from './utils.ts'
//import * as controllers from './controllers.ts'

let res = Deno.readDirSync('C:\\Users\\sameh\\AppData\\Local\\deno\\gen')

res.forEach(element => {
    console.log(element.isFile())    
});



