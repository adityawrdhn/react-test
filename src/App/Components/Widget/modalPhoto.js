import React from "react";
import { Modal } from "react-bootstrap";
const ModalEdit = ({show,data}) => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={data.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={data.url} alt="Loading" style={{width: '100%' }}/>
        </Modal.Body>
      </Modal>
    );
  
}
export default ModalEdit