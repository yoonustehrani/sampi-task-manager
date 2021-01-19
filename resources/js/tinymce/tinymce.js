window.tinymce = require('tinymce/tinymce');

// Default icons are required for TinyMCE 5.3 or above
require('tinymce/icons/default');

// A theme is also required
require('tinymce/themes/silver');
// import 'tinymce/skins/ui/oxide/content.min.css';

// Any plugins you want to use has to be imported
require('tinymce/plugins/paste');
require('tinymce/plugins/link');
require('tinymce/plugins/advlist')
require('tinymce/plugins/autolink')
require('tinymce/plugins/lists')
require('tinymce/plugins/preview')
require('tinymce/plugins/wordcount')
require('tinymce/plugins/help')
require('tinymce/plugins/directionality')
require('tinymce/plugins/table')