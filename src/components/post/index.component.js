/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from "react";
import PostService from "../../services/post.service";
import { Link } from "react-router-dom";

export default class PostIndex extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.removeAllPosts = this.removeAllPosts.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            posts: [],
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrievePosts();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrievePosts() {
        PostService.getAll()
            .then((result) => {
                this.setState({
                    posts: result.data
                });
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    removeAllPosts() {
        PostService.deleteAll()
            .then((result) => {
                console.log(result);
                this.retrievePosts();
            }).catch((err) => {
                console.log(err);
            });
    }

    searchTitle() {
        PostService.findByTitle(this.state.searchTitle)
            .then((result) => {
                this.setState({
                    posts: result.data
                });
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={this.state.title}
                                onChange={this.onChangeSearchTitle}
                            />
                            <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h4>Posts List</h4>

                        {this.state.posts && this.state.posts.map((post, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {post.published ? "Published" : "Unpublished"}
                                    </h6>
                                    <p className="card-text">{post.description}</p>
                                    <Link to={"/posts/" + post.id} className="card-link">Edit</Link>
                                </div>
                            </div>
                        ))}

                        <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllPosts}>
                            Remove All
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}