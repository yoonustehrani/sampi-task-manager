import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinymcEditor extends React.Component {

    handleEditorChange = (content, editor) => {
        this.props.changeContent(content)
    }

    render() {
        return (
            <Editor
                initialValue=""
                init={{
                    height: 250,
                    menubar: false, // make true for more options like image insert
                    plugins: [
                        'advlist autolink lists link preview wordcount paste help code',
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | code | help'
                }}
                onEditorChange={this.handleEditorChange}
            />
        );
    }
}