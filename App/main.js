/// <reference path="../_references.js" />
requirejs.config({
    jQuery: true,
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(
    ['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router'],
    function (app, viewLocator, system, router) {
        
        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'Touch it';
        app.start().then(function () {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            router.map("home");

            app.adaptToDevice();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell');
        });
    });