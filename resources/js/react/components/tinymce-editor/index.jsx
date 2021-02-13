import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinymcEditor extends React.Component {

    handleEditorChange = (content, editor) => {
        this.props.changeContent(content)
    }

    render() {
        let { initialValue } = this.props
        return (
            <Editor
                initialValue={initialValue ? initialValue : ""}
                tinymceScriptSrc={`${APP_PATH}js/tinymce/tinymce.js`}
                onEditorChange={this.handleEditorChange}
                init={{
                    skin: 'oxide',
                    skin_url: '/css',
                    content_css : '/css/tinytheme.css',
                    height: 350,
                    menubar: false,
                    branding: false,
                    placeholder: "توضیحات تکمیلی را در این قسمت وارد نمایید",
                    directionality: 'rtl',
                    language: "fa",
                    language_url: APP_PATH + "js/tinymce/langs/fa.js",
                    plugins: [
                        'advlist autolink lists link preview wordcount paste help directionality table',
                    ],
                    fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                    toolbar: [
                        {
                            name: 'history', items: [ 'undo', 'redo' ]
                        },
                        {
                            name: 'font', items: [ 'fontselect', 'fontsizeselect' ]
                        },
                        {
                            name: 'formatting', items: [ 'bold', 'italic', 'forecolor', 'backcolor']
                        },
                        {
                            name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ]
                        },
                        {
                            name: 'direction', items: [ 'ltr', 'rtl' ]
                        },
                        {
                            name: 'indentation', items: [ 'outdent', 'indent' ]
                        },
                        {
                            name: 'lists', items: [ 'numlist', 'bullist' ]
                        },
                        {
                            name: 'table', items: [ 'table' ]
                        },
                        {
                            name: 'other', items: [ 'removeformat', 'help' ]
                        }
                    ],
                    toolbar_mode: 'sliding'
                }}
            />
        );
    }
}