const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const corejsVersion = 3; // Make sure it match the version in package.json

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/')
    // public path used by the web server to access the output path
    .setPublicPath('/')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('main', './src/index.js')
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    .addAliases({
      'fontawesome': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free'),
      'styles': path.resolve(__dirname, 'src/assets/scss'),
      'src': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'tags': path.resolve(__dirname, 'src/tags'),
    })

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables Sass/SCSS support
    .enableSassLoader()

    // enable post css loader
    .enablePostCssLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    .addPlugin(new HtmlWebpackPlugin({
        title: 'ElyAccount',
        inject: 'body'
    }))
    .addPlugin(new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(!Encore.isProduction()),
      API_URL: Encore.isProduction()
        ? JSON.stringify('http://127.0.0.1')
        : JSON.stringify('http://127.0.0.1:3000'),
    }))

    // Adds a loader for Riot.js tags
    .addLoader({
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [{
            loader: 'riot-tag-loader',
            options: {
                // set it to true if you are using hmr (see: riot-hot-loader)
                hot: true,
                // add here all the other riot-compiler options riot.js.org/guide/compiler/
                // template: 'pug' for example
                type: 'es6',
            },
        }],
    })

    // Babel is automatically configured for all .js and .jsx files via the
    // babel-loader with sensible defaults (e.g. with the @babel/preset-env and
    // @babel/preset-react if requested)
    .configureBabel(function(babelConfig) {
        // If the "useBuiltIns" option is declared for @babel/preset-env, make sure the corejs version is defined
        babelConfig.presets.forEach(([name, options]) => {
            if ('@babel/preset-env' !== name) {
                return;
            }

            // Avoid to have to import @babel/polyfill manually
            // The needed polyfill will be detected when used inside a file
            options.useBuiltIns = 'usage'; // experimental

            if (options.hasOwnProperty('useBuiltIns') && corejsVersion !== options.hasOwnProperty('corejs')) {
                options.corejs = corejsVersion;
            }
        });

        // add additional presets
        // babelConfig.presets.push('@babel/preset-flow');

        // no plugins are added by default, but you can add some
        // babelConfig.plugins.push('styled-jsx/babel');
        // babelConfig.plugins.push('@babel/plugin-transform-runtime');
    }, {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        // include_node_modules: ['foundation-sites'],

        // or completely control the exclude rule (note that you
        // can't use both "include_node_modules" and "exclude" at
        // the same time)
        // default=/(node_modules|bower_components)/
        // exclude: /bower_components/,

        // In a future version we will be able to define useBuiltIns option here
        // useBuiltIns: 'usage', // For example
    })

    .configureWatchOptions(function (watchOptions) {
      watchOptions.aggregateTimeout = 300;
      watchOptions.poll = 1000;
    })
;

module.exports = Encore.getWebpackConfig();
