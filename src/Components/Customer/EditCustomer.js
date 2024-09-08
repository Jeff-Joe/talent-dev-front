import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  FormField,
  Form,
  Icon,
} from "semantic-ui-react";

function EditCustomer({ name, address, endpoint, rowId, getItems }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: rowId,
    name: name,
    address: address,
  });

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async () => {
    if (!rowId) {
      setItem({
        id: rowId,
        name: name,
        address: address,
      });
      setOpen(false);
      return;
    }
    await axios
      .put(endpoint + "/" + rowId, item)
      .then(() => {
        setOpen(false);
        getItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="yellow">
          <Icon name="edit outline" />
          Edit
        </Button>
      }
    >
      <ModalHeader>Edit Customer</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Name</label>
            <input name="name" value={item.name} onChange={handleInput} />
          </FormField>
          <FormField>
            <label>Address</label>
            <input name="address" value={item.address} onChange={handleInput} />
          </FormField>
        </Form>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Edit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
        />
      </ModalActions>
    </Modal>
  );
}

EditCustomer.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  endpoint: PropTypes.string,
  rowId: PropTypes.number,
  getItems: PropTypes.func,
};

export default EditCustomer;
