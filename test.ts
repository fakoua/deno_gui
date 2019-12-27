let p = Deno.run({
            args: ["deno", "--version"],
            stdout: "piped",
            stderr: "piped"
        })

const { code } = await p.status();

let res = ''
if (code === 0) {
  const rawOutput = await p.output();
  res = new TextDecoder("utf-8").decode(rawOutput)
} else {
  const rawError = await p.stderrOutput();
  res = new TextDecoder().decode(rawError);
}

console.log('The Result: ' + res)


Deno