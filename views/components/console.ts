export const title = 'Web REPL'
export const body = `
<div id="ts-container" style="width:100%;height:400px;border:1px solid #dddd"></div>
<div class="fluid">
    <button class="ui compact labeled icon button green" id="btn-run">
    <i class="play icon"></i>
        Run
    </button>
</div>
<div id="terminal"></div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
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