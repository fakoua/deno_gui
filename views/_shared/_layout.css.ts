export const css = `
main {
    flex: 1 0 auto;
}

@media only screen and (min-width: 993px) {
body.has-fixed-sidenav {
    padding-left: 300px;
}
}

figcaption, figure, main {
    display: block;
}
main>.container {
    margin-top: 20px;
}
.sidenav.sidenav-fixed {
    left: 0;
    transform: translateX(0);
    position: fixed;
}

ul:not(.browser-default) {
    padding-left: 0;
    list-style-type: none;
}

.sidenav {
    background-color: #E1A686;
}

ul:not(.browser-default)>li {
    list-style-type: none;
}
.sidenav>li {
    width: 100%;
}
.sidenav li {
    float: none;
    line-height: 48px;
}
.sidenav .collapsible {
    border-bottom: 1px solid rgba(0,0,0,0.2);
}
.sidenav .collapsible {
    margin: 0;
}
.sidenav .collapsible, .sidenav.fixed .collapsible {
    border: none;
    box-shadow: none;
}
ul:not(.browser-default) {
    padding-left: 0;
    list-style-type: none;
}
.collapsible {
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    margin: .5rem 0 1rem 0;
}
.sidenav .collapsible>li.waves-effect {
    display: block;
}
.sidenav .collapsible>li {
    border-bottom: 1px solid rgba(0,0,0,0.2);
    transition: background-color .2s;
}
.sidenav li.active {
    background-color: rgba(0,0,0,0.05);
}
.sidenav .collapsible li, .sidenav.fixed .collapsible li {
    padding: 0;
}
.text-bold {
    font-weight: 600;
}
@media only screen and (min-width: 601px) {
.navbar-fixed {
    height: 64px;
}
}
@media only screen and (min-width: 993px) {
.has-fixed-sidenav .navbar-fixed nav.navbar {
    width: calc(100% - 300px);
    left: 300px;
}
}
.navbar-fixed nav.navbar {
    width: 100%;
    left: 0;
}
nav.navbar {
    z-index: 10;
    transition: box-shadow .3s, background-color .3s;
    padding: 0 20px;
    background-color: #fff;
    color: rgba(0,0,0,0.99);
}
.navbar-fixed nav {
    position: fixed;
}
nav .nav-wrapper {
    position: relative;
    height: 100%;
}
nav.navbar .brand-logo {
    position: relative;
    float: left;
    font-size: 18px;
    color: rgba(0,0,0,0.87);
}
.grey-text.text-darken-4 {
    color: #212121 !important;
}
nav .brand-logo {
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 2.1rem;
    padding: 0;
}
`