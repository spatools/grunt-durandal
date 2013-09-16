define(['plugins/router'], function (router) {
    return {
        router: router,

        activate: function () {
            return router.map([
                { route: '', moduleId: 'viewmodels/home', title: "Home", nav: true }
            ]).buildNavigationModel().activate();
        }
    };
});