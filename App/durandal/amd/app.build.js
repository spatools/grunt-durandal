{
  "name": "durandal/amd/almond-custom",
  "inlineText": true,
  "stubModules": [
    "durandal/amd/text"
  ],
  "paths": {
    "text": "durandal/amd/text"
  },
  "baseUrl": "E:\\Maxime\\Projects\\Touchitv2\\Touchit.App\\App",
  "mainConfigFile": "E:\\Maxime\\Projects\\Touchitv2\\Touchit.App\\App\\main.js",
  "include": [
    "config",
    "main",
    "models",
    "durandal/app",
    "durandal/composition",
    "durandal/events",
    "durandal/http",
    "text!durandal/messageBox.html",
    "durandal/messageBox",
    "durandal/modalDialog",
    "durandal/system",
    "durandal/viewEngine",
    "durandal/viewLocator",
    "durandal/viewModel",
    "durandal/viewModelBinder",
    "durandal/widget",
    "durandal/plugins/router",
    "text!modules/appbar.html",
    "modules/appbar",
    "modules/locales",
    "viewmodels/shell",
    "text!views/shell.html"
  ],
  "exclude": [],
  "keepBuildDir": true,
  "optimize": "uglify2",
  "out": "E:\\Maxime\\Projects\\Touchitv2\\Touchit.App\\App\\main-built.js",
  "pragmas": {
    "build": true
  },
  "wrap": true,
  "insertRequire": [
    "main"
  ]
}