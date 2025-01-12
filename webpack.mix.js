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

mix.sass(res.sass + 'app.scss', pub.css)
    .react(res.js + "app.js", pub.js)
    .react(res.react + "task.js", pub.js)
    .react(res.react + "mixedDemands.js", pub.js)
    .react(res.react + "mixedTasks.js", pub.js)
    .react(res.react + "demands.js", pub.js)
    .react(res.react + 'workspace.js', pub.js)
    .react(res.react + 'demand.js', pub.js)
    .react(res.react + "user-profile.js", pub.js)
    .js(res.js + "select2.js", pub.js)
    .react(res.react + 'dashboard.js', pub.js)
    .sass(res.sass + 'welcome.scss', pub.css)
    .js(res.js + 'tinymce/tinymce.js', pub.js + 'tinymce')
    .sass(res.sass + 'tinytheme.scss', pub.css)
    .sass(res.sass + 'auth.scss', pub.css)
    .js(res.js + "datepicker.js", pub.js)
    .js(res.js + 'tinymce/langs/fa.js', pub.js + 'tinymce/langs')
    .js(res.js + "chart.js", pub.js)
    .js(res.js + "confirmDelete.js", pub.js);

if (mix.inProduction()) {
    mix.version();
}