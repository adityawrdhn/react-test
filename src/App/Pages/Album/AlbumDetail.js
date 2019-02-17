import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "actions/common";
import { Container, Row, Col, Media, Button } from "react-bootstrap";
import Widget, { WidgetProfile } from "App/Components/Widget";
import ModalPhoto from "App/Components/Widget/modalPhoto";

export default class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: [],
      albums: [],
      userData: [],
      show: false,
      photoName: "",
      photoUrl: ""
    };
  }
  showPhoto = i => () => {
    const photoItem = this.state.albums[i];
    const { title, url } = photoItem;
    this.setState({
      photoName: title,
      photoUrl: url,
      show: true
    });
  };
  hidePhoto = () => {
    this.setState({
      photoName: "",
      photoUrl: "",
      show: false
    });
  };
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
        <ModalPhoto
          show={this.state.show}
          data={{
            name: this.state.photoName,
            url: this.state.photoUrl,
            onHide: this.hidePhoto
          }}
        />
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
                      <Media>
                        <img
                          width={150}
                          height={150}
                          className="mr-3"
                          src={album.thumbnailUrl}
                          alt="Generic placeholder"
                        />
                        <Media.Body>
                          <Link
                            to={`/user/${userId}/photos/${album.id}`}
                            className="thumbnail defaultColor"
                          >
                            <h4 className="inline-title" title={album.title}>
                              {album.title}
                            </h4>
                          </Link>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={this.showPhoto(i)}
                          >
                            Quick View
                          </Button>
                        </Media.Body>
                      </Media>
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
