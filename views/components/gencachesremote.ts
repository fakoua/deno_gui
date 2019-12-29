export const title = 'TypeScript Cache <small>remote</small>'
export const body = `
<div class="ui mini test modal transition">
    <div class="header">
      Clear Cache
    </div>
    <div class="content">
      <p>Are you sure you want to delete this folder?</p>
    </div>
    <div class="actions">
      <div class="ui negative button">
        No
      </div>
      <div class="ui positive right labeled icon button">
        Yes
        <i class="checkmark icon"></i>
      </div>
    </div>
</div>
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
    
    function uiPrompt(e) {
        let modal= $('.mini.modal')
                .modal({
                    onApprove: () => {
                        processDelete(e)
                    }, 
                    onDeny: () => {
                        console.log('deny')
                    },
                    onHide: () => {
                        console.log('hide')
                    }
                });
        modal.modal('show')
    }

    $('button[data-folder]').click((e) => {
        uiPrompt(e);
    });

    function processDelete(e) {
        let folder = $(e.currentTarget).data('folder')
        $(e.currentTarget).addClass('loading')
        axios.get('/api/deletefolder/' + folder)
        .then((res) => {
            if (res.data.success) {
                $('.ui.dimmer.modals').remove();
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