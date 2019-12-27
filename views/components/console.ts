export const title = 'Terminal'
export const body = `
<div id="terminal"></div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    let data ='';
    let term = new Terminal({
        cursorBlink: true
    });
    term.open(document.getElementById('terminal'));
    
    term.prompt = () => {
        term.write('\\r\\n> ');
    };
    term.writeln('Welcome to Deno Terminal');
    term.writeln('This is a local terminal emulation for Deno REPL');
    term.writeln('Example: Deno.metrics()');
    term.writeln('');
    term.prompt(term);
    term.on('key', (key, e) => {
        const printable = !e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey;

        if (e.keyCode === 13) {
            //term.prompt(term);
            process(data)
                .then((res) => {
                    data =''
                    term.write('\\r\\n' + res + '\\r\\n> ');
                })
        } else if (e.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write('\b \b');
                data = data.slice(0, -1)
            }
        } else if (printable) {
            term.write(e.key);
            data += key;
        }
    });

    term.on('paste', function (data, ev) {
        term.write(data);
    });

    function process(command) {
        return new Promise((resolve, reject) => {
            command = btoa(command)
            axios.get('/api/run/' + command)
            .then((res) => {
                resolve(res.data)
            })
        })
    }
}
`