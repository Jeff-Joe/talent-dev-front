import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";

const DeleteCustomer = ({ endpoint, rowId, getItems }) => {
  const [open, setOpen] = useState(false);

  const deleteRow = async (id) => {
    await axios
      .delete(`${endpoint}/${id}`)
      .then(() => getItems())
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="red">
          <Icon name="trash" />
          Delete
        </Button>
      }
    >
      <ModalHeader>Delete Product</ModalHeader>
      <ModalContent>
        <Header as="h3">Are you sure?</Header>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Delete"
          labelPosition="right"
          icon="checkmark"
          onClick={async () => {
            await deleteRow(rowId);
            setOpen(false);
          }}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

DeleteCustomer.propTypes = {
  endpoint: PropTypes.string,
  rowId: PropTypes.number.isRequired,
  getItems: PropTypes.func,
};

export default DeleteCustomer;
