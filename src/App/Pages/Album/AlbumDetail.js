import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "actions/common";
import { Container, Row, Col, Media } from "react-bootstrap";
import Widget, { WidgetProfile } from "App/Components/Widget";

export default class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: [],
      albums: [],
      userData: []
    };
  }
  componentDidMount() {
    const { id, albumId } = this.props.match.params;
    get(`photos?albumId=${albumId}`, albums => {
      this.setState({ albums });
    });
    get(`albums/${albumId}`, albumData => {
      this.setState({ albumData });
    });
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
            <Container>
              <Row>
                <div style={{ width: "100%" }}>
                  <Widget>
                    <h5>Album Name:</h5>
                    <h4>{this.state.albumData.title}</h4>
                  </Widget>
                </div>
              </Row>
              <Row>
                {this.state.albums.length < 1 && "Loading..."}
                {this.state.albums.map((album, i) => (
                  <div key={i} style={{ width: "100%" }}>
                    <Widget>
                      <Link
                        to={`/user/${userId}/photos/${album.id}`}
                        className="thumbnail defaultColor"
                      >
                        <Media>
                          <img
                            width={150}
                            height={150}
                            className="mr-3"
                            src={album.thumbnailUrl}
                            alt="Generic placeholder"
                          />
                          <Media.Body>
                            <h4 className="inline-title" title={album.title}>
                              {album.title}
                            </h4>
                          </Media.Body>
                        </Media>
                      </Link>
                    </Widget>
                  </div>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
