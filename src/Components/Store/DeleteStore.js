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

const DeleteStore = ({ endpoint, rowId, getItems }) => {
  const [open, setOpen] = useState(false);

  const deleteRow = async () => {
    await axios
      .delete(`${endpoint}/${rowId}`)
      .then(() => {
        getItems();
        setOpen(false);
      })
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
      <ModalHeader>Delete Store</ModalHeader>
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
          onClick={deleteRow}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

DeleteStore.propTypes = {
  endpoint: PropTypes.string,
  rowId: PropTypes.number.isRequired,
  getItems: PropTypes.func,
};

export default DeleteStore;
