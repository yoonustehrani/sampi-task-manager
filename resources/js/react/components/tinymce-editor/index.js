import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinymcEditor extends React.Component {

    handleEditorChange = (content, editor) => {
        this.props.changeContent(content)
    }

    render() {
        return (
            <Editor
                initialValue=""
                tinymceScriptSrc="http://localhost/js/tinymce.js"
                init={{
                    skin: 'oxide',
                    skin_url: '/css',
                    content_css : '/css/tinytheme.css',
                    // theme: 'silver',
                    // theme_url: '/css/kir',
                    height: 250,
                    menubar: false, // make true for more options like image insert
                    // plugins: [`
                    //     'advlist autolink lists link preview wordcount paste help code',
                    // ],
                    // toolbar:
                    // 'undo redo | formatselect | bold italic backcolor | \
                    // alignleft aligncenter alignright alignjustify | \
                    // bullist numlist outdent indent | removeformat | code | help'
                }}
                onEditorChange={this.handleEditorChange}
            />
        );
    }
}