export const title = 'Web REPL'
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
      </div>
   </div>
</div>
<div id="terminal"></div>
<div data-example="0" style="display:none;">
import * as swissKnife from "https://deno.land/x/swissKnife/mod.ts"
let res = await swissKnife.speak("Hello from the Deno", {rate: 3, volume: 100})
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