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
  const [error, setError] = useState({ Price: [""], Name: [""] });
  const [item, setItem] = useState({
    id: rowId,
    name: name,
    price: price,
  });

  const validateName = (item) => {
    if (!item.trim()) {
      setError({ ...error, Name: ["Please enter a name"] });
    } else if (item.trim().length > 255 || item.trim().length < 2) {
      setError({
        ...error,
        Name: ["The name must contain between 2 and 255 characters"],
      });
    } else {
      setError({ ...error, Name: [""] });
    }
  };

  const validatePrice = (item) => {
    if (!item.trim()) {
      setError({ ...error, Price: ["Please enter a price"] });
    } else if (isNaN(item.trim())) {
      setError({
        ...error,
        Price: ["The value you entered is not a number"],
      });
    } else {
      setError({ ...error, Price: [""] });
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      validateName(e.target.value);
    }
    if (e.target.name === "price") {
      validatePrice(e.target.value);
    }
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
        setError(err.response.data.errors);
      });
  };

  const handleCancel = async () => {
    setItem({
      id: rowId,
      name: name,
      price: price,
    });
    setError({ Price: [""], Name: [""] });
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
      <ModalHeader>Edit Product</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Name</label>
            <input name="name" value={item.name} onChange={handleInput} />
            {error.Name && <p className="red">{error.Name[0]}</p>}
          </FormField>
          <FormField>
            <label>Price</label>
            <input name="price" value={item.price} onChange={handleInput} />
            {error.Price && <p className="red">{error.Price[0]}</p>}
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
          disabled={error.Name[0] || error.Price[0] ? true : false}
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
