import { useState } from "react";
import { useSnackbar } from "notistack";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [error, setError] = useState({
    Date: "Please select a date",
    Product: "Please select a product",
    Customer: "Please select a customer",
    Store: "Please select a store",
  });
  const [item, setItem] = useState({
    productId: "",
    customerId: "",
    storeId: "",
    dateSold: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleInputDate = (date) => {
    setItem({ ...item, dateSold: date });
    setError({ ...error, Date: "" });
  };

  const handleInputCustomer = (event, data) => {
    event.preventDefault();
    setItem({ ...item, customerId: data.value });
    setError({ ...error, Customer: "" });
  };

  const handleInputProduct = (event, data) => {
    event.preventDefault();
    setItem({ ...item, productId: data.value });
    setError({ ...error, Product: "" });
  };

  const handleInputStore = (event, data) => {
    event.preventDefault();
    setItem({ ...item, storeId: data.value });
    setError({ ...error, Store: "" });
  };

  const handleCancel = () => {
    setItem({
      productId: "",
      customerId: "",
      storeId: "",
      dateSold: "",
    });
    setError({
      Date: "Please select a date",
      Product: "Please select a product",
      Customer: "Please select a customer",
      Store: "Please select a store",
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    await axios
      .post(endpoint, item)
      .then(() => {
        setItem({
          productId: "",
          customerId: "",
          storeId: "",
          dateSold: "",
        });
        enqueueSnackbar("Sale created successfully!");
        setError({
          Date: "Please select a date",
          Product: "Please select a product",
          Customer: "Please select a customer",
          Store: "Please select a store",
        });
        getItemsFunc();
        setOpen(false);
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
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
            <DatePicker
              selected={item.dateSold}
              onChange={(date) => {
                handleInputDate(date);
              }}
            />
            {error.Date && <p className="red">{error.Date}</p>}
          </FormField>
          <FormField>
            <label>Product</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/product"
              handleInput={handleInputProduct}
              placeholder="Select a product"
            />
            {error.Product && <p className="red">{error.Product}</p>}
          </FormField>
          <FormField>
            <label>Customer</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/customer"
              handleInput={handleInputCustomer}
              placeholder="Select a customer"
            />
            {error.Customer && <p className="red">{error.Customer}</p>}
          </FormField>
          <FormField>
            <label>Store</label>
            <DropdownMenu
              endpoint="https://app-munson-web-eastus-dev-003.azurewebsites.net/api/store"
              handleInput={handleInputStore}
              placeholder="Select a store"
            />
            {error.Store && <p className="red">{error.Store}</p>}
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
          disabled={
            error.Date || error.Product || error.Customer || error.Store
              ? true
              : false
          }
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
