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
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
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

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        let file = e.dataTransfer.files[0];
        this.setState({ video_file: file });
    }

    render() {
        if (this.state.video_file) {
            return(
                <>
                    <main id="upload-video-form-container">
                        <header>
                            <span>Upload video</span>
                            <div>
                                <i className="fas fa-exclamation-triangle"></i>
                                {/* <label class="feedback">Send Feedback</label> */}
                                <i onClick={this.props.closeModal} className="fas fa-times"></i>
                                {/* <label class="close">Close</label> */}
                            </div>
                        </header>



                        <footer>
                            <div>
                                <i class="fab fa-js-square"></i>
                                <p className="weak-p">Finished Processing</p>
                            </div>
                            <button onClick={this.handleSubmit}>Upload</button>
                        </footer>
                    </main>
                </>
            )
        } else {
            return ( 
                <>
                    <main id="upload-video-form-container">
                        <header>
                            <span>Upload video</span>
                            <div>
                                    <i className="fas fa-exclamation-triangle"></i>
                                    {/* <label class="feedback">Send Feedback</label> */}
                                    <i onClick={this.props.closeModal} className="fas fa-times"></i>
                                    {/* <label class="close">Close</label> */}
                            </div>
                        </header>
                        <div id="file-upload-tools"
                            onDrop={this.handleDrop}
                            onDragEnter={this.handleDragEnter}
                            onDragOver={this.handleDragOver} 
                        >
                                <label>
                                    <input type="file" onChange={this.handleFile} />
                                    <i className="fas fa-upload"></i>
                                </label>
                                <p className="strong-p">Drag and drop files to upload</p>
                                <p className="weak-p">Upon upload, your videos will be public for all to enjoy</p>
                                <label>
                                    <input type="file" onChange={this.handleFile} />
                                    <span id="select-files-btn">SELECT FILES</span>
                                </label>
                            <p className="weak-p footer">By submitting your videos to Rutube, you awknowledge that you agree to Rutube's <a>Terms of Service</a> and <a>Community Guidlines</a>.</p>
                            <p className="weak-p footer">Please be sure not to violate others' copyrightor privacy rights. <a>Learn more</a></p>
                            </div>
                    </main>
                </>
            )
        }
    }
}

export default UploadVideoForm;