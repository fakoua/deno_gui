export const body = `
<div id="terminal"></div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    let data ='';
    let term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.prompt = () => {
        term.write('\\r\\n> ');
    };
    term.writeln('Welcome to Deno Console');
    term.writeln('This is a local terminal emulation for Deno REPL');
    term.writeln('Example: deno --version');
    term.writeln('');
    term.prompt(term);
    term.onKey(e => {
        const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

        if (e.domEvent.keyCode === 13) {

            term.prompt(term);
        } else if (e.domEvent.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write('\b \b');
            }
        } else if (printable) {
            term.write(e.key);
        }
    });
    term.onLineFeed(e => {
        console.log(e);
    });

    term.onData(e => {
        if ( e.charCodeAt(0) == 13 ) {
            let processedData = process(data)
            data =''
            term.write(processedData + '\\r\\n> ');
        } else {
            data = data + e;
        }
    });


    function process(repl) {
        return repl.toUpperCase();
    }
}
`