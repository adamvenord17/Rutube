import React from 'react';

class UploadVideoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            tag: '',
            tags: [],
            videoFile: null,
            videoUrl: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);

        this.deleteTag = this.deleteTag.bind(this);
        this.deleteAllTags = this.deleteAllTags.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleEnterTag = this.handleEnterTag.bind(this);
    }

    deleteTag(e) {
        let tagToDelete = e.currentTarget.name;
        let newTags = this.state.tags.filter(tag => tag !== tagToDelete);
        this.setState({tags: newTags});
    }

    deleteAllTags() {
        this.setState({tags: []});
    }

    handleTagChange(e) {
        if (e.target.value[e.target.value.length - 1] === ',' || e.key === "Enter") {
            let tag = e.key === "Enter" ? e.target.value : e.target.value.slice(0, e.target.value.length - 1);
            if (tag === '') {
                this.setState({tag: ''})
            } else if (!this.state.tags.includes(tag)) {
                let newTags = this.state.tags.concat(tag.toLowerCase());
                this.setState({tag: '', tags: newTags})
            } else {
                this.setState({tag: ''})
            }
        } else {
            this.setState({ tag: e.target.value });
        }
    }

    handleEnterTag(e) {
        this.handleTagChange(e);
    }

    componentDidMount() {
        if (this.props.formType === "EDIT") {
            this.handleEnterEdit();
        } 
    }

    componentDidUpdate() {
        let submitBtn = document.getElementById("upload-video-submit-form-btn");
        if (this.state.title.length === 0) {
            submitBtn.setAttribute('disabled', '');
        } else {
            submitBtn.removeAttribute('disabled', '');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        let video = {};
        let tags = {};
        if (this.props.formType === "EDIT") {
            let parts = this.props.location.pathname.split('/');
            let currentVideoId = parts.pop();
            video = {
                        id: currentVideoId,
                        title: this.state.title,
                        body: this.state.body
                    };
            tags = {
                tag_names: this.state.tags
            };
            this.props.processForm(video, tags);
        } else {
            formData.append('video[title]', this.state.title);
            formData.append('video[body]', this.state.body);
            formData.append('video[video_file]', this.state.videoFile);
            formData.append('tags[tag_names]', this.state.tags)
            this.props.processForm(formData);
        }
        this.props.closeModal();
    }

    handleChange(feild) {
        return (e) => {
            this.setState({ [feild]: e.target.value });
        };
    }

    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = (e) => {
            let blobData = e.target.result;
            this.setState({videoFile: file, videoUrl: blobData, title: file.name});
        };
        if (file) {
            fileReader.readAsDataURL(file);
        } 
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
        this.setState({ videoFile: file });
    }

    handleEnterEdit() {
        let parts = this.props.location.pathname.split('/');
        let currentVideoId = parts.pop();
        let currentVideo = this.props.videos[currentVideoId];
        this.setState({ title: currentVideo.title, body: currentVideo.body, videoUrl: currentVideo.videoUrl, tags: currentVideo.tags });
    }

    render() {
        let fileName = '';
        if (this.state.videoFile) {
            fileName = this.state.videoFile.name;
        } else {
            fileName = this.state.title;
        }

        if (this.state.videoFile || this.state.videoUrl) {

            let tagBtns = this.state.tags.map(tag => {
                return <div key={tag} className="tag-to-be-added">{tag}<button type="button" name={tag} onClick={this.deleteTag}><i className="fas fa-times"></i></button></div>
            })

            return(
                <>
                    <main id="upload-video-form-container">
                        <header id="upload-video-details">
                            <span>{this.state.title}</span>
                            <div>
                                <i className="fas fa-exclamation-triangle"></i>
                                {/* <label class="feedback">Send Feedback</label> */}
                                <i onClick={this.props.closeModal} className="fas fa-times"></i>
                                {/* <label class="close">Close</label> */}
                            </div>
                        </header>

                        <div id="line-container">
                            <div id="circle-details-container">
                                <p className="strong-p">Details</p>
                                <div id="circle-details"></div>
                            </div>
                            <div id="circle-elements-container">
                                <p className="strong-p">Elements</p>
                                <div id="circle-elements"></div>
                            </div>
                            <div id="circle-visibility-container">
                                <p className="strong-p">Visibility</p>
                                <div id="circle-visibility"></div>
                            </div>
                        </div>
                        
                        <div id="line"></div>

                        <div id="form-input-area">
                            <h1>Details</h1>

                            <div id="video-details-form-container">
                                <form onSubmit={this.handleEnterTag}>
                                    <input type="text" id="video-upload-title-input" onChange={this.handleChange("title")} value={this.state.title} placeholder="Add a title that describes your video" required/>
                                    <label id="video-upload-title-label">Title (required)</label>
                                    <textarea cols="30" rows="10" onChange={this.handleChange("body")} value={this.state.body} placeholder="Tell viewers about your video"></textarea>
                                    <label id="video-upload-body-label">Description</label>
                                    <h2>Tags</h2>
                                    <p className="weak-p">Tags can be useful if content in your video is commonly misspelled. Otherwise, tags play a minimal role in helping viewers find your video.</p>
                                    <div id="outer-tag-input">
                                        <div id="inner-tag-input">
                                            {tagBtns}
                                            <input type="text" value={this.state.tag} onKeyDown={this.handleEnterTag} onChange={this.handleEnterTag} />
                                        </div>
                                        <button type="button" onClick={this.deleteAllTags}><i className="fas fa-times"></i></button>
                                    </div>
                                    <p className="weak-p">Enter a comma, or press enter after each tag</p>
                                </form>
                                <div id="video-upload-preview-container">
                                    <video height="170" width="303" controls>
                                        <source src={this.state.videoUrl} type="video/mp4"/>
                                        <source src={this.state.videoUrl} type="video/ogg"/>
                                        <source src={this.state.videoUrl} type="video/webm"/>
                                        There was a problem rendering the video
                                    </video>
                                    <div id="video-upload-preview-details-container">
                                        <div id="video-preview-link-container">
                                            <div>
                                                <label>Video Link</label>
                                                <a>Availble after successful upload</a>
                                            </div>
                                            <i className="far fa-copy"></i>
                                        </div>
                                        <div id="video-preview-filename-container">
                                            <div>
                                                <label>Filename</label>
                                                <p className="strong-p">{fileName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <footer>
                            <div>
                                <i className="fab fa-js-square"></i>
                                <p className="weak-p">Finished processing</p>
                            </div>
                            <button id="upload-video-submit-form-btn" onClick={this.handleSubmit}>{this.props.formType}</button>
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