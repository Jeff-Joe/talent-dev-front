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
  const [error, setError] = useState({ Price: [""], Name: [""] });
  const [item, setItem] = useState({ name: "", price: "" });
  const { enqueueSnackbar } = useSnackbar();

  const handleInput = (event) => {
    event.preventDefault();
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
