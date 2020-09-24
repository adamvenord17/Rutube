import React from 'react';

class UploadVideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            video_file: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit() {
        this.props.processForm(video)
    }

    handleChange(feild) {
        return (e) => {
            this.setState({ [feild]: e.target.value });
        };
    }

    handleFile(e) {
        this.setState({video_file: e.currentTarget.files[0]});
    }

    render() {
        return(
        <>
            <h1>Upload Video</h1>
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange("title")}
                />
                <label>Title</label>
                <textarea 
                    cols="30" 
                    rows="10"
                    value={this.state.body}
                    onChange={this.handleChange("body")}>
                </textarea>
                <label>Description</label>
                <input 
                    type="file"
                    onChange={this.handleFile}
                />
                <button></button>
            </form>
        </>
        )
    }
}

export default UploadVideoForm;