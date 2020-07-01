# Deno GUI

Deno Web GUI with REPL.

[![Build Status](https://api.travis-ci.com/fakoua/deno_gui.svg?branch=master)](https://travis-ci.com/fakoua/deno_gui)
[![Build Status](https://github.com/fakoua/deno_gui/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/fakoua/deno_gui/actions)

## CLI Installation
```
deno install -A --unstable -f -n deno_gui https://deno.land/x/deno_gui/mod.ts
```
## Run the server from CLI
```
deno_gui
``` 

## Using dpx

```
dpx deno_gui -A --unstable --reload
```

## Run the server from URL
```bash
deno run -A --unstable https://deno.land/x/deno_gui/mod.ts
```

## Specify the port:

```bash
deno run -A --unstable https://deno.land/x/deno_gui/mod.ts -p=9000
```

Or you can use --port=9000

```bash
deno run -A --unstable https://deno.land/x/deno_gui/mod.ts --port=9000
```

Open: http://localhost:8080

## Screenshot

![Deno GUI](https://raw.githubusercontent.com/fakoua/deno_gui/master/assets/deno_gui01.png)

## License

[MIT](LICENSE) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffakoua%2Fdeno_gui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffakoua%2Fdeno_gui?ref=badge_shield)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffakoua%2Fdeno_gui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffakoua%2Fdeno_gui?ref=badge_large)
