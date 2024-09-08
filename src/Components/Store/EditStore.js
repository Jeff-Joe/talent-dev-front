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

function EditStore({ name, address, endpoint, rowId, getItems }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ Address: [""], Name: [""] });
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
      .then((res) => {
        setOpen(false);
        getItems();
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  const handleCancel = async () => {
    setItem({
      id: rowId,
      name: name,
      address: address,
    });
    setError({ Address: [""], Name: [""] });
    setOpen(false);
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
      <ModalHeader>Edit Store</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Name</label>
            <input name="name" value={item.name} onChange={handleInput} />
            {error.Name && <p className="red">{error.Name[0]}</p>}
          </FormField>
          <FormField>
            <label>Address</label>
            <input name="address" value={item.address} onChange={handleInput} />
            {error.Address && <p className="red">{error.Address[0]}</p>}
          </FormField>
        </Form>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={handleCancel}>
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

EditStore.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  endpoint: PropTypes.string,
  rowId: PropTypes.number,
  getItems: PropTypes.func,
};

export default EditStore;
