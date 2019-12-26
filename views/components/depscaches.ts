export const title = ``
export const body = `
<div class="progress" id="pr" style="visibility:hidden;">
      <div class="indeterminate"></div>
  </div>
<div class="row">
    <div class="col s12">
        <ul class="collection with-header">
            <li class="collection-header"><h6><%= root %>  <small>first 20 items</small></h6></li>
            <% folders.forEach(function(folder){ %>
                <li class="collection-item">
                    <a data-folder="<%= folder.id %>" class="btn-floating waves-effect waves-light red btn-flat btn-small right">
                        <i class="material-icons" data-folder="<%= folder.id %>">delete</i>
                    </a>
                    <div style="display:flex">
                        <i class="material-icons small orange-text">folder</i> <span style="line-height: 28px;"><%= folder.name %></span>
                    </div>
                </li>
            <% }); %>
        </ul>
    </div>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    $('a[data-folder]').click((e) => {
        let folder = $(e.target).data('folder')
        if (confirm("Are you sure you want to delete this folder?")) {
            $('#pr').css('visibility', 'visible');
            axios.get('/api/deletefolder/' + folder)
            .then((res) => {
                if (res.data.success) {
                    renderComponent('depscaches');
                } else {
                    alert("Error deleting this folder: Error -> " + res.data.error.name)
                }
            })
            .catch((error) => {
                alert(error)
            })
            .finally(() => {
                $('#pr').css('visibility', 'hidden');
            })
        }
    });
}
`