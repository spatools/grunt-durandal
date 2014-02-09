/*
 * grunt-durandal
 * https://github.com/spatools/grunt-durandal
 * Copyright (c) 2013 SPA Tools
 * Code below is licensed under MIT License
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = function (grunt) {
    //#region Global Properties

    var _ = grunt.util._,
        path = require('path'),
        requirejs = require('requirejs'),

        paths = {
            text: "../scripts/text",
            almond: "../scripts/almond-custom",
            durandal: "../scripts/durandal",
            plugins: "../scripts/durandal/plugins",
            transitions: "../scripts/durandal/transitions"
        },

        extensions = {
            script: ".js",
            view: ".html",
            all: [".js", ".html"]
        }

        defaultRequireConfig = {
            name: paths.almond,
            inlineText: true,
            stubModules: [paths.text],
            paths: {
                text: paths.text,
                durandal: paths.durandal,
                plugins: paths.plugins,
                transitions: paths.transitions
            },
            keepBuildDir: true,
            optimize: "uglify2",
            pragmas: {
                build: true
            },
            wrap: true,
        }; 

    //#endregion

    //#region Private Methods

    function ensureRequireConfig(params) {
        if (params.includeMain)
            params.insertRequire.push("main");
            
        params.insertRequire = _.uniq(params.insertRequire);
        params.includes = _.uniq(params.includes);
        params.excludes = _.uniq(params.excludes);

        if (params.paths)
            params.paths = _.extend({}, defaultRequireConfig.paths, params.paths);

        if (params.pragmas)
            params.pragmas = _.extend({}, defaultRequireConfig.pragmas, params.pragmas);
    }

    function includePath(array, config, url) {
        if (url.indexOf(config.out) !== -1 || url.indexOf("durandal/amd") !== -1)
            return;

        var ext = path.extname(url);
        url = path.relative(config.baseUrl, url);
        url = url.replace(/\\/g, "/");

        var pathToReplace = _.chain(config.paths)
                            .map(function (_path, key) { return { key: key, path: _path }; })
                            .filter(function (_path) { return url.indexOf(_path.path) !== -1; })
                            .max(function (_path) { return _path.path.length; })
                            .value();

        if (pathToReplace)
            url = url.replace(pathToReplace.path, pathToReplace.key);

        if (ext === ".html") {
            url = "text!" + url;
        }
        else if (ext === ".js") {
            url = url.replace(new RegExp("\\" + ext + "$"), "");
        }
        else
            return;

        array.push(url);
    }

    //#endregion

    grunt.registerMultiTask('durandal', "Grunt Durandal Builder - Build durandal project using a custom require config and a custom almond", function () {
        var done = this.async(),
            config,
            params = this.options({
                baseUrl: "app/",
                out: "app/main-built.js",
                mainPath: "app/main.js",
                include: [],
                exclude: [],
                insertRequire: [],
                loglevel: "default",
                includeMain: true
            });

        ensureRequireConfig(params);
        config = _.extend({}, defaultRequireConfig, params);

        this.files.forEach(function (file) {
            file.src.forEach(_.partial(includePath, config.include, config));
        });

        requirejs.optimize(
            config,
            function (response) {
                if (params.loglevel === "verbose")
                    grunt.log.write(response);

                grunt.log.ok(params.out + " created !");

                done(true);
            },
            function (error) {
                grunt.log.error(error);

                done(false);
            }
        );
    });
};
