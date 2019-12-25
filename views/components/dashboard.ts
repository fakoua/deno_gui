export const body = `
<div class="row">
      <div class="col s8">
        <div class="card-panel black-text white">
           <table>
            <tr>
                <td class="text-bold" width="160px">Host:</td><td><%=hostname%></td>
            </tr>
            <tr>
                <td class="text-bold">Operating System:</td><td><%=os%></td>
            </tr>
            <tr>
                <td class="text-bold">Architecture:</td><td><%=arch%></td>
            </tr>
            <tr>
                <td class="text-bold">Current Path:</td><td><%=currentPath%></td>
            </tr>
            <tr>
                <td class="text-bold">Home Directory:</td><td><%=homeDir%></td>
            </tr>
            <tr>
                <td class="text-bold">Deno Path:</td><td><%=denoPath%></td>
            </tr>
            <tr>
                <td class="text-bold">Deno Version:</td><td><%=denoVersion%></td>
            </tr>
            <tr>
                <td class="text-bold">Typescript Ver:</td><td><%=typescriptVersion%></td>
            </tr>
            <tr>
                <td class="text-bold">V8 Ver.:</td><td><%=v8Version%></td>
            </tr>
           </table>
        </div>
      </div>
</div>
`
export const onBeforeRender = ``
export const onAfterRender = ``