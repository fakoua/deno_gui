export const css = `
body {
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: grayscale;
  }
#container {
  margin-top:18px;
}
  #sidebar {
    position: fixed;
    height: 100vh;
    background-color: #f5f5f5;
    padding-top: 68px;
    padding-left: 0;
    padding-right: 0;
  }

  #sidebar .ui.menu > a.item {
    padding: 10px 20px;
    line-height: 20px;
    color: #337ab7;
    border-radius: 0 !important;
    margin-top: 0;
    margin-bottom: 0;
  }

  #sidebar .ui.menu > a.item.active {
    background-color: #337ab7;
    color: white;
    border: none !important;
  }

  #sidebar .ui.menu > a.item:hover {
    background-color: #eee;
    color: #23527c;
  }

  #content {
    padding-top: 56px;
    padding-left: 20px;
    padding-right: 20px;
  }

  #content h1 {
    font-size: 36px;
  }

  #content .ui.dividing.header {
    width: 100%;
  }

  .ui.centered.small.circular.image {
    margin-top: 14px;
    margin-bottom: 14px;
  }

  .ui.borderless.menu {
    box-shadow: none;
    flex-wrap: wrap;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }

  .ui.mobile.only.grid .ui.menu .ui.vertical.menu {
    display: none;
  }
`