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
  const [error, setError] = useState({ Address: [""], Name: [""] });
  const [item, setItem] = useState({ name: "", address: "" });
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
        setItem({ name: "", address: "" });
        setError({ Address: [""], Name: [""] });
        setOpen(false);
        enqueueSnackbar("Store created successfully!");
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
      <ModalHeader>Create Store</ModalHeader>
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
