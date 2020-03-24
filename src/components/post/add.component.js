import React, { Component } from "react";
import PostService from "../../services/post.service";

export default class PostAdd extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.savePost = this.savePost.bind(this);
        this.clearPost = this.clearPost.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    clearPost() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
      
            submitted: false
        });
    }

    savePost() {
        let data = {
            title: this.state.title,
            description: this.state.description
        };

        PostService.create(data)
            .then((result) => {
                this.clearPost();
                console.log(result.data);
                this.props.history.push('/posts')
            }).catch((err) => {
                console.log(err);
            });

        this.setState({
            submitted: true
        });
    }

    render() {
        return (
            <div>
                <div className="form-group">     
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        cols="10" rows="4"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        name="description"
                    />
                </div>
                <button onClick={this.savePost} className="btn btn-success">
                    Submit
                </button>
            </div>
        )
    }
}