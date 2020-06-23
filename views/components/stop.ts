export const title = 'Stop Deno GUI'
export const body = `
<div class="ui page dimmer" id="dim">
    <div class="content">
        <h2 class="ui inverted icon header">
            <i class="heart icon"></i>
            Thank you for using Deno GUI
        </h2>
    </div>
</div>
<div>
    <button class="ui labeled icon button red blurring" id="btn-stop">
        <i class="stop icon"></i>
        Stop Deno GUI
    </button>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    $("#btn-stop").click((e) => {
        e.preventDefault();
        axios.get('/api/stop')
        .then((res) => {
            
        })
        .catch((error) => {
        })
        .finally(() => {
            $('#dim').dimmer({opacity: 0.5, closable: false}).dimmer('show');
        })
    })
}
`