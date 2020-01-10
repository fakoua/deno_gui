export const title = 'About Deno GUI'
export const body = `
<h3>Deno GUI</h3>
A Web interface for Deno
<div class="ui divider"></div>
<h3>Credits</h3>
<div class="ui divider"></div>
<div class="ui list">
  <div class="item">
    <i class="globe icon"></i>
    <div class="content">
      <a href="https://deno.land/" target="_blank">Deno</a>: A secure runtime for JavaScript and TypeScript
    </div>
  </div>

  <div class="item">
    <i class="github icon"></i>
    <div class="content">
      <a href="https://github.com/oakserver/oak" target="_blank">oak</a>: A middleware framework for Deno's net server
    </div>
  </div>

  <div class="item">
    <i class="globe icon"></i>
    <div class="content">
      <a href="https://lodash.com/" target="_blank">lodash</a>: A modern JavaScript utility library delivering modularity, performance & extras.
    </div>
  </div>

  <div class="item">
    <i class="globe icon"></i>
    <div class="content">
      <a href="https://semantic-ui.com/" target="_blank">Semantic UI</a>:  UI component framework based around useful principles from natural language.
    </div>
  </div>

  <div class="item">
    <i class="globe icon"></i>
    <div class="content">
      <a href="https://xtermjs.org/" target="_blank">Xterm.js</a>: A terminal for the web.
    </div>
  </div>

  <div class="item">
    <i class="globe icon"></i>
    <div class="content">
      <a href="https://jquery.com/" target="_blank">jQuery</a>: write less, do more.
    </div>
  </div>

  <div class="item">
    <i class="github icon"></i>
    <div class="content">
      <a href="https://github.com/axios/axios" target="_blank">axios</a>: Promise based HTTP client for the browser and node.js
    </div>
  </div>

  <div class="item">
    <i class="github icon"></i>
    <div class="content">
      <a href="https://github.com/fakoua/ink" target="_blank">ink</a>: Terminal string color for Deno
    </div>
  </div>

  <div class="item">
  <i class="github icon"></i>
  <div class="content">
    <a href="https://github.com/fakoua/cowsay" target="_blank">cowsay</a>: Configurable talking cow for Deno
  </div>
</div>

</div>

<h3>Author</h3>
<div class="ui divider"></div>
<div class="ui special cards">
  <div class="card">
    <div class="blurring dimmable image">
      <div class="ui dimmer">
        <div class="content">
          <div class="center">
            <a href="https://github.com/fakoua/" target="_blank" class="ui inverted button">github</a>
          </div>
        </div>
      </div>
      <img src="https://s.gravatar.com/avatar/5ca427173d5346a9f0dc1ac2a214c9f4?s=360">
    </div>
    <div class="content">
      <div class="header">Sameh Fakoua</div>
      <div class="meta">
        <span class="date">s.fakoua@gmail.com</span>
      </div>
    </div>
    <div class="extra content">
      <a href="https://github.com/fakoua/" target="_blank">
        <i class="github icon"></i>
        github
      </a>
    </div>
  </div>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function () {
    $('.special.cards .image').dimmer({
        on: 'hover'
    });    
}
`