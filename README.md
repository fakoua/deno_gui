# Deno GUI

Deno Web GUI with REPL

[![Build Status](https://api.travis-ci.com/fakoua/deno_gui.svg?branch=master)](https://travis-ci.com/fakoua/deno_gui)
[![Build Status](https://github.com/fakoua/deno_gui/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/fakoua/deno_gui/actions)

## CLI Installation
```
deno install -A --unstable -n deno_gui https://deno.land/x/deno_gui/gui.ts -f
```
## Run the server from CLI
```
deno_gui
``` 

## Run the server from URL
```bash
deno run -A https://deno.land/x/deno_gui/gui.ts
//Default port is 8080
```

## Specify the port:

```bash
deno run -A https://deno.land/x/deno_gui/gui.ts -p=9000
```

Or you can use --port=9000

```bash
deno run -A https://deno.land/x/deno_gui/gui.ts --port=9000
```

Open: http://localhost:8080

## Screenshot

![Deno GUI](https://raw.githubusercontent.com/fakoua/deno_gui/master/assets/deno_gui01.png)

## License

[MIT](LICENSE)
