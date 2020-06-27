export const title = "Web REPL"
export const body = `
<div id="ts-container" style="width:100%;height:400px;border:1px solid #dddd"></div>
<div class="fluid">
   <button class="ui compact labeled icon button green" id="btn-run">
   <i class="play icon"></i>
   Run
   </button>
   <div class="ui labeled icon top left dropdown button" id="ddl-examples">
      <i class="dropdown icon"></i>
      <span class="text">Examples</span>
      <div class="menu">
         <div class="item">
            <i class="dropdown icon"></i>
            Swiss Knife
            <div class="menu">
               <div class="item" data-index="0">Text To Speech</div>
               <div class="item" data-index="1">Beep</div>
               <div class="item" data-index="2">Notification (Toast)</div>
               <div class="item" data-index="3">Question Box</div>
            </div>
         </div>
         <div class="item">
            <i class="dropdown icon"></i>
            Humanizer.ts
            <div class="menu">
               <div class="item" data-index="4">ByteSize</div>
               <div class="item" data-index="5">ByteSize (extension)</div>
               <div class="item" data-index="6">Pluralize</div>
               <div class="item" data-index="7">Ordinalize</div>
               <div class="item" data-index="8">ToQuantity</div>
               <div class="item" data-index="9">Number to numbers</div>
               <div class="item" data-index="10">Number to words</div>
               <div class="item" data-index="11">Number to ordinal words</div>
               <div class="item" data-index="12">Roman Numerals</div>
               <div class="item" data-index="13">Metric numerals</div>
            </div>
         </div>
         <div class="item">
            <i class="dropdown icon"></i>
            Soxa
            <div class="menu">
               <div class="item" data-index="15">Get Request (Promise)</div>
               <div class="item" data-index="16">Get Request (Await)</div>
            </div>
         </div>
         <div class="item">
            <i class="dropdown icon"></i>
            Ink for Deno
            <div class="menu">
               <div class="item" data-index="18">Introduction</div>
               <div class="item" data-index="19">Alias to console</div>
               <div class="item" data-index="20">Advanced (html like)</div>
            </div>
         </div>
         <div class="item" data-index="14">
            deno_shot
         </div>
         <div class="item" data-index="17">
            Cowsay!
         </div>
      </div>
   </div>
</div>
<div id="terminal"></div>
<div data-example="0" style="display:none;">
// Text To Speech
import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"
await swissKnife.speak("Hello from Deno", {rate: 1, volume: 100})
console.log("Done.")
</div>
<div data-example="1" style="display:none;">
// Play Beep
import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"
await swissKnife.beep(500, 1000) //play 500 hz for 1 sec.
</div>

<div data-example="2" style="display:none;">
// Show Windows Notification
import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"
await swissKnife.notification("My Title", "Hello Notification", 77, 2000)
</div>

<div data-example="3" style="display:none;">
// Question box. NB
// NB: The message box may appear in the background. 
import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"

let res = await swissKnife.questionBox("A Question", "Do you want to quite smoking?")
if (res) {
    console.log("Great, keep trying!")
} else {
    console.log("Not Great, but keep trying!")
}
</div>

<div data-example="4" style="display:none;">
// ByteSize
import "https://deno.land/x/humanizer.ts/byteSize.ts"

let fileSize = (10).kilobytes()
console.log(fileSize.bits)          //  81920
console.log(fileSize.bytes)         //  10240
console.log(fileSize.kilobytes)     //  10
console.log(fileSize.megabytes)     //  0.009765625
console.log(fileSize.gigabytes)     //  0.0000095367431640625
console.log(fileSize.terabytes)     //  9.313225746154785e-9
</div>

<div data-example="5" style="display:none;">
// ByteSize
import "https://deno.land/x/humanizer.ts/byteSize.ts"

let f = (4).gigabytes().add((22).megabytes()).subtract((980).kilobytes()).addGigabytes(1)
console.log(f.toString()) // - 5.020549774169922 GB
</div>

<div data-example="6" style="display:none;">
import "https://deno.land/x/humanizer.ts/vocabularies.ts"

console.log("Man".pluralize())
console.log("string".pluralize())

//Singularize

console.log("Men".singularize())
console.log("strings".singularize())
</div>

<div data-example="7" style="display:none;">
import "https://deno.land/x/humanizer.ts/ordinalize.ts"

console.log((1).ordinalize())
console.log((5).ordinalize())
</div>

<div data-example="8" style="display:none;">
import { ShowQuantityAs } from "https://deno.land/x/humanizer.ts/toQuantity.ts"

console.log("case".toQuantity(0))
console.log("case".toQuantity(1))
console.log("case".toQuantity(5))
console.log("man".toQuantity(0))
console.log("man".toQuantity(1))
console.log("man".toQuantity(2))

//ToQuantity can figure out whether the input word is singular or plural and will singularize or pluralize as necessary:

console.log("men".toQuantity(2))
console.log("process".toQuantity(2))
console.log("process".toQuantity(1))
console.log("processes".toQuantity(2))
console.log("processes".toQuantity(1))

/*
You can also pass a second argument, ShowQuantityAs, to toQuantity to specify how you want the provided quantity
to be outputted. The default value is ShowQuantityAs.Numeric which is what we saw above. The other two values are
 ShowQuantityAs.Words and ShowQuantityAs.None.
*/

console.log("case".toQuantity(5, ShowQuantityAs.Words))
console.log("case".toQuantity(5, ShowQuantityAs.None))
</div>

<div data-example="9" style="display:none;">
import "https://deno.land/x/humanizer.ts/numberToNumbers.ts"

console.log((1.25).billions())
console.log((3).hundreds().thousands())
</div>

<div data-example="10" style="display:none;">
import "https://deno.land/x/humanizer.ts/numberToWords.ts"

console.log((1).toWords())
console.log((10).toWords())
console.log((11).toWords())
console.log((122).toWords())
console.log((3501).toWords())
</div>

<div data-example="11" style="display:none;">
import "https://deno.land/x/humanizer.ts/numberToWords.ts"

console.log((0).toOrdinalWords())
console.log((1).toOrdinalWords())
console.log((2).toOrdinalWords())
console.log((8).toOrdinalWords())
console.log((10).toOrdinalWords())
console.log((11).toOrdinalWords())
console.log((12).toOrdinalWords())
console.log((20).toOrdinalWords())
console.log((21).toOrdinalWords())
console.log((121).toOrdinalWords())
</div>

<div data-example="12" style="display:none;">
import "https://deno.land/x/humanizer.ts/romanNumerals.ts"

console.log((1).toRoman())
console.log((2).toRoman())
console.log((3).toRoman())
console.log((4).toRoman())
console.log((5).toRoman())
console.log((6).toRoman())
console.log((7).toRoman())
console.log((8).toRoman())
console.log((9).toRoman())
console.log((10).toRoman())

//Also the reverse operation using the fromRoman extension.

console.log("I".fromRoman())
console.log("II".fromRoman())
console.log("III".fromRoman())
console.log("IV".fromRoman())
console.log("V".fromRoman())
</div>

<div data-example="13" style="display:none;">
import "https://deno.land/x/humanizer.ts/metricNumerals.ts"

console.log((1).toMetric())
console.log((1230).toMetric())
console.log((0.1).toMetric())

//Also the reverse operation using the fromMetric extension.

console.log("1.23k".fromMetric())
console.log("100m".fromMetric())
</div>

<div data-example="14" style="display:none;">
// Capture web url
// Make sure the folder MyFolder exists
// May take log time at first run to download chromium.

import { Capture } from 'https://deno.land/x/deno_shot/mod.ts'

let res = await Capture({
    url: 'https://www.github.com',
    image: 'C:/MyFolder/image.png',
    maximized: false, 
    windowSize: {
        width: 1000,
        height: 890
    }
});

if (res.success) {
    console.log(res.image)
}
</div>

<div data-example="15" style="display:none;">
import { soxa } from 'https://deno.land/x/soxa/mod.ts'

// Make a request for todos
soxa.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    console.log("Done")
  });
</div>

<div data-example="16" style="display:none;">
import { soxa } from 'https://deno.land/x/soxa/mod.ts'

let body = await soxa.get('https://github.com/denoland/deno/releases/latest');
const regVer = new RegExp(/title\=\"v(.*)?\"/)
let res = regVer.exec(body.data)
//@ts-ignore
console.log("Deno live version: ", res[1])
</div>

<div data-example="17" style="display:none">
import * as o from 'https://deno.land/x/cowsay/mod.ts'

let m = o.say({
    text: 'hello every one'
})
console.log(m)
</div>

<div data-example="18" style="display:none;">
import * as ink from 'https://deno.land/x/ink/mod.ts'

let text = ink.colorize('<red>Hello World</red>')
console.log(text)

//You can use nested style:

text = ink.colorize('<bg-blue><yellow>Hello World</bg-blue></yellow>')

console.log(text)
</div>

<div data-example="19" style="display:none;">
import * as ink from 'https://deno.land/x/ink/mod.ts'

ink.terminal.log('<red>Hello</red> %s', '<b>World</b>')
</div>

<div data-example="20" style="display:none;">
import * as ink from 'https://deno.land/x/ink/mod.ts'

let html = ' ' +
'<ink style="color: rgb(255, 0, 0); background-color: #00ff00;font: underline, bold">' +
'    Im Red, background Green, underlined and bold!' +
'    <ink style="background-color: rgb(0, 0, 0); font: italic;">' +
'        My BG is black again, but Im italic :(' +
'    </ink>' +
'    My BG is Green Again!' +
'</ink>' +
'No Format here';

let result = ink.html(html)
console.log(result);
</div>

<div data-example="10000" style="display:none;">

</div>

`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    $('.ui.dropdown').dropdown({
        action: 'hide',
        onChange: function() {
            let index = $(arguments[2]).data("index");
            let code = $('div[data-example="' + index + '"]').html();
            editor.setValue(code);
        }
    });
    let data ='';
    term = new Terminal({
        cursorBlink: false,
        disableStdin: true,
        rows: 20
    });
    term.open(document.getElementById('terminal'));
    term.prompt = () => {
        term.write('\\r\\ndeno> ');
    };
    term.writeln('Welcome to Deno Terminal');
    term.prompt(term);
}
`
