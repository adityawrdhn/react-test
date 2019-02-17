import React, { Component } from "react";
import { get } from "actions/common";
import { Container, Row, Col } from "react-bootstrap";

export default class AlbumDetailPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }
  componentDidMount() {
    const { photoId } = this.props.match.params;
    get(`photos/${photoId}`, albums => {
      this.setState({ albums });
    });
  }
  render() {
    const { title, url } = this.state.albums;
    return (
      <Container>
        <Row>
        <Col md={6} sm={12}>
          <img src={url} alt="Loading" style={{width: '100%' }}/>
        </Col>
        <Col md={6} sm={12}>
          <h4 className="inline-title" title={title}>
            {title}
          </h4>
        </Col>
        </Row>
      </Container>
    );
  }
}
