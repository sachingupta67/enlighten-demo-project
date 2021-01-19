import React from "react";
import { Button, Modal } from "reactstrap";

const ButtonUI = ({ side, color, handler, title }) => (
  <div className={`${side || "left"}-side`}>
    <Button
      className="btn-link"
      color={color || "default"}
      type="button"
      onClick={handler}
    >
      {title || "Ok"}
    </Button>
  </div>
);
const CustomModal = (props) => {
  const { confirm, message, modal, modalHandler } = props;
  const toggleModal = () => {
    modalHandler();
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <div className="modal-body text-center text-default">{message}</div>
        <div className="modal-footer">
          <ButtonUI handler={toggleModal || confirm} />
          <div className="divider" />
          <ButtonUI
            handler={toggleModal}
            title="Cancel"
            side="right"
            color="primary"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
