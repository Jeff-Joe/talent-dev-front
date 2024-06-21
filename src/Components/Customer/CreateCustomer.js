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
} from "semantic-ui-react";

const CreateCustomer = ({ endpoint, getItemsFunc }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({
    name: "",
    address: "",
  });

  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async () => {
    await axios
      .post(endpoint, item)
      .then((res) => {
        console.log("Form submitted successfully!");
        console.log(res);
        setItem({ name: "", address: "" });
        getItemsFunc();
      })
      .catch((err) => console.log(err));
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
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={async () => {
            await handleSubmit();
            setOpen(false);
          }}
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
