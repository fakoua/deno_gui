export const _layout_template = `
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Deno Gui</title>
    <meta name="description" content="Deno user interface">
    <meta name="author" content="Sameh Fakoua">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css" integrity="sha256-uTIrmf95e6IHlacC0wpDaPS58eWF314UC7OgdrD6AdU=" crossorigin="anonymous" />
    <style>
        @@CSS@@
    </style>
</head>

<body class="has-fixed-sidenav">
    <header>
        <div class="navbar-fixed">
            <nav class="navbar white">
                <div class="nav-wrapper"><a href="#!" class="brand-logo grey-text text-darken-4">Home</a>
                    <ul id="nav-mobile" class="right">
                        <li class="hide-on-med-and-down"><a href="#!" data-target="dropdown1"
                                class="dropdown-trigger waves-effect"><i class="material-icons">notifications</i></a>
                            <div id="dropdown1" class="dropdown-content notifications" tabindex="0">
                                <div class="notifications-title" tabindex="0">notifications</div>
                                <div class="card" tabindex="0">
                                    <div class="card-content"><span class="card-title">Joe Smith made a purchase</span>
                                        <p>Content</p>
                                    </div>
                                    <div class="card-action"><a href="#!">view</a><a href="#!">dismiss</a></div>
                                </div>
                                <div class="card" tabindex="0">
                                    <div class="card-content"><span class="card-title">Daily Traffic Update</span>
                                        <p>Content</p>
                                    </div>
                                    <div class="card-action"><a href="#!">view</a><a href="#!">dismiss</a></div>
                                </div>
                                <div class="card" tabindex="0">
                                    <div class="card-content"><span class="card-title">New User Joined</span>
                                        <p>Content</p>
                                    </div>
                                    <div class="card-action"><a href="#!">view</a><a href="#!">dismiss</a></div>
                                </div>
                            </div>
                        </li>
                        <li><a href="#!" data-target="chat-dropdown" class="dropdown-trigger waves-effect"><i
                                    class="material-icons">settings</i></a>
                            <div id="chat-dropdown" class="dropdown-content dropdown-tabbed" tabindex="0">
                                <ul class="tabs tabs-fixed-width" tabindex="0">
                                    <li class="tab col s3"><a href="#settings">Settings</a></li>
                                    <li class="tab col s3"><a href="#friends" class="active">Friends</a></li>
                                    <li class="indicator" style="left: 0px; right: 0px;"></li>
                                </ul>
                                <div id="settings" class="col s12" tabindex="0" style="display: none;">
                                    <div class="settings-group">
                                        <div class="setting">Night Mode
                                            <div class="switch right">
                                                <label>
                                                    <input type="checkbox"><span class="lever"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="setting">Beta Testing
                                            <label class="right">
                                                <input type="checkbox"><span></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div id="friends" class="col s12 active" tabindex="0">
                                    <ul class="collection flush">
                                        <li class="collection-item avatar">
                                            <div class="badged-circle online"><img
                                                    src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/portrait1.jpg?100"
                                                    alt="avatar" class="circle"></div><span class="title">Jane
                                                Doe</span>
                                            <p class="truncate">Lo-fi you probably haven't heard of them</p>
                                        </li>
                                        <li class="collection-item avatar">
                                            <div class="badged-circle"><img
                                                    src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/portrait2.jpg?100"
                                                    alt="avatar" class="circle"></div><span class="title">John
                                                Chang</span>
                                            <p class="truncate">etsy leggings raclette kickstarter four dollar toast</p>
                                        </li>
                                        <li class="collection-item avatar">
                                            <div class="badged-circle"><img
                                                    src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/portrait3.jpg?100"
                                                    alt="avatar" class="circle"></div><span class="title">Lisa
                                                Simpson</span>
                                            <p class="truncate">Raw denim fingerstache food truck chia health goth synth
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul><a href="#!" data-target="sidenav-left" class="sidenav-trigger left"><i
                            class="material-icons black-text">menu</i></a>
                </div>
            </nav>
        </div>
        <ul id="sidenav-left" class="sidenav sidenav-fixed" style="transform: translateX(0px);">
            <li><a href="/" class="logo-container">Deno GUI<i class="material-icons left">spa</i></a>
            </li>
            <li><a href="#" data-route="dashboard" class="waves-effect active">Dashboard<i class="material-icons">web</i></a></li>
            <li><a href="#" data-route="console" class="waves-effect active">Console<i class="material-icons">web</i></a></li>
            <li>
                <ul class="collapsible">
                    <li class="bold waves-effect">
                    <a style="padding-left:32px;" class="collapsible-header" tabindex="0">Deno Caches<i class="material-icons">chevron_right</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#" data-route="dashboard" class="waves-effect active">Dashboard<i
                                            class="material-icons">web</i></a></li>
                                <li><a href="/pages/admin-fixed-chart" class="waves-effect">Fixed Chart<i
                                            class="material-icons">list</i></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </header>
    <main>
        <div class='container' id='container'>
        Main
        </div>
    </main>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
        integrity="sha256-U/cHDMTIHCeMcvehBv1xQ052bPSbJtbuiw4QA9cTKz0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"
        integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js" integrity="sha256-tDeULIXIGkXbz7dkZ0qcQajBIS22qS8jQ6URaeMoVJs=" crossorigin="anonymous"></script>
    <script>
        let inlineScript = function() {};
        $(document).ready(() => {
            $('.collapsible').collapsible();
            $('a[data-route]').click((e) => {
                e.preventDefault();
                let route = $(e.target).data('route')
                renderComponent(route);
            })
        });

        function renderComponent(com) {
            let preLoader = '<div class="progress"><div class="indeterminate"></div></div>';
            $('#container').html(preLoader)
            axios.get('/render/' + com)
                .then((res) => {
                    $('#container').html(res.data.body)
                    eval(res.data.onAfterRender)
                    inlineScript()
                })
                .finally(() => {

                })
        }
    </script>
</body>

</html>
`