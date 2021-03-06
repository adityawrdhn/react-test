import React from "react";
import { FormGroup, FormControl, Card, ListGroup, Container} from "react-bootstrap";

const Widget = ({header, children}) => {
  return (
    <div className="mb-1">
      <Card >
      {(header) ? (
        <Card.Title>{header}</Card.Title>
      ) : '' }
      
        <Card.Body>
          {children}
        </Card.Body>
      </Card>
    </div>
    
 )
}

export default Widget

export const WidgetProfile = ({header, data}) => {
  return (
    <div>
      <Card className="text-center">
        <div className="thumbnail mt-3">
          <img src="http://placehold.it/200" alt="Loading"/>
          <h4>
            {data.name}
          </h4>
          <p>{data.website}</p>
          <hr />
          <Container className="text-left mb-2" >
            <ListGroup>
              <ListGroup.Item>Company Name : {data.company && data.company.name}</ListGroup.Item>
              <ListGroup.Item>Email: {data.email}</ListGroup.Item>
              <ListGroup.Item>Phone: {data.phone}</ListGroup.Item>
              <ListGroup.Item>Address: { data.address && data.address.street} {data.address && data.address.city} {data.address && data.address.zipcode}</ListGroup.Item>
            </ListGroup>
          </Container>
        </div>
      </Card>
    </div>
  )
}

export const InputPost = ({title, body, onChange, onCancel, onSubmit}) => {
  return (
    <Widget>
      <FormGroup>
        <FormControl
          type="text"
          name="postTitle"
          placeholder="title"
          value={title}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          as="textarea"
          name="postBody"
          placeholder="Whats On Your Mind?"
          value={body}
          onChange={onChange}
        />
      </FormGroup>
      <div className="text-right">
        {
          (title || body) && <button className="btn btn-default " onClick={onCancel}> Cancel</button>
        }  
        <button className="btn btn-primary" onClick={onSubmit}>  Post</button>
      </div>
    </Widget>
  )
}
