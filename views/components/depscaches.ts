export const title = 'Deno Cache'
export const body = `
<div class="ui grid">
    <div class="four wide column">
        <div id="jstree-tree" class=""></div>
    </div>
    <div class="twelve wide column">
        <div id="explorer">
          <table class="ui celled striped table">
            <thead>
              <tr>
                <th colspan="3">
                  <div class="ui mini breadcrumb" id="breadcrumb">
                  </div>
                </th>
              </tr>
            </thead>
            <tbody id="explorer-body">
            </tbody>
          </table>
        </div>
    </div>
</div>

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
`
export const onBeforeRender = ``
export const onAfterRender = `
inlineScript = function() {
    $('.ui.dimmer.modals').remove()
    function uiPrompt(e) {
        let modal= $('.mini.modal')
                .modal({
                    onApprove: () => {
                        processDelete(e)
                    }, 
                    onDeny: () => {
                        //console.log('deny')
                    },
                    onHide: () => {
                        //console.log('hide')
                    }
                });
        modal.modal('show')
    }

    $('button[data-folder]').click((e) => {
        uiPrompt(e);
    });

    function processDelete(e) {
        let folder = $(e.currentTarget).data('folder')
        let isfile = $(e.currentTarget).data('isfile')
        $(e.currentTarget).addClass('loading')
        axios.get('/api/deletefolder/' + folder)
        .then((res) => {
            if (res.data.success) {
                //$('.ui.dimmer.modals').remove();
                //renderComponent('depscaches');
                //remove the file or folder
                $('tr[data-id="' + folder + '"]').remove()
                let node = $('#jstree-tree').jstree(true).get_node(folder)
                if (!isfile) {
                  $.jstree.reference("#jstree-tree").delete_node(node);
                  console.log('reeeeeeeeee')
                }
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


    $('#jstree-tree')
      .on('changed.jstree', function (e, data) {
        let tmp = '{{#each folders}}' + 
          '<tr data-id="{{this.id}}">' +
          '<td><i class="{{#if this.isFile}}file outline{{else}}folder{{/if}} icon"></i> {{this.name}}</td>' + 
          '<td style="width:136px;">{{this.size}}</td>' +
          '<td style="width:40px;">' +
          '  <button data-folder="{{this.id}}" data-isfile="{{this.isFile}}" class="ui red circular trash alternate outline icon button">' +
          '     <i class="trash alternate outline icon"></i>' +
          '  </button>' +
          '</td>' +
          '</tr>{{/each}}';

        
        let hd = '<div class="section">Home</div>'
        
        let bcTemp = '{{#each items}}' +
        '<i class="right chevron icon divider"></i>' +
        '<div class="section">{{this}}</div>' +
        '{{/each}}'

        var objNode = data.instance.get_node(data.selected);
        var objPath = data.instance.get_path(data.selected)
        axios.get('/api/folders/' + objNode.id)
        .then((res) => {
          const template = Handlebars.compile(tmp)
          let folders = {
            folders: res.data
          }
          let html = template(folders)
          $('#explorer-body').html(html)
          
          const bc = Handlebars.compile(bcTemp)
          let bcHtml = bc({items: objPath})
          $('#breadcrumb').html(hd + bcHtml)
          $('button[data-folder]').click((e) => {
            uiPrompt(e);
            //alert(1)
          });
        })
      })
      .jstree({
      core: {
        data: {
          url: '/api/folders/_root_'
        },
        check_callback: function() {
          return true;
        }
      },
      "plugins" : [ "wholerow" ]
    });

}
`