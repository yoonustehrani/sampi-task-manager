import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TinymcEditor extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             content: ""
        }
    }
    

    handleEditorChange = (content, editor) => {
        this.props.changeContent(content)
    }

    render() {
        return (
            <Editor
                initialValue=""
                tinymceScriptSrc="http://localhost/js/tinymce.js"
                init={{
                    skin_url: '/css',
                    height: 250,
                    menubar: false, // make true for more options like image insert
                    // plugins: [
                    // 'advlist autolink lists link image charmap print preview anchor',
                    // 'searchreplace visualblocks code fullscreen',
                    // 'insertdatetime media table paste code help wordcount'
                    // ],
                    // toolbar:
                    // 'undo redo | formatselect | bold italic backcolor | \
                    // alignleft aligncenter alignright alignjustify | \
                    // bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={this.handleEditorChange}
            />
        );
    }
}

export default TinymcEditor;

