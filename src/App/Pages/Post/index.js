import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Media,
  ButtonGroup,
  Button
} from "react-bootstrap";

import Widget, { WidgetProfile, InputPost } from "App/Components/Widget";
import { get } from "actions/common";
import ModalEdit from "App/Components/Widget/modalEdit";


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      userData: {},
      comments: [],
      postTitle: "",
      postBody: "",
			editId: "",
			show:false
    };
  }
  setData = i => {
    const { name, value } = i.target;
    this.setState({ [name]: value });
  };
  handleEdit = i => () => {
    const postItem = this.state.comments[i];
    const { name, body } = postItem;
    this.setState({
      postTitle: name,
      postBody: body,
			editId: i,
			show:true
    });
  };
  handleRemove = i => () => {
    console.log(i);
    const copyData = this.state.comments.slice();
    copyData.splice(i, 1);
    this.setState({ comments: copyData });
  };
  submitNewPost = () => {
    // in real life
    // post to an endpoint
    const { postTitle, postBody, editId } = this.state;
    const newPost = {
      userId: 1,
      id: editId ? editId : 1,
      name: postTitle,
      body: postBody
    };
    const newPostsArr = [newPost];

    // simple validation
    if (postTitle.length > 0 && postBody.length > 0) {
      // imutable
      const copyAllPosts = this.state.comments.slice();
      const newData = copyAllPosts.concat(newPostsArr);
      if (editId !== "") {
        copyAllPosts[editId] = newPost;
        this.setState({ comments: copyAllPosts });
      } else {
        this.setState({ comments: newData });
      }
      this.cancelPost();
    }
  };
  cancelPost = () => {
    this.setState({
      postTitle: "",
      postBody: "",
			editId: "",
			show:false,
    });
  };
  componentDidMount() {
    const { id, postId } = this.props.match.params;
    get(`posts/${postId}`, post => this.setState({ post }));
    get(`users/${id}`, userData => this.setState({ userData }));
    get(`comments?postId=${postId}`, comments => this.setState({ comments }));
  }
  render() {
    const { title, body } = this.state.post;
    return (
      <Container>
        <Row>
          <Col md={3}>
            <WidgetProfile data={this.state.userData} />
          </Col>
          <Col md={6}>
            <Widget>
              <h3 className="mt-0">{title}</h3>
              <p className="justify">{body}</p>
              <h5>Comment</h5>
              {this.state.comments.length < 1 && "Loading..."}
              {this.state.comments.length > 0 &&
                this.state.comments.map((comment, i) => {
                  return (
                    <Widget key={i}>
                      <Media>
                        <Media.Body>
                          <h4 className="media-heading">{comment.name}</h4>
                          {comment.body}
                        </Media.Body>
                        
                      </Media>
											<div className="float-right">
                          <ButtonGroup>
                            <Button
                              variant="warning"
                              title="edit"
                              onClick={this.handleEdit(i)}
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              title="edit"
                              onClick={this.handleRemove(i)}
                              size="sm"
                            >
                              Remove
                            </Button>
                          </ButtonGroup>
                        </div>
                    </Widget>
                  );
                })}
            </Widget>
            <div className="mb-5">
              <InputPost
                title={this.state.postTitle}
                body={this.state.postBody}
                onChange={this.setData}
                onCancel={this.cancelPost}
                onSubmit={this.submitNewPost}
              />
            </div>
						<ModalEdit
              show={this.state.show}
              data={{
                onChange: this.setData,
                title: this.state.postTitle,
                body: this.state.postBody,
                onCancel: this.cancelPost,
                onSubmit: this.submitNewPost
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
