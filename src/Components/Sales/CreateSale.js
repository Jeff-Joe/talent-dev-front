import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
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

const CreateSale = ({ endpoint, getItemsFunc }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [item, setItem] = useState({
    productId: "",
    customerId: "",
    storeId: "",
    dateSold: "",
  });

  const handleInputDate = (event) => {
    event.preventDefault();
    let formattedDate = event.target.value.replaceAll("/", "-");
    setItem({ ...item, dateSold: formattedDate });
  };

  const handleInputCustomer = (event, data) => {
    event.preventDefault();
    setItem({ ...item, customerId: data.value });
  };

  const handleInputProduct = (event, data) => {
    event.preventDefault();
    setItem({ ...item, productId: data.value });
  };

  const handleInputStore = (event, data) => {
    event.preventDefault();
    setItem({ ...item, storeId: data.value });
  };

  const isDateValid = (dateStr) => {
    return !isNaN(new Date(dateStr));
  };

  const handleSubmit = async () => {
    if (!isDateValid(item.dateSold)) {
      setError(true);
      return;
    } else {
      await axios
        .post(endpoint, item)
        .then((res) => {
          console.log(res);
          setItem({
            productId: "",
            customerId: "",
            storeId: "",
            dateSold: "",
          });
          setError(false);
          getItemsFunc();
          if (isDateValid(item.dateSold)) setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          if (isDateValid(item.dateSold)) setOpen(false);
        });
    }
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue">Create</Button>}
    >
      <ModalHeader>Create Sale</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Date sold</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              onChange={handleInputDate}
            />
            {error && (
              <p className="red">Please enter a date in format YYYY/MM/DD</p>
            )}
          </FormField>
          <FormField>
            <label>Product</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/product"
              handleInput={handleInputProduct}
              placeholder="Select a product"
            />
          </FormField>
          <FormField>
            <label>Customer</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/customer"
              handleInput={handleInputCustomer}
              placeholder="Select a customer"
            />
          </FormField>
          <FormField>
            <label>Store</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/store"
              handleInput={handleInputStore}
              placeholder="Select a store"
            />
          </FormField>
        </Form>
      </ModalContent>
      <ModalActions>
        <Button
          color="black"
          onClick={() => {
            setItem({
              productId: "",
              customerId: "",
              storeId: "",
              dateSold: "",
            });
            setError(false);
            setOpen(false);
          }}
        >
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

CreateSale.propTypes = {
  endpoint: PropTypes.string,
  getItemsFunc: PropTypes.func,
};

export default CreateSale;
