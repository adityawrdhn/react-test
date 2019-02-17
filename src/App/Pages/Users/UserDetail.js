import React, { Component } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InputPost, WidgetProfile } from "App/Components/Widget";
import ModalEdit from "App/Components/Widget/modalEdit";
import { get } from "actions/common";

export default class UserDeatail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      userData: {},
      postTitle: "",
      postBody: "",
      editId: "",
      show: false
    };
  }
  setData = i => {
    const { name, value } = i.target;
    // console.log(name, value)
    this.setState({ [name]: value });
  };
  CancelPost = () => {
    this.setState({
      postTitle: "",
      postBody: "",
      editId: "",
      show: false
    });
  };
  submitNewPost = () => {
    // in real life
    // post to an endpoint
    const { postTitle, postBody, editId } = this.state;
    const newPost = {
      userId: 1,
      id: editId ? editId : 1,
      title: postTitle,
      body: postBody
    };
    const newPostsArr = [newPost];

    // simple validation
    if (postTitle.length > 0 && postBody.length > 0) {
      // imutable
      const copyAllPosts = this.state.allPosts.slice();
      const newData = newPostsArr.concat(copyAllPosts);
      if (editId !== "") {
        // const updatedData = copyAllPosts.splice(editId, 1, newPostsArr)
        copyAllPosts[editId] = newPost;
        this.setState({ allPosts: copyAllPosts });
      } else {
        this.setState({ allPosts: newData });
      }
      this.CancelPost();
    }
  };
  setPosts = data => {
    this.setState({
      allPosts: data
    });
  };
  deletePostItem = i => () => {
    const newAllPosts = this.state.allPosts.slice();
    newAllPosts.splice(i, 1);
    this.setState({ allPosts: newAllPosts });
  };
  editPostItem = i => () => {
    const postItem = this.state.allPosts[i];
    const { title, body } = postItem;
    this.setState({
      postTitle: title,
      postBody: body,
      editId: i,
      show: true
    });
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    get(`posts?userId=${id}`, this.setPosts);
    get(`users/${id}`, userData => this.setState({ userData }));
  }
  render() {
    const userId = this.props.match.params.id;

    return (
      <Container>
        <Row>
          <Col md={3}>
            <WidgetProfile data={this.state.userData} />
          </Col>
          <Col md={6}>
            <ModalEdit
              show={this.state.show}
              data={{
                onChange: this.setData,
                title: this.state.postTitle,
                body: this.state.postBody,
                onCancel: this.CancelPost,
                onSubmit: this.submitNewPost
              }}
            />
            <InputPost
              onChange={this.setData}
              title={this.state.postTitle}
              body={this.state.postBody}
              onCancel={this.CancelPost}
              onSubmit={this.submitNewPost}
            />
            {this.state.allPosts.length < 1 && "Loading..."}
            {this.state.allPosts &&
              this.state.allPosts.map((list, i) => {
                return (
                  <div className="mb-2" key={i}>
                    <Card style={{ padding: "15px" }}>
                      <Link
                        to={`/user/${userId}/post/${list.id}`}
                        className="defaultColor post-title hover"
                      >
                        <div>{list.title}</div>
                      </Link>
                      <p>{list.body}</p>
                      <div>
                        <Link to={`/user/${userId}/post/${list.id}`}>
                          <Button size="sm">Comment</Button>
                        </Link>
                        <div className="float-right">
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="..."
                          >
                            <button
                              type="button"
                              className="btn btn-warning btn-sm"
                              title="edit"
                              onClick={this.editPostItem(i)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              title="remove"
                              onClick={this.deletePostItem(i)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
          </Col>
        </Row>
      </Container>
    );
  }
}
