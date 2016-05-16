/// <reference path="../_references.js" />
requirejs.config({
    jQuery: true,
    paths: {
        'text': '../scripts/text',
        'durandal': '../scripts/durandal',
        'plugins': '../scripts/durandal/plugins',
        'transitions': '../scripts/durandal/transitions'
    }
});

define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });

define(
    ['durandal/app', 'durandal/viewLocator', 'durandal/system'],
    function (app, viewLocator, system) {
        
        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'Grunt Durandal Test';

        app.configurePlugins({
            router: true,
            dialog: true,
            widget: true
        });

        app.start().then(function () {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell');
        });
    });