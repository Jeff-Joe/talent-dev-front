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

const CreateCustomer = ({ endpoint, getItemsFunc }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    Address: ["Please enter an address"],
    Name: ["Please enter a name"],
  });
  const [item, setItem] = useState({ name: "", address: "" });
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

  const validateAddress = (item) => {
    if (!item.trim()) {
      setError({ ...error, Address: ["Please enter an address"] });
    } else if (item.trim().length > 1000 || item.trim().length < 2) {
      setError({
        ...error,
        Address: ["The address must contain between 2 and 1000 characters"],
      });
    } else {
      setError({ ...error, Address: [""] });
    }
  };

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "name") {
      validateName(event.target.value);
    }
    if (event.target.name === "address") {
      validateAddress(event.target.value);
    }
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async () => {
    await axios
      .post(endpoint, item)
      .then(() => {
        setItem({ name: "", address: "" });
        setError({ Address: [""], Name: [""] });
        setOpen(false);
        enqueueSnackbar("Customer created successfully");
        getItemsFunc();
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  const handleCancel = async () => {
    setOpen(false);
    setError({ Address: [""], Name: [""] });
    setItem({ name: "", address: "" });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue">Create</Button>}
    >
      <ModalHeader>Create Customer</ModalHeader>
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
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
          disabled={error.Address[0] || error.Name[0] ? true : false}
        />
      </ModalActions>
    </Modal>
  );
};

CreateCustomer.propTypes = {
  endpoint: PropTypes.string,
  getItemsFunc: PropTypes.func,
};

export default CreateCustomer;
