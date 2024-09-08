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

function EditProduct({ name, price, endpoint, rowId, getItems }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: rowId,
    name: name,
    price: price,
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
        price: price,
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
      <ModalHeader>Edit Product</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Name</label>
            <input name="name" value={item.name} onChange={handleInput} />
          </FormField>
          <FormField>
            <label>Price</label>
            <input name="price" value={item.price} onChange={handleInput} />
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

EditProduct.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  endpoint: PropTypes.string,
  rowId: PropTypes.number,
  getItems: PropTypes.func,
};

export default EditProduct;
