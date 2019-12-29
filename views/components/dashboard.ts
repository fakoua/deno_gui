export const title = 'Dashboard'
export const body = `
<div class="ui relaxed divided list">
  <div class="item">
    <i class="large server middle aligned icon"></i>
    <div class="content">
      <div class="header">Host:</div>
      <div class="description"><%=hostname%></div>
    </div>
  </div>
  <div class="item">
    <i class="large windows middle aligned icon"></i>
    <div class="content">
      <div class="header">Operating System:</div>
      <div class="description"><%=os%></div>
    </div>
  </div>
  <div class="item">
    <i class="large microchip middle aligned icon"></i>
    <div class="content">
      <div class="header">Architecture:</div>
      <div class="description"><%=arch%></div>
    </div>
  </div>
  <div class="item">
    <i class="large folder open middle aligned icon"></i>
    <div class="content">
      <div class="header">Current Path:</div>
      <div class="description"><%=currentPath%></div>
    </div>
  </div>
  <div class="item">
    <i class="large folder middle aligned icon"></i>
    <div class="content">
      <div class="header">Home Directory:</div>
      <div class="description"><%=homeDir%></div>
    </div>
  </div>
  <div class="item">
    <i class="large file code outline middle aligned icon"></i>
    <div class="content">
      <div class="header">Deno Path:</div>
      <div class="description"><%=denoPath%></div>
    </div>
  </div>
  <div class="item">
    <i class="large info circle middle aligned icon"></i>
    <div class="content">
      <div class="header">Deno Version:</div>
      <div class="description"><%=denoVersion%> <span style="padding-left:20px;">latest version: <span id='denolatest' style="font-weight:600">...</span><span></div>
    </div>
  </div>
  <div class="item">
    <i class="large js square middle aligned icon"></i>
    <div class="content">
      <div class="header">Typescript Version:</div>
      <div class="description"><%=typescriptVersion%></div>
    </div>
  </div>
  <div class="item">
    <i class="large js square middle aligned icon"></i>
    <div class="content">
      <div class="header">V8 Version:</div>
      <div class="description"><%=v8Version%></div>
    </div>
  </div>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
   axios.get('/api/denolatest/')
    .then((res) => {
      $('#denolatest').html(res.data)
    })
}
`