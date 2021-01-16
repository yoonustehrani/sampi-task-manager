const mix = require('laravel-mix');
const src = {
    res: {
        js: 'resources/js/',
        sass: 'resources/sass/',
        react: 'resources/js/react/'
    },
    pub: {
        js: 'public/js/',
        css: 'public/css/'
    }
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.disableNotifications();

var { res, pub } = src

mix.js(res.js + 'tinymce.js', pub.js)
    
    // .sass(res.sass + 'tinymce-skins.scss', pub.css)
    .sass(res.sass + 'app.scss', pub.css)
    // .sass(res.sass + 'auth.scss', pub.css)
    .react(res.react + 'dashboard.js', pub.js)
    // .react(res.js + "app.js", pub.js)
    .react(res.react + 'workspace.js', pub.js)