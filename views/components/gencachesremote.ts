export const title = 'TypeScript Cache <small>remote</small>'
export const body = `
<h4>[<%= root %>]  <small>first 20 items</small></h4>
<div class="ui divider"></div>
<div class="ui middle aligned divided list">
  <% folders.forEach(function(folder){ %>
  <div class="item">
    <div class="right floated content">
        <button data-folder="<%= folder.id %>" class="ui red circular trash alternate outline icon button">
            <i class="trash alternate outline icon"></i>
        </button>
    </div>
    <i class="ui large folder middle aligned icon"></i>
    <div class="content">
      <%= folder.name %>
    </div>
  </div>
  <% }); %>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {

    function uiPrompt() {
        return new Promise((resolve, reject) => {
            $('.mini.modal')
            .modal({
                onApprove: () => {
                    resolve(true);
                }, 
                onDeny: () => {
                    reject(false)
                },
                onHide: () => {
                    reject(false)
                }
            })
            .modal('show')
        });
    }

    $('button[data-folder]').click((e) => {
        uiPrompt()
            .then((res) => {
                processDelete(e)
            })
            .catch((err) => {
                //console.log('reject')
            })
        return;
        
    });

    function processDelete(e) {
        let folder = $(e.currentTarget).data('folder')
        $(e.currentTarget).addClass('loading')
        axios.get('/api/deletefolder/' + folder)
        .then((res) => {
            if (res.data.success) {
                renderComponent('gencachesremote');
            } else {
                alert("Error deleting this folder: Error -> " + res.data.error.name)
            }
        })
        .catch((error) => {
            alert(error)
        })
        .finally(() => {
            $(e.currentTarget).removeClass('loading')
        })
    }
}
`