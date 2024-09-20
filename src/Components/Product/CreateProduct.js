import { useState } from "react";
import { useSnackbar } from "notistack";
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
} from "semantic-ui-react";

const CreateProduct = ({ endpoint, getItemsFunc }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    Price: ["Please enter a price"],
    Name: ["Please enter a name"],
  });
  const [item, setItem] = useState({ name: "", price: "" });
  const { enqueueSnackbar } = useSnackbar();

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

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "name") {
      validateName(event.target.value);
    }
    if (event.target.name === "price") {
      validatePrice(event.target.value);
    }
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async () => {
    await axios
      .post(endpoint, item)
      .then(() => {
        setItem({ name: "", price: "" });
        setError({ Price: [""], Name: [""] });
        setOpen(false);
        enqueueSnackbar("Product created successfully!");
        getItemsFunc();
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  const handleCancel = async () => {
    setOpen(false);
    setError({ Price: [""], Name: [""] });
    setItem({ name: "", price: "" });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue">Create</Button>}
    >
      <ModalHeader>Create Product</ModalHeader>
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
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
          disabled={error.Name[0] || error.Price[0] ? true : false}
        />
      </ModalActions>
    </Modal>
  );
};

CreateProduct.propTypes = {
  endpoint: PropTypes.string,
  getItemsFunc: PropTypes.func,
};

export default CreateProduct;
