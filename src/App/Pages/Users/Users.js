import React, { Component } from 'react'

import { Container, Row, Col, Media, Card} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { get } from 'actions/common'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    get('users', (data) => { this.setState({ users: data }) })
  }
  render() {
    return (
      <Container>
        <Row>
        {this.state.users.length < 1 && ('Loading...')}
        {this.state.users.map((user, i) => (
          <Col md={4}  key={i}>
          <Card>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src="http://placehold.it/64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <Link to={`/user/${user.id}`}>
                  <h4>{user.name}</h4>
                  <p>{user.website}</p>
                </Link>
              </Media.Body>
            </Media>
            </Card>
          </Col>
          
        ))}
        </Row>
      </Container>
    )
  }
}
