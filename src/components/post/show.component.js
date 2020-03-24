import React, { Component } from "react";
import PostService from "../../services/post.service";

export default class PostShow extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getPost = this.getPost.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        
        this.state = {
            post: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                post: {
                    ...prevState.post,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function (prevState) {
            return {
                post: {
                    ...prevState.post,
                    description: description
                }
            };
        });
    }

    getPost(id) {
        PostService.get(id)
            .then((result) => {
                this.setState({
                    post: result.data
                });
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    updatePublished(status) {
        let data = {
            id: this.state.post.id,
            title: this.state.post.title,
            description: this.state.post.description,
            published: status
        };

        PostService.update(
            this.state.post.id,
            data
        ).then((result) => {
            console.log(result.data);
            this.setState({
                message: "The post was updated successfully"
            });
            this.props.history.push('/posts')
        }).catch((err) => {
            console.log(err)
        });
    }

    updatePost() {
        PostService.update(
            this.state.post.id,
            this.state.post
        ).then((result) => {
            console.log(result.data);
            this.setState({
                message: "The post was updated successfully"
            });
            this.props.history.push('/posts')
        }).catch((err) => {
            console.log(err)
        });
    }

    deletePost() {
        PostService.delete(this.state.post.id)
            .then((result) => {
                console.log(result.data);
                this.props.history.push('/posts')
            }).catch((err) => {
                console.log(err);
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
                        value={this.state.post.title}
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
                        value={this.state.post.description}
                        onChange={this.onChangeDescription}
                        name="description"
                    />
                </div>
                <div className="form-group">
                    <label>Status: </label> {this.state.post.published ? 'Published' : "Pending"}
                </div>

                <button className="btn btn-sm btn-success m-1" onClick={this.updatePost}>Update</button>
                {this.state.post.published ? (
                    <button
                        className="btn btn-sm btn-primary m-1"
                        onClick={() => this.updatePublished(false)}
                    >Unpubslihed</button>
                ) : (
                    <button 
                    className="btn btn-sm btn-primary m-1"
                        onClick={() => this.updatePublished(true)}
                    >Published</button>
                )}
                
                <button 
                    className="btn btn-sm btn-danger m-1"
                    onClick={this.deletePost}
                >Remove</button>
                <p>{this.state.message}</p>
            </div>
        )
    }
}