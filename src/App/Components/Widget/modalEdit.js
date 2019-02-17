import React from "react";
import { Modal } from "react-bootstrap";
import { InputPost } from "App/Components/Widget";
const ModalEdit = ({show,data}) => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={data.onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputPost
              onChange={data.onChange}
              title={data.title}
              body={data.body}
              onCancel={data.onCancel}
              onSubmit={data.onSubmit}
            />
        </Modal.Body>
      </Modal>
    );
  
}
export default ModalEdit