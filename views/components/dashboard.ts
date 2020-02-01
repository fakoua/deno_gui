export const title = 'Dashboard'
export const body = `
<div class="ui grid" style="padding-right:10px;">
    <div class="eight wide column">
        <!-- Column 01 Start -->
        <div class="ui relaxed divided list">
            <div class="item">
                <i class="large server middle aligned icon"></i>
                <div class="content">
                    <div class="header">Host:</div>
                    <div class="description"><%=osInfo.hostname%></div>
                </div>
            </div>
            <div class="item">
                <i class="large windows middle aligned icon"></i>
                <div class="content">
                    <div class="header">Operating System:</div>
                    <div class="description"><%=osInfo.os%></div>
                </div>
            </div>
            <div class="item">
                <i class="large microchip middle aligned icon"></i>
                <div class="content">
                    <div class="header">Architecture:</div>
                    <div class="description"><%=osInfo.arch%></div>
                </div>
            </div>
            <div class="item">
                <i class="large folder open middle aligned icon"></i>
                <div class="content">
                    <div class="header">Current Path:</div>
                    <div class="description"><%=osInfo.currentPath%></div>
                </div>
            </div>
            <div class="item">
                <i class="large folder middle aligned icon"></i>
                <div class="content">
                    <div class="header">Home Directory:</div>
                    <div class="description"><%=osInfo.homeDir%></div>
                </div>
            </div>
            <div class="item">
                <i class="large file code outline middle aligned icon"></i>
                <div class="content">
                    <div class="header">Deno Path:</div>
                    <div class="description"><%=osInfo.denoPath%></div>
                </div>
            </div>
            <div class="item">
                <i class="large info circle middle aligned icon"></i>
                <div class="content">
                    <div class="header">Deno Version:</div>
                    <div class="description"><%=osInfo.denoVersion%> <span style="padding-left:20px;">latest version:
                            <span id='denolatest' style="font-weight:600">...</span><span></div>
                </div>
            </div>
            <div class="item">
                <i class="large js square middle aligned icon"></i>
                <div class="content">
                    <div class="header">Typescript Version:</div>
                    <div class="description"><%=osInfo.typescriptVersion%></div>
                </div>
            </div>
            <div class="item">
                <i class="large js square middle aligned icon"></i>
                <div class="content">
                    <div class="header">V8 Version:</div>
                    <div class="description"><%=osInfo.v8Version%></div>
                </div>
            </div>
        </div>
    </div>
    <div class="eight wide column" style="height:400px; overflow:auto;">
        <h4>System Folders</h4>
        <div class="ui relaxed divided list">
          <% folders.forEach(function(folder){ %>
            <div class="item">
                <i class="large folder outline middle aligned icon"></i>
                <div class="content">
                    <div class="header"><%=folder.key%>:</div>
                    <div class="description" style="word-wrap: break-word;"><%=folder.value%></div>
                </div>
            </div>
          <% }); %>
        </div>
    </div>
</div>
<div class="ui grid">
    <div class="sixteen wide column">
        <!-- Column 01 End -->
        <h4 class="ui horizontal divider header">
            Environment Variables
        </h4>
        <!-- Column 02 Start -->
        <div class="ui relaxed divided list">
            <% envs.forEach(function(env){ %>
            <div class="item">
                <i class="large terminal middle aligned icon"></i>
                <div class="content">
                    <div class="header"><%=env.key%>:</div>
                    <div class="description" style="word-wrap: break-word; width:72vw;"><%=env.value%></div>
                </div>
            </div>
            <% }); %>
        </div>
        <!-- Column 02 End -->
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