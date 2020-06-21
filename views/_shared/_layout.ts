export const _layout_template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=no" />
  <meta name="description" content="Deno user interface" />
  <meta name="author" content="Sameh Fakoua" />
  <meta name="theme-color" content="#ffffff" />
  <title>Deno GUI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css"
    integrity="sha256-uTIrmf95e6IHlacC0wpDaPS58eWF314UC7OgdrD6AdU=" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
  <style>
    /*@@CSS@@*/
  </style>
</head>
<body id="root">
<div class="ui dimmer" id="dimmer">
        <div class="ui massive text loader">
            <h3>Loading</h3>
        </div>
    </div>
  <div class="ui tablet computer only padded grid">
    <div class="ui inverted borderless top fixed fluid menu">
      <a data-route="dashboard" class="header item">Deno GUI</a>
    </div>
  </div>
  <div class="ui mobile only padded grid">
    <div class="ui top fixed borderless fluid inverted menu">
      <a data-route="dashboard" class="header item">Deno GUI</a>
      <div class="right menu">
        <div class="item">
          <button class="ui icon toggle basic inverted button">
            <i class="content icon"></i>
          </button>
        </div>
      </div>
      <div class="ui vertical borderless inverted fluid menu">
        <a data-route="dashboard" class="item">Dashboard</a>
        <a data-route="console" class="item">Web REPL</a>
        <div class="ui fitted divider"></div>
        <a data-route="depscaches" class="item">Deno Cache</a>
        <div class="ui fitted divider"></div>
        <a data-route="about" class="item">About</a>
      </div>
    </div>
  </div>
  <div class="ui padded grid">
    <div class="three wide tablet only two wide computer only column" id="sidebar">
      <div class="ui vertical borderless fluid text menu">
        <a data-route="dashboard" class="active item">Dashboard</a>
        <a data-route="console" class="item">Web REPL</a>
        <div class="ui hidden divider"></div>
        <a data-route="depscaches" class="item">Deno Cache</a>
        <a data-route="about" class="item">About</a>
      </div>
    </div>
    <div class="sixteen wide mobile thirteen wide tablet thirteen wide computer right floated column" id="content">
      <div class="ui padded grid">
        <div class="row">
          <div class="column">
            <div class="ui raised segment">
              <span class="ui red ribbon label" id='title'>Deno GUI</span>
              <div id='container'>Loading ...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"
    integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js"
    integrity="sha256-tDeULIXIGkXbz7dkZ0qcQajBIS22qS8jQ6URaeMoVJs=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.5.3/handlebars.min.js" integrity="sha256-GwjGuGudzIwyNtTEBZuBYYPDvNlSMSKEDwECr6x6H9c=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js" integrity="sha256-DQgiuuNYbJhK4lxVGFlnhs8dYMOARViaCImkW0avmW8=" crossorigin="anonymous"></script>
  <script>
    let controller = 'dashboard';
    let editor;
    let term;
    let inlineScript = function () {};
    $(document).ready(() => {
      $(".ui.toggle.button").click(function () {
        $(".mobile.only.grid .ui.vertical.menu").toggle(100);
      });
      renderComponent('dashboard');
      $('a[data-route]').click((e) => {
        e.preventDefault();
        $('a[data-route]').removeClass('active')
        let route = $(e.currentTarget).data('route')
        $('a[data-route=' + route + ']').addClass('active')
        renderComponent(route);
      })
    });

    function renderComponent(com) {
      controller = com;
      let preLoader = '<div class="ui loader active"></div>';
      $('#container').append(preLoader)
      axios.get('/render/' + com)
        .then((res) => {
          $('#title').html(res.data.title)
          $('#container').html(res.data.body);
          eval(res.data.onAfterRender)
          inlineScript();
          inlineScript = function () {}
        })
        .finally(() => {
          checkMonaco();
        });
    }

    function checkMonaco() {
      if (controller == 'console') {
        if (typeof window.require === "function") {
          initMonaco();
        }
        else {
          window.setTimeout(checkMonaco, 500);
        }
      }
    }

    function initMonaco() {
      require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});
      require(['vs/editor/editor.main'], function() {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          allowJs: true,
          checkJs: true,
          esModuleInterop: true,
          target: monaco.languages.typescript.ScriptTarget.ESNext,
          allowNonTsExtensions: true,
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.ESNext,
          noEmit: true,
          strict: true,
          resolveJsonModule: true,
          sourceMap: true,
          typeRoots: ["node_modules/@types"]
      });      
        editor = monaco.editor.create(document.getElementById('ts-container'), {
            automaticLayout: true,
            language: 'typescript',
            value: [
              'console.log("Hello world!", Deno.version);\\\n'
            ].join('\\\n')
        });
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
    $('#btn-run').click(function(e) {
        e.preventDefault();
        $('#dimmer').addClass('active')
        process(editor.getValue())
        .then((res) => {
          term.clear();
          var ars = res.split("\\n");
          $.each(ars, function(index, value) {
            term.writeln(value);
          });
          term.writeln('deno>');
        })
        .finally(() => {
          $('#dimmer').removeClass('active')
        })
    });
  }
  </script>
</body>

</html>
`