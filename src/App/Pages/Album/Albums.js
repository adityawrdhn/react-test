import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get } from "actions/common";
import { Container, Row, Col } from "react-bootstrap";
import Widget, { WidgetProfile } from "App/Components/Widget";

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      userData: []
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    get(`albums?userId=${id}`, albums => {
      this.setState({ albums });
    });
    get(`users/${id}`, userData => this.setState({ userData }));
  }
  render() {
    const { id } = this.props.match.params;
    return (
      <Container>
        <Row>
          <Col md={3}>
            <WidgetProfile data={this.state.userData} />
          </Col>
          <Col md={6}>
            <Container>
              <Row>
                {this.state.albums.length < 1 && "Loading..."}
                {this.state.albums.map((album, i) => (
                  <div style={{width:'100%'}} key={i}>
                    <Widget >
                      <Link
                        to={`/user/${id}/album/${album.id}`}
                        className="thumbnail defaultColor"
                      >
                        <h4 className="inline-title" title={album.title}>
                          {album.title}
                        </h4>
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
